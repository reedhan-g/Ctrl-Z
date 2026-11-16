import {test,expect} from '@playwright/test';
import {buildings} from '../../src/simulation';
import {spriteBounds} from '../../src/spriteHit';
import {iso} from '../../src/geometry';
import {worldToScreen} from '../../src/worldCamera';

test('all six services frame their complete silhouettes clear of measured overlays',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./simulation.html');await expect(page.locator('canvas')).toBeVisible();
 const host=page.locator('.city-canvas'),panel=page.getByRole('region',{name:'Building inspection'});
 const verify=async(id:string)=>{
  await expect.poll(()=>host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.selection!).selected)).toBe(id);
  const b=buildings.find(b=>b.id===id)!,bounds=spriteBounds(b.id,b.x,b.y);
  await expect.poll(async()=>{
   const data=await host.evaluate(el=>({view:JSON.parse((el as HTMLElement).dataset.camera!),inspection:JSON.parse((el as HTMLElement).dataset.inspection||'null')}));
   if(!data.inspection)return 1e5;
   const p=worldToScreen({x:bounds.x+bounds.width/2,y:bounds.y+bounds.height/2},data.view),f=data.inspection.free;
   return Math.hypot(p.x-f.x-f.width/2,p.y-f.y-f.height/2);
  }).toBeLessThan(1);
  const data=await host.evaluate(el=>({view:JSON.parse((el as HTMLElement).dataset.camera!),free:JSON.parse((el as HTMLElement).dataset.inspection!).free}));
  const a=worldToScreen(bounds,data.view),z=worldToScreen({x:bounds.x+bounds.width,y:bounds.y+bounds.height},data.view),f=data.free;
  expect(a.x).toBeGreaterThanOrEqual(f.x-1);expect(a.y).toBeGreaterThanOrEqual(f.y-1);
  expect(z.x).toBeLessThanOrEqual(f.x+f.width+1);expect(z.y).toBeLessThanOrEqual(f.y+f.height+1);
  await expect(panel.getByRole('heading',{name:b.name,exact:true})).toBeVisible();
  const overlaps=await host.evaluate((el,r)=>{const box=el.getBoundingClientRect();return [...el.parentElement!.querySelectorAll('.minimap,.inspector,.timeline,.map-controls,.world-top,.map-caption,.map-hint')].some(node=>{const q=node.getBoundingClientRect();return r.x<q.right-box.left&&r.right>q.left-box.left&&r.y<q.bottom-box.top&&r.bottom>q.top-box.top;});},{x:a.x,y:a.y,right:z.x,bottom:z.y});
  expect(overlaps).toBe(false);
 };
 for(const b of buildings){
  await page.locator('.building-list').getByRole('button',{name:new RegExp(b.name)}).click();await verify(b.id);
  await host.scrollIntoViewIfNeeded();const box=(await host.boundingBox())!,view=await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!)),point=worldToScreen(iso(b.x+.9,b.y+.9,b.height*.45),view),scroll=await page.evaluate(()=>scrollY);
  if(info.project.name==='mobile')await page.touchscreen.tap(box.x+point.x,box.y+point.y);else await page.mouse.click(box.x+point.x,box.y+point.y);
  await verify(b.id);expect(await page.evaluate(()=>scrollY)).toBe(scroll);
  expect((await host.boundingBox())!.height).toBe(box.height);
  await page.locator('.world').screenshot({path:info.outputPath(`framed-${b.id}.png`)});
 }
 if(info.project.name==='mobile'){await panel.getByRole('button',{name:'Collapse inspection'}).click();await verify('logistics');await panel.getByRole('button',{name:'Expand inspection'}).click();await verify('logistics');}
 // Reselecting the same service after manual navigation must also reframe.
 await host.scrollIntoViewIfNeeded();await host.focus();await page.keyboard.press('ArrowLeft');
 await page.locator('.building-list').getByRole('button',{name:/East delivery hub/}).click();await verify('logistics');
 const expand=page.getByRole('button',{name:'Expand minimap'});if(await expand.isVisible())await expand.click();
 if(info.project.name==='desktop')await page.getByLabel('Minimap landmark navigation').selectOption('hospital');else await page.locator('[data-landmark="hospital"]').press('Enter');await verify('hospital');
 if(await expand.isVisible())await expand.click();
 const marker=page.locator('[data-landmark="water"]');await marker.scrollIntoViewIfNeeded();
 const target=await marker.evaluate(el=>{const q=new DOMPoint(0,0).matrixTransform((el as SVGGraphicsElement).getScreenCTM()!);return {x:q.x,y:q.y};});
 if(info.project.name==='mobile')await page.touchscreen.tap(target.x,target.y);else await page.mouse.click(target.x,target.y);await verify('water');
 // A real canvas hit uses the same framing path, without changing page layout.
 await host.scrollIntoViewIfNeeded();const box=(await host.boundingBox())!,view=await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!));
 const b=buildings.find(b=>b.id==='water')!,bounds=spriteBounds(b.id,b.x,b.y),p=worldToScreen({x:bounds.x+bounds.width/2,y:bounds.y+bounds.height/2},view);
 await page.mouse.click(box.x+p.x,box.y+p.y);await verify('water');
});
