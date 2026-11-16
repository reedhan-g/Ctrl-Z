import {test,expect} from '@playwright/test';
test('optional guide follows real actions and replay never resets an experiment',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(process.env.CTRL_Z_REVIEW_URL||'./simulation.html');await expect(page.locator('canvas')).toBeVisible();
 const guide=page.getByRole('region',{name:'Guided experiment'});await expect(guide).not.toBeVisible();
 await page.getByRole('button',{name:'How to play',exact:true}).click();await page.getByRole('button',{name:'Start guided experiment'}).click();
 await expect(guide.getByRole('heading',{name:'This is Meridian.'})).toBeVisible();await guide.getByRole('button',{name:'Next',exact:true}).click();
 await expect(guide.getByRole('heading',{name:'Remove electricity.',exact:true})).toBeVisible();
 await page.waitForTimeout(200);await expect(page.getByRole('button',{name:'Remove electricity',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();await page.getByRole('button',{name:'Pause simulation'}).click();
 await expect(guide.getByRole('heading',{name:'Follow the cascade.'})).toBeVisible();
 await page.locator('[data-system=hospital]').click();await expect(guide.getByRole('heading',{name:'Change the outcome.'})).toBeVisible();
 await page.getByRole('region',{name:'Building inspection'}).getByRole('button',{name:/Send backup supplies/}).click();
 await expect(guide.getByRole('heading',{name:'Explore freely.'})).toBeVisible();await guide.scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath('guide-complete.png'),fullPage:true});
 await guide.getByRole('button',{name:'Finish guide'}).click();
 const time=await page.getByRole('slider').inputValue();
 await page.getByRole('button',{name:'How to play',exact:true}).click();await page.getByRole('button',{name:'Start guided experiment'}).click();
 await expect(page.getByRole('slider')).toHaveValue(time);await guide.getByRole('button',{name:'Skip guide'}).click();await expect(guide).not.toBeVisible();
 await page.reload();await expect(guide).not.toBeVisible();
});
