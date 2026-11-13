import {test,expect} from '@playwright/test';

test('scrubbing preserves a response and compares it with the original outage',async({page})=>{
 await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();
 await page.getByRole('button',{name:'Pause simulation'}).click();
 const slider=page.getByRole('slider',{name:'Simulation timeline'});
 await slider.press('Home');
 await page.getByRole('button',{name:/Waterworks/}).click();
 const panel=page.getByRole('region',{name:'Building inspection'});
 await panel.getByRole('button',{name:'Send backup supplies'}).click();
 await slider.press('End');for(let i=0;i<48;i++)await slider.press('ArrowLeft');
 await expect(panel.getByText('Backup power',{exact:true})).toBeVisible();
 await expect(panel.getByRole('button',{name:'Supplies delivered',exact:true})).toBeDisabled();
 await page.getByRole('combobox',{name:'Replay branch'}).selectOption('0');
 await expect(panel.getByText('Offline',{exact:true})).toBeVisible();
 await page.getByRole('combobox',{name:'Replay branch'}).selectOption('1');
 await expect(panel.getByText('Backup power',{exact:true})).toBeVisible();
 await expect(page.getByLabel('Outcome comparison')).toContainText('vs original');
});
