/* FILE: app/routes/directory.oral-health.jsx */
import { Link } from "react-router";
import { DirPage, SectionHeader, Panel, Chips, HeroBand } from "../components/directory/DirectoryUI";
import { ORAL_HEALTH, HERBS } from "../data/directoryData";
import { BookOpen, Stethoscope, Leaf, ChevronRight } from "lucide-react";

export const meta = () => [{ title: "Oral Health -- RestoRuh Directory" }];

export default function OralHealthPage() {
  const d = ORAL_HEALTH;
  const herbs = (d.herbs || []).map((id) => HERBS.find((h) => h.id === id)).filter(Boolean);
  return (
    <DirPage>
      <HeroBand icon={Stethoscope} title="Oral Health"
        sub={d.intro} />

      <Panel title="The oral microbiome" icon={BookOpen}>
        <p style={{ fontSize:14, lineHeight:1.8, color:"var(--ink)", marginBottom:10 }}>{d.oralMicrobiome?.what}</p>
        <p style={{ fontSize:14, lineHeight:1.8, color:"var(--ink)" }}>{d.oralMicrobiome?.gutLink}</p>
      </Panel>

      {d.remineralization && (
        <div style={{ marginTop:20 }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", margin:"0 0 14px" }}>Remineralization protocol</h2>
          <Panel title="Overview">
            <p style={{ fontSize:14, lineHeight:1.8, color:"var(--ink)", marginBottom:12 }}>{d.remineralization.overview}</p>
            <ul style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {d.remineralization.protocol.map((step, i) => (
                <li key={i} style={{ display:"flex", gap:10, fontSize:13, color:"var(--ink)", lineHeight:1.6 }}>
                  <span style={{ width:20, height:20, borderRadius:"50%", background:"var(--green)", color:"var(--gold)", display:"grid", placeItems:"center", flexShrink:0, fontSize:11, fontWeight:700 }}>{i+1}</span>
                  {step}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      )}

      {d.badBreath && (
        <div style={{ marginTop:20 }}>
          <Panel title="The truth about bad breath">
            <p style={{ fontSize:14, fontWeight:600, color:"var(--green)", marginBottom:8 }}>{d.badBreath.truth}</p>
            <ul style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {d.badBreath.sources.map((s, i) => (
                <li key={i} style={{ display:"flex", gap:8, fontSize:13, color:"var(--ink)", lineHeight:1.6 }}>
                  <span style={{ marginTop:5, width:5, height:5, borderRadius:"50%", background:"var(--gold)", flexShrink:0 }}/>
                  {s}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      )}

      {herbs.length > 0 && (
        <div style={{ marginTop:28 }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", marginBottom:14 }}>Herbs for oral health</h2>
          <div style={{ display:"grid", gap:10, gridTemplateColumns:"repeat(auto-fill, minmax(250px,1fr))" }}>
            {herbs.map((h) => (
              <Link key={h.id} to={"/directory/herbs/" + h.id}
                style={{ display:"flex", alignItems:"center", gap:10, borderRadius:12, border:"1.5px solid rgba(61,107,80,.12)", padding:12, background:"var(--paper)", textDecoration:"none" }}>
                <Leaf size={15} color="#3d5640"/>
                <p style={{ fontFamily:"var(--font-display)", fontWeight:600, color:"var(--green)", fontSize:14, flex:1 }}>{h.name}</p>
                <ChevronRight size={13} color="var(--gold)"/>
              </Link>
            ))}
          </div>
        </div>
      )}
    </DirPage>
  );
}
