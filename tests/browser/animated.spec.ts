import {test,expect} from '@playwright/test';
import {dependencies} from '../../src/dependencies';

test('infrastructure hero keeps a clear discovery action and static mobile alternative',async({page},info)=>{
 const phone=info.project.name==='mobile';await page.setViewportSize(phone?{width:390,height:844}:{width:1440,height:900});
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('./');await page.evaluate(()=>document.fonts.ready);
 const root=page.locator('.landing'),hero=page.locator('.hero-graphic');
 await expect(hero).toBeVisible();await expect(hero).toHaveAttribute('aria-hidden','true');
 const action=(await page.locator('.opening .enter-button').boundingBox())!;
 expect(action.y+action.height).toBeLessThanOrEqual(phone?844:900);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(phone?390:1440);
 await expect(root).toHaveAttribute('data-motion',phone?'static':'running');
 await page.screenshot({path:info.outputPath('hero.png'),animations:'disabled'});
 if(!phone){
  await expect(page.locator('.orbit').first()).toHaveCSS('animation-play-state','running');
  await page.mouse.move(1000,300);
  await expect.poll(()=>root.evaluate(element=>element.style.getPropertyValue('--network-x'))).not.toBe('0px');
  await page.getByRole('button',{name:'Pause motion',exact:true}).click();
  await expect(root).toHaveAttribute('data-motion','static');
  await expect(page.locator('.orbit').first()).toHaveCSS('animation-play-state','paused');
  await page.getByRole('button',{name:'Resume motion',exact:true}).click();
  await expect(root).toHaveAttribute('data-motion','running');
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.orbit').first()).toHaveCSS('animation-name','none');
 await expect(page.getByRole('button',{name:'Motion static'})).toBeDisabled();
 await page.locator('.opening .enter-button').click();await expect(page).toHaveURL(/#preview$/);
 await expect(page.locator('iframe')).toHaveCount(0);
});

test('schematic shows true directed dependencies and kinetic decisions at readable sizes',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 const widths=info.project.name==='mobile'?[390]:[1440,768,320];
 for(const width of widths){
  await page.setViewportSize({width,height:900});await page.goto('./');await page.evaluate(()=>document.fonts.ready);
  const figure=page.locator('.dependency-network');await figure.scrollIntoViewIfNeeded();
  await expect(figure.getByText('Simplified schematic',{exact:true})).toBeVisible();
  await expect(page.locator('.network-node')).toHaveCount(6);
  const paths=page.locator('.network-plot svg:visible .network-edges > path');
  expect(await paths.evaluateAll(elements=>elements.map(element=>element.getAttribute('data-edge')))).toEqual(dependencies.map(edge=>`${edge.source}:${edge.target}`));
  for(const path of await paths.all()){
   const target=(await path.getAttribute('data-edge'))!.split(':')[1];
   const endpoint=await path.evaluate(element=>{const line=element as SVGPathElement,p=line.getPointAtLength(line.getTotalLength());return new DOMPoint(p.x,p.y).matrixTransform(line.getScreenCTM()!).toJSON();});
   const node=(await page.locator(`[data-node="${target}"]`).boundingBox())!;
   const distance=Math.min(Math.abs(endpoint.x-node.x),Math.abs(endpoint.x-node.x-node.width),Math.abs(endpoint.y-node.y),Math.abs(endpoint.y-node.y-node.height));
   expect(distance,`${width}px arrow terminates at ${target}`).toBeLessThan(3);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);
  await figure.screenshot({path:info.outputPath(`network-${width}.png`),animations:'disabled'});
 }
 await page.setViewportSize(info.project.name==='mobile'?{width:390,height:844}:{width:1440,height:900});
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('./');await page.evaluate(()=>document.fonts.ready);
 for(const row of await page.locator('.feature-list > li').all()){
  await row.scrollIntoViewIfNeeded();await expect(row).toHaveAttribute('data-arrived','true');
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('.possibilities').screenshot({path:info.outputPath('consequences.png'),animations:'disabled'});
 await expect(page.locator('iframe')).toHaveCount(0);
});

test('short landscape opening retains complete title and discovery control',async({page},info)=>{
 test.skip(info.project.name==='mobile','One explicit landscape composition check.');
 await page.setViewportSize({width:844,height:390});await page.goto('./');await page.evaluate(()=>document.fonts.ready);
 const action=(await page.locator('.opening .enter-button').boundingBox())!;
 expect(action.y+action.height).toBeLessThanOrEqual(390);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(844);
 await page.screenshot({path:info.outputPath('landscape.png'),animations:'disabled'});
});
