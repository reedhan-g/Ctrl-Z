"""Six original facility designs; stable footprints and simulation identities."""
from city_architecture import Painter

SERVICES={'grid','hospital','water','homes','telecom','logistics'}


def render(model,powered,font):
    name,w,d,h,_,_,accent,_=model
    p=Painter(powered,font);light=accent if powered else '#3c4b59'
    white='#c2f3e9' if powered else '#2b414f'
    warm='#f4d09a' if powered else '#2a3b4a'
    colors=('#38515d','#203746','#71848c')
    p.box(0,0,w,d,0,5,('#5f6b75','#344653','#8d979a'))

    def wing(x,y,bw,bd,b,t,kind='windows'):
        p.box(x,y,bw,bd,b,t,colors)
        for side,span in [(0,bw),(1,bd)]:
            for z in range(b+8,t-7,20):
                p.face(side,x,y,bw,bd,.04,z-3,span-.08,2,'#63747f')
                cols=max(2,round(span*3))
                for i in range(cols):
                    u=.1+i*(span-.12)/cols;ww=(span-.3)/cols
                    p.face(side,x,y,bw,bd,u,z,ww,12,'#112331')
                    p.face(side,x,y,bw,bd,u+.02,z+2,ww-.04,8,white if (i+z//20)%3 else warm)
                    p.face(side,x,y,bw,bd,u+.02,z+5,ww-.04,1,'#304653')
        p.roof(x,y,bw,bd,t,colors)

    def entrance(side,text,z=25):
        span=w if side==0 else d
        p.sign(side,0,0,w,d,z,text,light)
        p.face(side,0,0,w,d,.6,5,.65,19,'#122330')
        p.face(side,0,0,w,d,.64,7,.25,14,white)
        p.face(side,0,0,w,d,.94,7,.25,14,white)
        p.face(side,0,0,w,d,.9,8,.03,12,'#889c9e')
        p.face(side,0,0,w,d,.56,4,.73,1,'#c1c2ac')

    if name=='hospital':
        # Low emergency wing and taller inpatient block, rather than a shop roof.
        wing(.03,.03,1.84,1.84,5,32)
        wing(.1,.1,1.45,1.15,32,h)
        entrance(0,'ST MIRA');entrance(1,'EMERGENCY')
        p.box(.14,1.66,1.4,.18,22,25,('#6c818c','#3e5665',light))
        # Medical cross on both the roof plane and emergency facade.
        p.poly([(.65,.3,h+4),(.85,.3,h+4),(.85,1,h+4),(.65,1,h+4)],light)
        p.poly([(.4,.55,h+4),(1.1,.55,h+4),(1.1,.75,h+4),(.4,.75,h+4)],light)
        p.face(0,0,0,w,d,.15,14,.28,3,light);p.face(0,0,0,w,d,.25,10,.08,11,light)
        p.vent(1.5,.35,.23,.5,35)
    elif name=='grid':
        # Control room behind an exposed transformer yard and protective fence.
        wing(.08,.08,1.72,.6,5,h)
        p.sign(0,.08,.08,1.72,.6,28,'GRID 01',light)
        for i in range(3):
            x=.2+i*.5
            p.box(x,.88,.35,.6,5,22,('#606f78','#3c5260','#9aa29d'))
            for j in range(4):p.line([(x+.04+j*.08,.88,7),(x+.04+j*.08,.88,21)],'#9aa1a1')
            for y in [1,1.3]:
                p.box(x+.12,y,.1,.1,22,29,('#84918b','#4b6269',warm))
        for i in range(10):p.line([(.08+i*.18,1.76,5),(.08+i*.18,1.76,18)],'#7f8e92')
        for z in [9,17]:p.line([(.08,1.76,z),(1.82,1.76,z)],'#829398')
        p.face(1,0,0,w,d,.9,8,.55,12,'#233643')
        p.text(1,0,0,w,d,.92,11,'HV',warm)
    elif name=='water':
        # Two cylindrical pressure tanks above the pump hall.
        wing(.03,.03,1.84,1.84,5,28);entrance(0,'WATER')
        for x,y in [(.5,.7),(1.25,.7)]:
            cx,cy=p.p(x,y,35)
            p.g.rectangle((cx-12,cy-17,cx+12,cy+1),fill='#547480')
            p.g.ellipse((cx-12,cy-5,cx+12,cy+7),fill='#52707e',outline='#9eb2b3')
            p.g.ellipse((cx-12,cy-23,cx+12,cy-11),fill='#8aabae',outline='#c0cbc1')
            p.g.line((cx-11,cy-10,cx+11,cy-10),fill=light,width=2)
        p.line([(.2,1.45,31),(1.6,1.45,31),(1.6,1.45,18)],'#a3b4b1',3)
        p.sign(1,0,0,w,d,25,'PUMP 02',light)
    elif name=='homes':
        # Tall inhabited block, recessed stair wing and a low garden terrace.
        wing(.03,.03,1.84,1.84,5,29)
        wing(.12,.12,1.25,1.5,29,h)
        entrance(0,'MAPLE');entrance(1,'HOMES')
        for z in range(37,h-8,22):
            p.box(.2,1.55,.9,.12,z,z+2,('#657582','#405360','#93a4a6'))
            for i in range(6):p.line([(.23+i*.14,1.65,z+2),(.23+i*.14,1.65,z+8)],'#9eafb0')
            p.line([(.2,1.65,z+8),(1.1,1.65,z+8)],'#a8b4b6')
        p.plant(1.55,.3,.23,.9,32);p.vent(.3,.3,.5,.6,h+3)
    elif name=='telecom':
        # Exchange podium and a narrow equipment tower with a legible antenna.
        wing(.03,.03,1.84,1.84,5,30)
        wing(.4,.3,.8,1,30,h-15)
        entrance(0,'MERIDIAN');p.sign(1,0,0,w,d,22,'NET',light)
        for z in range(35,h-15,6):p.face(0,.4,.3,.8,1,.1,z,.6,2,'#7b8c99')
        p.line([(.8,.8,h-12),(.8,.8,h+4)],'#b2bec4',2)
        for z in [h-5,h+1]:p.line([(.55,.8,z),(1.05,.8,z)],light,2)
        cx,cy=p.p(1.45,.6,39)
        p.g.ellipse((cx-9,cy-10,cx+8,cy+3),fill='#869aa4',outline='#c2c8c4')
        p.g.line((cx-3,cy+3,cx-3,cy+10),fill='#6c8290',width=2)
    else:
        # Dispatch depot: wide loading doors, clerestory and marked loading apron.
        p.box(.03,.03,1.84,1.84,5,h,('#475365','#2c3f50','#78828e'))
        p.roof(.03,.03,1.84,1.84,h,colors)
        for side in [0,1]:
            p.sign(side,0,0,w,d,27,'DISPATCH' if side==0 else 'EAST 08',light)
            for i in range(3):
                u=.12+i*.56
                p.face(side,0,0,w,d,u,5,.45,20,'#71808a')
                for z in range(7,24,3):p.face(side,0,0,w,d,u,z,.45,1,'#293c4a')
                p.face(side,0,0,w,d,u,23,.45,2,warm)
                p.face(side,0,0,w,d,u,4,.45,1,light)
        for i in range(5):p.line([(.15+i*.33,.1,h+4),(.15+i*.33,1.8,h+4)],'#8a9a9f')
        p.vent(.3,.3,.55,.45,h+3)
    return p.im
