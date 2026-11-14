"""Original Ctrl Z pixel architecture. Rebuild with Python + Pillow; no source images.

All coordinates use the game's 39:20 oblique projection. No antialiasing,
external fonts, downloaded textures or random glyphs. Frames share one atlas.
"""
from pathlib import Path
import json
from PIL import Image, ImageDraw
import lantern_art
import city_architecture
import street_art
import infrastructure_art
import light_art

ROOT = Path(__file__).resolve().parents[1]
MODELS = [
    # name, footprint, height, floors, original sign, accent, architectural role
    ('market',1.9,1.65,92,4,'NIGHT MARKET','#f46daf','shop'),
    ('noodle',1.65,1.4,46,2,'NOODLE BAR','#ffc176','diner'),
    ('arcade',1.75,1.85,78,3,'AFTER HOURS','#ba8ef3','arcade'),
    ('walkup',1.6,1.65,84,4,'MAPLE COURT','#d285bb','home'),
    ('apartments',1.75,1.8,112,5,'ORBIT HOUSE','#7edee7','home'),
    ('workshop',1.9,1.7,52,2,'REPAIR WORKS','#efbc75','factory'),
    ('warehouse',1.9,1.9,40,1,'FREIGHT 08','#7bc6d0','depot'),
    ('cinema',1.9,1.65,68,3,'LUMEN CINEMA','#ee72bb','arcade'),
    ('cafe',1.65,1.45,60,3,'CORNER CAFE','#74d4d4','diner'),
    ('studio',1.55,1.9,96,4,'RADIO STUDIO','#be99f3','shop'),
    ('grid',1.9,1.9,49,2,'GRID / 01','#ecc774','grid'),
    ('hospital',1.9,1.9,94,4,'ST MIRA','#74e4e7','hospital'),
    ('water',1.9,1.9,57,2,'WATERWORKS','#77c9cb','water'),
    ('homes',1.9,1.9,115,5,'MAPLE HOMES','#ed83bd','home'),
    ('telecom',1.9,1.9,72,3,'MERIDIAN NET','#bfa2f3','telecom'),
    ('logistics',1.9,1.9,40,1,'EAST DISPATCH','#e7bb76','depot'),
    ('carAmber',.38,.8,14,0,'','#e9b164','car'),
    ('carCyan',.38,.8,14,0,'','#76becb','car'),
    ('carPink',.38,.8,14,0,'','#d37caa','car'),
    ('streetlamp',.12,.12,36,0,'','#ebc082','lamp'),
]
MODELS.extend(lantern_art.MODELS)
# 3x5 hand-authored bitmap lettering, original readable words rather than glyph spam.
FONT = dict(zip('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 /-',[
 '010101111101101','110101110101110','011100100100011','110101101101110',
 '111100110100111','111100110100100','011100101101011','101101111101101',
 '111010010010111','001001001101010','101101110101101','100100100100111',
 '101111111101101','101111111111101','010101101101010','110101110100100',
 '010101101111011','110101110101101','011100010001110','111010010010010',
 '101101101101111','101101101101010','101101111111101','101101010101101',
 '101101010010010','111001010100111','111101101101111','010110010010111',
 '110001010100111','110001010001110','101101111001001','111100110001110',
 '011100110101010','111001010010010','010101010101010','010101011001110',
 '000000000000000','001001010100100','000000111000000']))

def make(model, powered):
    name,w,d,h,floors,sign,accent,role=model
    if role == 'yard':
        return lantern_art.render(model, powered, FONT)
    if name in city_architecture.STYLES:
        return city_architecture.render(model, powered, FONT)
    if name in infrastructure_art.SERVICES:
        return infrastructure_art.render(model, powered, FONT)
    im=Image.new('RGBA',(256,256)); g=ImageDraw.Draw(im)
    light=accent if powered else '#41404f'
    warm='#e7b36f' if powered else '#343643'
    def p(x,y,z=0): return (round(128+(x-y)*39),round(140+(x+y)*20-z))
    def poly(points,c): g.polygon([p(*q) for q in points],fill=c)
    def line(points,c,width=1): g.line([p(*q) for q in points],fill=c,width=width)
    def box(x,y,bw,bd,z,top,colors=('#35303f','#242936','#454252')):
        poly([(x,y+bd,top),(x+bw,y+bd,top),(x+bw,y+bd,z),(x,y+bd,z)],colors[0])
        poly([(x+bw,y,top),(x+bw,y+bd,top),(x+bw,y+bd,z),(x+bw,y,z)],colors[1])
        poly([(x,y,top),(x+bw,y,top),(x+bw,y+bd,top),(x,y+bd,top)],colors[2])
    def panel(side,u,z,ww,hh,c):
        if side==0: poly([(u,d+.006,z),(u+ww,d+.006,z),(u+ww,d+.006,z+hh),(u,d+.006,z+hh)],c)
        else: poly([(w+.006,u,z),(w+.006,u+ww,z),(w+.006,u+ww,z+hh),(w+.006,u,z+hh)],c)
    def letters(side,u,z,text,c,scale=1):
        # Rasterize the sign directly onto the facade's shared projection.
        for i,ch in enumerate(text):
            for n,v in enumerate(FONT.get(ch,FONT[' '])):
                if v=='1': panel(side,u+(i*4+n%3)*scale/39,z+(4-n//3)*scale,scale/39,scale,c)
    def board(side,u,z,text):
        ww=(len(text)*4+4)/39
        panel(side,u,z,ww,11,'#121923');panel(side,u+.02,z+.7,ww-.04,1,light)
        panel(side,u+.02,z+9,ww-.04,1,light);letters(side,u+2/39,z+3,text,light)
    if role=='car':
        box(0,0,w,d,3,9,(accent,'#344456','#b1a0a7'))
        box(.02,.23,w-.04,.35,9,15,('#3a3b51','#293344',accent))
        poly([(.02,.23,15),(w-.02,.23,15),(w-.02,.34,15),(.02,.34,15)],'#8ba9b8')
        for yy in [.15,.65]:
            x,y=p(w,yy,3);g.ellipse((x-3,y-2,x+3,y+3),fill='#131c29',outline='#666774')
        for xx in [.02,w-.09]:box(xx,d-.02,.07,.04,5,7,('#fff0b0','#d3a968','#fff0b0'))
        return im
    if role=='lamp':
        box(0,0,.12,.12,0,3,('#54525d','#2f3849','#91818d'))
        line([(.06,.06,3),(.06,.06,36),(.06,.38,36)],'#84778b',2)
        box(.01,.29,.1,.2,32,35,('#655e74','#363d50',light))
        if powered:
            x,y=p(.06,.35);g.ellipse((x-9,y-4,x+9,y+5),fill='#e5b87424')
        return im
    # Stone plinth, recessed storefront, two shaded masonry faces.
    box(0,0,w,d,0,5,('#494655','#333b48','#686071'))
    box(.03,.03,w-.06,d-.06,5,h,('#34303e','#202735','#3c3c4c'))
    for z in range(7,h-4,4):
        for side,span in [(0,w),(1,d)]:
            for col in range(int(span*13)):
                if (col+z//4)%5==0: panel(side,.03+col*.075,z,.055,1,'#443b4c' if side==0 else '#2e3444')
    floor_step=(h-26)/max(1,floors-1)
    for floor in range(max(1,floors-1)):
        z=27+floor*floor_step
        for side,span in [(0,w),(1,d)]:
            panel(side,.04,z-2,span-.08,2,'#626071' if side==0 else '#414558')
            for col in range(3):
                u=.14+col*(span-.2)/3; ww=(span-.35)/3
                panel(side,u-.02,z+1,ww+.04,13,'#151b28')
                lit=powered and (col+floor+(0 if side else 1))%3==0
                panel(side,u,z+3,ww,9,light if lit else '#263342')
                panel(side,u+.035,z+3,ww*.38,9,'#a4c6cb' if lit else '#354252')
                panel(side,u+ww*.5,z+2,.025,12,'#171f2b')
                panel(side,u,z+7,ww,1,'#1b2534')
    # A glass door and wide display windows; awning has an actual projected depth.
    for side,span in [(0,w),(1,d)]:
        panel(side,.12,5,span-.24,17,'#101b28')
        for col in range(3):
            u=.16+col*(span-.28)/3
            panel(side,u,6,(span-.4)/3,14,'#568494' if powered else '#29394a')
            panel(side,u+.04,8,.025,10,'#b1d6d0' if powered else '#455464')
        panel(side,span*.48,5,.04,17,'#181b28')
        board(side,.08,22,sign if side==0 else ('OPEN LATE' if role in ['shop','diner','arcade'] else 'MERIDIAN'))
    if role in ['shop','diner','arcade','home']:
        for i in range(8):
            a=.06+i*(w-.12)/8
            poly([(a,d,21),(a+(w-.12)/8,d,21),(a+(w-.12)/8,d+.24,17),(a,d+.24,17)],light if i%2==0 else '#29384b')
        # External stair flights and balconies are architectural, never emissive wireframes.
        if role!='diner':
            for z in range(28,h-10,20):
                box(w-.24,.1,.32,.72,z,z+2,('#524457','#272e3b','#696071'))
                for yy in [.1,.3,.5,.7]: line([(w+.1,yy,z+2),(w+.1,yy,z+9)],'#7e7181')
                line([(w+.1,.1,z+9),(w+.1,.8,z+9)],'#7e7181')
                for k in range(8): line([(w+.08,.14+k*.07,z+2+k*2),(w+.25,.14+k*.07,z+2+k*2)],'#857486')
    if role in ['shop','arcade']:
        # Projecting vertical lightbox at the front corner, readable three-letter mark.
        x,y=p(w+.06,d+.04,h-12);g.rectangle((x-6,y,x+5,y+38),fill='#282331',outline=light)
        for i,ch in enumerate('LUX' if role=='arcade' else 'SHOP'):
            for n,v in enumerate(FONT[ch]):
                if v=='1':g.point((x-2+n%3,y+3+i*8+n//3),fill=light)
        # An original illustrated facade poster, not a generic glowing edge.
        panel(0,.2,38,.66,32,'#172536');panel(0,.22,39,.62,30,light)
        panel(0,.25,40,.56,28,'#25303f')
        for k in range(7):
            panel(0,.33+abs(3-k)*.05,45+k*2,.22,1,light)
        letters(0,.28,62,'LUX',light)
    # Recessed roof: raised parapets, railing, mechanical plant and ducts.
    box(.02,.02,w-.04,d-.04,h,h+3,('#5a4b61','#3d4054','#676071'))
    poly([(.14,.14,h+3),(w-.14,.14,h+3),(w-.14,d-.14,h+3),(.14,d-.14,h+3)],'#252c38')
    box(.3,.25,.48,.5,h+3,h+12,('#525365','#383f50','#727082'))
    for i in range(5): line([(.32+i*.08,.26,h+13),(.32+i*.08,.68,h+13)],'#303748')
    box(w-.6,d-.6,.32,.35,h+3,h+8,('#4f4b59','#363e4c','#77717c'))
    for a in [.12,.42,.72,1.02,1.32]:
        if a<w-.1:line([(a,.08,h+3),(a,.08,h+12)],'#6b6577')
    line([(.1,.08,h+12),(w-.12,.08,h+12)],'#7d7388')
    if role=='diner':
        # Low tiled roof pavilion with two chimney stacks and striped canopy.
        box(.18,.12,w-.36,.55,h+3,h+9,('#544259','#303b4a','#6c5a70'))
        for i in range(8):line([(.2+i*.14,.12,h+10),(.2+i*.14,.68,h+10)],'#817087')
        for x in [.4,.85]:box(x,.3,.14,.14,h+9,h+19,('#595564','#3a4354','#9b8c98'))
    if role=='home':
        # Roof stairwell and elevated laundry frame, differing from retail roofs.
        box(.12,.12,.45,.8,h+3,h+17,('#514253','#333345','#786077'))
        line([(.8,.9,h+7),(1.5,.9,h+7)],'#9a8395')
        for i in range(3):box(.82+i*.22,.89,.14,.02,h+1,h+6,('#787487','#4d4a61','#a79eac'))
    if role=='factory':
        # Sawtooth ventilators and a real external duct silhouette.
        for i in range(3):box(.3+i*.45,.4,.3,.85,h+3,h+14,('#64616d','#3f4856','#8d8492'))
        line([(w,.5,14),(w+.1,.5,14),(w+.1,.5,h+20)],'#887c82',3)
    if role=='arcade':
        # Rooftop cinema/arcade marquee with an intentional abstract star motif.
        box(.15,.2,w-.3,.1,h+3,h+26,('#333041','#252737','#75506f'))
        for k in range(5):line([(.3+k*.2,.31,h+9),(.3+k*.2,.31,h+20)],light)
    if role=='hospital':
        # Cross follows the roof plane rather than a floating dashboard icon.
        poly([(.8,.35,h+4),(1.05,.35,h+4),(1.05,1.4,h+4),(.8,1.4,h+4)],light)
        poly([(.4,.75,h+4),(1.45,.75,h+4),(1.45,1,h+4),(.4,1,h+4)],light)
    if role=='water':
        x,y=p(1.05,1.05,h+6);g.ellipse((x-16,y-8,x+16,y+7),fill='#69828c',outline='#a2a3af')
        g.rectangle((x-16,y-10,x+16,y),fill='#596e7e');g.ellipse((x-16,y-15,x+16,y-2),fill='#8d9aa6',outline='#b3b1bc')
    if role=='grid':
        for i in range(3):box(.3+i*.45,.9,.22,.46,h+3,h+14,('#6b626a','#454452','#9d8c85'))
    if role=='telecom':
        x,y=p(.95,.95,h+4);g.line((x-11,y,x,y-38,x+11,y),fill='#8b859f',width=2)
        g.line((x,y-38,x,y+2),fill='#b1a7bf');g.ellipse((x-2,y-41,x+2,y-37),fill=light)
    if role in ['factory','depot']:
        for i in range(3):
            panel(0,.17+i*.53,5,.4,15,'#4b4c5d')
            for z in range(6,19,3):panel(0,.17+i*.53,z,.4,1,'#252e3c')
        line([(.12,d+.04,3),(w-.1,d+.04,3)],warm,2)
    return im

atlas=Image.new('RGBA',(2048,((len(MODELS)*2+7)//8)*256)); metadata={}
for i,model in enumerate(MODELS):
    for state in range(2):
        index=i*2+state; atlas.paste(light_art.apply(make(model,state==0),model,state==0),((index%8)*256,(index//8)*256))
    name,w,d,h,*_=model;metadata[name]={'index':i*2,'width':w,'depth':d,'height':h}
out=ROOT/'src/assets';out.mkdir(parents=True,exist_ok=True)
atlas.save(out/'city-atlas.png',optimize=True)
# One reusable street block, exact full-resolution world projection. Streets
# sit at local axis 4 in every block, matching world.ts/minimap/vehicle routes.
street=Image.new('RGBA',(400,224));g=ImageDraw.Draw(street)
def sp(x,y):return (round(200+(x-y)*39),round(12+(x+y)*20))
def tile(x,y,w,d,color):g.polygon([sp(x,y),sp(x+w,y),sp(x+w,y+d),sp(x,y+d)],fill=color)
tile(0,0,5,5,'#252735');tile(4,0,1,5,'#141c29');tile(0,4,5,1,'#141c29')
# Curbs/pavers both beside this junction and the previous block's roads.
for x in [0,3.72]:
    tile(x,0,.28,4,'#444454')
    for i in range(16):g.line([sp(x,i*.25),sp(x+.28,i*.25)],fill='#66606d')
for y in [0,3.72]:
    tile(0,y,4,.28,'#444454')
    for i in range(16):g.line([sp(i*.25,y),sp(i*.25,y+.28)],fill='#66606d')
for i in range(4):
    g.line([sp(4.5,i+.25),sp(4.5,i+.65)],fill='#aaa095')
    g.line([sp(i+.25,4.5),sp(i+.65,4.5)],fill='#aaa095')
for i in range(6):
    for y in [.12,3.1]:tile(4.08,y+i*.12,.84,.055,'#b5aab8')
    for x in [.12,3.1]:tile(x+i*.12,4.08,.055,.84,'#b5aab8')
# Courtyard paving/utility access remain low contrast, not empty violet lots.
for x in range(1,4):
    for y in range(1,4):
        px,py=sp(x,y);g.line((px,py,px+2,py+1),fill='#3e3d4b')
tile(3.2,2.8,.22,.16,'#62616c')
street.save(out/'street-tile.png',optimize=True)
lantern_art.ground(street).save(out/'lantern-yard.png',optimize=True)
street_art.build().save(out/'street-atlas.png',optimize=True)
(ROOT/'src/cityModels.ts').write_text('// Generated by scripts/build-city-art.py; original Ctrl Z art.\nexport const cityModels = '+json.dumps(metadata,indent=1)+' as const;\nexport type CityModel = keyof typeof cityModels;\n',encoding='utf-8')
print(f'Wrote {len(MODELS)} original models, powered/unpowered, one {atlas.width}x{atlas.height} atlas')
