"""Architectural light is baked into matching on/off frames, never a ticker."""
from PIL import Image, ImageDraw

def apply(image,model,powered):
    if not powered:return image
    name,w,d,h,_,_,accent,role=model
    if role=='car':return image
    overlay=Image.new('RGBA',image.size);g=ImageDraw.Draw(overlay)
    def p(x,y,z=0):return round(128+(x-y)*39),round(140+(x+y)*20-z)
    if role=='lamp':
        # Warm pool under the actual lamp head, with hard-edged pixel falloff.
        for radius,alpha in [(20,12),(13,20),(7,26)]:
            x,y=p(.06,.35)
            g.ellipse((x-radius,y-radius//2,x+radius,y+radius//2),fill=(241,198,132,alpha))
    else:
        rgb=tuple(int(accent[i:i+2],16) for i in [1,3,5])
        # Spill stays attached to the fascia/door, rather than floating bloom.
        g.polygon([p(.1,d,5),p(w-.1,d,5),p(w-.1,d,20),p(.1,d,20)],fill=(*rgb,16))
        g.polygon([p(w,.1,5),p(w,d-.1,5),p(w,d-.1,20),p(w,.1,20)],fill=(*rgb,22))
        g.line([p(.15,d,3),p(w-.15,d,3)],fill=(*rgb,70),width=2)
        g.line([p(w,.15,3),p(w,d-.15,3)],fill=(*rgb,60),width=2)
    return Image.alpha_composite(image,overlay)
