import {test,expect} from '@playwright/test';
test('delivery vehicles expose their dispatch dependency and lose service with hub power',async({page})=>{
 await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:/East delivery hub/}).click();
 const panel=page.getByRole('region',{name:'Building inspection'});
 await panel.getByRole('button',{name:'Courier 01',exact:true}).click();
 await expect(panel.getByRole('heading',{name:'Courier 01'})).toBeVisible();
 await expect(panel.getByText('100% dispatch capacity')).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();
 await page.getByRole('button',{name:'Pause simulation'}).click();
 await page.getByRole('slider',{name:'Simulation timeline'}).press('End');
 await expect(panel.getByText('0% dispatch capacity')).toBeVisible();
 await panel.getByRole('button',{name:'Send backup supplies'}).click();
 await expect(panel.getByText('35% dispatch capacity')).toBeVisible();
 await expect(panel.getByText('Fleet depends on East delivery hub power and dispatch.')).toBeVisible();
});
