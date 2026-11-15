from pathlib import Path
import json
import unittest
from PIL import Image, ImageChops, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
IDS = ('grid', 'hospital', 'water', 'homes', 'telecom', 'logistics')


class LandmarkEmphasis(unittest.TestCase):
    def test_gold_follows_all_six_stable_lit_unlit_silhouettes_without_rectangular_fill(self):
        text = (ROOT/'src/cityModels.ts').read_text(encoding='utf8')
        models = json.loads(text[text.index('{'):text.rindex('}')+1])
        atlas = Image.open(ROOT/'src/assets/city-atlas.png').convert('RGBA')
        gold = Image.open(ROOT/'src/assets/landmark-glow.png').convert('RGBA')
        self.assertEqual(gold.size, (768, 512))
        for slot, name in enumerate(IDS):
            frames = []
            for index in [models[name]['index'], models[name]['index']+1]:
                x, y = index % 8*256, index//8*256
                frames.append(atlas.crop((x, y, x+256, y+256)).getchannel('A'))
            mask = ImageChops.lighter(*frames).point(lambda a: 255 if a >= 128 else 0)
            frame = gold.crop((slot % 3*256, slot//3*256, slot % 3*256+256, slot//3*256+256))
            alpha = frame.getchannel('A')
            support = alpha.point(lambda a: 255 if a else 0)
            self.assertIsNone(ImageChops.difference(support, mask.filter(ImageFilter.MaxFilter(9))).getbbox())
            self.assertEqual(alpha.getpixel((0, 0)), 0)
            self.assertEqual({i for i, count in enumerate(alpha.histogram()) if count}, {0, 48, 65, 225})
            self.assertEqual(frame.getpixel((0, 0))[3], 0)


if __name__ == '__main__':
    unittest.main()
