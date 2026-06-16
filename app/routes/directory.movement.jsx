/* FILE: app/routes/directory.movement.jsx */
import { DirPage, SectionHeader, Panel } from "../components/directory/DirectoryUI";
import { Dumbbell, Activity, Sun, Wind } from "lucide-react";

export const meta = () => [{ title: "Movement and Mobility -- RestoRuh Directory" }];

const EXERCISES = [
  { level:"Beginner", icon:Activity, items:[
    { name:"Morning walk", desc:"20 to 30 minutes outdoors. Sets the circadian clock, reduces cortisol, improves digestion. Start here." },
    { name:"Bodyweight squats", desc:"3 sets of 10. Builds the largest muscle group in the body, improving metabolism and blood sugar regulation." },
    { name:"Wall push-ups", desc:"3 sets of 10. Upper body strength with no equipment or joint load. Progress to floor push-ups as strength builds." },
    { name:"Standing stretches", desc:"5 minutes morning and evening. Calves, hamstrings, hip flexors, and shoulders. Reverses the damage of sitting." },
  ]},
  { level:"Intermediate", icon:Dumbbell, items:[
    { name:"Floor push-ups", desc:"3 sets of 15. Full chest, shoulder, and tricep work." },
    { name:"Lunges", desc:"3 sets of 10 each leg. Balance, stability, and unilateral leg strength." },
    { name:"Plank holds", desc:"3 sets of 30 to 60 seconds. Core stability that protects the spine and improves posture." },
    { name:"Step-ups", desc:"3 sets of 12 each leg on a sturdy chair or step. Cardiovascular and lower body strength together." },
  ]},
  { level:"Advanced", icon:Sun, items:[
    { name:"Burpees", desc:"3 sets of 10. Full body, cardiovascular, strength. The most efficient single exercise." },
    { name:"Pike push-ups", desc:"Shoulders and upper body. Progression toward overhead strength." },
    { name:"Jump squats", desc:"Power, bone density, cardiovascular. 3 sets of 10." },
    { name:"Single-leg deadlift", desc:"Balance, glutes, hamstrings. 3 sets of 8 each leg." },
  ]},
];

const STRETCHES = [
  "Hip flexor stretch: kneel on one knee, push hips forward gently. Hold 30 seconds each side. Essential for anyone who sits.",
  "Doorway chest stretch: hands on doorframe at shoulder height, gently lean forward. Opens the chest and reverses hunching.",
  "Hamstring stretch: seated on the floor, legs straight, reach for toes. Hold 30 seconds. Improves low back comfort.",
  "Cat-cow: on hands and knees, alternate rounding and arching the spine slowly. Mobilizes the entire spine.",
  "Child\'s pose: knees wide, arms stretched forward, forehead to floor. Rest here for 1 to 2 minutes. Decompresses the lower back.",
  "Neck half circles: chin to chest, slowly roll ear to shoulder, then back. Never roll the neck backward.",
];

export default function MovementPage() {
  return (
    <DirPage>
      <SectionHeader title="Movement and Mobility"
        sub="Sustainable energy is built, not borrowed. Movement is medicine and its benefits compound over time." />

      <div style={{ marginTop:24, borderRadius:20, padding:24, background:"var(--green)", marginBottom:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <Wind size={18} color="var(--gold)"/>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:600, color:"var(--cream)" }}>The biblical case for movement</h2>
        </div>
        <p style={{ fontSize:14, color:"var(--sage)", lineHeight:1.8 }}>
          Isaiah 40:31 -- those who wait on Yahweh renew their strength. They will run and not grow weary, they will walk and not be faint.
          Vitality is physical and spiritual at once. The body was designed for movement. Rest and work, exertion and recovery, are woven
          into creation's rhythm from the beginning.
        </p>
      </div>

      {EXERCISES.map((group) => (
        <div key={group.level} style={{ marginBottom:28 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
            <group.icon size={18} color="var(--gold)"/>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:600, color:"var(--green)" }}>{group.level}</h2>
          </div>
          <div style={{ display:"grid", gap:12, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
            {group.items.map((ex) => (
              <div key={ex.name} style={{ borderRadius:14, border:"1.5px solid rgba(61,107,80,.12)", padding:16, background:"var(--paper)" }}>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:600, color:"var(--green)", marginBottom:6 }}>{ex.name}</h3>
                <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.6 }}>{ex.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Panel title="Essential stretches">
        <ul style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {STRETCHES.map((s, i) => (
            <li key={i} style={{ display:"flex", gap:10, fontSize:13, color:"var(--ink)", lineHeight:1.65 }}>
              <span style={{ marginTop:5, width:5, height:5, borderRadius:"50%", background:"var(--gold)", flexShrink:0 }}/>
              {s}
            </li>
          ))}
        </ul>
      </Panel>
    </DirPage>
  );
}
