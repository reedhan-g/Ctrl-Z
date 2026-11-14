import {chromium,devices} from 'playwright';
import {mkdir} from 'node:fs/promises';
const directory=process.argv[2]??'test-results/visual-review';
await mkdir(directory,{recursive:true});
const browser=await chromium.launch({headless:true});
for(const mobile of [false,true]){
 const context=await browser.newContext(mobile?{...devices['iPhone 13'],reducedMotion:'reduce'}:{viewport:{width:1280,height:900},reducedMotion:'reduce'});
 const page=await context.newPage();await page.goto('http://127.0.0.1:5173/Ctrl-Z/');
 await page.locator('canvas').waitFor();await page.waitForTimeout(800);
 await page.locator('.world').screenshot({path:`${directory}/${mobile?'mobile':'desktop'}-opening.png`});
 await context.close();
}
await browser.close();
