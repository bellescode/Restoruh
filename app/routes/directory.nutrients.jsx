/* FILE: app/routes/directory.nutrients.jsx */
import { DirPage, SectionHeader, Panel, Chips } from "../components/directory/DirectoryUI";
import { NUTRIENTS } from "../data/directoryData";
import { Sparkles } from "lucide-react";

export const meta = () => [{ title: "Nutrients and Deficiencies -- RestoRuh Directory" }];

export default function NutrientsPage() {
  const vitamins  = NUTRIENTS.filter((n) => n.kind === "Vitamin");
  const minerals  = NUTRIENTS.filter((n) => n.kind === "Mineral");
  return (
    <DirPage>
      <SectionHeader title="Nutrients and Deficiencies"
        sub="The most common deficiencies, what they cause, what feeds them, and what to watch for." />
      {[["Minerals", minerals], ["Vitamins", vitamins]].map(([label, list]) => (
        <section key={label} style={{ marginTop:32 }}>
          <h2 style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:"var(--sage)", marginBottom:16 }}>{label.toUpperCase()}</h2>
          <div style={{ display:"grid", gap:14, gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))" }}>
            {list.map((n) => (
              <div key={n.id} style={{ borderRadius:14, border:"1.5px solid rgba(61,107,80,.12)", padding:18, background:"var(--paper)" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:600, color:"var(--green)" }}>{n.name}</h3>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, color:"var(--muted)", background:"rgba(61,107,80,.08)", padding:"2px 8px", borderRadius:999 }}>{n.kind}</span>
                </div>
                <p style={{ fontSize:13, color:"var(--ink)", lineHeight:1.65, marginBottom:10 }}>{n.role}</p>
                <p style={{ fontSize:12, fontWeight:600, color:"#b9892f", marginBottom:6 }}>Signs of deficiency</p>
                <p style={{ fontSize:12, color:"var(--muted)", lineHeight:1.55, marginBottom:10 }}>{n.low}</p>
                <Chips items={n.food}/>
                {n.caution && (
                  <p style={{ marginTop:10, fontSize:11, fontStyle:"italic", color:"var(--muted)", lineHeight:1.5 }}>
                    Note: {n.caution}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </DirPage>
  );
}
