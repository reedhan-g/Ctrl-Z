import {test,expect} from '@playwright/test';

test('investigation follows a cascading hospital water failure to its source',async({page})=>{
 await page.goto('/');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();
 await page.getByRole('button',{name:'Pause simulation'}).click();
 const slider=page.getByRole('slider',{name:'Simulation timeline'});
 await slider.press('End');for(let i=0;i<20;i++)await slider.press('ArrowLeft');
 await page.getByRole('button',{name:/St. Mira Hospital/}).click();
 const panel=page.getByRole('region',{name:'Building inspection'});
 await panel.getByRole('button',{name:'Send backup supplies'}).click();
 await expect(panel.getByText('No water',{exact:true})).toBeVisible();
 await panel.locator('summary').filter({hasText:'Investigate connections'}).click();
 await expect(panel.getByText('Pumps are offline and no stored water remains.')).toBeVisible();
 await panel.getByRole('button',{name:/Inspect Waterworks/}).click();
 await expect(panel.getByRole('heading',{name:'Waterworks',exact:true})).toBeVisible();
 await panel.getByRole('button',{name:'Send backup supplies'}).click();
 await page.getByRole('button',{name:/St. Mira Hospital/}).click();
 await expect(panel.getByText('Backup power',{exact:true})).toBeVisible();
 await panel.locator('summary').filter({hasText:'Incident log'}).click();
 await expect(panel.locator('.incident-list')).toContainText('backup supplies delivered');
 await expect(panel.locator('.incident-list')).toContainText('Waterworks: offline');
});
