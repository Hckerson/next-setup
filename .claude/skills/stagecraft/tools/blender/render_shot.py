import json
import math
import os
import sys
import time

import bpy
import numpy
from mathutils import Matrix, Vector

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import toolmarks

MM = 0.001
BASE = os.getcwd()


def arguments():
    rest = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    if len(rest) < 2:
        raise SystemExit("Usage: blender --background --factory-startup --python render_shot.py -- <shot.json> <out.png>")
    return rest[0], rest[1]


def mm(point):
    return Vector(point) * MM


def linear(value):
    value = value.lstrip("#")
    srgb = [int(value[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in srgb] + [1]


def principled(name, spec):
    material = bpy.data.materials.new(name)
    material.use_nodes = True
    shader = material.node_tree.nodes["Principled BSDF"]
    shader.inputs["Base Color"].default_value = linear(spec.get("color", "#cccccc"))
    shader.inputs["Metallic"].default_value = spec.get("metalness", 0)
    shader.inputs["Roughness"].default_value = spec.get("roughness", 0.5)
    shader.inputs["Anisotropic"].default_value = spec.get("anisotropic", 0)
    nodes = material.node_tree.nodes
    links = material.node_tree.links
    if spec.get("maps") or spec.get("cellMm"):
        coordinates = nodes.new("ShaderNodeTexCoord")
        mapping = nodes.new("ShaderNodeMapping")
        mapping.inputs["Scale"].default_value = [1 / (spec.get("tileMm", 1) * MM)] * 3
        links.new(coordinates.outputs["Object"], mapping.inputs["Vector"])
    for key, socket in (("color", "Base Color"), ("roughness", "Roughness"), ("normal", "Normal")):
        if key not in spec.get("maps", {}):
            continue
        texture = nodes.new("ShaderNodeTexImage")
        texture.image = bpy.data.images.load(os.path.join(BASE, spec["maps"][key]))
        texture.projection = "BOX"
        texture.projection_blend = 0.2
        if key != "color":
            texture.image.colorspace_settings.name = "Non-Color"
        links.new(mapping.outputs["Vector"], texture.inputs["Vector"])
        if key == "normal":
            normal = nodes.new("ShaderNodeNormalMap")
            links.new(texture.outputs["Color"], normal.inputs["Color"])
            links.new(normal.outputs["Normal"], shader.inputs["Normal"])
        elif key == "color" and spec.get("tint"):
            tint = nodes.new("ShaderNodeMix")
            tint.data_type = "RGBA"
            tint.blend_type = "MULTIPLY"
            tint.inputs["Factor"].default_value = 1
            tint.inputs["B"].default_value = linear(spec["tint"])
            links.new(texture.outputs["Color"], tint.inputs["A"])
            links.new(tint.outputs["Result"], shader.inputs[socket])
        else:
            links.new(texture.outputs["Color"], shader.inputs[socket])
    if spec.get("cellMm"):
        cells = nodes.new("ShaderNodeTexVoronoi")
        cells.feature = "DISTANCE_TO_EDGE"
        cells.inputs["Scale"].default_value = spec.get("tileMm", 1) / spec["cellMm"]
        links.new(mapping.outputs["Vector"], cells.inputs["Vector"])
        bump = nodes.new("ShaderNodeBump")
        bump.inputs["Distance"].default_value = spec["cellMm"] * MM * 0.3
        bump.invert = True
        links.new(cells.outputs["Distance"], bump.inputs["Height"])
        links.new(bump.outputs["Normal"], shader.inputs["Normal"])
    if spec.get("transmission"):
        shader.inputs["Transmission Weight"].default_value = spec["transmission"]
        shader.inputs["IOR"].default_value = spec.get("ior", 1.5)
    return material, shader


def detail_image(detail, raw):
    rows, columns = detail.shape
    image = bpy.data.images.new("detail", columns, rows, alpha=False, float_buffer=True, is_data=True)
    flat = numpy.ones((rows * columns, 4), dtype=numpy.float32)
    flat[:, 0] = detail[::-1].ravel()
    flat[:, 1] = raw[::-1].ravel()
    image.pixels.foreach_set(flat.ravel().astype(numpy.float32))
    image.pack()
    return image


def surface_material(name, spec, image):
    material, shader = principled(name, spec)
    nodes = material.node_tree.nodes
    links = material.node_tree.links
    texture = nodes.new("ShaderNodeTexImage")
    texture.image = image
    texture.interpolation = "Cubic"
    channels = nodes.new("ShaderNodeSeparateColor")
    links.new(texture.outputs["Color"], channels.inputs["Color"])
    bump = nodes.new("ShaderNodeBump")
    bump.inputs["Distance"].default_value = MM
    bump.inputs["Strength"].default_value = spec.get("bumpStrength", 1)
    links.new(channels.outputs["Red"], bump.inputs["Height"])
    links.new(bump.outputs["Normal"], shader.inputs["Normal"])
    ramp = nodes.new("ShaderNodeMapRange")
    ramp.inputs["To Min"].default_value = spec["roughness"]
    ramp.inputs["To Max"].default_value = spec.get("rawRoughness", spec["roughness"])
    links.new(channels.outputs["Green"], ramp.inputs["Value"])
    links.new(ramp.outputs["Result"], shader.inputs["Roughness"])
    return material


def heightfield(spec, base):
    with open(os.path.join(base, spec["toolmarks"])) as handle:
        marks = json.load(handle)
    heights = toolmarks.heights(marks)
    step = spec.get("meshStep", 5)
    rows, columns = heights.shape[0] // step, heights.shape[1] // step
    coarse = heights[:rows * step, :columns * step].reshape(rows, step, columns, step).mean(axis=(1, 3))
    size = marks["sizeMm"]
    xs = numpy.linspace(0, size[0], columns)
    ys = numpy.linspace(0, size[1], rows)
    gx, gy = numpy.meshgrid(xs, ys)
    shift = spec.get("offsetMm", [0, 0, 0])
    gz = spec["topMm"] - marks["depthOfCut"] + coarse
    vertices = (numpy.stack([gx, gy, gz], axis=-1).reshape(-1, 3) + shift) * MM
    index = numpy.arange(rows * columns).reshape(rows, columns)
    quads = numpy.stack([index[:-1, :-1], index[:-1, 1:], index[1:, 1:], index[1:, :-1]], axis=-1).reshape(-1, 4)
    centres = numpy.stack([gx, gy], axis=-1).reshape(-1, 2)[quads].mean(axis=1)
    for hole in spec.get("holes", []):
        quads = quads[numpy.linalg.norm(centres[: len(quads)] - hole["centreMm"], axis=1) > hole["diameterMm"] / 2]
        centres = numpy.stack([gx, gy], axis=-1).reshape(-1, 2)[quads].mean(axis=1)
    mesh = bpy.data.meshes.new(spec["name"])
    mesh.vertices.add(len(vertices))
    mesh.vertices.foreach_set("co", vertices.ravel().astype(numpy.float32))
    mesh.loops.add(quads.size)
    mesh.loops.foreach_set("vertex_index", quads.ravel().astype(numpy.int32))
    mesh.polygons.add(len(quads))
    mesh.polygons.foreach_set("loop_start", (numpy.arange(len(quads)) * 4).astype(numpy.int32))
    mesh.polygons.foreach_set("loop_total", numpy.full(len(quads), 4, dtype=numpy.int32))
    mesh.update(calc_edges=True)
    uv = mesh.uv_layers.new(name="UVMap")
    u = (gx / size[0]).ravel()[quads.ravel()]
    v = (gy / size[1]).ravel()[quads.ravel()]
    uv.data.foreach_set("uv", numpy.stack([u, v], axis=-1).ravel().astype(numpy.float32))
    corners = gz.ravel()[quads]
    wall = (corners.max(axis=1) - corners.min(axis=1)) >= spec.get("creaseMm", 0.05)
    mesh.polygons.foreach_set("use_smooth", ~wall)
    mesh.polygons.foreach_set("material_index", wall.astype(numpy.int32))
    obj = bpy.data.objects.new(spec["name"], mesh)
    bpy.context.collection.objects.link(obj)
    raw = heights > marks["depthOfCut"] / 2
    detail = heights - raw * marks["depthOfCut"]
    obj.data.materials.append(surface_material(spec["name"], spec["material"], detail_image(detail, raw)))
    obj.data.materials.append(principled(spec["name"] + "-wall", spec.get("wallMaterial", spec["material"]))[0])
    return obj


def box(spec):
    bpy.ops.mesh.primitive_cube_add(size=1)
    obj = bpy.context.active_object
    obj.name = spec["name"]
    obj.scale = mm(spec["sizeMm"])
    obj.location = mm(spec["minMm"]) + mm(spec["sizeMm"]) / 2
    bpy.ops.object.transform_apply(scale=True)
    cutters = []
    for hole in spec.get("holes", []):
        bpy.ops.mesh.primitive_cylinder_add(vertices=128, radius=hole["diameterMm"] / 2 * MM, depth=1, location=mm(hole["centreMm"] + [0]))
        cutters.append(bpy.context.active_object)
    for pocket in spec.get("pockets", []):
        bpy.ops.mesh.primitive_cube_add(size=1)
        cutter = bpy.context.active_object
        cutter.scale = mm(pocket["sizeMm"])
        cutter.location = mm(pocket["minMm"]) + mm(pocket["sizeMm"]) / 2
        cutters.append(cutter)
    for cutter in cutters:
        boolean = obj.modifiers.new("hole", "BOOLEAN")
        boolean.object = cutter
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.modifier_apply(modifier="hole")
        bpy.data.objects.remove(cutter)
    if spec.get("hingeMm"):
        hinge = mm(spec["hingeMm"])
        obj.data.transform(Matrix.Translation(obj.location - hinge))
        obj.location = hinge
        obj.rotation_euler = [math.radians(angle) for angle in spec.get("rotationDeg", [0, 0, 0])]
    if spec.get("bevelMm"):
        bevel = obj.modifiers.new("bevel", "BEVEL")
        bevel.width = spec["bevelMm"] * MM
        bevel.segments = 3
    material, _ = principled(spec["name"], spec["material"])
    obj.data.materials.append(material)
    return obj


def round_solid(spec):
    if spec["type"] == "sphere":
        bpy.ops.mesh.primitive_uv_sphere_add(segments=96, ring_count=48, radius=spec["diameterMm"] / 2 * MM)
    else:
        bpy.ops.mesh.primitive_cylinder_add(vertices=spec.get("segments", 128), radius=spec["diameterMm"] / 2 * MM,
                                            depth=spec["lengthMm"] * MM, end_fill_type="NGON" if spec.get("capped", True) else "NOTHING")
    obj = bpy.context.active_object
    obj.name = spec["name"]
    obj.location = mm(spec["centreMm"])
    bpy.ops.object.shade_smooth()
    material, _ = principled(spec["name"], spec["material"])
    obj.data.materials.append(material)
    return obj


def aim(obj, target):
    direction = mm(target) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def light(spec):
    data = bpy.data.lights.new(spec["name"], "AREA")
    data.shape = "RECTANGLE"
    data.size, data.size_y = spec["sizeMm"][0] * MM, spec["sizeMm"][1] * MM
    data.energy = spec["watts"]
    data.use_nodes = True
    nodes = data.node_tree.nodes
    blackbody = nodes.new("ShaderNodeBlackbody")
    blackbody.inputs["Temperature"].default_value = spec.get("kelvin", 6500)
    data.node_tree.links.new(blackbody.outputs["Color"], nodes["Emission"].inputs["Color"])
    obj = bpy.data.objects.new(spec["name"], data)
    bpy.context.collection.objects.link(obj)
    obj.location = mm(spec["positionMm"])
    aim(obj, spec["aimMm"])
    obj.rotation_euler.rotate_axis("Z", math.radians(spec.get("rollDeg", 0)))


def world(spec, base):
    scene_world = bpy.data.worlds.new("world")
    bpy.context.scene.world = scene_world
    scene_world.use_nodes = True
    nodes = scene_world.node_tree.nodes
    links = scene_world.node_tree.links
    environment = nodes.new("ShaderNodeTexEnvironment")
    environment.image = bpy.data.images.load(os.path.join(base, spec["path"]))
    mapping = nodes.new("ShaderNodeMapping")
    mapping.inputs["Rotation"].default_value = (0, 0, math.radians(spec.get("rotationDeg", 0)))
    coordinates = nodes.new("ShaderNodeTexCoord")
    links.new(coordinates.outputs["Generated"], mapping.inputs["Vector"])
    links.new(mapping.outputs["Vector"], environment.inputs["Vector"])
    links.new(environment.outputs["Color"], nodes["Background"].inputs["Color"])
    nodes["Background"].inputs["Strength"].default_value = spec.get("strength", 1)


def camera(spec):
    data = bpy.data.cameras.new("camera")
    data.lens = spec["lensMm"]
    data.sensor_width = spec.get("sensorMm", 36)
    data.clip_start = 0.001
    data.dof.use_dof = True
    data.dof.aperture_fstop = spec["fStop"]
    obj = bpy.data.objects.new("camera", data)
    bpy.context.collection.objects.link(obj)
    obj.location = mm(spec["positionMm"])
    aim(obj, spec["aimMm"])
    data.dof.focus_distance = (mm(spec.get("focusMm", spec["aimMm"])) - obj.location).length
    bpy.context.scene.camera = obj


def render(spec, out):
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = spec.get("samples", 128)
    scene.cycles.use_denoising = True
    scene.render.resolution_x, scene.render.resolution_y = spec["size"]
    scene.render.resolution_percentage = 100
    scene.view_settings.view_transform = spec.get("view", "AgX")
    scene.view_settings.look = spec.get("look", "AgX - Medium High Contrast")
    scene.view_settings.exposure = spec.get("exposure", 0)
    scene.render.filepath = out
    started = time.time()
    bpy.ops.render.render(write_still=True)
    print(json.dumps({"out": out, "seconds": round(time.time() - started, 1)}))


def main():
    shot_path, out = arguments()
    global BASE
    base = BASE = os.path.dirname(os.path.abspath(shot_path))
    with open(shot_path) as handle:
        shot = json.load(handle)
    bpy.ops.wm.read_factory_settings(use_empty=True)
    for spec in shot["objects"]:
        {"heightfield": lambda: heightfield(spec, base), "box": lambda: box(spec)}.get(spec["type"], lambda: round_solid(spec))()
    for spec in shot["lights"]:
        light(spec)
    world(shot["world"], base)
    camera(shot["camera"])
    render(shot["render"], os.path.abspath(out))


main()
