import {test,expect} from '@playwright/test';

test('records the incumbent opening blackout and final invitation',async({page},info)=>{
 await page.setViewportSize(info.project.name==='mobile'?{width:390,height:844}:{width:1440,height:900});
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await page.evaluate(()=>document.fonts.ready);
 await expect(page.locator('iframe')).toHaveCount(0);
 await page.screenshot({path:info.outputPath('opening.png')});
 await page.getByRole('button',{name:'Power removed'}).click();
 for(const image of await page.locator('.preview-images img').all())await expect.poll(()=>image.evaluate(element=>(element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 await page.locator('.preview-stage').scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath('blackout.png')});
 await page.locator('.closing').scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath('closing.png')});
});
