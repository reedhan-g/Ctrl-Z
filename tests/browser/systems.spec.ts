import {test,expect} from '@playwright/test';
import {buildings,status,serviceCapacity,initial} from '../../src/simulation';
test('six system cards reflect real reserve transitions and navigate to their facilities',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 await expect(page.locator('[data-system]')).toHaveCount(6);
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();await page.getByRole('button',{name:'Pause simulation'}).click();
 const slider=page.getByRole('slider',{name:'Simulation timeline'});
 for(const time of [0,4,6,18,24]){
  await slider.press('End');await slider.press('Home');for(let i=0;i<time*4;i++)await slider.press('ArrowRight');
  for(const b of buildings){const s={...initial,outage:true,time},state=status(b.id,s),card=page.locator(`[data-system="${b.id}"]`);
   await expect(card).toHaveAttribute('data-tone',state.tone);await expect(card.locator('small')).toContainText(state.label);
   if(b.id==='logistics')await expect(card.locator('small')).toContainText(`${Math.round(serviceCapacity(b.id,s)*100)}%`);
  }
 }
 for(const b of buildings){await page.locator(`[data-system="${b.id}"]`).click();await expect(page.getByRole('region',{name:'Building inspection'}).getByRole('heading',{name:b.name,exact:true})).toBeVisible();}
 await page.getByRole('button',{name:'Restore electricity',exact:true}).click();await expect(page.locator('[data-system][data-tone=good]')).toHaveCount(6);
});
