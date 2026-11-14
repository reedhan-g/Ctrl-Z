import {test,expect} from '@playwright/test';
import {iso} from '../../src/geometry';
import {buildings} from '../../src/simulation';

test('reviews redesigned opening, six facilities, civic crossroads, Lantern neighborhood and map edges',async({page},info)=>{
 test.setTimeout(120000);await page.emulateMedia({reducedMotion:'reduce'});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('./');const host=page.locator('.city-canvas');await expect(page.locator('canvas')).toBeVisible();
 const capture=async(name:string)=>page.locator('.world').screenshot({path:info.outputPath(`${name}.png`)});
 const read=()=>host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!));
 const initial=await read(),cross=iso(4.5,4.5);
 expect(initial.origin.x+initial.pan.x+cross.x*initial.scale).toBeCloseTo(initial.width*(initial.width<=760?.5:.58));
 expect(initial.origin.y+initial.pan.y+cross.y*initial.scale).toBeCloseTo(initial.height*(initial.width<=760?.59:.68));
 await capture('opening');
 for(const [id,name] of [['grid','North substation'],['hospital','St. Mira Hospital'],['water','Waterworks'],['homes','Maple residences'],['telecom','Meridian telecom'],['logistics','East delivery hub']]){
  await page.locator('.building-list').getByRole('button',{name:new RegExp(name)}).click();
  await expect(page.getByRole('region',{name:'Building inspection'})).toBeVisible();
  const b=buildings.find(b=>b.id===id)!,view=await read(),roof=iso(b.x+.4,b.y+.4,b.height+6);
  expect(view.origin.y+view.pan.y+roof.y*view.scale).toBeGreaterThan(4);
  await capture(id);await page.getByRole('button',{name:'Close inspection'}).click();
 }
 async function go(x:number,y:number){
  const expand=page.getByRole('button',{name:'Expand minimap'});if(await expand.isVisible())await expand.click();
  const map=page.getByRole('application',{name:'Interactive city minimap'});
  await map.scrollIntoViewIfNeeded();
  const q=await map.evaluate((el,p)=>{const q=new DOMPoint(p.x,p.y).matrixTransform((el as SVGSVGElement).getScreenCTM()!);return {x:q.x,y:q.y};},iso(x,y));
  if(info.project.name==='mobile')await page.touchscreen.tap(q.x,q.y);else await page.mouse.click(q.x,q.y);
  const collapse=page.getByRole('button',{name:'Collapse minimap'});if(info.project.name==='mobile'&&await collapse.isVisible())await collapse.click();
 }
 await page.getByRole('button',{name:'Reset camera'}).click();
 await page.getByRole('button',{name:'Zoom in'}).click();await go(4.5,4.5);await capture('intersection');
 // At the north-world edge, zoom before recentering so land bounds do not
 // displace the neighborhood. Two views cover the authored four-block area.
 await page.getByRole('button',{name:'Zoom in'}).click();await page.getByRole('button',{name:'Zoom in'}).click();
 await go(-17.5,-17.5);await capture('lantern-neighborhood');
 await go(-12.5,-12.5);await capture('lantern-south');
 for(const [name,x,y] of [['north',-23,-23],['east',33,-23],['south',33,33],['west',-23,33]] as const){
  await go(x,y);const view=await read();expect(view.zoom).toBeGreaterThan(1);await capture(`edge-${name}`);
 }
 await page.getByRole('button',{name:'Reset camera'}).click();
 const reset=await read();expect(reset.pan.x).toBeCloseTo(initial.pan.x);expect(reset.pan.y).toBeCloseTo(initial.pan.y);
 await expect(page.getByRole('slider')).toHaveValue('0');expect(errors).toEqual([]);
});
