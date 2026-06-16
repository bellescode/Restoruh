/* FILE: app/routes/directory.toxicity.jsx */
import { DirPage, SectionHeader, Panel, HeroBand } from "../components/directory/DirectoryUI";
import { TOXICITY } from "../data/directoryData";
import { ShieldAlert, BookOpen, Info } from "lucide-react";

export const meta = () => [{ title: "Viral Load and Toxicity -- RestoRuh Directory" }];

export default function ToxicityPage() {
  const d = TOXICITY;
  return (
    <DirPage>
      <HeroBand icon={ShieldAlert} title="Viral Load and Heavy Metals" sub={d.intro} />

      <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", margin:"24px 0 16px" }}>Viral Overload</h2>
      <Panel title="What it is" icon={BookOpen}>
        <p style={{ fontSize:14, lineHeight:1.8, color:"var(--ink)" }}>{d.viralOverload?.what}</p>
      </Panel>
      {d.viralOverload?.symptoms && (
        <div style={{ marginTop:16 }}>
          <Panel title="Common symptoms">
            <ul style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {d.viralOverload.symptoms.map((s, i) => (
                <li key={i} style={{ display:"flex", gap:8, fontSize:13, color:"var(--ink)", lineHeight:1.6 }}>
                  <span style={{ marginTop:5, width:5, height:5, borderRadius:"50%", background:"var(--gold)", flexShrink:0 }}/>{s}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      )}
      {d.viralOverload?.protocol && (
        <div style={{ marginTop:16 }}>
          <Panel title="Protocol and herb support">
            <ul style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {d.viralOverload.protocol.map((s, i) => (
                <li key={i} style={{ display:"flex", gap:8, fontSize:13, color:"var(--ink)", lineHeight:1.6 }}>
                  <span style={{ width:20, height:20, borderRadius:"50%", background:"var(--green)", color:"var(--gold)", display:"grid", placeItems:"center", flexShrink:0, fontSize:10, fontWeight:700 }}>{i+1}</span>
                  {s}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      )}

      <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", margin:"32px 0 16px" }}>Copper Dysregulation</h2>
      <Panel title="What it is" icon={Info}>
        <p style={{ fontSize:14, lineHeight:1.8, color:"var(--ink)" }}>{d.copper?.what}</p>
      </Panel>
      {d.copper?.symptoms && (
        <div style={{ marginTop:14 }}>
          <Panel title="Symptoms">
            <ul style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {d.copper.symptoms.map((s, i) => (
                <li key={i} style={{ display:"flex", gap:8, fontSize:13, color:"var(--ink)", lineHeight:1.6 }}>
                  <span style={{ marginTop:5, width:5, height:5, borderRadius:"50%", background:"var(--gold)", flexShrink:0 }}/>{s}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      )}

      <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", margin:"32px 0 16px" }}>Mercury and Heavy Metals</h2>
      <Panel title="Mercury" icon={ShieldAlert}>
        <p style={{ fontSize:14, lineHeight:1.8, color:"var(--ink)" }}>{d.mercury?.what}</p>
      </Panel>

      {d.protocol && (
        <div style={{ marginTop:28 }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", marginBottom:16 }}>Detox Protocol Phases</h2>
          {d.protocol.phases && d.protocol.phases.map((phase, pi) => (
            <div key={pi} style={{ marginBottom:16, borderRadius:14, border:"1.5px solid rgba(61,107,80,.12)", padding:18, background:"var(--paper)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:600, color:"var(--green)" }}>{phase.phase}</h3>
                <span style={{ fontSize:11, fontWeight:700, color:"var(--gold)", background:"rgba(201,162,74,.15)", padding:"2px 10px", borderRadius:999, flexShrink:0, marginLeft:10 }}>{phase.weeks}</span>
              </div>
              <ul style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {phase.steps.map((s, i) => (
                  <li key={i} style={{ display:"flex", gap:8, fontSize:13, color:"var(--ink)", lineHeight:1.6 }}>
                    <span style={{ marginTop:5, width:5, height:5, borderRadius:"50%", background:"var(--gold)", flexShrink:0 }}/>{s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div style={{ padding:14, borderRadius:12, background:"rgba(255,200,100,.12)", border:"1px solid rgba(255,200,100,.3)", fontSize:13, color:"var(--ink)", lineHeight:1.65 }}>
            <strong>Important: </strong>{d.protocol.warning}
          </div>
        </div>
      )}
    </DirPage>
  );
}
