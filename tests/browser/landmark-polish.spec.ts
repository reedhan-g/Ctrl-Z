import {test,expect,type Page} from '@playwright/test';
import {buildings} from '../../src/simulation';
import {iso} from '../../src/geometry';
import {spriteBounds} from '../../src/spriteHit';
import {worldToScreen} from '../../src/worldCamera';

const landmark=(page:Page,id:string)=>page.locator(`.landmark-name[data-landmark-label="${id}"]`);
const state=(page:Page)=>page.locator('.city-canvas').evaluate(el=>JSON.parse((el as HTMLElement).dataset.selection!));
async function pointAt(page:Page,id:string){
 const b=buildings.find(b=>b.id===id)!,host=page.locator('.city-canvas');await host.scrollIntoViewIfNeeded();
 const box=(await host.boundingBox())!,view=await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!)),point=worldToScreen(iso(b.x+.9,b.y+.9,b.height*.45),view);
 return {x:box.x+point.x,y:box.y+point.y};
}

test('all six golden landmarks retain readable full names, selection, outage and mobile focus',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 const panel=page.getByRole('region',{name:'Building inspection'}),host=page.locator('.city-canvas');
 for(const b of buildings){
  await page.locator('.building-list').getByRole('button',{name:new RegExp(b.name)}).click();
  await expect(panel.getByRole('heading',{name:b.name,exact:true})).toBeVisible();
  const label=landmark(page,b.id);await expect(label).toBeVisible();await expect(label).toHaveText(b.name);await expect(label).toHaveAttribute('data-emphasized','true');
  expect(parseFloat(await label.evaluate(el=>getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(14);
  await expect.poll(async()=>(await state(page)).landmarks.find((v:{id:string})=>v.id===b.id).gold).toBe(info.project.name==='mobile'?1:.65);
  const box=(await host.boundingBox())!,plate=(await label.boundingBox())!,view=await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!));
  const roof=worldToScreen(spriteBounds(b.id,b.x,b.y),view);
  expect(plate.y+plate.height).toBeLessThanOrEqual(box.y+roof.y+1);
  const overlays=await page.locator('.minimap,.inspector,.timeline,.map-controls').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom};}));
  expect(overlays.some(r=>plate.x<r.right&&plate.x+plate.width>r.x&&plate.y<r.bottom&&plate.y+plate.height>r.y)).toBe(false);
  await page.locator('.world').screenshot({path:info.outputPath(`${b.id}-focused.png`)});
  await page.getByRole('button',{name:'Close inspection'}).click();
  await expect.poll(async()=>(await state(page)).landmarks.find((v:{id:string})=>v.id===b.id).gold).toBe(.18);
  if(info.project.name==='desktop'){
   const point=await pointAt(page,b.id);await page.mouse.move(point.x,point.y);
   await expect.poll(async()=>(await state(page)).landmarks.find((v:{id:string})=>v.id===b.id).gold).toBe(1);
   await expect(label).toHaveAttribute('data-emphasized','true');
   await page.locator('.world').screenshot({path:info.outputPath(`${b.id}-hover.png`)});await page.mouse.move(0,0);
   await expect.poll(async()=>(await state(page)).landmarks.find((v:{id:string})=>v.id===b.id).gold).toBe(.18);
  }else{
   const point=await pointAt(page,b.id);await page.touchscreen.tap(point.x,point.y);await expect(label).toHaveAttribute('data-selected','true');
   await page.mouse.move(point.x,point.y);expect((await state(page)).hovered).toBe(null);await page.getByRole('button',{name:'Close inspection'}).click();
  }
 }
 await page.locator('.building-list').getByRole('button',{name:/St. Mira Hospital/}).click();
 await page.getByRole('button',{name:'Low power mode',exact:true}).click();await expect(page.locator('canvas')).toBeVisible();await expect(landmark(page,'hospital')).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();await page.getByRole('button',{name:'Pause simulation'}).click();await page.getByRole('slider').press('End');
 await expect(panel.getByText('Offline',{exact:true})).toBeVisible();
 await expect.poll(async()=>(await state(page)).landmarks.find((v:{id:string})=>v.id==='hospital').gold).toBe(info.project.name==='mobile'?1:.65);
 await expect(landmark(page,'hospital')).toBeVisible();await page.locator('.world').screenshot({path:info.outputPath('golden-outage-hospital.png')});
});

test('hover transitions settle without idle draws and touch never creates phantom hover',async({page},info)=>{
 await page.addInitScript(()=>{const state=window as typeof window&{goldDraws:number};state.goldDraws=0;
  for(const type of [WebGLRenderingContext,WebGL2RenderingContext]){const draw=type.prototype.drawElements;type.prototype.drawElements=function(...args:Parameters<typeof draw>){state.goldDraws++;return draw.apply(this,args);};}
 });
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();await page.getByRole('button',{name:'Pause simulation'}).click();
 await page.locator('.building-list').getByRole('button',{name:/Waterworks/}).click();await page.getByRole('button',{name:'Close inspection'}).click();
 const point=await pointAt(page,'water');await page.mouse.move(point.x,point.y);
 if(info.project.name==='desktop'){
  await expect.poll(async()=>(await state(page)).landmarks.find((v:{id:string})=>v.id==='water').gold).toBe(1);
 }else{
  expect((await state(page)).hovered).toBe(null);await page.touchscreen.tap(point.x,point.y);
  await expect.poll(async()=>(await state(page)).landmarks.find((v:{id:string})=>v.id==='water').gold).toBe(1);
 }
 const calls=()=>page.evaluate(()=>(window as typeof window&{goldDraws:number}).goldDraws);
 await page.waitForTimeout(220);const settled=await calls();await page.waitForTimeout(220);expect(await calls()).toBe(settled);
 await page.mouse.move(0,0);
 if(info.project.name==='desktop')await expect.poll(async()=>(await state(page)).landmarks.find((v:{id:string})=>v.id==='water').gold).toBe(.18);
 else expect((await state(page)).hovered).toBe(null);
});
