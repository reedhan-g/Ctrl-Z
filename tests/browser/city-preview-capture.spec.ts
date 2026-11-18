import {test,expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';

test('captures aligned HUD-free real city imagery without changing game code',async({page},info)=>{
 test.setTimeout(120000);
 await page.setViewportSize(info.project.name==='mobile'?{width:430,height:932}:{width:1920,height:1080});
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./simulation.html');
 const canvas=page.locator('canvas');await expect(canvas).toBeVisible({timeout:20000});
 const camera=()=>page.locator('.city-canvas').evaluate(element=>JSON.parse((element as HTMLElement).dataset.camera!));
 const beforeCamera=await camera(),beforeBounds=await canvas.boundingBox();
 // Visibility-only screenshot styles never resize the canvas or alter gameplay.
 const style='.world > :not(.city-canvas), .landmark-label-layer, .city-canvas > :not(canvas) { visibility: hidden !important; }';
 const lit=await canvas.screenshot({path:info.outputPath('city-powered.png'),style});
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();
 await page.getByRole('button',{name:'Pause simulation'}).click();
 await page.getByRole('slider',{name:'Simulation timeline'}).press('Home');await page.keyboard.press('Tab');
 await expect(page.getByText('GRID OFFLINE',{exact:true})).toBeVisible();
 const afterCamera=await camera(),afterBounds=await canvas.boundingBox();
 expect(afterCamera).toEqual(beforeCamera);expect(afterBounds).toEqual(beforeBounds);
 await expect(page.getByRole('slider',{name:'Simulation timeline'})).toHaveValue('0');
 const dark=await canvas.screenshot({path:info.outputPath('city-blackout.png'),style});
 expect(dark.equals(lit)).toBe(false);
 expect(dark.readUInt32BE(16)).toBe(lit.readUInt32BE(16));expect(dark.readUInt32BE(20)).toBe(lit.readUInt32BE(20));
 // Screenshot styles are gone; normal game controls still work afterwards.
 await page.getByRole('button',{name:'Restore electricity',exact:true}).click();
 await expect(page.getByText('SYSTEMS NOMINAL',{exact:true})).toBeVisible();
 await page.screenshot({path:info.outputPath('game-after-capture.png')});
 await writeFile(info.outputPath('camera.json'),JSON.stringify({baseline:'fada846',viewport:page.viewportSize(),dpr:await page.evaluate(()=>devicePixelRatio),image:{width:lit.readUInt32BE(16),height:lit.readUInt32BE(20)},beforeCamera,afterCamera,beforeBounds,afterBounds,time:0,screenshotStyle:style},null,2));
});
