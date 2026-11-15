"""Original sprite-alpha selection outlines and compact opaque-pixel hit rows."""
import json
from PIL import Image, ImageChops, ImageFilter

def build(atlas,models,root):
    outlines=Image.new('RGBA',(2048,((len(models)+7)//8)*256));masks={}
    for i,model in enumerate(models):
        frames=[]
        for j in [i*2,i*2+1]:
            frames.append(atlas.crop(((j%8)*256,(j//8)*256,(j%8+1)*256,(j//8+1)*256)).getchannel('A'))
        # Exclude baked faint light spill; use the same stable silhouette in outages.
        mask=ImageChops.lighter(*frames).point(lambda a:255 if a>=128 else 0)
        bounds=mask.getbbox();rows=[]
        if bounds:
            for y in range(bounds[1],bounds[3]):
                row=[];start=None
                for x in range(257):
                    solid=x<256 and mask.getpixel((x,y))>0
                    if solid and start is None:start=x
                    elif not solid and start is not None:row.extend([start,x]);start=None
                rows.append(row)
        masks[model[0]]={'top':bounds[1] if bounds else 0,'rows':rows}
        fill=Image.new('RGBA',(256,256),(78,235,218,0));fill.putalpha(mask.point(lambda a:18 if a else 0))
        outer=ImageChops.subtract(mask.filter(ImageFilter.MaxFilter(5)),mask)
        edge=Image.new('RGBA',(256,256),(104,244,225,0));edge.putalpha(outer.point(lambda a:215 if a else 0))
        fill=Image.alpha_composite(fill,edge)
        outlines.paste(fill,((i%8)*256,(i//8)*256))
    outlines.save(root/'src/assets/selection-atlas.png',optimize=True)
    (root/'src/spriteHitRows.json').write_text(json.dumps(masks,separators=(',',':')),encoding='utf-8')
