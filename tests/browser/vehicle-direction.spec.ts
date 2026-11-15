import {test,expect,type Page} from '@playwright/test';
import {fleet,vehiclePose} from '../../src/traffic';
import {vehicleAtlas} from '../../src/vehicleAtlas';
import {createInitialState,reduceGame} from '../../src/gameState';
import {worldToScreen} from '../../src/worldCamera';

async function seek(page:Page,time:number){
 const slider=page.getByRole('slider',{name:'Simulation timeline'});
 // Clock ticks can round to the same native range step. Force a genuine
 // input change before Home/End so the reducer receives the exact endpoint.
 await slider.press(time>12?'ArrowLeft':'ArrowRight');
 await slider.press(time>12?'End':'Home');
 for(let i=0;i<Math.round((time>12?24-time:time)*4);i++)await slider.press(time>12?'ArrowLeft':'ArrowRight');
}
async function assertTraffic(page:Page,state:ReturnType<typeof createInitialState>){
 const host=page.locator('.city-canvas');
 await expect.poll(async()=>{
  const actual=await host.evaluate(el=>JSON.parse((el as HTMLElement).dataset.traffic!));
  return fleet.every((v,i)=>{const p=vehiclePose(v.id,state),a=actual[i],index=vehicleAtlas.colors[v.art][p.direction].on;
   return a.id===v.id&&a.color===v.art&&a.direction===p.direction&&a.frame.x===index%8*64&&a.frame.y===Math.floor(index/8)*64&&a.frame.width===64&&a.rotation===0&&a.offset.x===-32&&a.offset.y===-36&&Math.abs(a.x-p.point.x)<=.51&&Math.abs(a.y-p.point.y)<=.51;
  });
 }).toBe(true);
}

test('all courier colors render directional frames at road turns and multiple zooms',async({page},info)=>{
 test.setTimeout(120000);await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();await page.getByRole('button',{name:'Pause simulation'}).click();
 await seek(page,0);await page.getByRole('button',{name:'Restore electricity',exact:true}).click();
 let state=reduceGame(reduceGame(reduceGame(createInitialState(),{type:'fail'}),{type:'seek',time:0}),{type:'restore'});
 const host=page.locator('.city-canvas'),panel=page.getByRole('region',{name:'Building inspection'});
 await page.locator('.building-list').getByRole('button',{name:/East delivery hub/}).click();
 for(let i=0;i<6;i++)await page.getByRole('button',{name:'Zoom in'}).click();
 const samples=[['turn-1-before',.25],['turn-1-after',.5],['turn-2-before',10.25],['turn-2-after',10.5],['turn-3-before',15],['turn-3-after',16],['turn-4-before',20],['turn-4-after',20.75]] as const;
 const seen=new Set<string>();
 for(const [name,time] of samples){
  await seek(page,time);state=reduceGame(state,{type:'seek',time});await assertTraffic(page,state);
  await panel.getByRole('button',{name:'Courier 01',exact:true}).click();
  await panel.evaluate(el=>el.scrollTop=0);await host.scrollIntoViewIfNeeded();
  const point=vehiclePose('courier-1',state).point;seen.add(vehiclePose('courier-1',state).direction);
  await expect.poll(async()=>{const view=await host.evaluate(el=>({camera:JSON.parse((el as HTMLElement).dataset.camera!),free:JSON.parse((el as HTMLElement).dataset.inspection!).free}));const p=worldToScreen(point,view.camera);return Math.hypot(p.x-view.free.x-view.free.width/2,p.y-view.free.y-view.free.height/2);}).toBeLessThan(1);
  await page.locator('.world').screenshot({path:info.outputPath(`${name}.png`)});
 }
 expect([...seen].sort()).toEqual(['x+','x-','y+','y-']);
 // Clear road views for color review; foreground architecture keeps its normal occlusion.
 await seek(page,15.75);state=reduceGame(state,{type:'seek',time:15.75});await assertTraffic(page,state);
 for(const vehicle of fleet.slice(1)){
  await panel.getByRole('button',{name:vehicle.name,exact:true}).click();await panel.evaluate(el=>el.scrollTop=0);
  await page.locator('.world').screenshot({path:info.outputPath(`${vehicle.art}.png`)});
 }
 await page.getByRole('button',{name:'Zoom out'}).click();await assertTraffic(page,state);
 await page.getByRole('button',{name:'Zoom out'}).click();await assertTraffic(page,state);
 await page.getByRole('button',{name:'Zoom in'}).click();await assertTraffic(page,state);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('vehicle facing survives pause, speed, recovery, rewind and response branch changes',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await expect(page.locator('canvas')).toBeVisible();
 await page.getByRole('button',{name:'Remove electricity',exact:true}).click();await page.getByRole('button',{name:'Pause simulation'}).click();await seek(page,0);
 let state=reduceGame(reduceGame(createInitialState(),{type:'fail'}),{type:'seek',time:0});
 await assertTraffic(page,state);await page.getByRole('button',{name:'Change simulation speed'}).click();await assertTraffic(page,state);
 await page.getByRole('button',{name:'Play simulation'}).click();await page.waitForTimeout(180);await page.getByRole('button',{name:'Pause simulation'}).click();
 const traffic=()=>page.locator('.city-canvas').evaluate(el=>JSON.parse((el as HTMLElement).dataset.traffic!).map((v:{direction:string;frame:unknown;x:number;y:number})=>({direction:v.direction,frame:v.frame,x:v.x,y:v.y})));
 const paused=await traffic();await page.waitForTimeout(180);expect(await traffic()).toEqual(paused);
 await seek(page,.5);state=reduceGame(state,{type:'seek',time:.5});await assertTraffic(page,state);
 await seek(page,3);state=reduceGame(state,{type:'seek',time:3});
 await page.locator('.building-list').getByRole('button',{name:/Waterworks/}).click();
 const panel=page.getByRole('region',{name:'Building inspection'});await panel.getByRole('button',{name:'Send backup supplies'}).click();state=reduceGame(state,{type:'boost',id:'water'});const branch=state.activeBranch;await assertTraffic(page,state);
 await seek(page,1);state=reduceGame(state,{type:'seek',time:1});
 await page.locator('.building-list').getByRole('button',{name:/Meridian telecom/}).click();await panel.getByRole('button',{name:'Send backup supplies'}).click();state=reduceGame(state,{type:'boost',id:'telecom'});await assertTraffic(page,state);
 await page.getByRole('combobox',{name:'Replay branch'}).selectOption(String(branch));state=reduceGame(state,{type:'branch',id:branch});
 await seek(page,3);state=reduceGame(state,{type:'seek',time:3});await assertTraffic(page,state);
 await page.getByRole('button',{name:'Restore electricity',exact:true}).click();state=reduceGame(state,{type:'restore'});await assertTraffic(page,state);
 await page.getByRole('button',{name:'Undo',exact:true}).click();state=reduceGame(state,{type:'rewind'});await assertTraffic(page,state);
 await seek(page,0);state=reduceGame(state,{type:'seek',time:0});await assertTraffic(page,state);
});
