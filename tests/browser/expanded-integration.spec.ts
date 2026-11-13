import {test,expect} from '@playwright/test';
const viewOf=async(page:import('@playwright/test').Page)=>page.locator('.city-canvas').evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!));

test('culled services keep outage, replay, report and saved response state',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();await page.getByRole('button',{name:'Pause simulation'}).click();
 await page.getByRole('slider',{name:'Simulation timeline'}).press('End');
 await page.locator('.building-list').getByRole('button',{name:/St. Mira Hospital/}).click();
 await page.getByRole('region',{name:'Building inspection'}).getByRole('button',{name:'Send backup supplies'}).click();
 await page.getByRole('button',{name:'Close inspection'}).click();
 for(let i=0;i<6;i++)await page.getByRole('button',{name:'Zoom in'}).click();
 if(await page.getByRole('button',{name:'Expand minimap'}).isVisible())await page.getByRole('button',{name:'Expand minimap'}).click();
 const map=page.getByRole('application',{name:'Interactive city minimap'});await map.scrollIntoViewIfNeeded();
 const p=await map.evaluate(el=>{const p=new DOMPoint(0,800).matrixTransform((el as SVGSVGElement).getScreenCTM()!);return {x:p.x,y:p.y};});
 if(info.project.name==='mobile')await page.touchscreen.tap(p.x,p.y);else await page.mouse.click(p.x,p.y);
 await expect.poll(()=>page.locator('.city-canvas').evaluate(el=>JSON.parse((el as HTMLElement).dataset.scene!).servicesVisible)).toBe(0);
 await expect(page.locator('[data-landmark="hospital"]')).toHaveAttribute('aria-label',/No water/);
 await page.getByRole('button',{name:'Save experiment',exact:true}).click();
 await page.getByRole('button',{name:'Reset experiment'}).click();await page.getByRole('button',{name:'Resume saved',exact:true}).click();
 await expect(page.getByRole('slider')).toHaveValue('24');await expect(page.getByRole('combobox',{name:'Replay branch'})).toHaveValue('1');
 await expect(page.getByRole('table',{name:'Service availability by response'})).toBeVisible();
 await page.getByRole('button',{name:'Restore electricity',exact:true}).click();
 await expect(page.locator('[data-landmark="hospital"]')).toHaveAttribute('aria-label',/Operational/);
 await page.getByRole('button',{name:'Undo',exact:true}).click();await expect(page.locator('[data-landmark="hospital"]')).toHaveAttribute('aria-label',/No water/);
 await page.getByRole('button',{name:'Reset camera'}).click();
 await page.locator('.world').screenshot({path:info.outputPath('expanded-city.png')});
});

test('native pinch and subsequent transformed picking preserve selection accuracy',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 const host=page.locator('.city-canvas');await host.scrollIntoViewIfNeeded();const box=(await host.boundingBox())!;
 const cdp=await page.context().newCDPSession(page),x=box.x+box.width*.5,y=box.y+box.height*.5;
 const before=await viewOf(page);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,x:x-40,y},{id:2,x:x+40,y}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:1,x:x-70,y},{id:2,x:x+70,y}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await cdp.detach();
 expect((await viewOf(page)).zoom).toBeGreaterThan(before.zoom);await expect(page.getByRole('region',{name:'Building inspection'})).not.toBeVisible();
 await page.locator('.building-list').getByRole('button',{name:/St. Mira Hospital/}).click();await page.getByRole('button',{name:'Close inspection'}).click();
 await host.scrollIntoViewIfNeeded();const v=await viewOf(page);
 await page.locator('canvas').click({position:{x:v.origin.x+v.pan.x+156*v.scale,y:v.origin.y+v.pan.y+151*v.scale}});
 await expect(page.getByRole('region',{name:'Building inspection'}).getByRole('heading',{name:'St. Mira Hospital'})).toBeVisible();
});
