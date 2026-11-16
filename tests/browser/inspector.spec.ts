import {test,expect} from '@playwright/test';

test('inspector explains actions, exposes real dependencies and supports mobile collapse',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./simulation.html');await expect(page.locator('canvas')).toBeVisible();
 const hospital=page.locator('.building-list').getByRole('button',{name:/St. Mira Hospital/});await hospital.click();
 const panel=page.getByRole('region',{name:'Building inspection'});
 await expect(panel.getByRole('heading',{name:'St. Mira Hospital',exact:true})).toBeVisible();
 await expect(panel.getByRole('button',{name:'Send backup supplies'})).toBeDisabled();
 await expect(panel.getByText('Disconnect electricity before assigning backup supplies.')).toBeVisible();
 if(info.project.name==='mobile'){
  await panel.getByRole('button',{name:'Collapse inspection'}).click();
  await expect(panel.getByRole('button',{name:'Expand inspection'})).toHaveAttribute('aria-expanded','false');
  await expect(panel.getByRole('button',{name:'Send backup supplies'})).not.toBeVisible();
  await panel.getByRole('button',{name:'Expand inspection'}).click();
 }
 await panel.getByRole('button',{name:'Trace dependencies',exact:true}).click();
 await expect(page.getByRole('button',{name:'Dependencies',exact:true})).toHaveAttribute('aria-pressed','true');
 await panel.getByText('Required services & affected locations',{exact:true}).click();
 await panel.getByRole('button',{name:'Visit Waterworks',exact:true}).click();
 await expect(panel.getByRole('heading',{name:'Waterworks',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();await page.getByRole('button',{name:'Pause simulation'}).click();
 await expect(panel.getByRole('button',{name:'Send backup supplies'})).toBeEnabled();
 await panel.getByRole('button',{name:'Send backup supplies'}).click();
 await expect(panel.getByRole('button',{name:'Supplies delivered'})).toBeDisabled();
 await expect(panel.getByText('This facility has already received its supply delivery.')).toBeVisible();
 await page.locator('.world').screenshot({path:info.outputPath('contextual-inspector.png')});
 await panel.getByRole('button',{name:'Close inspection'}).click();
 await expect(panel).not.toBeVisible();
});
