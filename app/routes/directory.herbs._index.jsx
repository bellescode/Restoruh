/* FILE: app/routes/directory.herbs._index.jsx -- /directory/herbs */
import { Link, useSearchParams }     from "react-router";
import { useState, useMemo }         from "react";
import { useDirectoryContext }       from "../components/directory/DirectoryContext";
import { DirPage, SectionHeader, EvidenceBadge } from "../components/directory/DirectoryUI";
import { HERBS, SYSTEMS, MASTER_BLEND, WHO_CHIPS } from "../data/directoryData";
import { Leaf, Heart, Sparkles, ChevronRight }      from "lucide-react";

export const meta = () => [{ title: "Herb Library -- RestoRuh Directory" }];

const FMT_OPTIONS = ["all","tea","tincture","capsule","cream","oil","powder"];

export default function HerbsIndex() {
  const { favs, toggleFav }  = useDirectoryContext();
  const [sp]                 = useSearchParams();
  const initFilter           = sp.get("filter") || "all";
  const [filter, setFilter]  = useState(initFilter);
  const [fmt,    setFmt]     = useState("all");

  const allChips = [
    ...WHO_CHIPS,
    ...SYSTEMS.map((s) => ({ id: `sys:${s.id}`, label: s.name.replace(/ \(.*\)/, "") })),
  ];

  const list = useMemo(() => {
    let l = HERBS;
    if (filter === "fav")               l = l.filter((h) => favs.includes(h.id));
    else if (filter.startsWith("sys:")) l = l.filter((h) => h.systems.includes(filter.slice(4)));
    else if (filter.startsWith("who:")) l = l.filter((h) => h.who.includes(filter.slice(4)));
    if (fmt !== "all")                  l = l.filter((h) => h.formats.some((f) => f.toLowerCase().includes(fmt)));
    return [...l].sort((a, b) => a.latin.localeCompare(b.latin));
  }, [filter, fmt, favs]);

  return (
    <DirPage>
      <SectionHeader title="Herb Library" sub={`${HERBS.length} herbs, labeled by evidence, body system, who can use them, and safety.`} />

      {/* Master Blend feature card */}
      <Link to="/directory/herbs/master-blend" style={{
        display:"flex", alignItems:"flex-start", gap:16, borderRadius:20, padding:20,
        background:"var(--green)", textDecoration:"none", margin:"20px 0",
      }}>
        <span style={{ display:"grid", placeItems:"center", width:48, height:48, flexShrink:0, borderRadius:12, background:"var(--gold)" }}>
          <Sparkles size={22} color="#16291f"/>
        </span>
        <div>
          <span style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:2, color:"var(--gold)", marginBottom:4 }}>FEATURED BLEND</span>
          <span style={{ display:"block", fontFamily:"var(--font-display)", fontSize:20, fontWeight:600, color:"var(--cream)" }}>{MASTER_BLEND.name}</span>
          <span style={{ display:"block", marginTop:4, fontSize:13, color:"var(--sage)" }}>{MASTER_BLEND.tagline}</span>
          <span style={{ marginTop:10, display:"inline-flex", alignItems:"center", gap:4, fontSize:13, fontWeight:600, color:"var(--gold)" }}>
            View full blend + infant protocol <ChevronRight size={14}/>
          </span>
        </div>
      </Link>

      {/* Filter chips */}
      <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, marginBottom:12 }}>
        {allChips.map((c) => (
          <button key={c.id} onClick={() => setFilter(c.id)}
            style={{ flexShrink:0, borderRadius:999, padding:"6px 14px", fontSize:12, fontWeight:600, cursor:"pointer", border:"none",
              background: filter === c.id ? "var(--green)" : "rgba(61,107,80,.07)",
              color:      filter === c.id ? "var(--gold)"  : "var(--ink)" }}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Format filter */}
      <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:6, marginBottom:24, fontSize:12 }}>
        <span style={{ fontWeight:600, color:"var(--muted)" }}>Format:</span>
        {FMT_OPTIONS.map((f) => (
          <button key={f} onClick={() => setFmt(f)}
            style={{ borderRadius:999, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer", border:"none", textTransform:"capitalize",
              background: fmt === f ? "var(--gold)" : "rgba(61,107,80,.06)",
              color:      fmt === f ? "#16291f"     : "var(--ink)" }}>
            {f}
          </button>
        ))}
      </div>

      {/* Herb grid */}
      {list.length === 0 ? (
        <p style={{ textAlign:"center", padding:"60px 0", color:"var(--muted)" }}>
          No herbs match this filter. Try a different one.
        </p>
      ) : (
        <div style={{ display:"grid", gap:16, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
          {list.map((h) => (
            <div key={h.id} style={{ borderRadius:16, border:"1.5px solid rgba(61,107,80,.12)", padding:20, background:"var(--paper)", display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8 }}>
                <span style={{ display:"grid", placeItems:"center", width:40, height:40, borderRadius:10, background:"rgba(126,144,121,.18)" }}>
                  <Leaf size={18} color="#3d5640"/>
                </span>
                <button onClick={(e) => { e.stopPropagation(); toggleFav(h.id); }}
                  style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}>
                  <Heart size={18} color={favs.includes(h.id) ? "var(--gold)" : "#c4c0b2"} fill={favs.includes(h.id) ? "var(--gold)" : "none"}/>
                </button>
              </div>
              <Link to={`/directory/herbs/${h.id}`} style={{ textDecoration:"none", flex:1, display:"flex", flexDirection:"column", marginTop:12 }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:600, color:"var(--green)", marginBottom:2 }}>{h.name}</h3>
                <p style={{ fontSize:12, fontStyle:"italic", color:"var(--muted)", marginBottom:8 }}>{h.latin}</p>
                <p style={{ fontSize:13, color:"var(--ink)", lineHeight:1.6, flex:1,
                  display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                  {h.uses}
                </p>
                <div style={{ marginTop:10 }}><EvidenceBadge level={h.evidence}/></div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </DirPage>
  );
}
