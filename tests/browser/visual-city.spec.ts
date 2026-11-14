import {test,expect} from '@playwright/test';
import {places} from '../../src/world';
import {iso} from '../../src/geometry';

test('captures opening, distinct outer districts, overview, outage and service framing',async({page},info)=>{
 test.setTimeout(120000);await page.emulateMedia({reducedMotion:'reduce'});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('./');const canvas=page.locator('canvas'),host=page.locator('.city-canvas');await expect(canvas).toBeVisible();
 const windowBox=await host.boundingBox();
 await page.locator('.world').screenshot({path:info.outputPath('opening.png')});
 for(let i=0;i<3;i++)await page.getByRole('button',{name:'Zoom in'}).click();
 for(const place of places.slice(0,4)){
  const expand=page.getByRole('button',{name:'Expand minimap'});if(await expand.isVisible())await expand.click();
  const map=page.getByRole('application',{name:'Interactive city minimap'});await map.scrollIntoViewIfNeeded();
  const target=iso(place.x+2.5,place.y+2.5);
  if(info.project.name==='desktop')await page.getByRole('combobox',{name:'Minimap landmark navigation'}).selectOption(place.id);
  else{const p=await map.evaluate((el,p)=>{const q=new DOMPoint(p.x,p.y).matrixTransform((el as SVGSVGElement).getScreenCTM()!);return {x:q.x,y:q.y};},target);await page.touchscreen.tap(p.x,p.y);}
  const v=await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!));
  expect(v.footprint.x+v.footprint.width/2).toBeCloseTo(target.x);expect(v.footprint.y+v.footprint.height/2).toBeCloseTo(target.y);
  if(info.project.name==='mobile')await page.getByRole('button',{name:'Collapse minimap'}).click();
  await page.locator('.world').screenshot({path:info.outputPath(`${place.layout}.png`)});
 }
 await expect(page.getByRole('slider')).toHaveValue('0');
 await page.getByRole('button',{name:'City overview',exact:true}).click();
 const overview=await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!));expect(overview.zoom).toBeLessThan(1);
 await page.locator('.world').screenshot({path:info.outputPath('overview.png')});
 await page.getByRole('button',{name:'Reset camera'}).click();const nominal=await canvas.screenshot();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();await page.getByRole('button',{name:'Pause simulation'}).click();
 await page.getByRole('slider').press('End');expect((await canvas.screenshot()).equals(nominal)).toBe(false);
 await page.locator('.world').screenshot({path:info.outputPath('outage.png')});
 await page.locator('.building-list').getByRole('button',{name:/St. Mira Hospital/}).click();
 await expect(page.getByRole('region',{name:'Building inspection'})).toBeVisible();
 if(info.project.name==='mobile'){
  const controls=(await page.locator('.map-controls').boundingBox())!,timeline=(await page.locator('.timeline').boundingBox())!,panel=(await page.locator('.inspector').boundingBox())!;
  expect(controls.y+controls.height).toBeLessThanOrEqual(timeline.y-8);
  expect(panel.y+panel.height).toBeLessThanOrEqual(controls.y-8);
 }
 await page.locator('.world').screenshot({path:info.outputPath('hospital-selected.png')});
 const after=await host.boundingBox();expect(after!.width).toBe(windowBox!.width);expect(after!.height).toBe(windowBox!.height);expect(errors).toEqual([]);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
