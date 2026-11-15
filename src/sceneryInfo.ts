import {cityScenery,type Scenery} from './worldScenery.ts';

const roles:Record<string,{name:string;category:string;purpose:string}>={
 market:{name:'Jade Market',category:'Commercial',purpose:'A neighborhood shopfront and upper-floor retail block.'},
 noodle:{name:'Night Ramen',category:'Food & retail',purpose:'A late-night noodle shop serving the street and its courtyard.'},
 arcade:{name:'After Hours Arcade',category:'Entertainment',purpose:'A neighborhood arcade with a street-facing illuminated entrance.'},
 walkup:{name:'Courtyard Walkup',category:'Residential',purpose:'Apartments with balconies and a shared pedestrian court.'},
 apartments:{name:'Orbit Apartments',category:'Residential',purpose:'A stepped apartment block with garden terraces.'},
 workshop:{name:'Repair Works',category:'Industrial',purpose:'A local workshop with roof ventilation and service access.'},
 warehouse:{name:'Freight Depot',category:'Industrial',purpose:'A storage frontage with loading doors and a ribbed shed roof.'},
 cinema:{name:'Lumen Cinema',category:'Entertainment',purpose:'A small district cinema with an original marquee and facade poster.'},
 cafe:{name:'Moss Café',category:'Food & retail',purpose:'A corner café opening onto the neighborhood pavement.'},
 studio:{name:'Meridian Radio Studio',category:'Commercial',purpose:'A studio and office block with rooftop communications equipment.'},
 yardHouse:{name:'Yard House',category:'Residential',purpose:'Lantern Yard apartments opening onto the planted social court.'},
 lanternNoodles:{name:'Lantern Noodles',category:'Food & retail',purpose:'The Lantern junction noodle kitchen, identified by its lanterns and warm fascia.'},
 lanternCafe:{name:'Lantern Café',category:'Food & retail',purpose:'A low café pavilion that keeps the Lantern crossroads open and readable.'},
};
export const findScenery=(id:string|null)=>id?cityScenery.find(b=>b.id===id):undefined;
export const sceneryInfo=(b:Scenery)=>({...roles[b.model],district:b.district.name,simulated:false as const});
