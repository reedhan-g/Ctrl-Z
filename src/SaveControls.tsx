import {useState} from 'react';
import {useGame} from './game';
import {saveKey,encodeExperiment,decodeExperiment} from './persistence';

export default function SaveControls(){
 const [message,setMessage]=useState('');
 const save=()=>{try{localStorage.setItem(saveKey,encodeExperiment(useGame.getState()));setMessage('Experiment saved on this browser.');}
  catch{setMessage('Could not save. Browser storage may be unavailable or the experiment too large.');}};
 const load=()=>{try{const saved=localStorage.getItem(saveKey),state=saved?decodeExperiment(saved):null;
   if(!state){setMessage('No compatible saved experiment found. Current experiment kept.');return;}
   useGame.setState(state);setMessage('Saved experiment resumed, paused.');
  }catch{setMessage('Could not read browser storage. Current experiment kept.');}};
 return <div className="save-controls"><div><button onClick={save}>Save experiment</button><button onClick={load}>Resume saved</button></div>
  {message&&<p role="status">{message}</p>}</div>;
}
