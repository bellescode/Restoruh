/* FILE: app/routes/directory.gut-health.jsx -- /directory/gut-health */
import { Link }                from "react-router";
import { DirPage, SectionHeader, Panel, Chips, HeroBand, CautionBox } from "../components/directory/DirectoryUI";
import { GUT_HEALTH, HERBS }   from "../data/directoryData";
import { Stethoscope, Salad, BookOpen, ShieldAlert, Leaf, ChevronRight, Info } from "lucide-react";

export const meta = () => [{ title: "Gut Health Deep Dive -- RestoRuh Directory" }];

export default function GutHealthPage() {
  const g = GUT_HEALTH;
  const herbs = (g.herbs || []).map((id) => HERBS.find((h) => h.id === id)).filter(Boolean);
  return (
    <DirPage>
      <HeroBand icon={Stethoscope} title="Gut Health Deep Dive"
        sub="The gut shapes immunity, mood, and energy. Everything downstream of what you eat is decided here." />

      {/* Microbiome */}
      <Panel title="The gut microbiome" icon={BookOpen}>
        <p style={{ fontSize:14, lineHeight:1.8, color:"var(--ink)" }}>{g.microbiome?.what}</p>
        {g.microbiome?.research && (
          <div style={{ marginTop:14, padding:"12px 16px", borderRadius:10, background:"rgba(61,107,80,.07)", fontSize:13, color:"var(--muted)", lineHeight:1.65 }}>
            {g.microbiome.research}
          </div>
        )}
      </Panel>

      {/* Gut-Brain Axis */}
      {g.gutBrain && (
        <Panel title="The gut-brain connection" icon={Info} style={{ marginTop:20 }}>
          <p style={{ fontSize:14, lineHeight:1.8, color:"var(--ink)" }}>{g.gutBrain.what}</p>
          {g.gutBrain.symptoms && (
            <ul style={{ marginTop:12, display:"flex", flexDirection:"column", gap:6 }}>
              {g.gutBrain.symptoms.map((s, i) => (
                <li key={i} style={{ display:"flex", gap:8, fontSize:13, color:"var(--ink)" }}>
                  <span style={{ marginTop:5, width:5, height:5, borderRadius:"50%", background:"var(--gold)", flexShrink:0 }}/>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </Panel>
      )}

      {/* Pre/Pro/Postbiotics */}
      {g.biotics && (
        <div style={{ marginTop:20 }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", marginBottom:16 }}>Pre, Pro, and Postbiotics</h2>
          <div style={{ display:"grid", gap:14, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
            {Object.entries(g.biotics).map(([key, val]) => (
              <Panel key={key} title={val.name}>
                <p style={{ fontSize:13, lineHeight:1.65, color:"var(--ink)", marginBottom:8 }}>{val.what}</p>
                {val.examples && <Chips items={val.examples}/>}
              </Panel>
            ))}
          </div>
        </div>
      )}

      {/* Gut Recipes */}
      {g.recipes && g.recipes.length > 0 && (
        <div style={{ marginTop:28 }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", marginBottom:16 }}>Gut-supportive recipes</h2>
          <div style={{ display:"grid", gap:14, gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))" }}>
            {g.recipes.map((r, i) => (
              <div key={i} style={{ borderRadius:14, border:"1.5px solid rgba(61,107,80,.12)", padding:18, background:"var(--paper)" }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:600, color:"var(--green)", marginBottom:6 }}>{r.name}</h3>
                <p style={{ fontSize:13, color:"var(--muted)", marginBottom:10, lineHeight:1.6 }}>{r.why}</p>
                {r.ingredients && <Chips items={r.ingredients}/>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Herbs */}
      {herbs.length > 0 && (
        <div style={{ marginTop:28 }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", marginBottom:16 }}>Herbs for the gut</h2>
          <div style={{ display:"grid", gap:12, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
            {herbs.map((h) => (
              <Link key={h.id} to={`/directory/herbs/${h.id}`}
                style={{ display:"flex", alignItems:"center", gap:12, borderRadius:14, border:"1.5px solid rgba(61,107,80,.12)", padding:14, background:"var(--paper)", textDecoration:"none" }}>
                <Leaf size={16} color="#3d5640"/>
                <div>
                  <p style={{ fontFamily:"var(--font-display)", fontWeight:600, color:"var(--green)", fontSize:14 }}>{h.name}</p>
                  <p style={{ fontSize:12, color:"var(--muted)" }}>{h.uses.slice(0, 80)}...</p>
                </div>
                <ChevronRight size={14} color="var(--gold)" style={{ marginLeft:"auto", flexShrink:0 }}/>
              </Link>
            ))}
          </div>
        </div>
      )}
    </DirPage>
  );
}
