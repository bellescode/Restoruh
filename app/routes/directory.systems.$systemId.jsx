/* FILE: app/routes/directory.systems.$systemId.jsx */
import { Link, useParams }    from "react-router";
import { DirPage, BackBtn, Panel, Chips } from "../components/directory/DirectoryUI";
import { SYSTEMS, HERBS }      from "../data/directoryData";
import { Salad, Leaf, ChevronRight } from "lucide-react";

export function meta({ params }) {
  const s = SYSTEMS.find((x) => x.id === params.systemId);
  return [{ title: `${s?.name || "System"} -- RestoRuh Directory` }];
}

export default function SystemDetail() {
  const { systemId } = useParams();
  const sys = SYSTEMS.find((s) => s.id === systemId);
  if (!sys) return <DirPage><BackBtn to="/directory/systems" label="All systems"/><p>System not found.</p></DirPage>;
  const Icon  = sys.icon;
  const herbs = sys.herbs.map((id) => HERBS.find((h) => h.id === id)).filter(Boolean);

  return (
    <DirPage>
      <BackBtn to="/directory/systems" label="All systems"/>
      <div style={{ borderRadius:20, padding:28, background:"var(--green)", marginBottom:24 }}>
        <span style={{ display:"grid", placeItems:"center", width:48, height:48, borderRadius:12, background:"rgba(201,162,74,.18)", marginBottom:14 }}>
          <Icon size={24} color="var(--gold)"/>
        </span>
        <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px,4vw,32px)", fontWeight:600, color:"var(--cream)", marginBottom:8 }}>{sys.name}</h1>
        <p style={{ fontSize:14, color:"var(--sage)", lineHeight:1.7, maxWidth:600 }}>{sys.fn}</p>
      </div>
      <Panel title="Foods that feed this system" icon={Salad}>
        <Chips items={sys.foods}/>
      </Panel>
      <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", margin:"28px 0 16px" }}>Herbs that support it</h2>
      <div style={{ display:"grid", gap:12, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
        {herbs.map((h) => (
          <Link key={h.id} to={`/directory/herbs/${h.id}`} style={{ display:"flex", flexDirection:"column", borderRadius:14, border:"1.5px solid rgba(61,107,80,.12)", padding:16, background:"var(--paper)", textDecoration:"none" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <Leaf size={15} color="#3d5640"/>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:600, color:"var(--green)" }}>{h.name}</h3>
            </div>
            <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.55, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{h.uses}</p>
          </Link>
        ))}
      </div>
    </DirPage>
  );
}
