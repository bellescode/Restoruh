/* FILE: app/routes/directory.area.$areaId.jsx -- /directory/area/:areaId */
import { Link, useParams }    from "react-router";
import { useDirectoryContext } from "../components/directory/DirectoryContext";
import { DirPage, BackBtn, Panel, Chips, CautionBox } from "../components/directory/DirectoryUI";
import { AREAS, HERBS }        from "../data/directoryData";
import { Compass, Salad, HandHeart, Leaf, Heart, Bug, ChevronRight } from "lucide-react";

export function meta({ params }) {
  const a = AREAS.find((x) => x.id === params.areaId);
  return [{ title: `${a?.short || "Area"} -- RestoRuh Directory` }];
}

export default function AreaPage() {
  const { areaId }          = useParams();
  const { favs, toggleFav } = useDirectoryContext();
  const area = AREAS.find((a) => a.id === areaId);
  if (!area) return <DirPage><BackBtn to="/directory" label="All areas"/><p>Area not found.</p></DirPage>;
  const Icon    = area.icon;
  const related = (area.herbs || []).map((id) => HERBS.find((h) => h.id === id)).filter(Boolean);

  return (
    <DirPage>
      <BackBtn to="/directory" label="All areas"/>
      <div style={{ borderRadius:20, padding:28, background:"var(--green)", marginBottom:24 }}>
        <span style={{ display:"grid", placeItems:"center", width:48, height:48, borderRadius:12, background:"rgba(201,162,74,.18)", marginBottom:14 }}>
          <Icon size={24} color="var(--gold)"/>
        </span>
        <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px,4vw,34px)", fontWeight:600, color:"var(--cream)", lineHeight:1.15, marginBottom:10 }}>{area.title}</h1>
        <p style={{ fontSize:14, color:"var(--sage)", lineHeight:1.7, maxWidth:600 }}>{area.blurb}</p>
      </div>

      {area.caution && <div style={{ marginBottom:20 }}><CautionBox>{area.caution}</CautionBox></div>}

      <div style={{ display:"grid", gap:16, gridTemplateColumns:"repeat(auto-fit, minmax(280px,1fr))", marginBottom:24 }}>
        <Panel title="Key approaches" icon={Compass}>
          <ul style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {area.approaches.map((a, i) => (
              <li key={i} style={{ display:"flex", gap:10, fontSize:14, color:"var(--ink)", lineHeight:1.6 }}>
                <span style={{ marginTop:6, width:6, height:6, borderRadius:"50%", background:"var(--gold)", flexShrink:0 }}/>
                {a}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Supportive foods" icon={Salad}><Chips items={area.foods}/></Panel>
      </div>

      <div style={{ borderRadius:16, border:"1.5px solid rgba(201,162,74,.35)", padding:20, background:"var(--paper)", marginBottom:28 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <HandHeart size={17} color="var(--gold)"/>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:600, color:"var(--green)" }}>Biblical foundation</h3>
        </div>
        <p style={{ fontSize:14, fontStyle:"italic", color:"var(--muted)", lineHeight:1.7 }}>{area.faith}</p>
      </div>

      {related.length > 0 && (
        <section>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", marginBottom:16 }}>Herbs that support this area</h2>
          <div style={{ display:"grid", gap:10, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
            {related.map((h) => (
              <div key={h.id} style={{ display:"flex", alignItems:"center", gap:12, borderRadius:14, border:"1.5px solid rgba(61,107,80,.12)", padding:14, background:"var(--paper)" }}>
                <Link to={`/directory/herbs/${h.id}`} style={{ flex:1, display:"flex", alignItems:"center", gap:12, textDecoration:"none" }}>
                  <span style={{ display:"grid", placeItems:"center", width:40, height:40, flexShrink:0, borderRadius:10, background:"rgba(126,144,121,.18)" }}>
                    <Leaf size={17} color="#3d5640"/>
                  </span>
                  <div>
                    <p style={{ fontFamily:"var(--font-display)", fontWeight:600, color:"var(--green)", fontSize:14 }}>{h.name}</p>
                    <p style={{ fontSize:11, fontStyle:"italic", color:"var(--muted)" }}>{h.latin}</p>
                  </div>
                </Link>
                <button onClick={() => toggleFav(h.id)} style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}>
                  <Heart size={17} color={favs.includes(h.id) ? "var(--gold)" : "#c4c0b2"} fill={favs.includes(h.id) ? "var(--gold)" : "none"}/>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {area.id === "detox" && (
        <Link to="/directory/cleansing"
          style={{ marginTop:28, display:"inline-flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:999, fontSize:14, fontWeight:600, background:"var(--gold)", color:"#16291f", textDecoration:"none" }}>
          <Bug size={16}/> Open the full Cleansing section
        </Link>
      )}
    </DirPage>
  );
}
