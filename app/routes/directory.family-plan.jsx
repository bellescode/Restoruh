/* ============================================================
   FILE: app/routes/directory.family-plan.jsx
   Step 1: Quick questionnaire (which 2-3 areas to focus on)
   Step 2: Show only those protocols, with progress tracking
   ============================================================ */
import { Link }                  from "react-router";
import { useState, useEffect }   from "react";
import { useDirectoryContext }   from "../components/directory/DirectoryContext";
import { DirPage }               from "../components/directory/DirectoryUI";
import { PROTOCOLS, AREAS, HERBS } from "../data/directoryData";
import {
  ClipboardList, ChevronRight, Leaf, Heart, Check, ArrowLeft,
} from "lucide-react";

export const meta = () => [{ title: "Family Plan -- RestoRuh Directory" }];

/* Areas that have protocols */
const PLAN_AREAS = AREAS.filter((a) => PROTOCOLS[a.id]);

/* Storage key for selected focus areas */
const FOCUS_KEY = "ruh:plan-focus";

/* ---- QUESTIONNAIRE ---------------------------------------- */
function PlanQuestionnaire({ onComplete }) {
  const [step,     setStep]     = useState(0);  // 0=family size, 1=areas, 2=timeline
  const [family,   setFamily]   = useState("");
  const [focus,    setFocus]    = useState([]);
  const [timeline, setTimeline] = useState("");

  const toggleArea = (id) =>
    setFocus((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id].slice(0, 3)
    );

  const finish = () => {
    const data = { family, focus, timeline, setAt: Date.now() };
    try { localStorage.setItem(FOCUS_KEY, JSON.stringify(data)); } catch (_) {}
    onComplete(data);
  };

  return (
    <div style={{ maxWidth: 580, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ borderRadius: 20, padding: "28px 24px", background: "var(--green)", marginBottom: 32, textAlign: "center" }}>
        <ClipboardList size={28} color="var(--gold)" style={{ marginBottom: 12 }} />
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,4vw,32px)", fontWeight: 600, color: "var(--cream)", marginBottom: 10 }}>
          Your Family Plan
        </h1>
        <p style={{ fontSize: 14, color: "var(--sage)", lineHeight: 1.7 }}>
          Three quick questions to personalise your plan. You can change this any time.
        </p>
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 32 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%",
            background: i <= step ? "var(--gold)" : "rgba(61,107,80,.2)",
            transition: "background .3s ease" }} />
        ))}
      </div>

      {/* Step 0 -- family size */}
      {step === 0 && (
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--green)", marginBottom: 6 }}>
            Who is this plan for?
          </h2>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20 }}>
            This helps us frame the protocols correctly.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { value: "solo",   label: "Just me" },
              { value: "couple", label: "Me and my partner" },
              { value: "family", label: "My household with children" },
              { value: "infant", label: "We have an infant (7 months+)" },
            ].map((opt) => (
              <button key={opt.value} onClick={() => { setFamily(opt.value); setStep(1); }}
                style={{
                  padding: "14px 18px", borderRadius: 12, fontSize: 15, fontWeight: 500,
                  cursor: "pointer", textAlign: "left",
                  border: `2px solid ${family === opt.value ? "var(--gold)" : "rgba(61,107,80,.15)"}`,
                  background: family === opt.value ? "rgba(201,162,74,.1)" : "var(--paper)",
                  color: "var(--ink)", transition: "all .15s ease",
                }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1 -- focus areas */}
      {step === 1 && (
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--green)", marginBottom: 6 }}>
            Which areas do you want to work on?
          </h2>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20 }}>
            Choose up to 3. Your plan will focus on these first.
          </p>
          <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", marginBottom: 24 }}>
            {PLAN_AREAS.map((area) => {
              const Icon     = area.icon;
              const selected = focus.includes(area.id);
              const maxed    = focus.length >= 3 && !selected;
              return (
                <button key={area.id} onClick={() => !maxed && toggleArea(area.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                    borderRadius: 14, cursor: maxed ? "not-allowed" : "pointer", textAlign: "left",
                    border: `2px solid ${selected ? "var(--gold)" : "rgba(61,107,80,.15)"}`,
                    background: selected ? "rgba(201,162,74,.12)" : maxed ? "rgba(0,0,0,.03)" : "var(--paper)",
                    opacity: maxed ? 0.5 : 1, transition: "all .15s ease",
                  }}>
                  <span style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 10, background: selected ? "var(--gold)" : "var(--green)", flexShrink: 0 }}>
                    <Icon size={18} color={selected ? "#1e3a2c" : "var(--gold)"} />
                  </span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, color: "var(--green)" }}>
                    {area.short}
                  </span>
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => setStep(0)}
              style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--muted)", background: "none", border: "none", cursor: "pointer" }}>
              <ArrowLeft size={14} /> Back
            </button>
            {focus.length > 0 && (
              <button onClick={() => setStep(2)}
                style={{ marginLeft: "auto", padding: "12px 28px", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: "pointer", border: "none", background: "var(--gold)", color: "#1e3a2c" }}>
                Continue ({focus.length} selected)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 2 -- timeline commitment */}
      {step === 2 && (
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--green)", marginBottom: 6 }}>
            How committed is the household right now?
          </h2>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20 }}>
            This sets the pace. Consistent beats aggressive every time.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {[
              { value: "gentle",  label: "Gentle start",      sub: "One or two changes per week. Building slowly." },
              { value: "steady",  label: "Steady progress",   sub: "Following each week's protocol as written." },
              { value: "focused", label: "All in right now",  sub: "Ready to go deep on all selected areas at once." },
            ].map((opt) => (
              <button key={opt.value} onClick={() => { setTimeline(opt.value); }}
                style={{
                  padding: "14px 18px", borderRadius: 12, fontSize: 15,
                  cursor: "pointer", textAlign: "left",
                  border: `2px solid ${timeline === opt.value ? "var(--gold)" : "rgba(61,107,80,.15)"}`,
                  background: timeline === opt.value ? "rgba(201,162,74,.1)" : "var(--paper)",
                  color: "var(--ink)", transition: "all .15s ease",
                }}>
                <span style={{ fontWeight: 700, display: "block", marginBottom: 2 }}>{opt.label}</span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{opt.sub}</span>
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => setStep(1)}
              style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--muted)", background: "none", border: "none", cursor: "pointer" }}>
              <ArrowLeft size={14} /> Back
            </button>
            {timeline && (
              <button onClick={finish}
                style={{ marginLeft: "auto", padding: "13px 28px", borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: "pointer", border: "none", background: "var(--gold)", color: "#1e3a2c" }}>
                Open my plan
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- PLAN VIEW -------------------------------------------- */
function PlanView({ planData, onReset }) {
  const { favs, toggleFav, planPhases, togglePhase } = useDirectoryContext();
  const [activeArea, setActiveArea] = useState(planData.focus[0] || "gut");

  const protocol   = PROTOCOLS[activeArea];
  const area       = AREAS.find((a) => a.id === activeArea);
  const totalPhases = protocol?.length || 0;
  const doneCount   = protocol?.filter((_, i) => planPhases[`${activeArea}:${i}`]).length || 0;
  const Icon        = area?.icon;

  return (
    <DirPage>
      {/* Plan header */}
      <div style={{ borderRadius: 20, padding: "24px 28px", background: "var(--green)", marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "var(--sage)", marginBottom: 6 }}>
              YOUR FAMILY PLAN
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,4vw,28px)", fontWeight: 600, color: "var(--cream)", lineHeight: 1.2 }}>
              {planData.focus.map((id) => AREAS.find((a) => a.id === id)?.short).join(", ")}
            </h1>
            {favs.length > 0 && (
              <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: "rgba(201,162,74,.2)", fontSize: 12, fontWeight: 600, color: "var(--gold)" }}>
                <Heart size={12} fill="var(--gold)" /> {favs.length} herb{favs.length !== 1 ? "s" : ""} saved
              </div>
            )}
          </div>
          <button onClick={onReset}
            style={{ fontSize: 12, color: "var(--sage)", background: "rgba(255,255,255,.1)", border: "none", cursor: "pointer", padding: "6px 12px", borderRadius: 999, flexShrink: 0 }}>
            Change focus
          </button>
        </div>
      </div>

      {/* Faith quote */}
      <div style={{ borderLeft: "3px solid var(--gold)", padding: "10px 16px", borderRadius: "0 10px 10px 0", background: "rgba(201,162,74,.07)", marginBottom: 28 }}>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14, color: "var(--green)", lineHeight: 1.7 }}>
          "Heal your gut and you can eat just about anything. Everything in moderation.
          Balance is what we were made for. These protocols are a season of intention, not a life sentence."
        </p>
      </div>

      {/* Area tab selector -- only shows selected areas */}
      {planData.focus.length > 1 && (
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {planData.focus.map((id) => {
            const a = AREAS.find((x) => x.id === id);
            return (
              <button key={id} onClick={() => setActiveArea(id)}
                style={{ borderRadius: 999, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", whiteSpace: "nowrap",
                  background: activeArea === id ? "var(--green)" : "rgba(61,107,80,.08)",
                  color:      activeArea === id ? "var(--gold)"  : "var(--ink)" }}>
                {a?.short || id}
              </button>
            );
          })}
        </div>
      )}

      {/* Area name + progress */}
      {area && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {Icon && <span style={{ display: "grid", placeItems: "center", width: 36, height: 36, borderRadius: 10, background: "var(--green)" }}><Icon size={18} color="var(--gold)" /></span>}
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--green)" }}>{area.short}</h2>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: doneCount === totalPhases && totalPhases > 0 ? "#3f7d4f" : "var(--muted)" }}>
              {doneCount}/{totalPhases} phases
            </span>
          </div>
          <div style={{ height: 6, borderRadius: 999, background: "rgba(61,107,80,.1)", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 999, background: "var(--gold)", width: `${totalPhases > 0 ? (doneCount / totalPhases) * 100 : 0}%`, transition: "width .4s ease" }} />
          </div>
        </div>
      )}

      {/* Protocol phases */}
      {protocol ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {protocol.map((phase, i) => {
            const key   = `${activeArea}:${i}`;
            const done  = planPhases[key];
            const herbs = (phase.herbs || []).map((id) => HERBS.find((h) => h.id === id)).filter(Boolean);
            return (
              <div key={i} style={{
                borderRadius: 16, border: `1.5px solid ${done ? "rgba(63,125,79,.4)" : "rgba(61,107,80,.12)"}`,
                padding: "20px 20px", background: done ? "rgba(63,125,79,.05)" : "var(--paper)",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                  <div>
                    {phase.range && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "var(--sage)" }}>{phase.range.toUpperCase()}</span>}
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--green)", marginTop: 4 }}>{phase.title}</h3>
                  </div>
                  <button onClick={() => togglePhase(key)}
                    style={{ width: 28, height: 28, borderRadius: "50%", cursor: "pointer", flexShrink: 0,
                      border: `2px solid ${done ? "#3f7d4f" : "rgba(61,107,80,.3)"}`,
                      background: done ? "#3f7d4f" : "transparent",
                      display: "grid", placeItems: "center" }}>
                    {done && <Check size={14} color="#fff" />}
                  </button>
                </div>

                <ul style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: herbs.length > 0 ? 14 : 0 }}>
                  {(phase.steps || []).map((s, si) => (
                    <li key={si} style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--ink)", lineHeight: 1.65 }}>
                      <span style={{ marginTop: 5, width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />{s}
                    </li>
                  ))}
                </ul>

                {herbs.length > 0 && (
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "var(--sage)", marginBottom: 8 }}>HERBS FOR THIS PHASE</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {herbs.map((h) => (
                        <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Link to={`/directory/herbs/${h.id}`}
                            style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: "rgba(61,107,80,.08)", color: "var(--green)", textDecoration: "none" }}>
                            <Leaf size={11} />{h.name}
                          </Link>
                          <button onClick={() => toggleFav(h.id)}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                            <Heart size={13} color={favs.includes(h.id) ? "var(--gold)" : "#c4c0b2"} fill={favs.includes(h.id) ? "var(--gold)" : "none"} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {phase.evidence && (
                  <p style={{ marginTop: 12, fontSize: 11, fontStyle: "italic", color: "var(--muted)", lineHeight: 1.65, borderTop: "1px solid rgba(61,107,80,.1)", paddingTop: 10 }}>
                    {phase.evidence}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ color: "var(--muted)", padding: "40px 0", textAlign: "center" }}>
          No protocol available for this area yet. Check back soon.
        </p>
      )}
    </DirPage>
  );
}

/* ---- PAGE EXPORT ------------------------------------------ */
export default function FamilyPlanPage() {
  const [planData, setPlanData] = useState(null);
  const [loaded,   setLoaded]   = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(FOCUS_KEY);
      if (saved) setPlanData(JSON.parse(saved));
    } catch (_) {}
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!planData || !planData.focus || planData.focus.length === 0) {
    return (
      <DirPage>
        <PlanQuestionnaire onComplete={(data) => setPlanData(data)} />
      </DirPage>
    );
  }

  return (
    <PlanView
      planData={planData}
      onReset={() => {
        try { localStorage.removeItem(FOCUS_KEY); } catch (_) {}
        setPlanData(null);
      }}
    />
  );
}
