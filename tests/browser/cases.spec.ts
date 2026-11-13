import {test,expect} from '@playwright/test';
for(const scenario of [
 {id:'dispatch',names:['East delivery hub','Meridian telecom','North substation'],source:'Meridian telecom',answer:'telecom'},
 {id:'wards',names:['St. Mira Hospital','Waterworks','North substation'],source:'Waterworks',answer:'water'},
])test(`investigation ${scenario.id} requires evidence and tests recovery`,async({page})=>{
 await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Investigation',exact:true}).click();
 await page.getByRole('combobox',{name:'Investigation case'}).selectOption(scenario.id);
 await expect(page.getByRole('button',{name:'Test diagnosis'})).toBeDisabled();
 const panel=page.getByRole('region',{name:'Building inspection'});
 for(const name of scenario.names){
  await page.locator('.building-list').getByRole('button',{name:new RegExp(name)}).click();
  await panel.getByRole('button',{name:'Record evidence'}).click();
 }
 await page.getByRole('combobox',{name:'Failing dependency'}).selectOption('homes');
 await page.getByRole('button',{name:'Test diagnosis'}).click();
 await expect(page.getByText('That diagnosis does not explain the readings.',{exact:false})).toBeVisible();
 await page.getByRole('combobox',{name:'Failing dependency'}).selectOption(scenario.answer);
 await page.getByRole('button',{name:'Test diagnosis'}).click();
 await page.locator('.building-list').getByRole('button',{name:new RegExp(scenario.source)}).click();
 await panel.getByRole('button',{name:'Send backup supplies'}).click();
 await expect(page.getByText('Recovery verified in the simulation.',{exact:false})).toBeVisible();
 await expect(panel.getByRole('button',{name:'Record evidence'})).toBeDisabled();
 await page.getByRole('button',{name:'Save experiment',exact:true}).click();
 await expect(page.getByText('Experiment saved on this browser.')).toBeVisible();
 await page.getByRole('button',{name:'Undo',exact:true}).click();
 await expect(page.getByText('Recovery verified in the simulation.',{exact:false})).not.toBeVisible();
 await page.getByRole('slider',{name:'Simulation timeline'}).press('Home');
 await expect(page.getByText('Recovery verified in the simulation.',{exact:false})).not.toBeVisible();
});
