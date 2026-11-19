import {test,expect} from '@playwright/test';

// The actual anonymous host policy: no unsafe-eval and no blob worker source.
const policy="default-src 'self'; img-src 'self' data: https: *; style-src 'self' 'unsafe-inline' https: *; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https: *; font-src 'self' data: https: *; connect-src 'self' https: *; media-src 'self' https: *; object-src 'none'; frame-src 'self' https: *;";

test('production game plays inside the homepage under Embarko CSP',async({page})=>{
 const errors:string[]=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.route('**/*',async route=>{
  if(route.request().resourceType()!=='document')return route.continue();
  const response=await route.fetch();
  await route.fulfill({response,headers:{...response.headers(),'content-security-policy':policy}});
 });
 await page.goto('./');
 await expect(page.getByRole('heading',{name:'Ctrl Z',exact:true})).toBeVisible();
 await expect(page.locator('iframe')).toHaveCount(0);
 await page.getByText('Play embedded on this page',{exact:true}).click();
 await page.getByRole('button',{name:'Start simulation',exact:true}).click();
 const game=page.frameLocator('iframe');
 await expect(game.locator('canvas')).toBeVisible();
 await game.getByRole('button',{name:'Remove electricity',exact:true}).click();
 await game.getByRole('button',{name:'Pause simulation'}).click();
 await game.locator('.building-list').getByRole('button',{name:/St. Mira Hospital/}).click();
 const inspection=game.getByRole('region',{name:'Building inspection'});
 await expect(inspection.getByRole('heading',{name:'St. Mira Hospital',exact:true})).toBeVisible();
 await inspection.getByRole('button',{name:'Send backup supplies'}).click();
 await expect(inspection.getByRole('button',{name:'Supplies delivered',exact:true})).toBeDisabled();
 await game.getByRole('button',{name:'Save experiment',exact:true}).click();
 await expect(game.getByText('Experiment saved on this browser.')).toBeVisible();
 const saved=await page.evaluate(()=>localStorage.getItem('ctrl-z:experiment:v1'));
 expect(saved).toBeTruthy();
 await page.getByRole('link',{name:'Open full-screen',exact:true}).click();
 await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Resume saved',exact:true}).click();
 await expect(page.getByText('Saved experiment resumed, paused.')).toBeVisible();
 await page.getByRole('button',{name:'Restore electricity',exact:true}).click();
 await expect(page.getByText('SYSTEMS NOMINAL',{exact:true})).toBeVisible();
 expect(errors).toEqual([]);
});
