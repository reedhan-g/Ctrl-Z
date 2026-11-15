"""Original warm landmark emphasis, derived from stable lit/unlit silhouette alpha."""
from pathlib import Path
import json
from PIL import Image, ImageChops, ImageFilter

IDS = ('grid', 'hospital', 'water', 'homes', 'telecom', 'logistics')


def build(root):
    source = (root/'src/cityModels.ts').read_text(encoding='utf8')
    models = json.loads(source[source.index('{'):source.rindex('}')+1])
    atlas = Image.open(root/'src/assets/city-atlas.png').convert('RGBA')
    result = Image.new('RGBA', (768, 512))
    for slot, name in enumerate(IDS):
        frames = []
        for index in [models[name]['index'], models[name]['index']+1]:
            x, y = index % 8*256, index//8*256
            frames.append(atlas.crop((x, y, x+256, y+256)).getchannel('A'))
        mask = ImageChops.lighter(*frames).point(lambda a: 255 if a >= 128 else 0)
        # Tight pixel rings, not a rectangle, ground diamond or runtime blur.
        ring = ImageChops.subtract(mask.filter(ImageFilter.MaxFilter(7)), mask)
        fringe = ImageChops.subtract(mask.filter(ImageFilter.MaxFilter(9)), mask.filter(ImageFilter.MaxFilter(7)))
        fill = Image.new('RGBA', (256, 256), (255, 241, 209, 0))
        fill.putalpha(mask.point(lambda a: 48 if a else 0))
        for alpha, color, shape in [(65, (255, 187, 87), fringe), (225, (255, 204, 112), ring)]:
            layer = Image.new('RGBA', (256, 256), (*color, 0))
            layer.putalpha(shape.point(lambda a: alpha if a else 0))
            fill = Image.alpha_composite(fill, layer)
        result.paste(fill, (slot % 3*256, slot//3*256))
    result.save(root/'src/assets/landmark-glow.png', optimize=True)
    print('Wrote original six-service 768x512 silhouette emphasis atlas')


if __name__ == '__main__':
    build(Path(__file__).resolve().parents[1])
