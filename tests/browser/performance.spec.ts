import {test,expect} from '@playwright/test';

test('idle city stops GPU drawing and camera changes request a new frame',async({page},testInfo)=>{
 await page.addInitScript(()=>{
  const counter=window as typeof window & {drawCalls:number};counter.drawCalls=0;
  for(const type of [WebGLRenderingContext,WebGL2RenderingContext]){
   const original=type.prototype.drawElements;
   type.prototype.drawElements=function(...args:Parameters<typeof original>){counter.drawCalls++;return original.apply(this,args);};
  }
 });
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 const calls=()=>page.evaluate(()=>(window as typeof window & {drawCalls:number}).drawCalls);
 await expect.poll(calls).toBeGreaterThan(0);
 await page.waitForTimeout(250);
 const idle=await calls();await page.waitForTimeout(350);expect(await calls()).toBe(idle);
 await page.getByRole('button',{name:'Zoom in'}).click();await expect.poll(calls).toBeGreaterThan(idle);
 await page.getByRole('button',{name:'Reset camera'}).click();
 await page.screenshot({path:testInfo.outputPath('city-overview.png'),fullPage:true});
});
