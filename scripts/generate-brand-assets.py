"""
Regenerates every derived brand asset from scripts/logo-mark-transparent.png
(itself produced by extract-logo-mark.py):

  src/assets/logo-mark.png     — optimized UI asset for the navbar/footer Logo component
  public/favicon-32.png        — browser tab favicon
  public/favicon-192.png       — home-screen / PWA-style icon
  public/favicon-512.png       — large app icon
  public/apple-touch-icon.png  — iOS home-screen icon (no rounding — iOS masks it)
  public/og-image.jpg          — 1200x630 social share card

Run from the project root: python3 scripts/generate-brand-assets.py
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter

MARK_SRC = 'scripts/logo-mark-transparent.png'
VOID = (7, 6, 11)
ARIAL_BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
ARIAL = '/System/Library/Fonts/Supplemental/Arial.ttf'


def make_ui_asset(mark):
    ui = mark.copy()
    ui.thumbnail((200, 280), Image.LANCZOS)
    ui.save('src/assets/logo-mark.png', optimize=True, compress_level=9)


def make_icon(mark, size, out_path, radius_frac=0.22, pad_frac=0.16):
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    bg = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(bg)
    radius = int(size * radius_frac)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=(*VOID, 255))
    canvas.alpha_composite(bg)

    pad = int(size * pad_frac)
    m = mark.copy()
    m.thumbnail((size - 2 * pad, size - 2 * pad), Image.LANCZOS)
    x = (size - m.width) // 2
    y = (size - m.height) // 2 + int(size * 0.01)
    canvas.alpha_composite(m, (x, y))
    canvas.save(out_path, optimize=True)


def tracked_text(draw, pos, text, font, fill, tracking):
    x, y = pos
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking


def make_og_image(mark):
    w, h = 1200, 630
    img = Image.new('RGB', (w, h), VOID)

    glow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([-200, -300, 900, 500], fill=(124, 58, 237, 60))
    gdraw.ellipse([700, 300, 1500, 1000], fill=(22, 163, 74, 35))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img = Image.alpha_composite(img.convert('RGBA'), glow).convert('RGB')

    draw = ImageDraw.Draw(img, 'RGBA')
    for gx in (300, 600, 900):
        draw.line([(gx, 0), (gx, h)], fill=(255, 255, 255, 13), width=1)
    for gy in (150, 300, 450):
        draw.line([(0, gy), (w, gy)], fill=(255, 255, 255, 13), width=1)

    mh = 190
    m = mark.copy()
    scale = mh / m.height
    m = m.resize((int(m.width * scale), mh), Image.LANCZOS)
    mark_x, mark_y = 100, 70
    img.paste(m, (mark_x, mark_y), m)

    font_xl = ImageFont.truetype(ARIAL_BOLD, 66)
    font_lg = ImageFont.truetype(ARIAL_BOLD, 50)
    font_sm = ImageFont.truetype(ARIAL_BOLD, 15)
    font_reg = ImageFont.truetype(ARIAL, 23)

    draw = ImageDraw.Draw(img, 'RGBA')
    text_x = mark_x + m.width + 28
    draw.text((text_x, mark_y + 45), 'PLANTIERS', font=font_lg, fill=(255, 255, 255, 255))
    tracked_text(draw, (text_x + 2, mark_y + 105), 'SOFTWARE ENGINEERING', font_sm, (183, 155, 255, 255), 5)

    draw.text((98, 340), 'Engineering', font=font_xl, fill=(255, 255, 255, 255))

    line2 = 'Digital Growth.'
    bbox = draw.textbbox((0, 0), line2, font=font_xl)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    grad = Image.new('RGB', (tw + 4, th + 20), (0, 0, 0))
    gdraw2 = ImageDraw.Draw(grad)
    for gx in range(tw + 4):
        t = abs(((gx / (tw + 4) * 2) % 2) - 1)
        gdraw2.line([(gx, 0), (gx, th + 20)], fill=(int(183 + (139 - 183) * t), int(155 + (92 - 155) * t), int(255 + (246 - 255) * t)))
    mask = Image.new('L', (tw + 4, th + 20), 0)
    ImageDraw.Draw(mask).text((-bbox[0] + 2, -bbox[1] + 2), line2, font=font_xl, fill=255)
    img.paste(grad, (96, 412), mask)

    draw = ImageDraw.Draw(img, 'RGBA')
    draw.text((100, 515), 'Web · Mobile · Cloud & DevOps · AI Integrations', font=font_reg, fill=(255, 255, 255, 140))

    img.save('public/og-image.jpg', quality=90, optimize=True)


def main():
    mark = Image.open(MARK_SRC).convert('RGBA')
    make_ui_asset(mark)
    make_icon(mark, 512, 'public/favicon-512.png')
    make_icon(mark, 192, 'public/favicon-192.png')
    make_icon(mark, 180, 'public/apple-touch-icon.png', radius_frac=0.0)
    make_icon(mark, 32, 'public/favicon-32.png')
    make_og_image(mark)
    print('all brand assets regenerated')


if __name__ == '__main__':
    main()
