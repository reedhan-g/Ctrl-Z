import {test,expect} from '@playwright/test';
import {buildings} from '../../src/simulation';
import {iso} from '../../src/geometry';
import {worldToScreen} from '../../src/worldCamera';

// Repeat this same UI-driven review before and after both polish checkpoints.
test('captures curbside streets and landmark normal hover selection states',async({page},info)=>{
 test.setTimeout(120000);await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./simulation.html');await expect(page.locator('canvas')).toBeVisible();
 const host=page.locator('.city-canvas');
 const capture=async(name:string)=>page.locator('.world').screenshot({path:info.outputPath(`${name}.png`)});
 await capture('opening-street');
 for(const id of ['hospital','water','logistics'] as const){
  const b=buildings.find(b=>b.id===id)!;
  await page.locator('.building-list').getByRole('button',{name:new RegExp(b.name)}).click();
  await expect(page.getByRole('region',{name:'Building inspection'}).getByRole('heading',{name:b.name,exact:true})).toBeVisible();
  await capture(`${id}-selected`);await page.getByRole('button',{name:'Close inspection'}).click();
  await page.mouse.move(0,0);await capture(`${id}-normal`);
  if(info.project.name==='desktop'){
   await host.scrollIntoViewIfNeeded();const box=(await host.boundingBox())!,view=await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!));
   const p=worldToScreen(iso(b.x+.9,b.y+.9,b.height*.45),view);
   await page.mouse.move(box.x+p.x,box.y+p.y);await expect.poll(()=>host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.selection!).hovered)).toBe(id);
   await capture(`${id}-hover`);await page.mouse.move(0,0);
  }
 }
});

test('reviews parked curbside bays across market residential and logistics streets',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./simulation.html');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Zoom in',exact:true}).click();
 for(const [name,x,y] of [['market',4.5,-4.25],['housing',4.5,11],['exchange',29.5,18]] as const){
  const expand=page.getByRole('button',{name:'Expand minimap'});if(await expand.isVisible())await expand.click();
  const map=page.getByRole('application',{name:'Interactive city minimap'});await map.scrollIntoViewIfNeeded();
  const target=await map.evaluate((el,p)=>{const q=new DOMPoint(p.x,p.y).matrixTransform((el as SVGSVGElement).getScreenCTM()!);return {x:q.x,y:q.y};},iso(x,y));
  if(info.project.name==='mobile')await page.touchscreen.tap(target.x,target.y);else await page.mouse.click(target.x,target.y);
  if(info.project.name==='mobile')await page.getByRole('button',{name:'Collapse minimap'}).click();
  await expect(page.getByRole('region',{name:'Building inspection'})).not.toBeVisible();
  await page.locator('.world').screenshot({path:info.outputPath(`parking-${name}.png`)});
 }
});
