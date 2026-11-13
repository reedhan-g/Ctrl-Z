import {test,expect} from '@playwright/test';
test('city controls and inspection remain usable in a short landscape viewport',async({page},testInfo)=>{
 await page.setViewportSize({width:844,height:390});
 await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await page.getByRole('button',{name:/Meridian telecom/}).click();
 const panel=page.getByRole('region',{name:'Building inspection'});
 await expect(panel.getByRole('heading',{name:'Meridian telecom'})).toBeVisible();
 await panel.locator('summary').filter({hasText:'Investigate connections'}).click();
 await expect(panel.getByRole('button',{name:'Inspect North substation'})).toBeVisible();
 await page.screenshot({path:testInfo.outputPath('city-landscape.png'),fullPage:true});
});
