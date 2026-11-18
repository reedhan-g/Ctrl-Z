const beats=[
 ['The failure.','The grid goes dark. Backup reserves buy time, while failures spread through connected services.'],
 ['The decision.','Two emergency supply interventions. Which essential services will you protect?'],
 ['The rewind.','Rewind, change an intervention and compare the consequences of another response.'],
];
export default function Consequences(){
 return <section className="possibilities page-width" aria-labelledby="possibilities-title">
  <p className="section-marker">03 / The consequences</p>
  <h2 id="possibilities-title">One city.<br/>A chain reaction.</h2>
  <ol className="feature-list">{beats.map(([title,copy],index)=><li key={title}><span className="story-index" aria-hidden="true">0{index+1} /</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
 </section>;
}
