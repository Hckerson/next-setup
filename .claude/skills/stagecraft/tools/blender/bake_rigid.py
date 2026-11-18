import json
import math
import os
import random
import struct
import sys
import time

import bmesh
import bpy
from mathutils import Euler, Quaternion, Vector
from mathutils.bvhtree import BVHTree

VERSION = 1
STRIDE = 8


def arguments():
    rest = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    if not rest:
        raise SystemExit("Usage: blender --background --factory-startup --python bake_rigid.py -- <spec.json> [out-dir]")
    return rest[0], rest[1] if len(rest) > 1 else os.path.dirname(os.path.abspath(rest[0]))


def clear_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def make_world(spec, scale):
    scene = bpy.context.scene
    bpy.ops.rigidbody.world_add()
    world = scene.rigidbody_world
    world.substeps_per_frame = spec.get("substeps", 10)
    world.solver_iterations = spec.get("solver", {}).get("iterations", 20)
    world.use_split_impulse = True
    scene.gravity = (0, 0, spec.get("gravity", -9.81) * scale)
    scene.render.fps = spec["rate"]
    scene.frame_start = 1
    scene.frame_end = spec["frames"]
    world.point_cache.frame_start = 1
    world.point_cache.frame_end = spec["frames"]
    return scene


def passive(obj, shape, friction, restitution, margin):
    bpy.context.view_layer.objects.active = obj
    bpy.ops.rigidbody.object_add(type="PASSIVE")
    body = obj.rigid_body
    body.collision_shape = shape
    body.friction = friction
    body.restitution = restitution
    body.use_margin = True
    body.collision_margin = margin


def make_ground(spec, scale, margin):
    half = spec["ground"]["half"] * scale
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, spec["ground"]["y"] * scale - 0.01 * scale))
    ground = bpy.context.active_object
    ground.scale = (half * 2, half * 2, 0.02 * scale)
    bpy.ops.object.transform_apply(scale=True)
    passive(ground, "BOX", spec["surface"]["friction"], spec["surface"]["restitution"], margin)


def import_mesh(path, scale, name):
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path)
    meshes = [obj for obj in bpy.data.objects if obj not in before and obj.type == "MESH"]
    for obj in set(bpy.data.objects) - before:
        if obj.type != "MESH":
            bpy.data.objects.remove(obj, do_unlink=True)
    bpy.ops.object.select_all(action="DESELECT")
    for obj in meshes:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = meshes[0]
    if len(meshes) > 1:
        bpy.ops.object.join()
    obj = bpy.context.active_object
    obj.parent = None
    obj.name = name
    obj.scale = (scale, scale, scale)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    return obj


def make_container(spec, scale, margin):
    container = spec.get("container")
    if not container:
        return
    kind = container.get("type", "cup")
    if kind == "cup":
        make_cup(spec, scale, margin)
    elif kind == "box":
        make_box(container, scale, margin, spec["surface"])
    elif kind == "mesh":
        obj = import_mesh(container["mesh"], scale, "container")
        x, y, z = container.get("position", (0, 0, 0))
        obj.location = to_blender((x, y, z), scale)
        passive(obj, "MESH", spec["surface"]["friction"], spec["surface"]["restitution"], margin)
    else:
        raise SystemExit("container.type must be cup, box or mesh")


def make_box(container, scale, margin, surface):
    hx, hy, hz = container["half"]
    wall = container["wall"]
    x, y, z = container.get("position", (0, 0, 0))
    panels = [
        ((0, -wall / 2, 0), (hx + wall, wall / 2, hz + wall)),
        ((hx + wall / 2, hy, 0), (wall / 2, hy, hz + wall)),
        ((-hx - wall / 2, hy, 0), (wall / 2, hy, hz + wall)),
        ((0, hy, hz + wall / 2), (hx, hy, wall / 2)),
        ((0, hy, -hz - wall / 2), (hx, hy, wall / 2)),
    ]
    for centre, half in panels:
        bpy.ops.mesh.primitive_cube_add(size=2, location=to_blender((x + centre[0], y + centre[1], z + centre[2]), scale))
        panel = bpy.context.active_object
        panel.scale = (half[0] * scale, half[2] * scale, half[1] * scale)
        bpy.ops.object.transform_apply(scale=True)
        passive(panel, "BOX", surface["friction"], surface["restitution"], margin)


def make_cup(spec, scale, margin):
    cup = spec["container"]
    cx, cy, cz = cup["position"]
    inner = (cup["radius"] - cup.get("skin", 0)) * scale
    outer = inner + cup["wall"] * scale
    height = cup["height"] * scale
    floor = cup["floor"] * scale
    segments = cup.get("segments", 48)
    vertices = []
    faces = []
    for ring, (radius, z) in enumerate([(outer, 0), (outer, height), (inner, height), (inner, floor)]):
        for k in range(segments):
            angle = k / segments * math.tau
            vertices.append((radius * math.cos(angle), radius * math.sin(angle), z))
    for ring in range(3):
        for k in range(segments):
            a = ring * segments + k
            b = ring * segments + (k + 1) % segments
            faces.append((a, b, b + segments, a + segments))
    vertices.append((0, 0, floor))
    vertices.append((0, 0, 0))
    centre_top = len(vertices) - 2
    centre_bottom = len(vertices) - 1
    for k in range(segments):
        faces.append((3 * segments + k, 3 * segments + (k + 1) % segments, centre_top))
        faces.append(((k + 1) % segments, k, centre_bottom))
    mesh = bpy.data.meshes.new("cup")
    mesh.from_pydata(vertices, [], faces)
    obj = bpy.data.objects.new("cup", mesh)
    obj.location = (cx * scale, -cz * scale, cy * scale)
    bpy.context.collection.objects.link(obj)
    passive(obj, "MESH", spec["surface"]["friction"], spec["surface"]["restitution"], margin)


def spawn_plan(spec):
    drop = spec["drop"]
    body = spec["body"]
    rng = random.Random(spec.get("seed", 1))
    spread = lambda value: (rng.random() * 2 - 1) * value
    clearance = 2 * spec["_boundingRadius"] * drop.get("clearance", 1.1)
    plan = []

    window = drop.get("window", 10)

    def clear(position, frame):
        for entry in plan[-80:]:
            if frame - entry["frame"] > window:
                continue
            other = entry["position"]
            if math.hypot(position[0] - other[0], position[2] - other[2]) < clearance:
                return False
        return True

    for index in range(drop["count"]):
        bursts = drop.get("bursts")
        if bursts:
            frame = (index // bursts["size"]) * bursts["gap"] + round((index % bursts["size"]) * bursts["inner"] + spread(bursts["inner"]))
        else:
            frame = round(index * drop["interval"])
        frame = max(3, frame + 3, plan[-1]["frame"] if plan else 3)
        ox, oy, oz = drop["origin"]
        while True:
            for _ in range(40):
                position = (ox + spread(drop["spread"][0]), oy, oz + spread(drop["spread"][2]))
                if clear(position, frame):
                    break
            else:
                frame += 1
                continue
            break
        tilt = Euler((spread(math.pi), spread(math.pi), spread(math.pi))).to_quaternion()
        velocity = (drop["velocity"][0] + spread(drop["jitter"]), drop["velocity"][1], drop["velocity"][2] + spread(drop["jitter"]))
        axis = (spread(1), spread(1), spread(1))
        length = math.sqrt(sum(component * component for component in axis)) or 1
        plan.append({
            "frame": frame,
            "position": position,
            "rotation": tilt,
            "velocity": velocity,
            "spin": tuple(component / length for component in axis),
            "spinRate": rng.random() * drop.get("spin", 0),
        })
    return plan


def to_blender(point, scale):
    x, y, z = point
    return (x * scale, -z * scale, y * scale)


def make_template(spec, scale):
    body = spec["body"]
    shape = body.get("shape", "cylinder")
    skin = body.get("skin", 0)
    if shape == "cylinder":
        bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=(body["radius"] + skin) * scale, depth=2 * (body["halfHeight"] + skin) * scale)
        template = bpy.context.active_object
        default = "CYLINDER"
    elif shape == "box":
        hx, hy, hz = body["half"]
        bpy.ops.mesh.primitive_cube_add(size=2)
        template = bpy.context.active_object
        template.scale = ((hx + skin) * scale, (hz + skin) * scale, (hy + skin) * scale)
        bpy.ops.object.transform_apply(scale=True)
        default = "BOX"
    elif shape == "mesh":
        template = import_mesh(body["mesh"], scale * body.get("scale", 1), "body")
        bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="BOUNDS")
        template.location = (0, 0, 0)
        default = "CONVEX_HULL"
    else:
        raise SystemExit("body.shape must be cylinder, box or mesh")
    template.name = "template"
    measure = bmesh.new()
    measure.from_mesh(template.data)
    volume = abs(measure.calc_volume()) / scale ** 3
    radius = max(vertex.co.length for vertex in measure.verts) / scale
    measure.free()
    return template, body.get("collision", default), volume, radius


def make_bodies(spec, scale, margin, plan, template, collision, volume):
    body = spec["body"]
    bodies = []
    rate = spec["rate"]
    for entry in plan:
        obj = template.copy()
        obj.data = template.data
        bpy.context.collection.objects.link(obj)
        bpy.context.view_layer.objects.active = obj
        bpy.ops.rigidbody.object_add(type="ACTIVE")
        rigid = obj.rigid_body
        rigid.collision_shape = collision
        rigid.mass = body["density"] * volume * scale ** 3
        rigid.friction = body["friction"]
        rigid.restitution = body["restitution"]
        rigid.use_margin = True
        rigid.collision_margin = margin
        rigid.linear_damping = body.get("damping", {}).get("linear", 0.04)
        rigid.angular_damping = body.get("damping", {}).get("angular", 0.1)
        rigid.use_deactivation = True
        obj.rotation_mode = "QUATERNION"
        released = entry["frame"]
        spawn = to_blender(entry["position"], scale)
        velocity = to_blender((0, entry["velocity"][1], 0), scale)
        travel = (released - 1) / rate
        start = tuple(s - v * travel for s, v in zip(spawn, velocity))
        spin = Quaternion(to_blender(entry["spin"], 1), entry["spinRate"] * travel) if entry["spinRate"] else Quaternion()
        begin_rotation = entry["rotation"] @ spin.inverted()
        for frame, location, rotation, animated in [(1, start, begin_rotation, True), (released, spawn, entry["rotation"], True), (released + 1, spawn, entry["rotation"], False)]:
            obj.location = location
            obj.rotation_quaternion = rotation
            rigid.kinematic = animated
            obj.keyframe_insert("location", frame=frame)
            obj.keyframe_insert("rotation_quaternion", frame=frame)
            rigid.keyframe_insert("kinematic", frame=frame)
        if obj.animation_data and obj.animation_data.action:
            for curve in obj.animation_data.action.fcurves:
                for point in curve.keyframe_points:
                    point.interpolation = "LINEAR"
        bodies.append((obj, released))
    template.hide_render = True
    bpy.data.objects.remove(template, do_unlink=True)
    return bodies


def interpenetration(bodies, radius, scale, visible):
    shapes = []
    for obj, _ in bodies:
        matrix = obj.matrix_world
        vertices = [matrix @ vertex.co for vertex in obj.data.vertices]
        polygons = [tuple(polygon.vertices) for polygon in obj.data.polygons]
        shapes.append((matrix.to_translation(), vertices, BVHTree.FromPolygons(vertices, polygons)))

    direction = Vector((0.5773, 0.5774, 0.5773)).normalized()

    def inside(point, tree):
        crossings = 0
        origin = point.copy()
        for _ in range(16):
            hit, _, _, _ = tree.ray_cast(origin, direction)
            if hit is None:
                break
            crossings += 1
            origin = hit + direction * 1e-6
        return crossings % 2 == 1

    def depth_inside(points, tree):
        deepest = 0.0
        for point in points:
            if inside(point, tree):
                _, _, _, distance = tree.find_nearest(point)
                deepest = max(deepest, distance)
        return deepest

    reach = 2 * radius * scale
    pairs = 0
    deepest = 0.0
    for first in range(len(shapes)):
        for second in range(first + 1, len(shapes)):
            a, b = shapes[first], shapes[second]
            if (a[0] - b[0]).length > reach or not a[2].overlap(b[2]):
                continue
            depth = max(depth_inside(a[1], b[2]), depth_inside(b[1], a[2])) / scale
            if depth > visible:
                pairs += 1
                deepest = max(deepest, depth)
    return {"visiblePairs": pairs, "deepestMm": round(deepest * 1000, 2)}


def bake(spec, coins, scale):
    bpy.ops.ptcache.bake_all(bake=True)
    frames = spec["frames"]
    data = []
    for frame in range(1, frames + 1):
        bpy.context.scene.frame_set(frame)
        for coin, released in coins:
            matrix = coin.matrix_world
            location = matrix.to_translation() / scale
            rotation = matrix.to_quaternion()
            present = 1.0 if frame >= released else 0.0
            data.extend([location.x, location.z, -location.y, rotation.x, rotation.z, -rotation.y, rotation.w, present])
    return data


def freeze(data, frames, bodies, after, window):
    def motion(frame):
        largest = 0.0
        for body in range(bodies):
            now = (frame * bodies + body) * STRIDE
            later = ((frame + 1) * bodies + body) * STRIDE
            largest = max(largest, math.dist(data[now:now + 3], data[later:later + 3]))
        return largest

    last = min(frames - 2, after + window)
    calmest = min(range(after, last + 1), key=motion)
    held = data[calmest * bodies * STRIDE:(calmest + 1) * bodies * STRIDE]
    for frame in range(calmest + 1, frames):
        data[frame * bodies * STRIDE:(frame + 1) * bodies * STRIDE] = held
    return {"frame": calmest, "motionMm": round(motion(calmest) * 1000, 4)}


def main():
    spec_path, out = arguments()
    with open(spec_path) as handle:
        spec = json.load(handle)
    scale = spec.get("blenderScale", 10)
    margin = spec.get("blenderMargin", 0.0002) * scale
    started = time.time()
    clear_scene()
    make_world(spec, scale)
    make_ground(spec, scale, margin)
    make_container(spec, scale, margin)
    template, collision, volume, radius = make_template(spec, scale)
    spec["_boundingRadius"] = radius
    plan = spawn_plan(spec)
    coins = make_bodies(spec, scale, margin, plan, template, collision, volume)
    data = bake(spec, coins, scale)
    hold = spec.get("settle", {}).get("freeze")
    frozen = freeze(data, spec["frames"], len(coins), hold["after"], hold["window"]) if hold else None
    crossing = interpenetration(coins, radius, scale, spec.get("visibleOverlap", 0.0002))
    name = spec.get("name", os.path.splitext(os.path.basename(spec_path))[0])
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(out, name + ".bin"), "wb") as handle:
        handle.write(struct.pack("<%df" % len(data), *data))
    meta = {
        "version": VERSION,
        "rate": spec["rate"],
        "frames": spec["frames"],
        "bodies": len(coins),
        "stride": STRIDE,
        "data": name + ".bin",
        "source": "Blender %s Bullet via stagecraft bake_rigid.py, spec %s, seed %s, scale %s%s" % (bpy.app.version_string, os.path.basename(spec_path), spec.get("seed", 1), scale, ", frozen at frame %d" % frozen["frame"] if frozen else ""),
    }
    with open(os.path.join(out, name + ".json"), "w") as handle:
        json.dump(meta, handle, indent=2)
    print(json.dumps({"name": name, "bodies": len(coins), "frames": spec["frames"], "overlap": crossing, "frozen": frozen, "seconds": round(time.time() - started, 1)}))


main()
