import {test,expect} from '@playwright/test';
test('outage, inspection, supplies, time travel and recovery',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('./');
 await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();
 await page.getByRole('button',{name:'Pause simulation'}).click();
 await expect(page.getByText('GRID OFFLINE',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:/St. Mira Hospital/}).click();
 const panel=page.getByRole('region',{name:'Building inspection'});
 await expect(panel.getByRole('heading',{name:'St. Mira Hospital'})).toBeVisible();
 await panel.getByRole('button',{name:'Send backup supplies'}).click();
 await expect(panel.getByRole('button',{name:'Supplies delivered',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Undo',exact:true}).click();
 await expect(panel.getByRole('button',{name:'Send backup supplies'})).toBeEnabled();
 await page.getByRole('slider',{name:'Simulation timeline'}).press('End');
 await expect(panel.getByText('Offline',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Close inspection'}).click();
 await page.getByRole('button',{name:'Dependencies'}).click();
 await page.getByRole('button',{name:'Zoom in'}).click();
 await page.getByRole('button',{name:'Reset camera'}).click();
 await page.getByRole('button',{name:'Restore electricity',exact:true}).click();
 await expect(page.getByText('SYSTEMS NOMINAL',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Reset experiment'}).click();
 await expect(page.getByRole('slider')).toHaveValue('0');
 expect(errors).toEqual([]);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
test('canvas selection and camera drag',async({page})=>{
 await page.goto('./');const canvas=page.locator('canvas');await expect(canvas).toBeVisible();
 const box=(await canvas.boundingBox())!;
 const v=await page.locator('.city-canvas').evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!));
 await canvas.click({position:{x:v.origin.x+v.pan.x+156*v.scale,y:v.origin.y+v.pan.y+151*v.scale}});
 await expect(page.getByRole('heading',{name:'St. Mira Hospital',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Close inspection'}).click();
 // Building selection is also exposed as ordinary buttons for keyboard and touch users.
 await page.getByRole('button',{name:/Waterworks/}).click();
 await expect(page.getByRole('heading',{name:'Waterworks',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Close inspection'}).click();
 await page.mouse.move(box.x+box.width*.45,box.y+box.height*.5);
 await page.mouse.down();await page.mouse.move(box.x+box.width*.55,box.y+box.height*.6,{steps:10});await page.mouse.up();
 await page.getByRole('button',{name:'Reset camera'}).click();
 await expect(canvas).toBeVisible();
});

