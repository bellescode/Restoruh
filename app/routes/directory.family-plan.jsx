/* FILE: app/routes/directory.family-plan.jsx -- /directory/family-plan */
import { Link }                  from "react-router";
import { useState }              from "react";
import { useDirectoryContext }   from "../components/directory/DirectoryContext";
import { DirPage, SectionHeader, Panel } from "../components/directory/DirectoryUI";
import { PROTOCOLS, AREAS, HERBS } from "../data/directoryData";
import { ClipboardList, ChevronRight, Leaf, Heart, Check } from "lucide-react";

export const meta = () => [{ title: "Family Plan -- RestoRuh Directory" }];

const AREA_PROTOCOL_IDS = Object.keys(PROTOCOLS);

export default function FamilyPlanPage() {
  const { favs, toggleFav, planPhases, togglePhase } = useDirectoryContext();
  const [activeArea, setActiveArea] = useState(AREA_PROTOCOL_IDS[0] || "gut");

  const protocol = PROTOCOLS[activeArea];
  const area     = AREAS.find((a) => a.id === activeArea);
  const totalPhases = protocol?.length || 0;
  const doneCount   = protocol?.filter((_, i) => planPhases[`${activeArea}:${i}`]).length || 0;

  return (
    <DirPage>
      <div style={{ borderRadius:20, padding:28, background:"var(--green)", marginBottom:24 }}>
        <ClipboardList size={24} color="var(--gold)" style={{ marginBottom:14 }}/>
        <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(24px,4vw,36px)", fontWeight:600, color:"var(--cream)", marginBottom:10 }}>
          Your Family Action Plan
        </h1>
        <p style={{ fontSize:14, color:"var(--sage)", lineHeight:1.7, maxWidth:600 }}>
          Research informed week by week protocols for the areas your family wants to steward.
          Track your progress and connect saved herbs directly to your plan.
        </p>
        {favs.length > 0 && (
          <div style={{ marginTop:14, display:"inline-flex", alignItems:"center", gap:8, padding:"8px 16px", borderRadius:999, background:"rgba(201,162,74,.2)", fontSize:13, fontWeight:600, color:"var(--gold)" }}>
            <Heart size={14} fill="var(--gold)"/> {favs.length} herb{favs.length !== 1 ? "s" : ""} saved to your plan
          </div>
        )}
      </div>

      {/* Balance philosophy */}
      <div style={{ borderLeft:"3px solid var(--gold)", padding:"14px 18px", borderRadius:"0 12px 12px 0", background:"rgba(201,162,74,.08)", marginBottom:28 }}>
        <p style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:15, color:"var(--green)", lineHeight:1.75 }}>
          "Heal your gut and you can eat just about anything. Everything in moderation.
          Everything that creates balance is good, and balance is what we were made for.
          These protocols are a season of intention, not a life sentence of restriction."
        </p>
      </div>

      {/* Area selector */}
      <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, marginBottom:24 }}>
        {AREA_PROTOCOL_IDS.map((id) => {
          const a = AREAS.find((x) => x.id === id);
          return (
            <button key={id} onClick={() => setActiveArea(id)}
              style={{ flexShrink:0, borderRadius:999, padding:"7px 16px", fontSize:13, fontWeight:600, cursor:"pointer", border:"none", whiteSpace:"nowrap",
                background: activeArea === id ? "var(--green)" : "rgba(61,107,80,.08)",
                color:      activeArea === id ? "var(--gold)"  : "var(--ink)" }}>
              {a?.short || id}
            </button>
          );
        })}
      </div>

      {/* Protocol phases */}
      {protocol && (
        <div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)" }}>
              {area?.short || activeArea}
            </h2>
            <span style={{ fontSize:13, fontWeight:600, color: doneCount === totalPhases ? "#3f7d4f" : "var(--muted)" }}>
              {doneCount}/{totalPhases} phases
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ height:6, borderRadius:999, background:"rgba(61,107,80,.1)", marginBottom:24, overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:999, background:"var(--gold)", width: `${totalPhases > 0 ? (doneCount / totalPhases) * 100 : 0}%`, transition:"width .4s ease" }}/>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {protocol.map((phase, i) => {
              const key    = `${activeArea}:${i}`;
              const done   = planPhases[key];
              const herbs  = (phase.herbs || []).map((id) => HERBS.find((h) => h.id === id)).filter(Boolean);
              return (
                <div key={i} style={{ borderRadius:16, border:`1.5px solid ${done ? "rgba(63,125,79,.4)" : "rgba(61,107,80,.12)"}`, padding:20, background: done ? "rgba(63,125,79,.06)" : "var(--paper)" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:12 }}>
                    <div>
                      <span style={{ fontSize:10, fontWeight:700, letterSpacing:2, color:"var(--sage)" }}>{phase.range?.toUpperCase()}</span>
                      <h3 style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:600, color:"var(--green)", marginTop:4 }}>{phase.title}</h3>
                    </div>
                    <button onClick={() => togglePhase(key)}
                      style={{ width:28, height:28, borderRadius:"50%", border:`2px solid ${done ? "#3f7d4f" : "rgba(61,107,80,.3)"}`, background: done ? "#3f7d4f" : "transparent", cursor:"pointer", display:"grid", placeItems:"center", flexShrink:0 }}>
                      {done && <Check size={14} color="#fff"/>}
                    </button>
                  </div>

                  <ul style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:herbs.length > 0 ? 14 : 0 }}>
                    {(phase.steps || []).map((s, si) => (
                      <li key={si} style={{ display:"flex", gap:8, fontSize:13, color:"var(--ink)", lineHeight:1.65 }}>
                        <span style={{ marginTop:5, width:5, height:5, borderRadius:"50%", background:"var(--gold)", flexShrink:0 }}/>{s}
                      </li>
                    ))}
                  </ul>

                  {herbs.length > 0 && (
                    <div>
                      <p style={{ fontSize:11, fontWeight:700, letterSpacing:1, color:"var(--sage)", marginBottom:8 }}>HERBS FOR THIS PHASE</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                        {herbs.map((h) => (
                          <div key={h.id} style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <Link to={`/directory/herbs/${h.id}`}
                              style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:999, fontSize:12, fontWeight:600, background:"rgba(61,107,80,.08)", color:"var(--green)", textDecoration:"none" }}>
                              <Leaf size={11}/>{h.name}
                            </Link>
                            <button onClick={() => toggleFav(h.id)} style={{ background:"none", border:"none", cursor:"pointer", padding:2 }}>
                              <Heart size={13} color={favs.includes(h.id) ? "var(--gold)" : "#c4c0b2"} fill={favs.includes(h.id) ? "var(--gold)" : "none"}/>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {phase.evidence && (
                    <p style={{ marginTop:12, fontSize:11, fontStyle:"italic", color:"var(--muted)", lineHeight:1.65, borderTop:"1px solid rgba(61,107,80,.1)", paddingTop:10 }}>
                      {phase.evidence}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </DirPage>
  );
}
