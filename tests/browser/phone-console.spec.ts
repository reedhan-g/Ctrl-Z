import {test,expect} from '@playwright/test';
test('phone first viewport shows the action and city across supported widths',async({page},info)=>{
 test.setTimeout(120000);await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 for(const [width,height] of [[320,800],[360,800],[375,812],[390,844],[430,932],[768,1024],[1366,768],[1440,900]]){
  await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo(0,0));
  const action=await page.getByRole('button',{name:'Remove electricity',exact:true}).boundingBox(),canvas=await page.locator('canvas').boundingBox();
  expect(action!.y+action!.height).toBeLessThan(height);expect(canvas!.y).toBeLessThan(height*.5);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:info.outputPath(`opening-${width}.png`)});
 }
});
