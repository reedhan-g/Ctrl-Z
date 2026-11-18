import {test,expect} from '@playwright/test';

const readProgress=(page:import('@playwright/test').Page)=>page.locator('.preview-images').getAttribute('data-progress').then(Number);

test('landing width matrix retains clear entry and unobstructed touch targets',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 const matrix=info.project.name==='mobile'
  ?[[320,700],[360,800],[390,844],[430,932],[844,390]]
  :[[320,800],[360,800],[390,844],[430,932],[768,1024],[1280,800],[1440,900],[844,390]];
 for(const [width,height] of matrix){
  await page.setViewportSize({width,height});await page.goto('./');await page.evaluate(()=>document.fonts.ready);
  await expect(page.locator('.opening .enter-button')).toBeInViewport();
  const entry=(await page.locator('.opening .enter-button').boundingBox())!;
  expect(entry.y,`${width}px complete opening action top`).toBeGreaterThanOrEqual(0);
  expect(entry.y+entry.height,`${width}px complete opening action bottom`).toBeLessThanOrEqual(height);
  const title=await page.locator('.opening h1').evaluate(element=>({height:element.getBoundingClientRect().height,lineHeight:parseFloat(getComputedStyle(element).lineHeight)}));
  expect(title.height,`${width}px unbroken title`).toBeLessThanOrEqual(title.lineHeight+1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);
  const targets=await page.locator('.landing :is(a,button,summary):visible:not(.skip-link)').evaluateAll(elements=>elements.map(element=>{
   const r=element.getBoundingClientRect();return {name:element.textContent,x:r.x,y:r.y,width:r.width,height:r.height};
  }));
  for(const target of targets){
   expect(target.width,`${width}px ${target.name} touch width`).toBeGreaterThanOrEqual(44);
   expect(target.height,`${width}px ${target.name} touch height`).toBeGreaterThanOrEqual(44);
   expect(target.x,`${width}px ${target.name} left`).toBeGreaterThanOrEqual(0);
   expect(target.x+target.width,`${width}px ${target.name} right`).toBeLessThanOrEqual(width);
  }
  for(let i=0;i<targets.length;i++)for(let j=i+1;j<targets.length;j++){
   const a=targets[i],b=targets[j];
   expect(a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y,`${width}px ${a.name}/${b.name} overlap`).toBe(false);
  }
  await page.locator('.preview-images').scrollIntoViewIfNeeded();
  for(const image of await page.locator('.preview-images img').all())await expect.poll(()=>image.evaluate(node=>(node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect((await page.locator('.preview-images').boundingBox())!.height).toBeLessThanOrEqual(width<=600?440:620);
  for(const link of await page.getByRole('link',{name:'Open full-screen',exact:true}).all())await expect(link).toHaveAttribute('href','./simulation.html');
  await expect(page.locator('iframe')).toHaveCount(0);
 }
});

test('preview survives resize zoom and tab return with slow captures',async({page,context},info)=>{
 let release!:()=>void;
 const images=new Promise<void>(resolve=>{release=resolve;});
 await page.route('**/city-*.png',async route=>{await images;await route.continue();});
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('./#preview',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>document.fonts.ready);
 await expect(page.getByRole('heading',{name:'Watch the city go dark.'})).toBeInViewport();
 const bounds=await page.locator('.preview-images').boundingBox();
 expect(bounds!.height).toBeGreaterThanOrEqual(280);
 const before=await page.locator('.possibilities').evaluate(element=>element.getBoundingClientRect().top+scrollY);
 release();
 for(const image of await page.locator('.preview-images img').all())await expect.poll(()=>image.evaluate(node=>(node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 const after=await page.locator('.possibilities').evaluate(element=>element.getBoundingClientRect().top+scrollY);
 expect(after).toBeCloseTo(before,0);
 const blackout=page.getByRole('button',{name:'Power off'});
 if(info.project.name==='mobile')await blackout.tap();else await blackout.click();
 await expect.poll(()=>readProgress(page)).toBe(1);
 await page.setViewportSize(info.project.name==='mobile'?{width:430,height:932}:{width:1280,height:800});
 await expect.poll(()=>readProgress(page)).toBe(1);
 const cdp=await context.newCDPSession(page);
 await cdp.send('Emulation.setPageScaleFactor',{pageScaleFactor:1.2});
 await expect.poll(()=>page.evaluate(()=>visualViewport?.scale)).toBeCloseTo(1.2,1);
 await expect.poll(()=>readProgress(page)).toBe(1);
 await cdp.send('Emulation.setPageScaleFactor',{pageScaleFactor:1});
 const other=await context.newPage();await other.goto('about:blank');await other.bringToFront();
 await page.bringToFront();await other.close();
 await expect.poll(()=>readProgress(page)).toBe(1);
 await page.getByRole('button',{name:'Power on'}).focus();await page.keyboard.press('Enter');
 await expect.poll(()=>readProgress(page)).toBe(0);
 await expect(page.locator('iframe')).toHaveCount(0);
 await page.screenshot({path:info.outputPath('resized-preview.png'),animations:'disabled'});
});

test('entry feedback stays quiet and reduced motion removes transitions',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('./');
 const entry=page.locator('.opening .enter-button');await entry.hover();
 await expect(entry).toHaveCSS('background-color','rgb(188, 230, 223)');
 await entry.focus();await expect(entry).toBeFocused();
 await expect(entry).toHaveCSS('outline-style','solid');
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(entry).toHaveCSS('transition-duration','0s');
 await expect(page.getByRole('link',{name:'The city',exact:true})).toHaveCSS('transition-duration','0s');
});
