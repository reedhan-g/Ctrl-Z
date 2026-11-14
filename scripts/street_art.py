"""Sixteen shared ground masks: connected roads, T junctions and garden courts."""
from PIL import Image, ImageDraw

def build():
    atlas=Image.new('RGBA',(2048,2048))
    for index in range(32):
        mask=index%16;powered=index<16
        im=Image.new('RGBA',(400,224));g=ImageDraw.Draw(im)
        def p(x,y):return round(200+(x-y)*39),round(12+(x+y)*20)
        def tile(x,y,w,d,c):g.polygon([p(x,y),p(x+w,y),p(x+w,y+d),p(x,y+d)],fill=c)
        tile(0,0,5,5,'#28343f')
        # Continuous pavement joins otherwise disconnected five-tile lots.
        for i in range(20):
            a=i*.25
            g.line([p(0,a),p(5,a)],fill='#303e49')
            g.line([p(a,0),p(a,5)],fill='#303e49')
        east,south,west,north=[bool(mask&n) for n in [1,2,4,8]]
        if east:tile(4,0,1,5,'#101c29')
        if south:tile(0,4,5,1,'#101c29')
        for on,x,y,w,d in [(east,3.72,0,.28,4),(south,0,3.72,4,.28),(west,0,0,.28,4),(north,0,0,4,.28)]:
            if on:
                tile(x,y,w,d,'#59616c')
                for i in range(16):
                    if w<1:g.line([p(x,i*.25),p(x+w,i*.25)],fill='#79808a')
                    else:g.line([p(i*.25,y),p(i*.25,y+d)],fill='#79808a')
        for i in range(4):
            if east:g.line([p(4.5,i+.25),p(4.5,i+.65)],fill='#9b9e9e')
            if south:g.line([p(i+.25,4.5),p(i+.65,4.5)],fill='#9b9e9e')
        # Crossings only at actual connected intersections, not every parcel.
        for i in range(6):
            if east and (south or north):tile(4.08,3.05+i*.12,.84,.055,'#c2c7c4')
            if south and (east or west):tile(3.05+i*.12,4.08,.055,.84,'#c2c7c4')
        # Reclaimed lanes are deliberately paved pedestrian access/garden strips.
        if not east:
            tile(4.12,.35,.68,3.2,'#344e4b')
            for i in range(4):tile(4.25,.5+i*.7,.4,.42,'#496459')
            tile(3.78,3.6,1,.14,'#857c69')
        if not south:
            tile(.35,4.12,3.2,.68,'#344e4b')
            for i in range(4):tile(.5+i*.7,4.25,.42,.4,'#496459')
        tile(3.42,3.42,.2,.2,'#717b7e')
        if powered:
            # Emissive studs sit at curbs; the warm pool belongs to the lamp.
            for i in range(4):
                if east:tile(3.91,.3+i*.85,.045,.2,'#448e99')
                if south:tile(.3+i*.85,3.91,.2,.045,'#448e99')
            glow=Image.new('RGBA',im.size);gg=ImageDraw.Draw(glow)
            gg.polygon([p(3.3,3.7),p(3.8,3.25),p(4.35,3.8),p(3.8,4.3)],fill=(245,198,131,24))
            im=Image.alpha_composite(im,glow)
        atlas.paste(im,((index%4)*512,(index//4)*256))
    return atlas
