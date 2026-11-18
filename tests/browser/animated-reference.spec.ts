import {test,expect} from '@playwright/test';

test('records the supplied standalone animated visual reference',async({page},info)=>{
 await page.setViewportSize(info.project.name==='mobile'?{width:390,height:844}:{width:1440,height:900});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('./CTRL_Z_ANIMATED_PREVIEW.html');
 await expect(page.locator('h1')).toHaveText('CTRL Z');
 await page.screenshot({path:info.outputPath('opening.png'),animations:'disabled'});
 for(const [selector,name] of [['.flow-diagram','network'],['.city-scene','city'],['.end','closing']]){
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.screenshot({path:info.outputPath(`${name}.png`),animations:'disabled'});
 }
 await page.evaluate(()=>scrollTo(0,0));
 await page.screenshot({path:info.outputPath('page.png'),fullPage:true,animations:'disabled'});
});
