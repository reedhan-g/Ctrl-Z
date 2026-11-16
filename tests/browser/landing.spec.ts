import {test,expect} from '@playwright/test';

test('homepage explains the game without loading the simulation',async({page},info)=>{
 const errors:string[]=[];
 const requests:string[]=[];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('request',request=>requests.push(request.url()));
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('./');
 await expect(page).toHaveTitle('Ctrl Z — Undo the World');
 await expect(page.getByRole('heading',{name:'Ctrl Z',exact:true})).toBeVisible();
 await expect(page.getByRole('heading',{name:'One switch. A city of consequences.'})).toBeVisible();
 await expect(page.locator('canvas')).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Remove electricity',exact:true})).toHaveCount(0);
 expect(requests.filter(url=>/\/src\/(City|game|App|style|console)[./]/.test(url))).toEqual([]);
 const links=page.getByRole('link',{name:'Enter Simulation',exact:true});
 await expect(links).toHaveCount(3);
 for(const link of await links.all())await expect(link).toHaveAttribute('href','#simulation');
 await expect(page.locator('iframe')).toHaveCount(0);
 await page.getByRole('link',{name:'Preview',exact:true}).click();
 await expect(page).toHaveURL(/#preview$/);
 await expect(page.getByRole('heading',{name:'Inside Meridian'})).toBeInViewport();
 await expect(page.locator('.preview-active img')).toBeVisible();
 await expect.poll(()=>page.locator('.preview-active img').evaluate(image=>(image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 await page.getByRole('button',{name:'Power removed',exact:true}).focus();
 await page.keyboard.press('Space');
 await expect(page.getByRole('button',{name:'Power removed',exact:true})).toHaveAttribute('aria-pressed','true');
 await expect(page.getByText('Electricity is offline. Other services draw on their remaining reserves.',{exact:true})).toBeVisible();
 await expect.poll(()=>page.locator('.preview-active img').evaluate(image=>(image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 await page.screenshot({path:info.outputPath('landing-blackout.png'),fullPage:true,animations:'disabled'});
 await page.getByRole('button',{name:'Quiet evening',exact:true}).click();
 await expect(page.getByRole('button',{name:'Quiet evening',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:info.outputPath('landing.png'),fullPage:true,animations:'disabled'});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(errors).toEqual([]);
});

test('embedded entry home and full-screen retain saves and existing gameplay',async({page},info)=>{
 await page.goto('./');
 await page.locator('.opening').getByRole('link',{name:'Enter Simulation',exact:true}).click();
 await expect(page).toHaveURL(/#simulation$/);
 const game=page.frameLocator('iframe[title="Ctrl Z playable simulation"]');
 await expect(game.locator('canvas')).toBeVisible();
 await expect(game.getByRole('button',{name:'How to play'})).toBeVisible();
 await game.getByRole('button',{name:'Remove electricity',exact:true}).click();
 await game.getByRole('button',{name:'Pause simulation'}).click();
 const expandMap=game.getByRole('button',{name:'Expand minimap'});
 if(await expandMap.isVisible())await expandMap.click();
 const footprint=game.getByRole('complementary',{name:'City minimap'}).getByTestId('camera-footprint');
 const mapWidth=await footprint.getAttribute('width');
 await game.getByRole('button',{name:'Zoom in'}).click();
 await expect(footprint).not.toHaveAttribute('width',mapWidth!);
 await game.locator('.building-list').getByRole('button',{name:/St. Mira Hospital/}).click();
 await expect(game.getByRole('region',{name:'Building inspection'}).getByRole('heading',{name:'St. Mira Hospital',exact:true})).toBeVisible();
 await game.getByRole('button',{name:'Save experiment',exact:true}).click();
 await expect(game.getByText('Experiment saved on this browser.')).toBeVisible();
 const saved=await page.evaluate(()=>localStorage.getItem('ctrl-z:experiment:v1'));
 expect(saved).toBeTruthy();
 await page.locator('.closing').getByRole('link',{name:'Enter Simulation',exact:true}).click();
 await expect(page.locator('iframe')).toHaveCount(1);
 await expect(game.getByRole('button',{name:'Restore electricity',exact:true})).toBeVisible();
 await page.locator('#simulation').screenshot({path:info.outputPath('embedded-game.png')});
 await page.getByRole('link',{name:'Open full-screen',exact:true}).click();
 await expect(page).toHaveURL(/\/simulation\.html$/);
 await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Resume saved',exact:true}).click();
 await expect(page.getByText('Saved experiment resumed, paused.')).toBeVisible();
 await page.getByRole('link',{name:'Ctrl Z home',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Ctrl Z',exact:true})).toBeVisible();
 await expect(page.locator('canvas')).toHaveCount(0);
 expect(await page.evaluate(()=>localStorage.getItem('ctrl-z:experiment:v1'))).toBe(saved);
 await page.locator('.closing').getByRole('link',{name:'Enter Simulation',exact:true}).click();
 await expect(game.locator('canvas')).toBeVisible();
 await game.getByRole('button',{name:'Resume saved',exact:true}).click();
 await expect(game.getByText('Saved experiment resumed, paused.')).toBeVisible();
 await expect(game.getByRole('button',{name:'Play simulation'})).toBeVisible();
 await expect(game.getByRole('button',{name:'Restore electricity',exact:true})).toBeVisible();
 await game.getByRole('link',{name:'Ctrl Z home',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Ctrl Z',exact:true})).toBeVisible();
 await expect(page.locator('iframe')).toHaveCount(0);
});

test('embedded game has a direct anchor and an explicit start control',async({page})=>{
 await page.goto('./#simulation');
 await expect(page.frameLocator('iframe').locator('canvas')).toBeVisible();
 await page.goto('./');
 await expect(page.locator('iframe')).toHaveCount(0);
 await page.getByRole('button',{name:'Start simulation',exact:true}).click();
 await expect(page.frameLocator('iframe').locator('canvas')).toBeVisible();
});

test('keyboard skip link and previews work without motion',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('./');
 await page.keyboard.press('Tab');
 await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(page.locator('main')).toBeFocused();
 const preview=page.getByRole('button',{name:'Power removed',exact:true});
 await preview.focus();await preview.press('Enter');
 await expect(preview).toHaveAttribute('aria-pressed','true');
 expect(await page.locator('.preview-active').evaluate(element=>getComputedStyle(element).transitionDuration)).toBe('0s');
});

test('editorial layout fits narrow tablet and wide screens',async({page},info)=>{
 test.skip(info.project.name!=='desktop','Desktop project owns the explicit viewport matrix.');
 for(const width of [320,768,1440]){
  await page.setViewportSize({width,height:900});
  await page.goto('./');
  await page.getByRole('heading',{name:'Inside Meridian'}).scrollIntoViewIfNeeded();
  await expect.poll(()=>page.locator('.preview-active img').evaluate(image=>(image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.evaluate(()=>document.fonts.ready);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  for(const target of ['.site-header','.opening','.concept','.preview-switch','.feature-list','.closing-inner']){
   const bounds=await page.locator(target).boundingBox();
   expect(bounds!.x,`${width}px ${target} left`).toBeGreaterThanOrEqual(0);
   expect(bounds!.x+bounds!.width,`${width}px ${target} right`).toBeLessThanOrEqual(width);
  }
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:info.outputPath(`landing-${width}.png`),fullPage:true,animations:'disabled'});
 }
});
