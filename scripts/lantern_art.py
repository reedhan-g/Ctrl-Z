"""Original Lantern Yard architecture; no third-party pixels or fonts.

Shared 39:20 projection and (128,140) ground pivot, rasterized without AA.
Floor modules are 24 pixels. Facade details follow the two visible planes.
"""
from PIL import Image, ImageDraw

MODELS = [
    ('yardHouse', 1.65, 1.5, 76, 3, 'YARD HOUSE', '#79d5cf', 'yard'),
    ('lanternNoodles', 1.2, 1.5, 48, 2, 'NOODLES', '#efbe76', 'yard'),
    ('lanternCafe', 1.2, 1.25, 28, 1, 'LANTERN', '#81e4df', 'yard'),
]


def render(model, powered, font):
    name, w, d, h, floors, sign, accent, _ = model
    im = Image.new('RGBA', (256, 256))
    draw = ImageDraw.Draw(im)
    light = accent if powered else '#394952'
    warm = '#f6d899' if powered else '#233640'
    white = '#c2f3ec' if powered else '#314651'

    def p(x, y, z=0):
        return round(128 + (x-y)*39), round(140 + (x+y)*20-z)

    def poly(points, color):
        draw.polygon([p(*v) for v in points], fill=color)

    def line(points, color, width=1):
        draw.line([p(*v) for v in points], fill=color, width=width)

    def box(x, y, width, depth, bottom, top, colors):
        poly([(x,y+depth,top),(x+width,y+depth,top),(x+width,y+depth,bottom),(x,y+depth,bottom)], colors[0])
        poly([(x+width,y,top),(x+width,y+depth,top),(x+width,y+depth,bottom),(x+width,y,bottom)], colors[1])
        poly([(x,y,top),(x+width,y,top),(x+width,y+depth,top),(x,y+depth,top)], colors[2])

    def panel(side, u, z, width, height, color):
        if side == 0:
            poly([(u,d,z),(u+width,d,z),(u+width,d,z+height),(u,d,z+height)], color)
        else:
            poly([(w,u,z),(w,u+width,z),(w,u+width,z+height),(w,u,z+height)], color)

    def lettering(side, u, z, text, color):
        for i, ch in enumerate(text):
            for n, bit in enumerate(font[ch]):
                if bit == '1':
                    panel(side, u+(i*4+n%3)/39, z+4-n//3, 1/39, 1, color)

    def fascia(side, text, z, color):
        span = w if side == 0 else d
        panel(side, .08, z, span-.16, 9, '#101e29')
        panel(side, .08, z, span-.16, 1, color)
        lettering(side, (span-(len(text)*4-1)/39)/2, z+2, text, color)

    # Cool masonry with a lighter lit face; coherent scale, no glowing outlines.
    box(0,0,w,d,0,3,('#50616a','#34454f','#65747b'))
    box(.02,.02,w-.04,d-.04,3,h,('#293b46','#1b2c38','#43545d'))
    for side, span in [(0,w),(1,d)]:
        for z in range(7,h-3,5):
            for i in range(int(span*9)):
                if (i+z//5)%4 == 0:
                    panel(side,.07+i*.1,z,.07,1,'#3d4c55' if side==0 else '#293e48')
        # Tall ground-floor glazing, recessed behind structural piers.
        panel(side,.1,4,span-.2,16,'#10212c')
        for i in range(3):
            u=.14+i*(span-.23)/3
            panel(side,u,5,(span-.34)/3,13,white if powered and i==0 else '#35515d')
            panel(side,u,5,.025,13,'#718a91')
        # Exactly one explicit entrance: court-facing housing, road-facing shop.
        entrance = (name=='yardHouse' and side==0) or (name!='yardHouse' and side==1)
        if entrance:
            panel(side,span-.37,3,.24,17,'#0d1923')
            panel(side,span-.34,5,.17,13,light)
            panel(side,span-.2,8,.025,2,'#d7cbbb')
            panel(side,span-.4,2,.32,1,'#a2aaa6')
        if name!='yardHouse':
            fascia(side,sign if side==1 else ('TEA' if name=='lanternCafe' else 'NIGHT'),20,light)
        for floor in range(1,floors):
            z=4+floor*24
            panel(side,.03,z-2,span-.06,2,'#536773')
            for i in range(3):
                u=.12+i*(span-.18)/3
                panel(side,u,z+1,(span-.35)/3,15,'#10202b')
                panel(side,u+.025,z+3,(span-.43)/3,11,warm if (i+floor+side)%3==0 else white if powered and i==1 else '#2c4551')
                panel(side,u+.025,z+8,(span-.43)/3,1,'#1c3540')
                panel(side,u+.1,z+3,.025,11,'#39505b')
    if name=='yardHouse':
        # Recessed upper wing creates a deliberate stepped roof silhouette.
        fascia(0,'YARD',20,light)
        box(.1,.1,w-.2,d-.2,h,h+3,('#536a72','#354e5a','#637b80'))
        poly([(.18,.18,h+3),(w-.18,.18,h+3),(w-.18,d-.18,h+3),(.18,d-.18,h+3)],'#20333f')
        box(.16,.12,.62,.65,h+3,h+12,('#3b535f','#243c49','#6e7e83'))
        for i in range(4):
            line([(.2+i*.13,.16,h+13),(.2+i*.13,.65,h+13)],'#273c47')
        # Small balcony on the court facade, with solid floor and fine rails.
        box(.12,d-.04,.7,.12,49,51,('#536774','#3b4c59','#819291'))
        for i in range(5):
            line([(.14+i*.16,d+.07,51),(.14+i*.16,d+.07,57)],'#768a91')
        line([(.12,d+.07,57),(.82,d+.07,57)],'#91a1a3')
    else:
        # Continuous fascia wraps the corner; canopy stays behind the sidewalk.
        box(w-.04,.12,.13,d-.24,18,20,('#415563','#2c424f',light))
        box(.08,.08,w-.16,d-.16,h,h+3,('#526776','#304957','#71818b'))
        poly([(.16,.16,h+3),(w-.16,.16,h+3),(w-.16,d-.16,h+3),(.16,d-.16,h+3)],'#1b303e')
        if name=='lanternNoodles':
            # Roof vent and three lanterns identify the kitchen without a tower.
            box(.22,.2,.4,.55,h+3,h+10,('#526976','#314b59','#7a8a90'))
            for i in range(3):
                u=.3+i*.35
                line([(w+.07,u,18),(w+.07,u,15)],'#839397')
                panel(1,u,9,.1,6,warm)
            # Projected blade sign is attached to the street-facing corner.
            # Its 0.10-tile projection fits inside the reserved threshold strip.
            box(w,.18,.10,.18,27,43,('#563d50','#302f42','#7c6874'))
            x,y=p(w+.1,.36,41)
            draw.line((x,y,x,y+10),fill=warm,width=2)
            # Visible roof duct and brick-toned kitchen parapet distinguish it.
            box(.76,.28,.15,.65,h+3,h+7,('#776c68','#4f5056','#a09487'))
        else:
            # Low violet roof cap and two roof planters leave the junction open.
            line([(.1,d-.1,h+4),(w-.1,d-.1,h+4),(w-.1,.1,h+4)],'#bd8aca' if powered else '#48505d')
            for u in [.2,.65]:
                box(u,.25,.22,.3,h+3,h+6,('#52636a','#354754','#738079'))
                box(u+.02,.27,.18,.26,h+6,h+8,('#425e58','#294c4c','#638478'))
    return im


def ground(street):
    """A usable court, passages and thresholds inside the unchanged road block."""
    im = street.copy()
    draw = ImageDraw.Draw(im)

    def p(x,y): return round(200+(x-y)*39), round(12+(x+y)*20)

    def tile(x,y,w,d,color):
        draw.polygon([p(x,y),p(x+w,y),p(x+w,y+d),p(x,y+d)],fill=color)

    # Connected passages to street sidewalks and the apartment's court door.
    tile(.28,.28,3.44,3.44,'#303e49')
    for i in range(14):
        a=.28+i*.25
        draw.line([p(.28,a),p(3.72,a)],fill='#3c4c57')
        draw.line([p(a,.28),p(a,3.72)],fill='#3a4955')
    tile(.35,2.3,1.65,1.25,'#4a555c')
    for i in range(5):
        draw.line([p(.35,2.3+i*.25),p(2,2.3+i*.25)],fill='#69716e')
    # Seating strip and planted corner make the open parcel purposeful.
    tile(.48,3.23,.95,.13,'#9a8c74')
    tile(.48,3.38,.95,.06,'#263d43')
    tile(.48,2.48,.3,.4,'#65716e')
    tile(.52,2.52,.22,.32,'#45695e')
    tile(1.58,3.13,.27,.27,'#65716e')
    tile(1.62,3.17,.19,.19,'#567766')
    # Door threshold paving stays out of the road and full sidewalk bands.
    tile(3.55,1.47,.17,.3,'#86918a')
    tile(3.55,3.17,.17,.3,'#86918a')
    return im
