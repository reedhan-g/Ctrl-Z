import {test,expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';

test('records reproducible browser rendering measurements',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.addInitScript(()=>{
  const counter=window as typeof window & {cityDrawCalls:number};counter.cityDrawCalls=0;
  for(const type of [WebGLRenderingContext,WebGL2RenderingContext]){
   const draw=type.prototype.drawElements;
   type.prototype.drawElements=function(...args:Parameters<typeof draw>){counter.cityDrawCalls++;return draw.apply(this,args);};
  }
 });
 const start=Date.now();await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 const readyMs=Date.now()-start;
 await page.waitForTimeout(250);
 const before=await page.evaluate(()=>(window as typeof window & {cityDrawCalls:number}).cityDrawCalls);
 await page.waitForTimeout(300);
 const idleDrawCalls=await page.evaluate(()=>(window as typeof window & {cityDrawCalls:number}).cityDrawCalls)-before;
 expect(idleDrawCalls).toBe(0);
 const box=(await page.locator('canvas').boundingBox())!;
 const dragStart=Date.now();
 await page.mouse.move(box.x+box.width*.5,box.y+box.height*.4);await page.mouse.down();
 for(let i=0;i<30;i++)await page.mouse.move(box.x+box.width*(.5+.15*Math.sin(i/5)),box.y+box.height*(.4+.15*Math.cos(i/5)));
 await page.mouse.up();await page.waitForTimeout(100);
 const dragMs=Date.now()-dragStart;
 const dragDrawCalls=await page.evaluate(()=>(window as typeof window & {cityDrawCalls:number}).cityDrawCalls)-before;
 const metrics={project:info.project.name,readyMs,idleDrawCalls,dragMs,dragDrawCalls,viewport:page.viewportSize(),device:'Emulated Chromium; software GPU, not physical-device FPS'};
 await writeFile(info.outputPath('metrics.json'),JSON.stringify(metrics,null,2));
 console.log(JSON.stringify(metrics));
});
