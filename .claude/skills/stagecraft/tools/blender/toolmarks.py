import json
import math
import sys

import numpy


def grid(size_mm, mm_per_px):
    width = int(round(size_mm[0] / mm_per_px))
    height = int(round(size_mm[1] / mm_per_px))
    x = (numpy.arange(width) + 0.5) * mm_per_px
    y = (numpy.arange(height) + 0.5) * mm_per_px
    return numpy.meshgrid(x, y)


def face_mill(x, y, cut):
    radius = cut["diameter"] / 2
    feed = cut["feedPerTooth"]
    nose = cut["noseRadius"]
    runout = numpy.array(cut.get("runoutMicrons", [0])) / 1000
    chatter = cut.get("chatter", {"amplitudeMicrons": 0, "wavelength": 1})
    dy = y - cut["pathY"]
    inside = numpy.abs(dy) < radius
    reach = numpy.sqrt(numpy.clip(radius ** 2 - dy ** 2, 0, None))
    centre = x - reach
    index = centre / feed
    base = numpy.floor(index)
    arc = radius * numpy.arcsin(numpy.clip(dy / radius, -1, 1))
    surface = numpy.full(x.shape, numpy.inf)
    for step in (-1, 0, 1, 2):
        tooth = base + step
        offset = (index - tooth) * feed * reach / radius
        drop = runout[(tooth.astype(int)) % len(runout)]
        phase = tooth * chatter.get("driftPerTooth", 0.03)
        wave = chatter["amplitudeMicrons"] / 1000 * numpy.sin(2 * math.pi * arc / chatter["wavelength"] + phase)
        surface = numpy.minimum(surface, offset ** 2 / (2 * nose) - drop + wave)
    passed = inside & (centre <= cut.get("stopX", numpy.inf))
    return numpy.where(passed, surface, numpy.nan)


def saw(x, y, raw, seed):
    rng = numpy.random.default_rng(seed)
    pitch = raw["pitch"]
    bow = raw.get("bowPerMm", 0)
    track = y + bow * (x - x.mean()) ** 2
    count = int(track.max() / pitch) + 3
    knots = numpy.arange(count) * pitch
    phase = (track + numpy.interp(track, knots, rng.normal(0, pitch * 0.3, count))) / pitch
    stripe = numpy.clip(numpy.round(phase).astype(int), 0, count - 1)
    depth = rng.lognormal(0, 0.5, count) * numpy.where(rng.random(count) < raw.get("scoreChance", 0.08), 3, 1)
    groove = 1 - (numpy.abs(phase - numpy.round(phase)) * 2) ** 2
    return -raw["depthMicrons"] / 1000 * depth[stripe] * groove


def heights(spec):
    x, y = grid(spec["sizeMm"], spec["mmPerPx"])
    raw = saw(x, y, spec["raw"], spec.get("seed", 1)) + spec["depthOfCut"]
    cut = face_mill(x, y, spec["faceMill"])
    return numpy.where(numpy.isnan(cut), raw, cut)


def main():
    rest = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
    spec_path, out_path = rest[0], rest[1]
    with open(spec_path) as handle:
        spec = json.load(handle)
    surface = heights(spec)
    numpy.save(out_path, surface.astype(numpy.float32))
    print(json.dumps({"out": out_path, "shape": surface.shape, "minMm": float(surface.min()), "maxMm": float(surface.max())}))


if __name__ == "__main__":
    main()
