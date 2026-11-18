import {test,expect} from '@playwright/test';

test('editorial opening leads with the game and a reachable play action',async({page},info)=>{
 const phone=info.project.name==='mobile';
 await page.setViewportSize(phone?{width:390,height:844}:{width:1440,height:900});
 await page.emulateMedia({reducedMotion:'reduce'});
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

test('native scroll gives the headline a bounded drift and introductions remain accessible',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('./');
 await page.evaluate(()=>document.fonts.ready);
 const title=page.locator('.opening-title'),copy=page.locator('.opening-copy');
 await page.mouse.wheel(0,180);
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(100);
 const shifts=await page.locator('.opening-title, .opening-copy').evaluateAll(elements=>elements.map(element=>new DOMMatrix(getComputedStyle(element).transform).m42));
 expect(shifts[0]).toBeGreaterThan(shifts[1]);expect(shifts[0]).toBeLessThanOrEqual(48);
 const premise=page.locator('.concept .editorial-split');
 await premise.scrollIntoViewIfNeeded();await expect(premise).toHaveAttribute('data-arrived','true');
 const close=page.locator('.closing h2');await close.scrollIntoViewIfNeeded();
 await expect(close).toHaveAttribute('data-arrived','true');
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(title).toHaveCSS('transform','none');await expect(copy).toHaveCSS('transform','none');
 await expect(premise).toHaveCSS('opacity','1');await expect(close).toHaveCSS('transition-duration','0s');
 await expect(page.locator('iframe')).toHaveCount(0);
});
