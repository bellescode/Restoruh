/* FILE: app/routes/directory.nutrition.jsx */
import { DirPage, SectionHeader, Panel, Chips } from "../components/directory/DirectoryUI";
import { Wheat, Flame, Soup } from "lucide-react";

export const meta = () => [{ title: "Nutrition and Whole Foods -- RestoRuh Directory" }];

export default function NutritionPage() {
  return (
    <DirPage>
      <SectionHeader title="Nutrition and Whole Foods"
        sub="Food is the foundation. Eat real, recognizable food; return to grains prepared the old way; and feed the whole body starting with the gut." />

      <div style={{ marginTop:24, borderRadius:20, padding:24, background:"var(--green)", marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <Flame size={18} color="var(--gold)"/>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:600, color:"var(--cream)" }}>Why processed sugar sits at the root</h2>
        </div>
        <p style={{ fontSize:14, color:"var(--sage)", lineHeight:1.8 }}>
          Of all modern food changes, refined and added sugar with ultra processed food does the most damage.
          A steady flood of sugar drives insulin resistance, weight gain, and chronic inflammation -- the ground
          in which much modern disease grows. It disrupts the gut microbiome. And people carrying parasites
          characteristically crave sugar intensely. Cutting processed sugar addresses multiple problems at once.
        </p>
      </div>

      <Panel title="Back to the original grains" icon={Wheat}>
        <p style={{ fontSize:14, lineHeight:1.8, color:"var(--ink)", marginBottom:16 }}>
          Modern ultra processed grain is stripped, bleached, and rushed. For most of history, people ate ancient
          grains that were soaked, sprouted, or fermented, improving digestibility and nutrient availability.
          Soaking and sprouting reduces phytic acid by up to 50%, unlocking minerals that refined grain simply
          cannot provide.
        </p>
        <div style={{ display:"grid", gap:16, gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))" }}>
          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:"#3d5640", marginBottom:10 }}>LEAN TOWARD</p>
            <Chips items={["Einkorn and emmer","Spelt and kamut","Sprouted grain bread","True sourdough (4+ hour ferment)","Intact whole grains","Soaked oats and barley"]}/>
          </div>
          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:"#b9892f", marginBottom:10 }}>LEAN AWAY FROM</p>
            <Chips items={["Refined white flour","Enriched processed bread","Sugary cereals","Packaged snack foods","Ultra processed baked goods"]} tone="gold"/>
          </div>
        </div>
        <p style={{ marginTop:14, fontSize:12, fontStyle:"italic", color:"var(--muted)" }}>
          Note: original grains still contain gluten. Soaking and fermentation improve digestibility but do not remove it. Not suitable for celiac disease.
        </p>
      </Panel>

      <div style={{ marginTop:20 }}>
        <Panel title="Simple meals that feed the whole body" icon={Soup}>
          <div style={{ display:"grid", gap:14, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
            {[
              { name:"Bone broth", why:"Gelatin and collagen repair gut lining. Simmer bones 8 to 24 hours." },
              { name:"Lentil soup", why:"Prebiotic fiber, complete protein, iron, folate. The gut's daily bread." },
              { name:"Fermented cabbage (sauerkraut)", why:"Probiotic bacteria and prebiotic fiber together. Make at home: salt, cabbage, time." },
              { name:"Moringa green smoothie", why:"Nutrient dense leaf covering vitamins A, C, E, iron, calcium." },
              { name:"Turmeric and ginger golden milk", why:"Anti inflammatory and warming. Use whole milk or coconut milk and add black pepper." },
              { name:"Soaked oat porridge", why:"Beta glucan prebiotic fiber and sustained energy. Soak overnight to reduce phytic acid." },
            ].map((r) => (
              <div key={r.name} style={{ borderRadius:12, border:"1.5px solid rgba(61,107,80,.12)", padding:14, background:"var(--paper)" }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:600, color:"var(--green)", marginBottom:6 }}>{r.name}</h3>
                <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.6 }}>{r.why}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </DirPage>
  );
}
