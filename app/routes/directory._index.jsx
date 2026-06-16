/* ============================================================
   FILE: app/routes/directory._index.jsx  -- /directory
   ============================================================ */
import { Link }                   from "react-router";
import { useDirectoryContext }    from "../components/directory/DirectoryContext";
import { DirPage }                from "../components/directory/DirectoryUI";
import { AREAS, HERBS }           from "../data/directoryData";
import {
  Compass, ClipboardList, Stethoscope, Leaf, Wheat,
  Bug, Dumbbell, BookOpen, Sparkles, ChevronRight,
} from "lucide-react";

export const meta = () => [{ title: "RestoRuh Directory | Wellness Research" }];

export default function DirectoryIndex() {
  const { favs } = useDirectoryContext();

  const libraryLinks = [
    ["/directory/systems",  "The 11 Body Systems",    "Functions, herbs, and foods for each system",                  Stethoscope],
    ["/directory/herbs",    "Herb Library",            `${HERBS.length} herbs, evidence labeled and filtered`,        Leaf],
    ["/directory/ailments", "Ailments Directory",      "Common conditions with herbs, diet, and when to seek care",   ClipboardList],
    ["/directory/nutrition","Nutrition and Whole Foods","Original grains, processed sugar, and gut first meals",       Wheat],
    ["/directory/cleansing","Cleansing and Parasites", "Honest look at detox and the traditional deworming approach", Bug],
    ["/directory/movement", "Movement and Mobility",   "Home exercises from easy to hard, plus stretching",           Dumbbell],
  ];

  return (
    <DirPage>
      {/* Hero */}
      <section style={{ paddingTop:40, paddingBottom:24, textAlign:"center" }}>
        <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 14px", borderRadius:999, fontSize:12, fontWeight:600, letterSpacing:1, background:"rgba(201,162,74,.15)", color:"#9a7a25" }}>
          <Sparkles size={13}/> FAITH-BASED WELLNESS RESEARCH
        </span>
        <h1 style={{ marginTop:16, fontFamily:"var(--font-display)", fontSize:"clamp(28px,5vw,48px)", fontWeight:600, color:"var(--green)", lineHeight:1.15 }}>
          Consolidated research rooted in{" "}
          <span style={{ color:"var(--gold)" }}>the God who heals.</span>
        </h1>
        <p style={{ marginTop:12, fontSize:16, color:"var(--muted)", maxWidth:600, margin:"12px auto 0" }}>
          Eight wellness areas, eleven body systems, an honest herb library, nutrition,
          cleansing, movement, and a family plan for you and your household.
        </p>
        {favs.length > 0 && (
          <Link to="/directory/herbs?filter=fav" style={{ marginTop:16, display:"inline-flex", alignItems:"center", gap:6, padding:"8px 20px", borderRadius:999, fontSize:13, fontWeight:600, background:"rgba(201,162,74,.15)", color:"var(--gold)", textDecoration:"none" }}>
            <Leaf size={14}/> {favs.length} saved herb{favs.length !== 1 ? "s" : ""}
          </Link>
        )}
      </section>

      {/* Family Plan CTA */}
      <Link to="/directory/family-plan" style={{
        display:"flex", flexDirection:"column", alignItems:"center", gap:8,
        borderRadius:20, padding:"28px 24px", textAlign:"center",
        background:"var(--green)", textDecoration:"none", marginBottom:40,
      }}>
        <ClipboardList size={22} color="var(--gold)" />
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--cream)" }}>Your Family Action Plan</h2>
        <p style={{ fontSize:14, color:"var(--sage)", maxWidth:480 }}>Research informed week by week protocols for the areas your family wants to steward.</p>
        <span style={{ marginTop:8, display:"inline-flex", alignItems:"center", gap:6, padding:"8px 20px", borderRadius:999, fontSize:14, fontWeight:700, background:"var(--gold)", color:"#16291f" }}>
          Open the Family Plan <ChevronRight size={15}/>
        </span>
      </Link>

      {/* Wellness Areas */}
      <section style={{ marginBottom:48 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
          <Compass size={18} color="var(--gold)"/>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:26, fontWeight:600, color:"var(--green)" }}>Explore by area</h2>
        </div>
        <div style={{ display:"grid", gap:16, gridTemplateColumns:"repeat(auto-fill, minmax(240px,1fr))" }}>
          {AREAS.map((a) => {
            const Icon = a.icon;
            const to   = a.linkPlan ? "/directory/family-plan" : `/directory/area/${a.id}`;
            return (
              <Link key={a.id} to={to} style={{
                display:"flex", flexDirection:"column", borderRadius:16,
                border:"1.5px solid rgba(61,107,80,.12)", padding:20,
                background:"var(--paper)", textDecoration:"none",
                transition:"transform .2s ease, box-shadow .2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 14px 32px -16px rgba(61,107,80,.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                <span style={{ display:"grid", placeItems:"center", width:44, height:44, borderRadius:12, background:"var(--green)", color:"var(--gold)", marginBottom:12 }}>
                  <Icon size={20}/>
                </span>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:600, color:"var(--green)", marginBottom:6 }}>{a.short}</h3>
                <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.55, flex:1 }}>{a.blurb}</p>
                <span style={{ marginTop:12, display:"inline-flex", alignItems:"center", gap:4, fontSize:12, fontWeight:600, color:"var(--gold)" }}>
                  {a.linkPlan ? "Open" : "Explore"} <ChevronRight size={13}/>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Research Library */}
      <section>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
          <BookOpen size={18} color="var(--gold)"/>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:26, fontWeight:600, color:"var(--green)" }}>Research library</h2>
        </div>
        <div style={{ display:"grid", gap:12, gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))" }}>
          {libraryLinks.map(([to, title, desc, Icon]) => (
            <Link key={to} to={to} style={{
              display:"flex", alignItems:"flex-start", gap:12, borderRadius:16,
              border:"1.5px solid rgba(61,107,80,.12)", padding:20,
              background:"var(--paper)", textDecoration:"none",
              transition:"transform .2s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform="none"}>
              <span style={{ display:"grid", placeItems:"center", width:40, height:40, flexShrink:0, borderRadius:10, background:"rgba(126,144,121,.18)" }}>
                <Icon size={18} color="#3d5640"/>
              </span>
              <div>
                <p style={{ fontFamily:"var(--font-display)", fontWeight:600, color:"var(--green)", marginBottom:3 }}>{title}</p>
                <p style={{ fontSize:13, color:"var(--muted)" }}>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </DirPage>
  );
}
