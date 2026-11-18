import json
import math
import os
import sys
import time

import bpy
import numpy
from mathutils import Vector

LIGHTMAP_UV = "lightmap"


def arguments():
    rest = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    if not rest:
        raise SystemExit("Usage: blender --background --factory-startup --python bake_set.py -- <set.json> [out-dir]")
    out = rest[1] if len(rest) > 1 else os.path.dirname(os.path.abspath(rest[0]))
    return rest[0], out, rest[2] if len(rest) > 2 else "all"


def to_blender(point):
    x, y, z = point
    return (x, -z, y)


def hex_colour(value):
    value = value.lstrip("#")
    srgb = [int(value[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in srgb] + [1]


def resolve(path, base):
    return path if os.path.isabs(path) else os.path.normpath(os.path.join(base, path))


def make_material(spec, base):
    material = bpy.data.materials.new(spec.get("name", "material"))
    material.use_nodes = True
    nodes = material.node_tree.nodes
    links = material.node_tree.links
    shader = nodes["Principled BSDF"]
    shader.inputs["Base Color"].default_value = hex_colour(spec.get("color", "#cccccc"))
    shader.inputs["Roughness"].default_value = spec.get("roughness", 0.5)
    shader.inputs["Metallic"].default_value = spec.get("metalness", 0)
    if spec.get("transmission"):
        shader.inputs["Transmission Weight"].default_value = spec["transmission"]
        shader.inputs["IOR"].default_value = spec.get("ior", 1.5)
    maps = spec.get("maps", {})
    tile = spec.get("tileMetres")
    repeat = [1 / tile, 1 / tile] if tile else spec.get("repeat", [1, 1])
    coordinates = nodes.new("ShaderNodeTexCoord")
    mapping = nodes.new("ShaderNodeMapping")
    mapping.inputs["Scale"].default_value = (repeat[0], repeat[1], 1)
    mapping.inputs["Rotation"].default_value = (0, 0, math.radians(spec.get("uvRotation", 0)))
    offset = spec.get("offset", [0, 0])
    mapping.inputs["Location"].default_value = (offset[0], offset[1], 0)
    links.new(coordinates.outputs["UV"], mapping.inputs["Vector"])
    for key, socket in (("color", "Base Color"), ("roughness", "Roughness")):
        if key in maps:
            image = nodes.new("ShaderNodeTexImage")
            image.image = bpy.data.images.load(resolve(maps[key], base))
            if key != "color":
                image.image.colorspace_settings.name = "Non-Color"
            links.new(mapping.outputs["Vector"], image.inputs["Vector"])
            links.new(image.outputs["Color"], shader.inputs[socket])
    if "normal" in maps:
        image = nodes.new("ShaderNodeTexImage")
        image.image = bpy.data.images.load(resolve(maps["normal"], base))
        image.image.colorspace_settings.name = "Non-Color"
        normal = nodes.new("ShaderNodeNormalMap")
        links.new(mapping.outputs["Vector"], image.inputs["Vector"])
        links.new(image.outputs["Color"], normal.inputs["Color"])
        links.new(normal.outputs["Normal"], shader.inputs["Normal"])
    if spec.get("shadow") == "transparent":
        output = nodes["Material Output"]
        path = nodes.new("ShaderNodeLightPath")
        clear = nodes.new("ShaderNodeBsdfTransparent")
        clear.inputs["Color"].default_value = hex_colour(spec.get("shadowTint", "#f4f7f4"))
        mix = nodes.new("ShaderNodeMixShader")
        links.new(path.outputs["Is Shadow Ray"], mix.inputs["Fac"])
        links.new(shader.outputs["BSDF"], mix.inputs[1])
        links.new(clear.outputs["BSDF"], mix.inputs[2])
        links.new(mix.outputs["Shader"], output.inputs["Surface"])
    return material


def make_card_material(spec):
    material = bpy.data.materials.new(spec["name"])
    material.use_nodes = True
    nodes = material.node_tree.nodes
    nodes.remove(nodes["Principled BSDF"])
    emission = nodes.new("ShaderNodeEmission")
    emission.inputs["Color"].default_value = hex_colour(spec.get("color", "#ffffff"))
    emission.inputs["Strength"].default_value = spec.get("strength", 1)
    material.node_tree.links.new(emission.outputs["Emission"], nodes["Material Output"].inputs["Surface"])
    return material


def world_uvs(obj):
    import bmesh
    mesh = obj.data
    shape = bmesh.new()
    shape.from_mesh(mesh)
    layer = shape.loops.layers.uv.verify()
    for face in shape.faces:
        normal = face.normal
        axis = max(range(3), key=lambda index: abs(normal[index]))
        u_axis, v_axis = [(1, 2), (0, 2), (0, 1)][axis]
        for loop in face.loops:
            point = obj.matrix_world @ loop.vert.co
            loop[layer].uv = (point[u_axis], point[v_axis])
    shape.to_mesh(mesh)
    shape.free()


def make_object(spec, base):
    kind = spec["type"]
    if kind == "box":
        bpy.ops.mesh.primitive_cube_add(size=1)
        obj = bpy.context.active_object
        sx, sy, sz = spec["size"]
        obj.scale = (sx, sz, sy)
    elif kind == "plane":
        bpy.ops.mesh.primitive_plane_add(size=1)
        obj = bpy.context.active_object
        obj.scale = (spec["size"][0], spec["size"][1], 1)
    elif kind == "lathe":
        bpy.ops.mesh.primitive_circle_add(vertices=spec.get("segments", 96), radius=1)
        obj = bpy.context.active_object
        mesh = bpy.data.meshes.new(spec["name"])
        profile = spec["profile"]
        segments = spec.get("segments", 96)
        vertices = []
        for k in range(segments):
            angle = k / segments * math.tau
            for radius, height in profile:
                vertices.append((radius * math.cos(angle), radius * math.sin(angle), height))
        faces = []
        rings = len(profile)
        for k in range(segments):
            for j in range(rings - 1):
                a = k * rings + j
                b = ((k + 1) % segments) * rings + j
                faces.append((a, b, b + 1, a + 1))
        mesh.from_pydata(vertices, [], faces)
        bpy.data.objects.remove(obj, do_unlink=True)
        obj = bpy.data.objects.new(spec["name"], mesh)
        bpy.context.collection.objects.link(obj)
        bpy.context.view_layer.objects.active = obj
        for polygon in mesh.polygons:
            polygon.use_smooth = True
    elif kind == "glb":
        before = set(bpy.data.objects)
        bpy.ops.import_scene.gltf(filepath=resolve(spec["path"], base))
        imported = [o for o in bpy.data.objects if o not in before and o.type == "MESH"]
        bpy.ops.object.select_all(action="DESELECT")
        for o in imported:
            o.select_set(True)
        bpy.context.view_layer.objects.active = imported[0]
        if len(imported) > 1:
            bpy.ops.object.join()
        obj = bpy.context.active_object
        obj.parent = None
    elif kind == "window":
        obj = make_window(spec)
    elif kind == "card":
        bpy.ops.mesh.primitive_plane_add(size=1)
        obj = bpy.context.active_object
        obj.scale = (spec["size"][0], spec["size"][1], 1)
    else:
        raise SystemExit("object type must be box, plane, lathe, glb, window or card")
    obj.name = spec["name"]
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if kind == "window":
        aim = Vector(to_blender(spec.get("aim", (0, 0, 0))))
        facing = Vector(to_blender(spec["facing"])).normalized()
        obj.location = aim + facing * spec["distance"]
        obj.rotation_euler = (-facing).to_track_quat("Z", "Y").to_euler()
    elif kind == "card":
        obj.location = to_blender(spec["position"])
        facing = Vector(to_blender(spec["aim"])) - obj.location
        obj.rotation_euler = facing.to_track_quat("Z", "Y").to_euler()
    else:
        obj.location = to_blender(spec.get("position", (0, 0, 0)))
        rotation = spec.get("rotation", (0, 0, 0))
        obj.rotation_euler = (rotation[0], -rotation[2], rotation[1])
    if kind in ("box", "plane", "lathe"):
        bpy.context.view_layer.update()
        world_uvs(obj)
    if spec.get("material"):
        obj.data.materials.append(make_material(dict(spec["material"], name=spec["name"]), base))
    if kind == "card":
        obj.data.materials.append(make_card_material(spec))
        obj.visible_shadow = False
    if kind == "window":
        obj.visible_camera = False
        obj.visible_diffuse = False
        obj.visible_glossy = False
        obj.visible_transmission = False
    if spec.get("caustics") == "caster":
        obj.cycles.is_caustics_caster = True
    if spec.get("caustics") == "receiver":
        obj.cycles.is_caustics_receiver = True
    return obj


def make_window(spec):
    import bmesh
    half_wall = spec["wall"] / 2
    width, height = spec["opening"]
    columns, rows = spec["panes"]
    bar = spec["bar"]
    mesh = bpy.data.meshes.new(spec["name"])
    shape = bmesh.new()
    def quad(x0, y0, x1, y1):
        corners = [shape.verts.new((x0, y0, 0)), shape.verts.new((x1, y0, 0)), shape.verts.new((x1, y1, 0)), shape.verts.new((x0, y1, 0))]
        shape.faces.new(corners)
    w, h = width / 2, height / 2
    quad(-half_wall, -half_wall, half_wall, -h)
    quad(-half_wall, h, half_wall, half_wall)
    quad(-half_wall, -h, -w, h)
    quad(w, -h, half_wall, h)
    for k in range(1, columns):
        x = -w + width * k / columns
        quad(x - bar / 2, -h, x + bar / 2, h)
    for k in range(1, rows):
        y = -h + height * k / rows
        quad(-w, y - bar / 2, w, y + bar / 2)
    shape.to_mesh(mesh)
    shape.free()
    obj = bpy.data.objects.new(spec["name"], mesh)
    bpy.context.collection.objects.link(obj)
    bpy.context.view_layer.objects.active = obj
    return obj


def add_sun(spec):
    data = bpy.data.lights.new("sun", type="SUN")
    data.energy = spec.get("strength", 4)
    data.angle = math.radians(spec.get("angle", 0.53))
    data.use_nodes = True
    nodes = data.node_tree.nodes
    blackbody = nodes.new("ShaderNodeBlackbody")
    data.node_tree.links.new(blackbody.outputs["Color"], nodes["Emission"].inputs["Color"])
    data.cycles.is_caustics_light = bool(spec.get("caustics"))
    sun = bpy.data.objects.new("sun", data)
    bpy.context.collection.objects.link(sun)
    aim_sun(sun, spec)
    return sun


def aim_sun(sun, spec):
    if "strength" in spec:
        sun.data.energy = spec["strength"]
    sun.data.node_tree.nodes["Blackbody"].inputs["Temperature"].default_value = spec.get("kelvin", 6500)
    direction = Vector(to_blender(spec["direction"])).normalized()
    sun.rotation_euler = (-direction).to_track_quat("-Z", "Y").to_euler()


def add_environment(spec, base, sun):
    world = bpy.data.worlds.new("world")
    bpy.context.scene.world = world
    world.use_nodes = True
    nodes = world.node_tree.nodes
    background = nodes["Background"]
    background.inputs["Strength"].default_value = spec.get("strength", 1)
    if spec.get("sky"):
        x, y, z = Vector(to_blender(sun["direction"])).normalized()
        sky = nodes.new("ShaderNodeTexSky")
        sky.sky_type = "NISHITA"
        sky.sun_disc = False
        sky.sun_elevation = math.asin(z)
        sky.sun_rotation = math.atan2(-x, y)
        world.node_tree.links.new(sky.outputs["Color"], background.inputs["Color"])
    elif spec.get("hdri"):
        environment = nodes.new("ShaderNodeTexEnvironment")
        environment.image = bpy.data.images.load(resolve(spec["hdri"], base))
        world.node_tree.links.new(environment.outputs["Color"], background.inputs["Color"])


def prepare_lightmap(obj, settings, name):
    mesh = obj.data
    if LIGHTMAP_UV not in mesh.uv_layers:
        mesh.uv_layers.new(name=LIGHTMAP_UV)
    for layer in mesh.uv_layers:
        layer.active_render = layer.name != LIGHTMAP_UV
    mesh.uv_layers.active = mesh.uv_layers[LIGHTMAP_UV]
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.uv.smart_project(island_margin=settings.get("margin", 0.02))
    bpy.ops.object.mode_set(mode="OBJECT")
    size = settings.get("size", 1024)
    image = bpy.data.images.new(name + "_lightmap", size, size, float_buffer=True)
    for material in mesh.materials:
        node = material.node_tree.nodes.new("ShaderNodeTexImage")
        node.image = image
        uv = material.node_tree.nodes.new("ShaderNodeUVMap")
        uv.uv_map = LIGHTMAP_UV
        material.node_tree.links.new(uv.outputs["UV"], node.inputs["Vector"])
        material.node_tree.nodes.active = node
    return image


def denoise(path):
    source = bpy.data.images.load(path, check_existing=False)
    width, height = source.size
    scene = bpy.data.scenes.new("denoise")
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 1
    scene.render.resolution_x = width
    scene.render.resolution_y = height
    scene.render.resolution_percentage = 100
    scene.view_settings.view_transform = "Standard"
    scene.render.image_settings.file_format = "HDR"
    scene.render.filepath = path
    scene.use_nodes = True
    nodes = scene.node_tree.nodes
    nodes.clear()
    image = nodes.new("CompositorNodeImage")
    image.image = source
    clean = nodes.new("CompositorNodeDenoise")
    clean.use_hdr = True
    clean.prefilter = "ACCURATE"
    output = nodes.new("CompositorNodeComposite")
    scene.node_tree.links.new(image.outputs["Image"], clean.inputs["Image"])
    scene.node_tree.links.new(clean.outputs["Image"], output.inputs["Image"])
    bpy.ops.render.render(write_still=True, scene=scene.name)
    bpy.data.scenes.remove(scene)
    bpy.data.images.remove(source)


def bake_lightmap(obj, image, path, direct):
    bake = bpy.context.scene.render.bake
    bake.use_pass_direct = True
    bake.use_pass_indirect = True
    bake.use_pass_color = False
    bake.margin = 8
    pixels = bake_pixels(obj, image)
    if not direct:
        world = bpy.context.scene.world
        background = world.node_tree.nodes["Background"].inputs["Strength"] if world else None
        sky = background.default_value if background else 0
        if background:
            background.default_value = 0
        bake.use_pass_indirect = False
        sun_direct = bake_pixels(obj, image)
        bake.use_pass_indirect = True
        if background:
            background.default_value = sky
        pixels = numpy.maximum(pixels - sun_direct, 0)
        pixels[3::4] = 1
        image.pixels.foreach_set(pixels)
    image.filepath_raw = path
    image.file_format = "HDR"
    image.save()
    if bpy.context.scene.get("denoise", True):
        denoise(path)
    return os.path.basename(path)


def bake_pixels(obj, image):
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.bake(type="DIFFUSE")
    pixels = numpy.empty(len(image.pixels), dtype=numpy.float32)
    image.pixels.foreach_get(pixels)
    return pixels


def despeckle(pixels, size):
    grid = pixels.reshape(size, size, 4)
    padded = numpy.pad(grid, ((1, 1), (1, 1), (0, 0)), mode="edge")
    shifted = [padded[row:row + size, column:column + size] for row in range(3) for column in range(3)]
    return numpy.median(numpy.stack(shifted), axis=0).reshape(-1)


def bake_caustic(catcher, caster, glass, image, path, others):
    bake = bpy.context.scene.render.bake
    bake.use_pass_direct = True
    bake.use_pass_indirect = True
    bake.use_pass_color = False
    bake.margin = 8
    cycles = bpy.context.scene.cycles
    bounces = (cycles.diffuse_bounces, cycles.glossy_bounces)
    cycles.diffuse_bounces = 1
    cycles.glossy_bounces = 0
    world = bpy.context.scene.world
    background = world.node_tree.nodes["Background"].inputs["Strength"] if world else None
    sky = background.default_value if background else 0
    if background:
        background.default_value = 0
    for other in others:
        other.hide_render = True
    kept = caster.data.materials[0]
    caster.data.materials[0] = glass
    catcher.hide_render = False
    focused = bake_pixels(catcher, image)
    caster.hide_render = True
    plain = bake_pixels(catcher, image)
    caster.hide_render = False
    caster.data.materials[0] = kept
    catcher.hide_render = True
    if background:
        background.default_value = sky
    cycles.diffuse_bounces, cycles.glossy_bounces = bounces
    for other in others:
        other.hide_render = False
    excess = despeckle(numpy.maximum(focused - plain, 0), image.size[0])
    excess[3::4] = 1
    image.pixels.foreach_set(excess)
    image.filepath_raw = path
    image.file_format = "HDR"
    image.save()
    return os.path.basename(path)


def render_probe(spec, out):
    scene = bpy.context.scene
    data = bpy.data.cameras.new(spec["name"] + "_probe")
    data.type = "PANO"
    data.panorama_type = "EQUIRECTANGULAR"
    camera = bpy.data.objects.new(spec["name"] + "_probe", data)
    bpy.context.collection.objects.link(camera)
    camera.location = to_blender(spec["position"])
    camera.rotation_euler = Vector((1, 0, 0)).to_track_quat("-Z", "Y").to_euler()
    scene.camera = camera
    width, height = spec.get("size", [1024, 512])
    scene.render.resolution_x = width
    scene.render.resolution_y = height
    scene.render.resolution_percentage = 100
    scene.cycles.samples = spec.get("samples", 128)
    scene.cycles.use_denoising = True
    scene.render.image_settings.file_format = "HDR"
    path = os.path.join(out, spec["name"] + "_probe.hdr")
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    return os.path.basename(path)


def main():
    set_path, out, mode = arguments()
    base = os.path.dirname(os.path.abspath(set_path))
    with open(set_path) as handle:
        spec = json.load(handle)
    started = time.time()
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = spec.get("bake", {}).get("samples", 128)
    scene.cycles.caustics_refractive = True
    scene["denoise"] = spec.get("bake", {}).get("denoise", True)
    os.makedirs(out, exist_ok=True)
    first_sun = (spec.get("keys") or [{}])[0].get("sun", {})
    for item in spec["objects"]:
        if item["type"] == "window" and "facing" not in item:
            item["facing"] = first_sun["direction"]
    materials = {item["name"]: item["material"] for item in spec["objects"] if "material" in item}
    for item in spec["objects"]:
        if "materialFrom" in item:
            item["material"] = materials[item["materialFrom"]]
    objects = {item["name"]: make_object(item, base) for item in spec["objects"]}
    cards = [item for item in spec["objects"] if item["type"] == "card"]
    for item in cards:
        objects[item["name"]].hide_render = not item.get("lights", False)
    catchers = [item for item in spec["objects"] if "caustic" in item]
    glass = {item["name"]: make_material(dict({key: value for key, value in materials[item["caustic"]["caster"]].items() if key != "shadow"}, name=item["name"] + "_glass"), base) for item in catchers}
    for item in catchers:
        objects[item["name"]].hide_render = True
        objects[item["name"]].cycles.is_caustics_receiver = True
        objects[item["caustic"]["caster"]].cycles.is_caustics_caster = True
    sun_specs = [dict(first_sun, **light) for light in spec.get("lights", []) if light["type"] == "sun"]
    suns = [add_sun(light) for light in sun_specs]
    if spec.get("environment"):
        add_environment(spec["environment"], base, first_sun)
    for item in cards:
        objects[item["name"]].hide_render = mode != "probes" and not item.get("lights", False)
    if mode == "probes":
        begun = time.time()
        probes = [render_probe(probe, out) for probe in spec.get("probes", [])]
        print(json.dumps({"set": spec["name"], "probes": probes, "seconds": round(time.time() - begun, 1)}))
        return
    settings = spec.get("bake", {})
    direct = settings.get("passes", "full") == "full"
    keys = spec.get("keys") or [{"name": ""}]
    baked = [item for item in spec["objects"] if item.get("bake")]
    images = {item["name"]: prepare_lightmap(objects[item["name"]], dict(settings, **({"size": item["bakeSize"]} if "bakeSize" in item else {})), item["name"]) for item in baked + catchers}
    files = {item["name"]: [] for item in baked + catchers}
    timings = {}
    if mode == "export":
        for item in baked + catchers:
            files[item["name"]] = [item["name"] + "_lightmap" + ("_" + key["name"] if key["name"] else "") + ".hdr" for key in keys]
    for key in [] if mode == "export" else keys:
        if "sun" in key:
            for sun, light in zip(suns, sun_specs):
                aim_sun(sun, dict(light, **key["sun"]))
        suffix = "_" + key["name"] if key["name"] else ""
        for item in baked:
            begun = time.time()
            path = os.path.join(out, item["name"] + "_lightmap" + suffix + ".hdr")
            files[item["name"]].append(bake_lightmap(objects[item["name"]], images[item["name"]], path, direct))
            timings[item["name"] + suffix] = round(time.time() - begun, 1)
        for item in catchers:
            begun = time.time()
            path = os.path.join(out, item["name"] + "_lightmap" + suffix + ".hdr")
            others = [objects[other["name"]] for other in spec["objects"] if other["type"] not in ("window", "card") and other["name"] not in (item["name"], item["caustic"]["caster"])]
            files[item["name"]].append(bake_caustic(objects[item["name"]], objects[item["caustic"]["caster"]], glass[item["name"]], images[item["name"]], path, others))
            timings[item["name"] + suffix] = round(time.time() - begun, 1)
    for item in catchers:
        objects[item["name"]].hide_render = False
        objects[item["name"]]["additive"] = True
    for item in baked + catchers:
        objects[item["name"]]["lightmaps"] = files[item["name"]]
        objects[item["name"]]["bakedDirect"] = direct
        if all("hour" in key for key in keys):
            objects[item["name"]]["keyHours"] = [key["hour"] for key in keys]
    exported = [objects[item["name"]] for item in spec["objects"] if item.get("export", item.get("bake") or "caustic" in item)]
    bpy.ops.object.select_all(action="DESELECT")
    for obj in exported:
        obj.select_set(True)
    glb = os.path.join(out, spec["name"] + ".glb")
    bpy.ops.export_scene.gltf(filepath=glb, use_selection=True, export_extras=True, export_yup=True, export_texcoords=True, export_image_format="WEBP")
    for item in cards:
        objects[item["name"]].hide_render = False
    probes = [] if mode == "export" else [render_probe(probe, out) for probe in spec.get("probes", [])]
    print(json.dumps({"set": spec["name"], "glb": glb, "probes": probes, "bakeSeconds": timings, "seconds": round(time.time() - started, 1)}))


main()
