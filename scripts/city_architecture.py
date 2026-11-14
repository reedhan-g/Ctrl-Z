"""Original Meridian architecture, drawn on the existing 39:20 pixel grid.

Ten deliberately different silhouettes and ground-floor uses. No source art,
fonts or pixels from Antahonist are embedded. This is reference-inspired work.
"""
from PIL import Image, ImageDraw

STYLES = {
    'market': ('#344852','#1d303c','#576670','JADE', 'retail'),
    'noodle': ('#54404a','#322d3b','#796368','RAMEN', 'food'),
    'arcade': ('#423e57','#282e43','#696079','PLAY', 'arcade'),
    'walkup': ('#4b414d','#2c303e','#746371','ROW 12', 'homes'),
    'apartments': ('#354c55','#243642','#617780','ORBIT', 'homes'),
    'workshop': ('#4b4e55','#303c47','#7d7c7c','REPAIR', 'works'),
    'warehouse': ('#394b55','#263b48','#637580','DEPOT', 'depot'),
    'cinema': ('#4c3d51','#302b40','#7c6178','LUMEN', 'cinema'),
    'cafe': ('#3a4c53','#223a45','#658084','MOSS', 'food'),
    'studio': ('#314b57','#1c3444','#637b87','RADIO', 'office'),
}


class Painter:
    def __init__(self, powered, font):
        self.im=Image.new('RGBA',(256,256)); self.g=ImageDraw.Draw(self.im)
        self.powered=powered; self.font=font

    def p(self,x,y,z=0): return round(128+(x-y)*39),round(140+(x+y)*20-z)
    def poly(self,pts,c): self.g.polygon([self.p(*p) for p in pts],fill=c)
    def line(self,pts,c,width=1): self.g.line([self.p(*p) for p in pts],fill=c,width=width)
    def box(self,x,y,w,d,b,t,colors):
        self.poly([(x,y+d,t),(x+w,y+d,t),(x+w,y+d,b),(x,y+d,b)],colors[0])
        self.poly([(x+w,y,t),(x+w,y+d,t),(x+w,y+d,b),(x+w,y,b)],colors[1])
        self.poly([(x,y,t),(x+w,y,t),(x+w,y+d,t),(x,y+d,t)],colors[2])
    def face(self,side,x,y,w,d,u,z,ww,hh,c):
        if side==0:self.poly([(x+u,y+d,z),(x+u+ww,y+d,z),(x+u+ww,y+d,z+hh),(x+u,y+d,z+hh)],c)
        else:self.poly([(x+w,y+u,z),(x+w,y+u+ww,z),(x+w,y+u+ww,z+hh),(x+w,y+u,z+hh)],c)
    def text(self,side,x,y,w,d,u,z,text,c):
        for i,ch in enumerate(text):
            for n,v in enumerate(self.font[ch]):
                if v=='1':self.face(side,x,y,w,d,u+(i*4+n%3)/39,z+4-n//3,1/39,1,c)
    def sign(self,side,x,y,w,d,z,text,accent):
        span=w if side==0 else d
        self.face(side,x,y,w,d,.08,z,span-.16,10,'#111d29')
        self.face(side,x,y,w,d,.08,z,span-.16,1,accent)
        self.text(side,x,y,w,d,(span-(len(text)*4-1)/39)/2,z+3,text,accent)
    def roof(self,x,y,w,d,z,colors):
        self.box(x,y,w,d,z,z+3,colors)
        self.poly([(x+.1,y+.1,z+3),(x+w-.1,y+.1,z+3),(x+w-.1,y+d-.1,z+3),(x+.1,y+d-.1,z+3)],'#1c2b38')
    def plant(self,x,y,w,d,z):
        self.box(x,y,w,d,z,z+4,('#59646d','#334c55','#7b8a89'))
        self.box(x+.02,y+.02,w-.04,d-.04,z+4,z+7,('#496256','#2f4c48','#6b8370'))
    def vent(self,x,y,w,d,z):
        self.box(x,y,w,d,z,z+7,('#50616b','#304653','#819092'))
        for i in range(5):self.line([(x+.04+i*(w-.08)/5,y+.02,z+8),(x+.04+i*(w-.08)/5,y+d-.02,z+8)],'#253946')


def render(model,powered,font):
    name,w,d,h,floors,_,accent,_=model
    front,side,top,word,kind=STYLES[name]
    p=Painter(powered,font)
    light=accent if powered else '#3c4857'
    warm='#efd0a0' if powered else '#293b49'
    cool='#8fd5dc' if powered else '#293d4b'
    # A podium is visually distinct from the street: clear edge and thresholds.
    p.box(0,0,w,d,0,4,('#4b5866','#2a3c49','#75808a'))
    # Low street wings and upper setbacks avoid an extruded rectangle skyline.
    stepped=name in ['market','apartments','studio']
    low=28 if name=='market' else 32 if name=='studio' else 49
    sections=[(.03,.03,w-.06,d-.06,4,low if stepped else h)]
    if stepped:
        sections.append((.12,.1,w-.45,d-.42,low,h))
    for x,y,bw,bd,b,z in sections:
        p.box(x,y,bw,bd,b,z,(front,side,top))
        for face,span in [(0,bw),(1,bd)]:
            # Recessed pier bays, tiny joints and consistent floor modules.
            for level in range(max(28,b+4),z-8,22):
                p.face(face,x,y,bw,bd,.03,level-2,span-.06,2,'#53616e')
                cols=4 if span>1.5 else 3
                for col in range(cols):
                    u=.1+col*(span-.12)/cols; ww=(span-.28)/cols
                    p.face(face,x,y,bw,bd,u,level,ww,15,'#101e2b')
                    c=warm if (col+level//22+face)%4==0 else cool if (col+face)%3==1 else '#2b4352'
                    p.face(face,x,y,bw,bd,u+.025,level+2,ww-.05,10,c)
                    p.face(face,x,y,bw,bd,u+.025,level+6,ww-.05,1,'#21313f')
                    p.face(face,x,y,bw,bd,u+ww*.5,level+1,.025,12,'#3e5260')
                    # AC units on selected bays, never every identical window.
                    if col==0 and name in ['walkup','market']:
                        p.face(face,x,y,bw,bd,u,level-5,.25,4,'#6e7680')
                        for i in range(3):p.face(face,x,y,bw,bd,u+.025,level-4+i,.2,.4,'#283743')
            for level in range(b+5,z-3,6):
                for i in range(int(span*8)):
                    if (i+level//6)%5==0:p.face(face,x,y,bw,bd,.04+i*.11,level,.07,1,'#46515e' if face==0 else '#2c3e4a')
        p.roof(x,y,bw,bd,z,(front,side,top))
    # Entrances and glazing project onto the masonry planes, with actual piers.
    for face,span in [(0,w),(1,d)]:
        p.face(face,0,0,w,d,.12,4,span-.24,17,'#101c29')
        if kind in ['works','depot']:
            for i in range(3):
                u=.13+i*(span-.2)/3; width=(span-.35)/3
                p.face(face,0,0,w,d,u,5,width,14,'#54626c')
                for z in range(6,18,3):p.face(face,0,0,w,d,u,z,width,1,'#263844')
        else:
            for i in range(3):
                u=.14+i*(span-.22)/3;ww=(span-.38)/3
                p.face(face,0,0,w,d,u,5,ww,14,'#3b6875' if powered else '#263a47')
                p.face(face,0,0,w,d,u+.025,6,.05,12,warm if i==0 else cool)
                p.face(face,0,0,w,d,u,5,ww,1,light)
        # One recessed street-side door, architectural handle and step.
        u=span-.4
        p.face(face,0,0,w,d,u,4,.25,17,'#101a27')
        p.face(face,0,0,w,d,u+.03,6,.18,12,'#46717b' if powered else '#2d414e')
        p.face(face,0,0,w,d,u+.19,9,.025,2,'#d1b993')
        p.face(face,0,0,w,d,u-.03,3,.31,1,'#a1aaa5')
        p.sign(face,0,0,w,d,21,word if face==0 else ('OPEN' if kind in ['food','retail'] else word),light)
    if kind=='food':
        # Broad original awning, low pavilion roof and exhaust silhouette.
        for i in range(9):
            a=.06+i*(w-.12)/9
            p.poly([(a,d,21),(a+(w-.12)/9,d,21),(a+(w-.12)/9,d+.10,17),(a,d+.10,17)],light if i%3==0 else '#354451')
        p.vent(.25,.25,.6,.45,h+3)
        if name=='noodle':
            for x in [.35,.85,1.25]:
                if x<w-.15:p.box(x,d-.02,.09,.09,12,17,('#c38b68' if powered else '#41414a','#4c3443',warm))
        else:p.plant(w-.55,.2,.32,.5,h+3)
    elif kind=='homes':
        for z in range(28,h-6,22):
            # Fine balcony rails and dark inset terrace give a lived-in facade.
            p.box(.18,d-.07,w*.5,.1,z,z+2,('#5b6570','#354352','#859092'))
            for i in range(5):p.line([(.2+i*w*.1,d+.02,z+2),(.2+i*w*.1,d+.02,z+8)],'#71838a')
            p.line([(.18,d+.02,z+8),(.18+w*.5,d+.02,z+8)],'#8b989c')
        p.vent(.25,.2,.45,.5,h+3)
        if stepped:p.plant(w-.38,.3,.2,.8,low+3)
        else:
            p.box(.15,.15,.45,.65,h+3,h+13,(front,side,top))
            p.line([(.9,.5,h+7),(1.4,.5,h+7)],'#8c9297')
    elif kind in ['works','depot']:
        if kind=='works':
            for i in range(3):
                x=.15+i*.53
                p.poly([(x,.3,h+3),(x+.45,.3,h+10),(x+.45,1.35,h+10),(x,1.35,h+3)],'#667a85')
                p.poly([(x,.3,h+3),(x+.45,.3,h+10),(x+.45,.3,h+3)],cool)
        else:
            for i in range(6):p.line([(.15+i*.28,.1,h+4),(.15+i*.28,d-.1,h+4)],'#667987')
            p.box(.15,.2,.65,.35,h+3,h+8,('#626b71','#364752','#889390'))
    elif kind in ['cinema','arcade']:
        # Different facade graphics; the marquee remains part of the structure.
        p.box(.15,.2,w-.35,.1,h+3,h+18,(front,side,top))
        x,y=p.p(.3,.31,h+14)
        p.g.line((x,y,x+int((w-.6)*30),y+int((w-.6)*15)),fill=light,width=2)
        p.face(1,0,0,w,d,.2,35,.6,24,'#111f2e')
        for i in range(6):p.face(1,0,0,w,d,.24+abs(3-i)*.035,38+i*3,.28,1,light)
        p.vent(w-.6,d-.6,.4,.35,h+3)
    else:
        p.vent(.22,.22,.6,.55,h+3)
        if name=='studio':
            p.line([(.5,.5,h+10),(.5,.5,h+22)],'#9aa5ac',2)
            p.line([(.3,.5,h+19),(.7,.5,h+19)],light)
        if name=='market':p.plant(w-.3,.4,.18,.7,low+3)
    return p.im
