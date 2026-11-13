import {test,expect} from '@playwright/test';
const camera=async(page:import('@playwright/test').Page)=>page.locator('.city-canvas').evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!));
test('fixed window reveals finite world sections in both axes without changing simulation',async({page})=>{
 await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Zoom in'}).click();
 const canvas=page.locator('.city-canvas'),box=(await canvas.boundingBox())!,before=await camera(page);
 await canvas.focus();await page.keyboard.press('ArrowRight');
 const right=await camera(page);expect(right.footprint.x).not.toBe(before.footprint.x);
 await page.keyboard.press('ArrowDown');const after=await camera(page);expect(after.footprint.y).not.toBe(right.footprint.y);
 const next=(await canvas.boundingBox())!;expect(next.width).toBe(box.width);expect(next.height).toBe(box.height);
 await page.getByRole('button',{name:'Zoom out'}).click();await page.getByRole('button',{name:'Reset camera'}).click();
 await expect(page.getByRole('slider')).toHaveValue('0');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
