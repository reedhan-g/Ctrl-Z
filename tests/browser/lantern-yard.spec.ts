import {test,expect} from '@playwright/test';
import {iso} from '../../src/geometry';

test('Lantern Yard is reachable, scenery blocks inspection, and outage lighting restores',async({page},info)=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('./');const host=page.locator('.city-canvas');
  await expect(page.locator('canvas')).toBeVisible();
  const target=iso(-17.5,-17.5);
  async function visitYard(){
    const expand=page.getByRole('button',{name:'Expand minimap'});
    if(await expand.isVisible())await expand.click();
    const map=page.getByRole('application',{name:'Interactive city minimap'});
    if(info.project.name==='desktop'){
      const landmarks=page.getByRole('combobox',{name:'Minimap landmark navigation'});
      await landmarks.selectOption('foundry');await landmarks.selectOption('lantern');
    }else{
    const point=await map.evaluate((el,p)=>{
      const q=new DOMPoint(p.x,p.y).matrixTransform((el as SVGSVGElement).getScreenCTM()!);
      return {x:q.x,y:q.y};
    },target);
    await page.touchscreen.tap(point.x,point.y);
      await page.getByRole('button',{name:'Collapse minimap'}).click();
    }
  }
  await visitYard();
  await page.locator('.world').screenshot({path:info.outputPath('yard-normal.png')});
  for(let i=0;i<3;i++)await page.getByRole('button',{name:'Zoom in'}).click();
  // Near the world edge the initial wide viewport is bounded; recenter after zoom.
  await visitYard();
  // A ground-floor facade point on the café is scenery, not a new service.
  const facade=iso(-17.05,-16.45,12);
  const view=await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!));
  const box=(await host.boundingBox())!;
  const point={x:box.x+view.origin.x+view.pan.x+facade.x*view.scale,y:box.y+view.origin.y+view.pan.y+facade.y*view.scale};
  expect(point.x).toBeGreaterThan(box.x);expect(point.x).toBeLessThan(box.x+box.width);
  expect(point.y).toBeGreaterThan(box.y);expect(point.y).toBeLessThan(box.y+box.height);
  if(info.project.name==='mobile')await page.touchscreen.tap(point.x,point.y);
  else await page.mouse.click(point.x,point.y);
  await expect(page.getByRole('region',{name:'Building inspection'})).not.toBeVisible();
  await page.locator('.world').screenshot({path:info.outputPath('yard-close.png')});
  const lit=await page.locator('canvas').screenshot();
  await page.getByRole('button',{name:'Remove electricity',exact:true}).click();
  await page.getByRole('button',{name:'Pause simulation'}).click();
  await page.locator('.world').screenshot({path:info.outputPath('yard-outage.png')});
  const dark=await page.locator('canvas').screenshot();expect(dark.equals(lit)).toBe(false);
  await page.getByRole('button',{name:'Restore electricity',exact:true}).click();
  await page.locator('.world').screenshot({path:info.outputPath('yard-restored.png')});
  expect((await page.locator('canvas').screenshot()).equals(dark)).toBe(false);
  await expect(page.getByRole('slider')).not.toHaveValue('24');
});
