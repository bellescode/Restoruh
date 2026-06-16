/* FILE: app/routes/directory.systems._index.jsx -- /directory/systems */
import { Link }                from "react-router";
import { DirPage, SectionHeader } from "../components/directory/DirectoryUI";
import { SYSTEMS }              from "../data/directoryData";

export const meta = () => [{ title: "11 Body Systems -- RestoRuh Directory" }];

export default function SystemsIndex() {
  return (
    <DirPage>
      <SectionHeader title="The 11 Body Systems"
        sub="Yahweh created each system with a specific role. Tap any system to explore its function, supporting herbs, and the foods that feed it." />
      <div style={{ marginTop:24, display:"grid", gap:16, gridTemplateColumns:"repeat(auto-fill, minmax(240px,1fr))" }}>
        {SYSTEMS.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.id} to={`/directory/systems/${s.id}`} style={{ display:"flex", flexDirection:"column", borderRadius:16, border:"1.5px solid rgba(61,107,80,.12)", padding:20, background:"var(--paper)", textDecoration:"none" }}>
              <span style={{ display:"grid", placeItems:"center", width:44, height:44, borderRadius:12, background:"var(--green)", marginBottom:12 }}>
                <Icon size={20} color="var(--gold)"/>
              </span>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:600, color:"var(--green)", marginBottom:6 }}>{s.name}</h3>
              <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.55, display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{s.fn}</p>
            </Link>
          );
        })}
      </div>
    </DirPage>
  );
}
