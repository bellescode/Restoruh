/* FILE: app/routes/directory.herbs.$herbId.jsx -- /directory/herbs/:herbId */
import { Link, useParams }          from "react-router";
import { useDirectoryContext }      from "../components/directory/DirectoryContext";
import { DirPage, BackBtn, Panel, Chips, EvidenceBadge, CautionBox } from "../components/directory/DirectoryUI";
import { HERBS, SYSTEMS, AILMENTS, WHO_LABELS, MASTER_BLEND } from "../data/directoryData";
import { Leaf, Heart, BookOpen, ShieldAlert, ClipboardList, Sparkles, Droplets, Stethoscope, ChevronRight } from "lucide-react";

export function meta({ params }) {
  const h = HERBS.find((x) => x.id === params.herbId);
  return [{ title: h ? `${h.name} -- RestoRuh Directory` : "Herb -- RestoRuh" }];
}

export default function HerbDetail() {
  const { herbId }          = useParams();
  const { favs, toggleFav } = useDirectoryContext();

  /* Master Blend special page */
  if (herbId === "master-blend") return <MasterBlendPage />;

  const herb = HERBS.find((h) => h.id === herbId);
  if (!herb) return (
    <DirPage>
      <BackBtn to="/directory/herbs" label="Herb Library"/>
      <p style={{ color:"var(--muted)" }}>Herb not found.</p>
    </DirPage>
  );

  const fav     = favs.includes(herb.id);
  const sysObjs = herb.systems.map((id) => SYSTEMS.find((s) => s.id === id)).filter(Boolean);
  const ailObjs = herb.ailments.map((id) => AILMENTS.find((a) => a.id === id)).filter(Boolean);

  return (
    <DirPage>
      <BackBtn to="/directory/herbs" label="Herb Library"/>
      <div style={{ borderRadius:20, padding:28, background:"var(--green)", marginBottom:24 }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16 }}>
          <div>
            <span style={{ display:"grid", placeItems:"center", width:48, height:48, borderRadius:12, background:"rgba(201,162,74,.18)" }}>
              <Leaf size={24} color="var(--gold)"/>
            </span>
            <h1 style={{ marginTop:14, fontFamily:"var(--font-display)", fontSize:"clamp(24px,4vw,36px)", fontWeight:600, color:"var(--cream)" }}>{herb.name}</h1>
            <p style={{ fontSize:13, fontStyle:"italic", color:"var(--sage)" }}>{herb.latin}</p>
          </div>
          <button onClick={() => toggleFav(herb.id)}
            style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:999, fontSize:13, fontWeight:600, cursor:"pointer", border:"none", flexShrink:0,
              background: fav ? "var(--gold)" : "rgba(245,240,227,.12)",
              color:      fav ? "#16291f"     : "var(--cream)" }}>
            <Heart size={15} fill={fav ? "#16291f" : "none"}/>{fav ? "Saved" : "Save"}
          </button>
        </div>
        <div style={{ marginTop:14, display:"flex", flexWrap:"wrap", gap:8 }}>
          <EvidenceBadge level={herb.evidence}/>
          {herb.who.map((w) => (
            <span key={w} style={{ borderRadius:999, padding:"3px 10px", fontSize:11, fontWeight:600, background:"rgba(245,240,227,.12)", color:"var(--gold-soft)" }}>
              {WHO_LABELS[w] || w}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display:"grid", gap:20, gridTemplateColumns:"repeat(auto-fit, minmax(280px,1fr))" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <Panel title="Traditional and researched uses" icon={BookOpen}>
            <p style={{ fontSize:14, lineHeight:1.75, color:"var(--ink)" }}>{herb.uses}</p>
          </Panel>
          <Panel title="Safety and cautions" icon={ShieldAlert}>
            <p style={{ fontSize:14, lineHeight:1.75, color:"var(--ink)" }}>{herb.safety}</p>
          </Panel>
          {ailObjs.length > 0 && (
            <Panel title="Commonly used for" icon={ClipboardList}>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {ailObjs.map((a) => (
                  <Link key={a.id} to={`/directory/ailments/${a.id}`}
                    style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 12px", borderRadius:8, background:"rgba(61,107,80,.06)", color:"var(--green)", textDecoration:"none", fontSize:14 }}>
                    {a.name} <ChevronRight size={14} color="var(--gold)"/>
                  </Link>
                ))}
              </div>
            </Panel>
          )}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <Panel title="Key actions" icon={Sparkles}><Chips items={herb.actions} tone="gold"/></Panel>
          <Panel title="Common formats" icon={Droplets}><Chips items={herb.formats}/></Panel>
          {sysObjs.length > 0 && (
            <Panel title="Body systems" icon={Stethoscope}>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {sysObjs.map((s) => (
                  <Link key={s.id} to={`/directory/systems/${s.id}`}
                    style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 12px", borderRadius:8, background:"rgba(61,107,80,.06)", color:"var(--green)", textDecoration:"none", fontSize:14 }}>
                    {s.name} <ChevronRight size={14} color="var(--gold)"/>
                  </Link>
                ))}
              </div>
            </Panel>
          )}
        </div>
      </div>
    </DirPage>
  );
}

function MasterBlendPage() {
  return (
    <DirPage>
      <BackBtn to="/directory/herbs" label="Herb Library"/>
      <div style={{ borderRadius:20, padding:28, background:"var(--green)", marginBottom:24 }}>
        <span style={{ display:"grid", placeItems:"center", width:48, height:48, borderRadius:12, background:"var(--gold)", marginBottom:14 }}>
          <Sparkles size={24} color="#16291f"/>
        </span>
        <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(24px,4vw,36px)", fontWeight:600, color:"var(--cream)", marginBottom:8 }}>{MASTER_BLEND.name}</h1>
        <p style={{ fontSize:14, color:"var(--sage)", lineHeight:1.7 }}>{MASTER_BLEND.tagline}</p>
      </div>

      <Panel title="Why this blend" icon={BookOpen}>
        <p style={{ fontSize:14, lineHeight:1.75, color:"var(--ink)" }}>{MASTER_BLEND.why}</p>
      </Panel>

      <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", margin:"28px 0 16px" }}>Ingredients</h2>
      <div style={{ display:"grid", gap:12, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
        {MASTER_BLEND.ingredients.map((ing) => (
          <div key={ing.name} style={{ borderRadius:14, border:"1.5px solid rgba(61,107,80,.12)", padding:16, background:"var(--paper)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:600, color:"var(--green)" }}>{ing.name}</h3>
              <span style={{ fontSize:12, fontWeight:700, color:"var(--gold)", background:"rgba(201,162,74,.15)", padding:"2px 8px", borderRadius:999 }}>{ing.dose}</span>
            </div>
            <p style={{ fontSize:13, color:"var(--muted)", marginTop:6, lineHeight:1.55 }}>{ing.role}</p>
          </div>
        ))}
      </div>

      {MASTER_BLEND.infant && (
        <>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:600, color:"var(--green)", margin:"28px 0 14px" }}>Infant Protocol (7 months+)</h2>
          <Panel title={MASTER_BLEND.infant.title} icon={ShieldAlert}>
            <p style={{ fontSize:14, color:"var(--ink)", lineHeight:1.7, marginBottom:12 }}>{MASTER_BLEND.infant.note}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {MASTER_BLEND.infant.steps.map((s, i) => (
                <div key={i} style={{ display:"flex", gap:10, fontSize:13, color:"var(--ink)" }}>
                  <span style={{ width:22, height:22, borderRadius:"50%", background:"var(--green)", color:"var(--gold)", display:"grid", placeItems:"center", flexShrink:0, fontSize:11, fontWeight:700 }}>{i+1}</span>
                  {s}
                </div>
              ))}
            </div>
          </Panel>
        </>
      )}
    </DirPage>
  );
}
