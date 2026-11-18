import {test,expect} from '@playwright/test';

test('editorial opening leads with the game and a reachable play action',async({page},info)=>{
 const phone=info.project.name==='mobile';
 await page.setViewportSize(phone?{width:390,height:844}:{width:1440,height:900});
 await page.goto('./');
 await page.evaluate(()=>document.fonts.ready);
 await expect(page.getByRole('heading',{name:'Ctrl Z',exact:true})).toBeInViewport();
 await expect(page.locator('.opening .enter-button')).toBeInViewport();
 await expect(page.locator('.opening img')).toHaveCount(0);
 await expect(page.getByText('An interactive infrastructure simulation',{exact:true})).toBeVisible();
 expect((await page.locator('.opening').boundingBox())!.height).toBeGreaterThanOrEqual((phone?844:900)*.8);
 expect((await page.locator('.preview-images').boundingBox())!.y).toBeGreaterThan(phone?844:900);
 await expect(page.locator('iframe')).toHaveCount(0);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.locator('.preview-section').scrollIntoViewIfNeeded();
 await expect.poll(()=>page.locator('.preview-active img').evaluate(image=>(image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 await page.evaluate(()=>scrollTo(0,0));
 await page.screenshot({path:info.outputPath('editorial.png'),fullPage:true,animations:'disabled'});
});
