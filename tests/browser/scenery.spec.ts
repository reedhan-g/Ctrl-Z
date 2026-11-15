import {test,expect} from '@playwright/test';
import {iso} from '../../src/geometry';
import {spriteHit} from '../../src/spriteHit';
import {cityScenery} from '../../src/worldScenery';
import {buildings} from '../../src/simulation';

test('scenery information, real canvas selection, minimap marker and keyboard clearing preserve experiment state',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 await page.getByText('Explore city buildings',{exact:true}).click();
 const chooser=page.getByRole('combobox',{name:'Inspect a city building'}),id='scenery:-17.65:-17.7';await chooser.selectOption(id);
 const panel=page.getByRole('region',{name:'Building inspection'}),host=page.locator('.city-canvas');
 await expect(panel.getByRole('heading',{name:'Lantern Café',exact:true})).toBeVisible();
 await expect(panel.getByText('Informational · not simulated',{exact:true})).toBeVisible();
 await expect(panel.getByRole('button',{name:'Send backup supplies'})).toHaveCount(0);
 expect((await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.selection!))).highlighted).toEqual([id]);
 const expand=page.getByRole('button',{name:'Expand minimap'});if(await expand.isVisible())await expand.click();
 await expect(page.locator(`[data-scenery="${id}"]`)).toHaveAttribute('aria-label','Lantern Café: informational scenery, selected');
 if(info.project.name==='mobile')await page.getByRole('button',{name:'Collapse minimap'}).click();
 await page.getByRole('button',{name:'Close inspection'}).click();
 // Click the actual café facade after its transform/framing has changed.
 const view=await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!)),box=(await host.boundingBox())!,p=iso(-17.05,-16.45,12);
 const point={x:box.x+view.origin.x+view.pan.x+p.x*view.scale,y:box.y+view.origin.y+view.pan.y+p.y*view.scale};
 if(info.project.name==='mobile')await page.touchscreen.tap(point.x,point.y);else await page.mouse.click(point.x,point.y);
 await expect(panel.getByRole('heading',{name:'Lantern Café',exact:true})).toBeVisible();
 await page.locator('.world').screenshot({path:info.outputPath('scenery-inspection.png')});
 await page.locator('.building-list').getByRole('button',{name:/St. Mira Hospital/}).click();
 await expect(panel.getByRole('heading',{name:'St. Mira Hospital',exact:true})).toBeVisible();
 expect((await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.selection!))).scenery).toBe(null);
 // Find a genuinely empty visible pixel outside UI surfaces, then click land.
 await host.scrollIntoViewIfNeeded();
 const current=await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!)),area=(await host.boundingBox())!;
 const overlays=await page.locator('.inspector,.minimap,.map-controls').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom};}));
 const models=[...cityScenery.map(b=>({model:b.model,x:b.x,y:b.y})),...buildings.map(b=>({model:b.id,x:b.x,y:b.y}))];
 let empty:{x:number;y:number}|null=null;
 for(let y=25;y<area.height-30&&!empty;y+=12)for(let x=25;x<area.width-25;x+=12){
  const q={x:area.x+x,y:area.y+y};if(overlays.some(r=>q.x>=r.x&&q.x<=r.right&&q.y>=r.y&&q.y<=r.bottom))continue;
  const world={x:(x-current.origin.x-current.pan.x)/current.scale,y:(y-current.origin.y-current.pan.y)/current.scale};
  if(!models.some(b=>spriteHit(b.model,b.x,b.y,world))){empty=q;break;}
 }
 expect(empty).not.toBe(null);
 if(info.project.name==='mobile')await page.touchscreen.tap(empty!.x,empty!.y);else await page.mouse.click(empty!.x,empty!.y);
 await expect(panel).not.toBeVisible();
 await chooser.selectOption(id);
 await page.getByRole('button',{name:'Save experiment',exact:true}).click();
 expect(await page.evaluate(()=>localStorage.getItem('ctrl-z:experiment:v1'))).not.toContain('scenery:');
 await page.getByRole('button',{name:'Resume saved',exact:true}).click();
 await expect(panel).not.toBeVisible();
 expect((await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.selection!))).scenery).toBe(null);
 await chooser.selectOption(id);
 await host.focus();await page.keyboard.press('Escape');await expect(panel).not.toBeVisible();
 await expect(page.getByRole('slider')).toHaveValue('0');
});
