export const measureFrame = async (dataUrl, options) => {
    const { sampleWidth, regionWidth, border, bright, accentShare, chromaFloor, boxes, copies } = options;
    const image = new Image();
    image.src = dataUrl;
    await image.decode();

    const pixelsAt = (width) => {
        const height = Math.max(1, Math.round((image.height * width) / image.width));
        const canvas = new OffscreenCanvas(width, height);
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);
        return { width, height, data: context.getImageData(0, 0, width, height).data };
    };

    const linear = (value) => {
        const unit = value / 255;
        return unit <= 0.04045 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
    };
    const luminanceOf = (data, index) =>
        0.2126 * linear(data[index]) + 0.7152 * linear(data[index + 1]) + 0.0722 * linear(data[index + 2]);
    const hueOf = (red, green, blue) => {
        const max = Math.max(red, green, blue) / 255;
        const chroma = max - Math.min(red, green, blue) / 255;
        if (chroma === 0) return { hue: 0, chroma };
        let hue;
        if (max === red / 255) hue = ((green - blue) / 255 / chroma) % 6;
        else if (max === green / 255) hue = (blue - red) / 255 / chroma + 2;
        else hue = (red - green) / 255 / chroma + 4;
        hue *= 60;
        return { hue: hue < 0 ? hue + 360 : hue, chroma };
    };
    const circularMean = (entries) => {
        let x = 0;
        let y = 0;
        entries.forEach(({ hue, weight }) => {
            x += Math.cos((hue * Math.PI) / 180) * weight;
            y += Math.sin((hue * Math.PI) / 180) * weight;
        });
        return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
    };

    const sample = pixelsAt(sampleWidth);
    const stats = (frame, inside) => {
        let count = 0;
        let luminance = 0;
        let chroma = 0;
        const hues = [];
        for (let row = 0; row < frame.height; row += 1)
            for (let column = 0; column < frame.width; column += 1) {
                if (!inside(column, row)) continue;
                const index = (row * frame.width + column) * 4;
                const colour = hueOf(frame.data[index], frame.data[index + 1], frame.data[index + 2]);
                count += 1;
                luminance += luminanceOf(frame.data, index);
                chroma += colour.chroma;
                hues.push({ hue: colour.hue, weight: colour.chroma });
            }
        return {
            luminance: luminance / Math.max(count, 1),
            chroma: chroma / Math.max(count, 1),
            hue: circularMean(hues),
        };
    };
    const edge = (column, row) =>
        column < border || row < border || column >= sample.width - border || row >= sample.height - border;
    const ground = stats(sample, edge);
    const whole = stats(sample, () => true);

    const all = [];
    let clipped = 0;
    let crushed = 0;
    let channelCrushed = 0;
    let channelClipped = 0;
    let saturated = 0;
    for (let index = 0; index < sample.data.length; index += 4) {
        const red = sample.data[index];
        const green = sample.data[index + 1];
        const blue = sample.data[index + 2];
        const max = Math.max(red, green, blue);
        if (max >= 254) clipped += 1;
        if (max <= 2) crushed += 1;
        const min = Math.min(red, green, blue);
        if (min <= 4 && max >= 40) channelCrushed += 1;
        if (max >= 254 && min < 200) channelClipped += 1;
        if (max >= 60 && (max - min) / max >= 0.85) saturated += 1;
        all.push({ index, luminance: luminanceOf(sample.data, index), ...hueOf(red, green, blue) });
    }
    const total = all.length;
    const ranked = all.map((pixel) => pixel.luminance).sort((a, b) => a - b);
    const percentile = (share) => ranked[Math.min(ranked.length - 1, Math.floor(ranked.length * share))] ?? 0;
    const frameMedian = percentile(0.5);
    const vivid = all
        .filter((pixel) => pixel.chroma > chromaFloor)
        .sort((a, b) => b.chroma - a.chroma)
        .slice(0, Math.max(1, Math.round(total * accentShare)));

    const full = pixelsAt(image.width);
    const bandRow = (row) => {
        const levels = [];
        for (let column = 0; column < full.width; column += 1) {
            const index = (row * full.width + column) * 4;
            levels.push(Math.round((full.data[index] + full.data[index + 1] + full.data[index + 2]) / 3));
        }
        let banded = 0;
        let smooth = 0;
        let run = 1;
        for (let column = 1; column < levels.length; column += 1) {
            const step = Math.abs(levels[column] - levels[column - 1]);
            if (step === 0) {
                run += 1;
                continue;
            }
            if (step <= 2) {
                smooth += run;
                if (run >= 24) banded += run;
            }
            run = 1;
        }
        return { banded, smooth };
    };
    const grey = (column, row) => {
        const index = (row * full.width + column) * 4;
        return (full.data[index] + full.data[index + 1] + full.data[index + 2]) / 3;
    };
    const sharpnessIn = (from, to) => {
        let sum = 0;
        let count = 0;
        const top = Math.max(1, Math.floor(full.height * from));
        const bottom = Math.min(full.height - 1, Math.floor(full.height * to));
        for (let row = top; row < bottom; row += 1)
            for (let column = 1; column < full.width - 1; column += 1) {
                const laplacian = 4 * grey(column, row) - grey(column - 1, row) - grey(column + 1, row) - grey(column, row - 1) - grey(column, row + 1);
                sum += laplacian * laplacian;
                count += 1;
            }
        return Math.sqrt(sum / Math.max(count, 1));
    };
    const bands = [0.25, 0.5, 0.75].map((share) => bandRow(Math.floor(full.height * share)));
    const smoothLength = bands.reduce((sum, band) => sum + band.smooth, 0);
    const banding = smoothLength ? bands.reduce((sum, band) => sum + band.banded, 0) / smoothLength : 0;

    const region = pixelsAt(regionWidth);
    const luminanceIn = ([x0, y0, x1, y1]) => {
        const values = [];
        const left = Math.max(0, Math.floor(x0 * region.width));
        const right = Math.min(region.width, Math.ceil(x1 * region.width));
        const top = Math.max(0, Math.floor(y0 * region.height));
        const bottom = Math.min(region.height, Math.ceil(y1 * region.height));
        for (let row = top; row < bottom; row += 1)
            for (let column = left; column < right; column += 1)
                values.push(luminanceOf(region.data, (row * region.width + column) * 4));
        return values;
    };
    const highlightSaturationIn = ([x0, y0, x1, y1]) => {
        const pixels = [];
        const left = Math.max(0, Math.floor(x0 * region.width));
        const right = Math.min(region.width, Math.ceil(x1 * region.width));
        const top = Math.max(0, Math.floor(y0 * region.height));
        const bottom = Math.min(region.height, Math.ceil(y1 * region.height));
        for (let row = top; row < bottom; row += 1)
            for (let column = left; column < right; column += 1) {
                const index = (row * region.width + column) * 4;
                const high = Math.max(region.data[index], region.data[index + 1], region.data[index + 2]);
                const low = Math.min(region.data[index], region.data[index + 1], region.data[index + 2]);
                pixels.push({ luminance: luminanceOf(region.data, index), saturation: high > 0 ? (high - low) / high : 0 });
            }
        const brightest = pixels.sort((a, b) => b.luminance - a.luminance).slice(0, Math.max(1, Math.round(pixels.length * 0.05)));
        const sorted = brightest.map((pixel) => pixel.saturation).sort((a, b) => a - b);
        return sorted[Math.floor(sorted.length / 2)] ?? 0;
    };
    const percentileOf = (values, share) => {
        const sorted = [...values].sort((a, b) => a - b);
        return sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * share))] : 0;
    };
    const mean = (values) => values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
    const median = (values) => {
        const sorted = [...values].sort((a, b) => a - b);
        return sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
    };
    const deviation = (values) => {
        const centre = mean(values);
        return Math.sqrt(mean(values.map((value) => (value - centre) ** 2)));
    };

    const actors = Object.fromEntries(
        Object.entries(boxes ?? {}).map(([id, box]) => {
            const [x0, y0, x1, y1] = box;
            const height = y1 - y0;
            const width = x1 - x0;
            const strip = Math.max(height * 0.08, 0.004);
            const gap = Math.max(height * 0.02, 2 / region.height);
            const inset = 0.05;
            const below = mean(luminanceIn([x0 + width * 0.2, y1 + gap, x1 - width * 0.2, y1 + gap + strip]));
            const beside = mean([
                ...luminanceIn([x0 - width * 0.5, y1 + gap, x0 - width * inset, y1 + gap + strip]),
                ...luminanceIn([x1 + width * inset, y1 + gap, x1 + width * 0.5, y1 + gap + strip]),
            ]);
            const inside = luminanceIn([x0 + width * inset, y0 + height * inset, x1 - width * inset, y1 - height * inset]);
            return [
                id,
                {
                    box,
                    variation: deviation(inside),
                    contact: beside > 0 ? below / beside : null,
                    exposure: frameMedian > 0 ? percentileOf(inside, 0.9) / frameMedian : null,
                    highlightSaturation: highlightSaturationIn(box),
                },
            ];
        }),
    );

    const contrastOf = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    const copy = (copies ?? []).map(({ text, box, ink }) => {
        const background = median(luminanceIn(box));
        return { text, box, contrast: contrastOf(ink, background) };
    });

    return {
        groundL: ground.luminance,
        groundChroma: ground.chroma,
        groundHue: ground.hue,
        meanL: whole.luminance,
        meanChroma: whole.chroma,
        brightShare: all.filter((pixel) => pixel.luminance > bright).length / total,
        clippedShare: clipped / total,
        crushedShare: crushed / total,
        channelCrushedShare: channelCrushed / total,
        channelClippedShare: channelClipped / total,
        saturatedShare: saturated / total,
        banding,
        range: { low: percentile(0.01), high: percentile(0.99) },
        sharpness: { near: sharpnessIn(2 / 3, 1), middle: sharpnessIn(1 / 3, 2 / 3) },
        accentHue: vivid.length ? circularMean(vivid.map((pixel) => ({ hue: pixel.hue, weight: 1 }))) : null,
        actors,
        copy,
    };
};
