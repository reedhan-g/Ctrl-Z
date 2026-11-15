import {test,expect} from '@playwright/test';

test('records the real interface through blackout inspection intervention and replay',async({page},info)=>{
 test.setTimeout(120000);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(process.env.CTRL_Z_REVIEW_URL||'./');await expect(page.locator('canvas')).toBeVisible();
 const capture=async(name:string)=>page.screenshot({path:info.outputPath(`${name}.png`),fullPage:true});
 await capture('opening');
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();
 await page.getByRole('button',{name:'Pause simulation'}).click();await capture('blackout');
 for(const [id,name] of [['hospital','St. Mira Hospital'],['logistics','East delivery hub']]){
  await page.locator('.building-list').getByRole('button',{name:new RegExp(name)}).click();
  const panel=page.getByRole('region',{name:'Building inspection'});
  await expect(panel.getByRole('heading',{name,exact:true})).toBeVisible();
  const expand=page.getByRole('button',{name:'Expand inspection'});if(await expand.isVisible())await expand.click();
  await capture(id);
 }
 await page.getByRole('region',{name:'Building inspection'}).getByRole('button',{name:/Send backup supplies/}).click();
 await page.getByRole('button',{name:'Close inspection'}).click();
 const detail=page.getByRole('button',{name:'Timeline details',exact:true});if(await detail.isVisible())await detail.click();
 await page.getByRole('slider',{name:'Simulation timeline'}).press('End');await capture('timeline');
 await page.getByRole('button',{name:'Restore electricity',exact:true}).click();await capture('restored');
 await page.getByRole('button',{name:'Undo',exact:true}).click();await capture('replay');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
