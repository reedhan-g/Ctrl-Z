import {test,expect,type Page} from '@playwright/test';

const progress=(page:Page)=>page.locator('.preview-images').getAttribute('data-progress').then(value=>Number(value));
async function position(page:Page,value:number){
 await page.locator('.preview-images').evaluate((image,value)=>{
  const height=visualViewport?.height??innerHeight,span=Math.min(420,height*.60);
  const section=image.closest('.blackout-preview')!,stage=section.querySelector('.preview-stage')!;
  const pinned=section.getAttribute('data-pinned')==='true';
  const top=pinned?section.getBoundingClientRect().top+scrollY-16+(section.getBoundingClientRect().height-stage.getBoundingClientRect().height)*value:image.getBoundingClientRect().top+scrollY-height*.82+span*value;
  scrollTo({top,behavior:'instant'});
 },value);
 await expect.poll(()=>progress(page)).toBeCloseTo(value,1);
}
async function imagesReady(page:Page){
 for(const image of await page.locator('.preview-images img').all())await expect.poll(()=>image.evaluate(element=>(element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
}

test('natural blackout reveal reverses and gives manual choices priority',async({page},info)=>{
 await page.setViewportSize(info.project.name==='mobile'?{width:390,height:844}:{width:1440,height:900});
 await page.emulateMedia({reducedMotion:'no-preference'});
 const requests:string[]=[];page.on('request',request=>requests.push(request.url()));
 await page.goto('./');
 await page.evaluate(()=>document.fonts.ready);
 const storage=await page.evaluate(()=>JSON.stringify(localStorage));
 await position(page,0);await imagesReady(page);
 await expect(page.getByRole('status')).toHaveText('Power connected');
 const capture=async(name:string)=>{
  const stage=(await page.locator('.preview-stage').boundingBox())!;
  expect(stage.y,`${name}: held scene top`).toBeGreaterThanOrEqual(15);
  expect(stage.y+stage.height,`${name}: complete scene fits`).toBeLessThanOrEqual((info.project.name==='mobile'?844:900)-1);
  await page.screenshot({path:info.outputPath(`${name}.png`),animations:'disabled'});
 };
 await capture('powered');
 await position(page,.25);
 const pinnedY=(await page.locator('.preview-stage').boundingBox())!.y;
 const scrollBefore=await page.evaluate(()=>scrollY);
 await position(page,.5);await expect(page.getByRole('status')).toHaveText('The moment of interruption');
 await expect(page.locator('.blackout-preview')).toHaveAttribute('data-pinned','true');
 expect((await page.locator('.preview-stage').boundingBox())!.y).toBeCloseTo(pinnedY,0);
 expect(await page.evaluate(()=>scrollY)).toBeGreaterThan(scrollBefore);
 expect(await page.locator('.blackout-layer').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeCloseTo(.5,2);
 await expect(page.getByRole('button',{name:'Power on'})).toHaveAttribute('aria-pressed','false');
 await expect(page.getByRole('button',{name:'Power off'})).toHaveAttribute('aria-pressed','false');
 await capture('halfway');expect(await progress(page)).toBeCloseTo(.5,1);
 await position(page,1);await expect(page.getByRole('status')).toHaveText('Grid disconnected');await capture('blackout');expect(await progress(page)).toBe(1);
 await position(page,.25);await position(page,0);
 await page.getByRole('button',{name:'Power off'}).focus();await page.keyboard.press('Space');
 await expect(page.getByRole('button',{name:'Power off'})).toHaveAttribute('aria-pressed','true');
 await page.mouse.wheel(0,60);await expect.poll(()=>progress(page)).toBe(1);
 await expect(page.getByText('Your choice stays until you leave this preview.')).toBeVisible();await capture('manual');
 await page.getByRole('button',{name:'Power on'}).click();
 await page.mouse.wheel(0,40);await expect.poll(()=>progress(page)).toBe(0);
 await page.locator('.site-footer').scrollIntoViewIfNeeded();
 await expect(page.getByText('Scroll through the city to compare the power cut.')).toBeVisible();
 await position(page,.5);
 await expect(page.locator('iframe')).toHaveCount(0);await expect(page.locator('canvas')).toHaveCount(0);
 expect(await page.evaluate(()=>JSON.stringify(localStorage))).toBe(storage);
 expect(requests.filter(url=>/\/src\/(City|App|game)[./]|city-atlas|street-atlas|WebGLRenderer/.test(url))).toEqual([]);
 const box=await page.locator('.preview-images').boundingBox();
 expect(box!.height).toBeLessThanOrEqual(info.project.name==='mobile'?440:620);
 const overlay=page.locator('.blackout-layer');await expect(overlay).toHaveAttribute('aria-hidden','true');
 expect(await overlay.evaluate(element=>Number(getComputedStyle(element).opacity))).toBeCloseTo(.5,2);
});

test('reduced motion and direct preview navigation remain stable',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('./#preview');await page.evaluate(()=>document.fonts.ready);
 await expect(page.getByRole('heading',{name:'Watch the city go dark.'})).toBeInViewport();await imagesReady(page);
 await expect(page.getByRole('button',{name:'Power on'})).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('.blackout-preview')).toHaveAttribute('data-pinned','false');
 await page.locator('.preview-images').scrollIntoViewIfNeeded();await expect.poll(()=>progress(page)).toBe(0);
 await page.screenshot({path:info.outputPath('reduced-motion.png'),animations:'disabled'});
 const off=page.getByRole('button',{name:'Power off'});
 if(info.project.name==='mobile')await off.tap();else await off.click();
 await expect(off).toHaveAttribute('aria-pressed','true');
 await page.mouse.wheel(0,50);await expect.poll(()=>progress(page)).toBe(1);
 await page.getByRole('button',{name:'Power on'}).click();await expect.poll(()=>progress(page)).toBe(0);
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.locator('.site-footer').scrollIntoViewIfNeeded();
 await page.getByRole('link',{name:'The city',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Watch the city go dark.'})).toBeInViewport();
 await expect.poll(()=>progress(page)).toBe(0);
 await page.mouse.wheel(0,100);await expect.poll(()=>progress(page)).toBeGreaterThan(0);
});

test('short screens keep the preview in natural flow and touch scrolling stays native',async({page},info)=>{
 await page.setViewportSize({width:844,height:390});
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('./#preview');await page.evaluate(()=>document.fonts.ready);
 await expect(page.locator('.blackout-preview')).toHaveAttribute('data-pinned','false');
 await expect(page.locator('.preview-stage')).toHaveCSS('position','static');
 const before=await page.evaluate(()=>scrollY);
 if(info.project.name==='mobile'){
  const cdp=await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:420,y:300}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:420,y:100}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 }else await page.mouse.wheel(0,200);
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(before);
 await page.locator('.closing .enter-button').scrollIntoViewIfNeeded();
 await expect(page.locator('.closing .enter-button')).toBeInViewport();
 await expect(page.locator('iframe')).toHaveCount(0);
 await page.screenshot({path:info.outputPath('short-landscape.png'),animations:'disabled'});
});
