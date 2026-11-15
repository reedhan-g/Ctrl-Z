"""Offline art checks; runtime/CI use committed PNGs and need no Pillow."""
from pathlib import Path
import sys
import unittest
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT/'scripts'))
import vehicle_art as art


class DirectionalVehicleArt(unittest.TestCase):
    def test_committed_atlas_matches_every_original_frame(self):
        atlas = Image.open(ROOT/'src/assets/vehicle-atlas.png')
        self.assertEqual(atlas.size, (512, 192))
        self.assertEqual(atlas.mode, 'RGBA')
        for row, color in enumerate(art.COLORS):
            silhouettes = []
            for col, direction in enumerate(art.DIRECTIONS):
                image = art.render(color, direction)
                silhouettes.append(image.tobytes())
                bounds = image.getbbox()
                self.assertTrue(bounds and min(bounds[:2]) > 1 and max(bounds[2:]) < 63)
                # Full-intensity lamps distinguish front from rear. Opposite
                # directions must not show headlights through the rear body.
                pixels = [image.getpixel((x, y)) for y in range(64) for x in range(64)]
                head = (255, 240, 176, 255)
                tail = (240, 135, 131, 255)
                self.assertEqual(head in pixels, direction.endswith('+'))
                self.assertEqual(tail in pixels, direction.endswith('-'))
                base = art.shade(art.COLORS[color], 1)
                self.assertGreater(pixels.count(base), 20, 'identity color must remain readable')
                for state in range(2):
                    x, y = col*128+state*64, row*64
                    self.assertEqual(atlas.crop((x, y, x+64, y+64)).tobytes(), art.render(color, direction, state == 0).tobytes())
            self.assertEqual(len(set(silhouettes)), 4)

    def test_world_axes_are_projected_before_rasterization(self):
        # Forward motion projects onto the two road diagonals, including their
        # opposites. No runtime texture rotation or reflection is required.
        center = art.ORIGIN
        expected = {'x+': (39, 20), 'x-': (-39, -20), 'y+': (-39, 20), 'y-': (39, -20)}
        for direction, delta in expected.items():
            p = art.project(1, 0, 0, direction)
            self.assertEqual((p[0]-center[0], p[1]-center[1]), delta)


if __name__ == '__main__':
    unittest.main()
