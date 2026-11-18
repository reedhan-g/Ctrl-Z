import {test,expect} from '@playwright/test';

test('captures the current homepage at desktop tablet and phone widths',async({page},info)=>{
 test.skip(info.project.name!=='desktop','One audit owns the explicit viewport matrix.');
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const [width,height] of [[1440,900],[768,1024],[390,844]]){
  await page.setViewportSize({width,height});await page.goto('./');await page.evaluate(()=>document.fonts.ready);
  await expect(page.locator('.opening .enter-button')).toBeInViewport();
  await page.locator('.preview-images').scrollIntoViewIfNeeded();
  for(const image of await page.locator('.preview-images img').all())await expect.poll(()=>image.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);
  await expect(page.locator('iframe')).toHaveCount(0);
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:info.outputPath(`page-${width}.png`),fullPage:true,animations:'disabled'});
 }
});
