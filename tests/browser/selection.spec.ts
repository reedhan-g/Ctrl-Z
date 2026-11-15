import {test,expect} from '@playwright/test';
import {buildings} from '../../src/simulation';
import {iso} from '../../src/geometry';

test('whole-building selection transfers, previews on desktop and clears with Escape',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');
 const host=page.locator('.city-canvas');await expect(page.locator('canvas')).toBeVisible();
 const state=()=>host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.selection!));
 await page.locator('.building-list').getByRole('button',{name:/St. Mira Hospital/}).click();
 expect((await state()).highlighted).toEqual(['hospital']);
 await page.locator('.world').screenshot({path:info.outputPath('selected-hospital.png')});
 if(info.project.name==='desktop'){
  const view=await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!)),box=(await host.boundingBox())!,b=buildings.find(b=>b.id==='hospital')!,p=iso(b.x+.9,b.y+.9,30);
  await page.mouse.move(box.x+view.origin.x+view.pan.x+p.x*view.scale,box.y+view.origin.y+view.pan.y+p.y*view.scale);
  expect((await state()).hovered).toBe('hospital');
 }
 await page.locator('.building-list').getByRole('button',{name:/Waterworks/}).click();
 expect((await state()).selected).toBe('water');
 await page.keyboard.press('Escape');expect((await state()).selected).toBe(null);
 await expect(page.getByRole('region',{name:'Building inspection'})).not.toBeVisible();
});
