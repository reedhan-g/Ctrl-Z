import {test,expect} from '@playwright/test';
test('telecom recovery restores dispatch capacity and undo restores the failure',async({page})=>{
 await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();
 await page.getByRole('button',{name:'Pause simulation'}).click();
 const slider=page.getByRole('slider',{name:'Simulation timeline'});
 await slider.press('Home');for(let i=0;i<16;i++)await slider.press('ArrowRight');
 await page.getByRole('button',{name:/East delivery hub/}).click();
 const panel=page.getByRole('region',{name:'Building inspection'});
 await expect(panel.getByText('35% dispatch capacity')).toBeVisible();
 await panel.locator('summary').filter({hasText:'Investigate connections'}).click();
 await panel.getByRole('button',{name:'Inspect Meridian telecom'}).click();
 await panel.getByRole('button',{name:'Send backup supplies'}).click();
 await page.getByRole('button',{name:/East delivery hub/}).click();
 await expect(panel.getByText('70% dispatch capacity')).toBeVisible();
 await page.getByRole('button',{name:'Undo',exact:true}).click();
 await expect(panel.getByText('35% dispatch capacity')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
