"""
Regenerates scripts/logo-mark-transparent.png from the original source render.
Source: the official Plantiers logo PNG (glossy 3D ribbon "P" + leaf sprout on
a near-black background, ~1254x1254). Run from the project root:

    python3 scripts/extract-logo-mark.py /path/to/source.png

Background removal via distance-from-background-color thresholding rather than
a naive per-pixel diff — the source has subtle film-grain noise in the "flat"
background, and a low/sensitive threshold picks that noise up as a speckled
halo around the mark. The gap between the background-noise ceiling (~25) and
the actual subject (~150+) is wide, so a threshold planted in the middle of
that gap gives a clean cut with only a slight Gaussian blur needed for
anti-aliasing at the true edge.
"""

import sys
from PIL import Image, ImageFilter
import numpy as np

SOURCE = sys.argv[1] if len(sys.argv) > 1 else '/Users/noeplantier/Desktop/logoplantiers.png'
OUT = 'scripts/logo-mark-transparent.png'
BG_SAMPLE = (4.3, 1.0, 18.0)  # sampled from the source's corner pixels
LOW, HIGH = 55, 115
PAD = 30


def main():
    img = Image.open(SOURCE).convert('RGB')
    arr = np.array(img).astype(float)

    bg = np.array(BG_SAMPLE, dtype=float)
    dist = np.sqrt(((arr - bg) ** 2).sum(axis=2))

    alpha = np.clip((dist - LOW) / (HIGH - LOW), 0, 1) * 255
    alpha_img = Image.fromarray(alpha.astype(np.uint8), mode='L')
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=1.2))

    rgba = Image.merge('RGBA', (*Image.fromarray(arr.astype(np.uint8)).split(), alpha_img))

    bbox = alpha_img.point(lambda p: 255 if p > 10 else 0).getbbox()
    l, t, r, b = bbox
    l, t = max(0, l - PAD), max(0, t - PAD)
    r, b = min(rgba.width, r + PAD), min(rgba.height, b + PAD)
    cropped = rgba.crop((l, t, r, b))
    cropped.save(OUT)
    print(f'saved {OUT} at {cropped.size}')


if __name__ == '__main__':
    main()
