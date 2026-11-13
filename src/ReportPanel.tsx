import {useGame} from './game';
import {resilienceReport} from './report';
import {caseRecovered,evidenceText} from './cases';

export default function ReportPanel(){
 const s=useGame();
 if(!s.history.length||(s.caseStudy&&s.caseStudy.diagnosis!=='correct'))return null;
 const report=resilienceReport(s.branches,s.activeBranch,s.time);
 const download=()=>{
  const payload={...report,investigation:s.caseStudy?{id:s.caseStudy.id,recovered:caseRecovered(s.caseStudy,s),evidence:s.caseStudy.evidence.map(evidenceText)}:null};
  const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
  const link=document.createElement('a');link.href=url;link.download='ctrl-z-resilience-report.json';link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
 };
 return <details className="report-panel" open={s.time>=24||s.restoredAt!==null}>
  <summary>Resilience report</summary>
  <p>Compare every response over the same {s.time.toFixed(1)}h window.</p>
  <table><caption>Service availability by response</caption><thead><tr><th>Response</th><th>Service-hours</th><th>Delayed</th></tr></thead>
   <tbody>{report.outcomes.map(o=><tr key={o.id}><th scope="row">{o.name}</th><td>{o.serviceHours.toFixed(1)}</td><td>{o.backlog.toFixed(1)}</td></tr>)}</tbody></table>
  <p>{report.serviceHoursSaved.toFixed(1)} service-hours preserved vs original.</p>
  <p>Service-hours add availability across five services; dispatch counts partial capacity. Delayed means consignments. These are game assumptions, not real-world predictions.</p>
  <button className="supply" onClick={download}>Download resilience report</button>
 </details>;
}
