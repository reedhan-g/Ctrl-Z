import {create} from 'zustand';
import type {Point} from './geometry';
import type {CameraView} from './worldCamera';

// Camera state is separate from the experiment: navigation cannot advance time.
interface Navigation {
 view:CameraView|null;
 vehiclePoint:Point|null;
 recenter:(point:Point)=>void;
 reset:()=>void;
}
export const useNavigation=create<Navigation>(()=>({view:null,vehiclePoint:null,recenter:()=>{},reset:()=>{}}));
