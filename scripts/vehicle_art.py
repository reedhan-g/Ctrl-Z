"""Original Ctrl Z directional cars, projected from 3D geometry, never image rotation.

Rebuild only this atlas with: python scripts/vehicle_art.py
Also called by build-city-art.py. No external source images or fonts.
"""
from pathlib import Path
import json
import math
from PIL import Image, ImageDraw

COLORS = {'amber': '#e9b164', 'cyan': '#76becb', 'pink': '#d37caa'}
DIRECTIONS = ('x+', 'x-', 'y+', 'y-')
SIZE, ORIGIN = 64, (32, 40)


def world(u, v, direction):
    # u is the car's forward axis; v is its cross-body axis. Rotate geometry
    # before projection so visible faces and fixed world lighting stay correct.
    return {'x+': (u, -v), 'x-': (-u, v),
            'y+': (v, u), 'y-': (-v, -u)}[direction]


def project(u, v, z, direction):
    x, y = world(u, v, direction)
    return round(ORIGIN[0] + (x-y)*39), round(ORIGIN[1] + (x+y)*20-z)


def shade(color, factor):
    return tuple(round(int(color[i:i+2], 16)*factor) for i in (1, 3, 5)) + (255,)


def render(color, direction, powered=True):
    im = Image.new('RGBA', (SIZE, SIZE))
    g = ImageDraw.Draw(im)
    base = COLORS[color]

    def poly(points, fill, outline=None):
        g.polygon([project(*p, direction) for p in points], fill=fill, outline=outline)

    def line(points, fill, width=1):
        g.line([project(*p, direction) for p in points], fill=fill, width=width)

    def visible(normal):
        x, y = world(*normal, direction)
        return x > 0 or y > 0

    def wheel(u, v):
        # Wheels lie in the longitudinal/vertical plane, with the axle across
        # the car. Their perspective changes with the world axis, not a 2D flip.
        points = [(u+math.cos(a*math.pi/6)*.072, v, 3+math.sin(a*math.pi/6)*3)
                  for a in range(12)]
        poly(points, '#101923', '#65717d')
        g.point(project(u, v, 3, direction), fill='#a0acb0')

    # Road contact is centered on ORIGIN. No baked directional light pools.
    poly([(-.43, -.23, 0), (.43, -.23, 0), (.43, .23, 0), (-.43, .23, 0)], '#080e1660')
    for v in [-.205, .205]:
        if not visible((0, 1 if v > 0 else -1)):
            for u in [-.26, .25]:
                wheel(u, v)

    # Fixed world light: south-facing body is brighter than east-facing body.
    surfaces = [
        ((1, 0), [(.4, -.19, 3), (.4, .19, 3), (.4, .19, 9), (.4, -.19, 9)]),
        ((-1, 0), [(-.4, .19, 3), (-.4, -.19, 3), (-.4, -.19, 9), (-.4, .19, 9)]),
        ((0, 1), [(-.4, .19, 3), (.4, .19, 3), (.4, .19, 9), (-.4, .19, 9)]),
        ((0, -1), [(.4, -.19, 3), (-.4, -.19, 3), (-.4, -.19, 9), (.4, -.19, 9)]),
    ]
    for normal, points in surfaces:
        if visible(normal):
            _, ny = world(*normal, direction)
            poly(points, shade(base, .82 if ny > 0 else .60))
    poly([(-.4, -.19, 9), (.4, -.19, 9), (.4, .19, 9), (-.4, .19, 9)], base)

    # Front/rear have different lamps and bumpers. Back-facing lamps are
    # occluded by the body; opposite travel shows tail lamps, not headlights.
    for end, normal in [(.402, (1, 0)), (-.402, (-1, 0))]:
        if visible(normal):
            light = ('#fff0b0' if end > 0 else '#f08783') if powered else '#4e5260'
            for v in [-.15, .08]:
                poly([(end, v, 5), (end, v+.07, 5), (end, v+.07, 7), (end, v, 7)], light)
            line([(end, -.17, 3), (end, .17, 3)], '#78888e')
            line([(end, -.05, 5), (end, .05, 5)], '#293542')

    for v in [-.205, .205]:
        if visible((0, 1 if v > 0 else -1)):
            for u in [-.26, .25]:
                wheel(u, v)

    # Asymmetric cabin: long front hood, short rear deck, sloping windshield.
    for u, top, normal in [(.10, .035, (1, 0)), (-.25, -.18, (-1, 0))]:
        if visible(normal):
            poly([(u, -.175, 9), (u, .175, 9), (top, .145, 15), (top, -.145, 15)],
                 '#97bbc4' if u > 0 else '#496573', '#2d4351')
    for v, top, normal in [(.175, .145, (0, 1)), (-.175, -.145, (0, -1))]:
        if visible(normal):
            poly([(-.25, v, 9), (.10, v, 9), (.035, top, 15), (-.18, top, 15)], '#314c5b', '#80999e')
            line([(-.07, v, 9), (-.07, top, 15)], '#273d4b')
            line([(-.14, v, 7), (-.06, v, 7)], '#b5c0b4')
    poly([(-.18, -.145, 15), (.035, -.145, 15), (.035, .145, 15), (-.18, .145, 15)], shade(base, .96))
    line([(.14, -.16, 9), (.34, -.16, 9)], shade(base, 1.05))
    return im


def build(root):
    atlas = Image.new('RGBA', (512, 192))
    frames = {}
    for row, color in enumerate(COLORS):
        frames[color] = {}
        for col, direction in enumerate(DIRECTIONS):
            index = row*8+col*2
            frames[color][direction] = {'on': index, 'off': index+1}
            for state in range(2):
                atlas.paste(render(color, direction, state == 0), (col*128+state*64, row*64))
    atlas.save(root/'src/assets/vehicle-atlas.png', optimize=True)
    metadata = {'frameSize': SIZE, 'columns': 8, 'rows': 3,
                'origin': {'x': ORIGIN[0], 'y': ORIGIN[1]}, 'colors': frames}
    (root/'src/vehicleAtlas.ts').write_text(
        '// Generated by scripts/vehicle_art.py; original Ctrl Z art.\n'
        'export const vehicleAtlas = '+json.dumps(metadata, indent=1)+' as const;\n'
        "export const vehicleDirections = ['x+','x-','y+','y-'] as const;\n"
        'export type VehicleDirection = typeof vehicleDirections[number];\n'
        'export type VehicleColor = keyof typeof vehicleAtlas.colors;\n', encoding='utf8')
    print('Wrote original 512x192 directional vehicle atlas (3 colors, 4 directions, 2 light states)')


if __name__ == '__main__':
    build(Path(__file__).resolve().parents[1])
