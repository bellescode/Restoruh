/* FILE: app/routes/directory.ailments.$ailId.jsx */
import { Link, useParams }      from "react-router";
import { DirPage, BackBtn, Panel, EvidenceBadge, CautionBox } from "../components/directory/DirectoryUI";
import { AILMENTS, HERBS }      from "../data/directoryData";
import { Salad, ShieldAlert, Leaf, ChevronRight } from "lucide-react";

export function meta({ params }) {
  const a = AILMENTS.find((x) => x.id === params.ailId);
  return [{ title: `${a?.name || "Ailment"} -- RestoRuh Directory` }];
}

export default function AilmentDetail() {
  const { ailId } = useParams();
  const ail   = AILMENTS.find((a) => a.id === ailId);
  if (!ail) return <DirPage><BackBtn to="/directory/ailments" label="All ailments"/><p>Not found.</p></DirPage>;
  const herbs = ail.herbs.map((id) => HERBS.find((h) => h.id === id)).filter(Boolean);

  return (
    <DirPage>
      <BackBtn to="/directory/ailments" label="All ailments"/>
      <div style={{ borderRadius:20, padding:28, background:"var(--green)", marginBottom:24 }}>
        <span style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:"var(--sage)" }}>{ail.cat.toUpperCase()}</span>
        <h1 style={{ marginTop:6, fontFamily:"var(--font-display)", fontSize:"clamp(22px,4vw,32px)", fontWeight:600, color:"var(--cream)", marginBottom:8 }}>{ail.name}</h1>
        <p style={{ fontSize:14, color:"var(--sage)", lineHeight:1.7 }}>{ail.desc}</p>
      </div>
      <div style={{ display:"grid", gap:16, gridTemplateColumns:"repeat(auto-fit, minmax(280px,1fr))", marginBottom:28 }}>
        <Panel title="Diet and self help" icon={Salad}>
          <p style={{ fontSize:14, lineHeight:1.75, color:"var(--ink)" }}>{ail.self}</p>
        </Panel>
        <CautionBox>
          <strong style={{ display:"block", marginBottom:4 }}>When to seek professional care</strong>
          {ail.seek}
        </CautionBox>
      </div>
      <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", marginBottom:16 }}>Supportive herbs</h2>
      <div style={{ display:"grid", gap:12, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
        {herbs.map((h) => (
          <Link key={h.id} to={`/directory/herbs/${h.id}`}
            style={{ borderRadius:14, border:"1.5px solid rgba(61,107,80,.12)", padding:16, background:"var(--paper)", textDecoration:"none" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <Leaf size={15} color="#3d5640"/>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:600, color:"var(--green)" }}>{h.name}</h3>
              </div>
              <EvidenceBadge level={h.evidence}/>
            </div>
            <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.55 }}>{h.uses.slice(0, 120)}...</p>
          </Link>
        ))}
      </div>
    </DirPage>
  );
}
