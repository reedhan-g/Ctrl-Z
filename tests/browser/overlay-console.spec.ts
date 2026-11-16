import {test,expect} from '@playwright/test';
import {buildings} from '../../src/simulation';
import {spriteBounds} from '../../src/spriteHit';
import {worldToScreen} from '../../src/worldCamera';

test('expanded timeline and inspection leave all six silhouettes and names clear',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./simulation.html');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();await page.getByRole('button',{name:'Pause simulation'}).click();await page.getByRole('slider').press('End');
 const details=page.getByRole('button',{name:'Timeline details',exact:true});if(await details.isVisible())await details.click();
 const host=page.locator('.city-canvas');
 for(const b of buildings){
  await page.locator(`[data-system="${b.id}"]`).click();
  await expect.poll(async()=>host.evaluate((el,id)=>JSON.parse((el as HTMLElement).dataset.selection!).selected===id,b.id)).toBe(true);
  await expect.poll(async()=>{
   const {view,free}=await host.evaluate(el=>({view:JSON.parse((el as HTMLElement).dataset.camera!),free:JSON.parse((el as HTMLElement).dataset.inspection!).free}));
   const bounds=spriteBounds(b.id,b.x,b.y),p=worldToScreen({x:bounds.x+bounds.width/2,y:bounds.y+bounds.height/2},view);
   return Math.hypot(p.x-free.x-free.width/2,p.y-free.y-free.height/2);
  }).toBeLessThan(1);
  const {view,free}=await host.evaluate(el=>({view:JSON.parse((el as HTMLElement).dataset.camera!),free:JSON.parse((el as HTMLElement).dataset.inspection!).free}));
  const bounds=spriteBounds(b.id,b.x,b.y),top=worldToScreen(bounds,view),bottom=worldToScreen({x:bounds.x+bounds.width,y:bounds.y+bounds.height},view);
  expect(top.y).toBeGreaterThanOrEqual(free.y-1);expect(bottom.y).toBeLessThanOrEqual(free.y+free.height+1);
  const label=page.locator(`[data-landmark-label="${b.id}"]`);await expect(label).toBeVisible();
  const plate=(await label.boundingBox())!,canvas=(await host.boundingBox())!;expect(plate.y+plate.height).toBeLessThanOrEqual(canvas.y+top.y+1);
  if(b.id==='homes')await page.locator('.world').screenshot({path:info.outputPath('expanded-timeline-homes.png')});
 }
});
