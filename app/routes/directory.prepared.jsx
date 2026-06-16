/* FILE: app/routes/directory.prepared.jsx -- /directory/prepared */
import { DirPage, SectionHeader, Panel, Chips } from "../components/directory/DirectoryUI";
import { PREPARED } from "../data/directoryData";
import { BookOpen, Leaf, Sun } from "lucide-react";

export const meta = () => [{ title: "Are You Prepared -- RestoRuh Directory" }];

export default function PreparedPage() {
  const d = PREPARED;
  return (
    <DirPage>
      <div style={{ borderRadius:20, padding:28, background:"var(--green)", marginBottom:24 }}>
        <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px,4vw,34px)", fontWeight:600, color:"var(--cream)", marginBottom:10 }}>Are You Prepared</h1>
        <p style={{ fontSize:14, color:"var(--sage)", lineHeight:1.7, maxWidth:600 }}>{d.intro}</p>
      </div>

      {/* Herb Kit */}
      {d.herbKit && (
        <section style={{ marginBottom:28 }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", marginBottom:8 }}>{d.herbKit.title}</h2>
          <p style={{ fontSize:14, color:"var(--muted)", marginBottom:16 }}>{d.herbKit.desc}</p>
          <div style={{ display:"grid", gap:10, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
            {d.herbKit.items.map((item) => (
              <div key={item.name} style={{ borderRadius:12, border:"1.5px solid rgba(61,107,80,.12)", padding:14, background:"var(--paper)" }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:14, fontWeight:600, color:"var(--green)", marginBottom:4 }}>{item.name}</h3>
                <p style={{ fontSize:12, color:"var(--muted)", marginBottom:6 }}>{item.purpose}</p>
                <span style={{ fontSize:11, color:"#b9892f", fontWeight:600 }}>Shelf: {item.shelf}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pantry */}
      {d.pantry && (
        <section style={{ marginBottom:28 }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", marginBottom:8 }}>{d.pantry.title}</h2>
          <p style={{ fontSize:14, color:"var(--muted)", marginBottom:16 }}>{d.pantry.desc}</p>
          <div style={{ display:"grid", gap:10, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
            {d.pantry.items.map((item) => (
              <div key={item.food} style={{ borderRadius:12, border:"1.5px solid rgba(61,107,80,.12)", padding:14, background:"var(--paper)" }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:14, fontWeight:600, color:"var(--green)", marginBottom:4 }}>{item.food}</h3>
                <p style={{ fontSize:12, color:"var(--muted)", marginBottom:6 }}>{item.why}</p>
                <span style={{ fontSize:11, color:"#b9892f", fontWeight:600 }}>Shelf: {item.shelf}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Growing */}
      {d.growing && (
        <section style={{ marginBottom:28 }}>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", marginBottom:8 }}>{d.growing.title}</h2>
          <p style={{ fontSize:14, color:"var(--muted)", marginBottom:16 }}>{d.growing.intro}</p>

          {[d.growing.containers, d.growing.inGround, d.growing.hydroponics].filter(Boolean).map((section) => (
            <div key={section.title} style={{ marginBottom:16, borderRadius:14, border:"1.5px solid rgba(61,107,80,.12)", padding:18, background:"var(--paper)" }}>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:600, color:"var(--green)", marginBottom:6 }}>{section.title}</h3>
              <p style={{ fontSize:13, color:"var(--ink)", lineHeight:1.7, marginBottom:12 }}>{section.desc || section.kratky || ""}</p>
              {section.bestHerbs && (
                <div style={{ marginBottom:12 }}>
                  <p style={{ fontSize:11, fontWeight:700, letterSpacing:1, color:"var(--sage)", marginBottom:8 }}>BEST HERBS</p>
                  <Chips items={section.bestHerbs}/>
                </div>
              )}
              {section.tips && (
                <ul style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {section.tips.map((t, i) => (
                    <li key={i} style={{ display:"flex", gap:8, fontSize:12, color:"var(--muted)", lineHeight:1.6 }}>
                      <span style={{ marginTop:4, width:4, height:4, borderRadius:"50%", background:"var(--gold)", flexShrink:0 }}/>
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* The Word */}
      {d.word && (
        <section style={{ marginBottom:28 }}>
          <Panel title={d.word.title} icon={BookOpen}>
            <p style={{ fontSize:14, color:"var(--ink)", lineHeight:1.8, marginBottom:16 }}>{d.word.desc}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {d.word.scriptures.map((s) => (
                <div key={s.ref} style={{ borderLeft:"3px solid var(--gold)", paddingLeft:14, paddingTop:6, paddingBottom:6 }}>
                  <p style={{ fontSize:12, fontWeight:700, color:"var(--gold)", marginBottom:4 }}>{s.ref}</p>
                  <p style={{ fontSize:13, fontStyle:"italic", color:"var(--ink)", lineHeight:1.65 }}>{s.text}</p>
                </div>
              ))}
            </div>
          </Panel>
        </section>
      )}

      {/* Checklist */}
      {d.checklist && (
        <section>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", marginBottom:16 }}>Preparedness checklist</h2>
          <div style={{ display:"grid", gap:14, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
            {d.checklist.map((cat) => (
              <div key={cat.cat} style={{ borderRadius:14, border:"1.5px solid rgba(61,107,80,.12)", padding:16, background:"var(--paper)" }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:600, color:"var(--green)", marginBottom:10 }}>{cat.cat}</h3>
                <ul style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {cat.items.map((item, i) => (
                    <li key={i} style={{ display:"flex", gap:8, fontSize:13, color:"var(--ink)", lineHeight:1.55 }}>
                      <span style={{ marginTop:4, width:14, height:14, borderRadius:3, border:"2px solid rgba(61,107,80,.3)", flexShrink:0 }}/>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </DirPage>
  );
}
