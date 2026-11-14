import {test,expect} from '@playwright/test';

test('late water delivery recovers a depleted reserve and keyboard undo works from a focused button',async({page})=>{
 await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();
 await page.getByRole('button',{name:'Pause simulation'}).click();
 const slider=page.getByRole('slider',{name:'Simulation timeline'});
 await slider.press('Home');
 for(let i=0;i<48;i++)await slider.press('ArrowRight');
 await page.getByRole('button',{name:/Waterworks/}).click();
 const panel=page.getByRole('region',{name:'Building inspection'});
 await expect(panel.getByText('Offline',{exact:true})).toBeVisible();
 await panel.getByRole('button',{name:'Send backup supplies'}).click();
 await expect(panel.getByText('Backup power',{exact:true})).toBeVisible();
 await expect(panel.locator('.reserve strong')).toContainText('8.0');
 await page.getByRole('button',{name:'Change simulation speed'}).focus();
 await page.keyboard.press('Control+z');
 await expect(panel.getByText('Offline',{exact:true})).toBeVisible();
 await page.keyboard.press('Escape');await expect(panel).not.toBeVisible();
});

test('foreground residence roof selects residences and help returns focus',async({page})=>{
 await page.goto('./');const canvas=page.locator('canvas');await expect(canvas).toBeVisible();
 const v=await page.locator('.city-canvas').evaluate(el=>JSON.parse((el as HTMLElement).dataset.camera!));
 await canvas.click({position:{x:v.origin.x+v.pan.x,y:v.origin.y+v.pan.y+156.6*v.scale}});
 await expect(page.getByRole('heading',{name:'Maple residences',exact:true})).toBeVisible();
 const help=page.getByRole('button',{name:'How to play'});await help.click();
 await expect(page.getByRole('button',{name:'Close help'})).toBeFocused();
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();
 await expect(help).toBeFocused();
});
