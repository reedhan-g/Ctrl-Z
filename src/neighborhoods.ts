import type {CityModel} from './cityModels.ts';

// Individual block programs around Civic Avenue and the full Lantern junction.
// The pair forms a rear landmark and lower street frontage with an open court.
export const neighborhoodBlocks:readonly {x:number;y:number;rear:CityModel;front:CityModel;court:string}[]=[
 {x:-5,y:-5,rear:'studio',front:'cafe',court:'Radio court'},
 {x:0,y:-5,rear:'market',front:'noodle',court:'Jade passage'},
 {x:5,y:-5,rear:'cinema',front:'cafe',court:'Lumen forecourt'},
 {x:10,y:-5,rear:'workshop',front:'noodle',court:'Repair yard'},
 {x:-5,y:0,rear:'walkup',front:'cafe',court:'West garden'},
 {x:10,y:0,rear:'market',front:'noodle',court:'Medical shops'},
 {x:-5,y:5,rear:'workshop',front:'cafe',court:'Dispatch access'},
 {x:10,y:5,rear:'walkup',front:'noodle',court:'Maple passage'},
 {x:-5,y:10,rear:'cinema',front:'cafe',court:'South forecourt'},
 {x:0,y:10,rear:'walkup',front:'noodle',court:'Garden court'},
 {x:5,y:10,rear:'apartments',front:'cafe',court:'Orbit court'},
 {x:10,y:10,rear:'studio',front:'cafe',court:'Exchange square'},
 {x:-20,y:-15,rear:'walkup',front:'cafe',court:'Lantern garden'},
 {x:-15,y:-20,rear:'workshop',front:'noodle',court:'Lantern repair yard'},
 {x:-15,y:-15,rear:'cinema',front:'cafe',court:'Lantern arcade'},
];
