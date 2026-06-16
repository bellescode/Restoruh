/* FILE: app/routes/directory.cleansing.jsx */
import { Link } from "react-router";
import { DirPage, SectionHeader, Panel, Chips, CautionBox } from "../components/directory/DirectoryUI";
import { HERBS } from "../data/directoryData";
import { Bug, ShieldAlert, BookOpen, Leaf, ChevronRight } from "lucide-react";

export const meta = () => [{ title: "Cleansing and Parasites -- RestoRuh Directory" }];

const CLEANSE_HERBS = ["wormwood","black-walnut","clove","milk-thistle","dandelion","garlic","ginger"];
const PHASES = [
  { phase:"Phase 1: Foundation (Weeks 1 to 2)", steps:[
    "Clean up diet: cut sugar, refined flour, and processed food. Parasites feed on sugar.",
    "Increase fiber: vegetables, fruits, oats, lentils. Fiber is the physical broom.",
    "Start liver support: dandelion tea, milk thistle. These protect the liver during die-off.",
    "Drink 8 to 10 glasses of water daily. Hydration moves what the cleanse dislodges.",
  ]},
  { phase:"Phase 2: Anti-parasitic herbs (Weeks 3 to 5)", steps:[
    "Begin the traditional cleansing trio: wormwood, black walnut hull, and clove -- taken together, never alone.",
    "Clove is said to address eggs (the stage the others miss), wormwood for larvae, black walnut for adults.",
    "Take on an empty stomach, 30 minutes before a meal.",
    "Always pair with a binder: activated charcoal or bentonite clay to escort released toxins out of the gut.",
    "Expect die-off symptoms: headache, fatigue, digestive upset. These signal progress, not failure. Reduce dose if severe.",
  ]},
  { phase:"Phase 3: Rebuild (Weeks 6 to 8)", steps:[
    "Anti-parasitic herbs should be cycled or paused now. They are not for long-term use.",
    "Begin intensive microbiome restoration: fermented foods, prebiotic fiber, probiotic supplement.",
    "Continue gut lining support: slippery elm, marshmallow root, bone broth.",
    "Reintroduce any restricted foods carefully to confirm they are tolerated.",
    "Assess: energy, digestion, sleep, skin. Most people who needed a cleanse feel different by week 8.",
  ]},
];

export default function CleansingPage() {
  const herbs = CLEANSE_HERBS.map((id) => HERBS.find((h) => h.id === id)).filter(Boolean);
  return (
    <DirPage>
      <div style={{ borderRadius:20, padding:28, background:"var(--green)", marginBottom:24 }}>
        <span style={{ display:"grid", placeItems:"center", width:48, height:48, borderRadius:12, background:"rgba(201,162,74,.18)", marginBottom:14 }}>
          <Bug size={24} color="var(--gold)"/>
        </span>
        <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(22px,4vw,34px)", fontWeight:600, color:"var(--cream)", lineHeight:1.15, marginBottom:10 }}>Cleansing and Parasites</h1>
        <p style={{ fontSize:14, color:"var(--sage)", lineHeight:1.7, maxWidth:640 }}>
          An honest look at detox, traditional deworming, and what the science actually supports.
          These are real herbs with real effects. Treat them accordingly.
        </p>
      </div>

      <CautionBox>
        <strong>Important before you start: </strong>
        Suspected parasitic infection should be tested, not assumed. A stool test, blood panel, or scope can confirm.
        Wormwood and black walnut are potent herbs. Do not use in pregnancy or with children without professional guidance.
        This protocol addresses commonly used traditional approaches alongside the evidence. It is not a substitute for medical diagnosis.
      </CautionBox>

      <Panel title="Why cleansing matters" icon={BookOpen} style={{ marginTop:20 }}>
        <p style={{ fontSize:14, lineHeight:1.8, color:"var(--ink)" }}>
          Parasites are more common than most people in the developed world believe. The WHO estimates over 1.5 billion
          people worldwide carry soil-transmitted helminths (intestinal worms). Subclinical infection -- carrying a parasite
          load below the threshold that causes dramatic symptoms -- is far more common than acute infection. Common markers
          include intense sugar cravings, fatigue that worsens after eating, digestive irregularity, skin issues,
          and waking at specific times (particularly 2 to 3am, traditionally associated with liver stress).
        </p>
        <p style={{ fontSize:14, lineHeight:1.8, color:"var(--ink)", marginTop:12 }}>
          The body's first line of defense is stomach acid, bile, and an intact gut lining. All three are compromised
          by processed food, sugar, antibiotics, and chronic stress -- which is why parasite burden and modern gut
          dysfunction are so closely linked.
        </p>
      </Panel>

      <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", margin:"28px 0 16px" }}>Protocol</h2>
      {PHASES.map((ph, pi) => (
        <div key={pi} style={{ marginBottom:14, borderRadius:14, border:"1.5px solid rgba(61,107,80,.12)", padding:18, background:"var(--paper)" }}>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:600, color:"var(--green)", marginBottom:12 }}>{ph.phase}</h3>
          <ul style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {ph.steps.map((s, i) => (
              <li key={i} style={{ display:"flex", gap:10, fontSize:13, color:"var(--ink)", lineHeight:1.65 }}>
                <span style={{ width:20, height:20, borderRadius:"50%", background:"var(--green)", color:"var(--gold)", display:"grid", placeItems:"center", flexShrink:0, fontSize:10, fontWeight:700 }}>{i+1}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h2 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:600, color:"var(--green)", margin:"28px 0 16px" }}>Key herbs</h2>
      <div style={{ display:"grid", gap:10, gridTemplateColumns:"repeat(auto-fill, minmax(250px,1fr))" }}>
        {herbs.map((h) => (
          <Link key={h.id} to={"/directory/herbs/" + h.id}
            style={{ display:"flex", alignItems:"center", gap:10, borderRadius:12, border:"1.5px solid rgba(61,107,80,.12)", padding:12, background:"var(--paper)", textDecoration:"none" }}>
            <Leaf size={15} color="#3d5640"/>
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:"var(--font-display)", fontWeight:600, color:"var(--green)", fontSize:14 }}>{h.name}</p>
              <p style={{ fontSize:11, color:"var(--muted)" }}>{h.uses.slice(0, 70)}...</p>
            </div>
            <ChevronRight size={13} color="var(--gold)" style={{ flexShrink:0 }}/>
          </Link>
        ))}
      </div>
    </DirPage>
  );
}
