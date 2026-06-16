/* FILE: app/routes/directory.ailments._index.jsx -- /directory/ailments */
import { Link }                from "react-router";
import { DirPage, SectionHeader } from "../components/directory/DirectoryUI";
import { AILMENTS }             from "../data/directoryData";

export const meta = () => [{ title: "Ailments | RestoRuh Directory" }];

export default function AilmentsIndex() {
  const cats = [...new Set(AILMENTS.map((a) => a.cat))];
  return (
    <DirPage>
      <SectionHeader title="Ailments" sub="Common conditions with supportive herbs, self-help guidance, and when to seek professional care." />
      {cats.map((cat) => (
        <section key={cat} style={{ marginTop:32 }}>
          <h2 style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:"var(--sage)", marginBottom:14 }}>{cat.toUpperCase()}</h2>
          <div style={{ display:"grid", gap:10, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
            {AILMENTS.filter((a) => a.cat === cat).map((a) => (
              <Link key={a.id} to={`/directory/ailments/${a.id}`}
                style={{ borderRadius:14, border:"1.5px solid rgba(61,107,80,.12)", padding:"14px 16px", background:"var(--paper)", textDecoration:"none" }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:600, color:"var(--green)", marginBottom:4 }}>{a.name}</h3>
                <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.55, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{a.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </DirPage>
  );
}
