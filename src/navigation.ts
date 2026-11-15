import {create} from 'zustand';
import type {Point} from './geometry';
import type {CameraView} from './worldCamera';

// Camera state is separate from the experiment: navigation cannot advance time.
interface Navigation {
 view:CameraView|null;
 vehiclePoint:Point|null;
 sceneryId:string|null;
 inspectionRequest:number;
 recenter:(point:Point)=>void;
 reset:()=>void;
}
export const useNavigation=create<Navigation>(()=>({view:null,vehiclePoint:null,sceneryId:null,inspectionRequest:0,recenter:()=>{},reset:()=>{}}));
