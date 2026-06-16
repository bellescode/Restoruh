/* ============================================================
   FILE: app/routes/wellness-guide.jsx  --  /wellness-guide
   Accessible from the main site WITHOUT directory subscription.
   Multi-step symptom navigator -- no AI, pure keyword scoring.
   After completing: routes to directory results (gate if needed).
   ============================================================ */
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import {
  SYMPTOM_TILES, FOLLOW_UP_QUESTIONS, RESULT_MAP, scoreResults, detectKeywords,
} from "../data/wellnessGuideData";
import { HERBS, AREAS }     from "../data/directoryData";

export const meta = () => [
  { title: "How Are You Feeling -- RestoRuh Wellness Guide" },
  { name: "description", content: "Tell us how you are feeling and we will guide you to the right herbs and protocols. Faith-based, evidence-backed, no AI." },
];

/* No loader needed -- fully client-side */

/* ---- STEP CONSTANTS --------------------------------------- */
const STEP = { START: 0, TILES: 1, QUESTIONS: 2, RESULTS: 3 };

/* ---- MAIN COMPONENT --------------------------------------- */
export default function WellnessGuidePage() {
  const navigate = useNavigate();

  const [step,       setStep]       = useState(STEP.START);
  const [selected,   setSelected]   = useState([]);     // symptom tile IDs
  const [textInput,  setTextInput]  = useState("");
  const [answers,    setAnswers]    = useState({});
  const [results,    setResults]    = useState(null);
  const [inputMode,  setInputMode]  = useState("tiles"); // tiles | text
  const qIndex = useRef(0);

  const visibleQuestions = FOLLOW_UP_QUESTIONS.filter(
    (q) => !q.showIf || q.showIf(answers)
  );

  /* ---- Handlers ------------------------------------------ */
  const toggleTile = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleTextDetect = () => {
    const detected = detectKeywords(textInput);
    if (detected.length > 0) setSelected(detected);
    else if (textInput.trim()) setSelected(["digestive"]); // safe fallback
  };

  const proceedToQuestions = () => {
    if (selected.length === 0 && textInput.trim()) handleTextDetect();
    setStep(STEP.QUESTIONS);
    qIndex.current = 0;
  };

  const answerQuestion = (qId, value) => {
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);
    const remaining = FOLLOW_UP_QUESTIONS.filter(
      (q) => !q.showIf || q.showIf(newAnswers)
    );
    const currentIdx = remaining.findIndex((q) => q.id === qId);
    if (currentIdx < remaining.length - 1) {
      qIndex.current = currentIdx + 1;
    } else {
      /* All questions answered -- compute results */
      const r = scoreResults(selected, newAnswers);
      setResults(r);
      setStep(STEP.RESULTS);
    }
  };

  const reset = () => {
    setStep(STEP.START); setSelected([]); setTextInput("");
    setAnswers({}); setResults(null); qIndex.current = 0;
  };

  /* ---- Check if user has directory access (cookie) -------- */
  const hasDirectoryAccess = () => {
    if (typeof document === "undefined") return false;
    return document.cookie.includes("ruh_dir=1");
  };

  /* ---- Go to directory section ---------------------------- */
  const goToDirectory = (areaId) => {
    if (hasDirectoryAccess()) {
      navigate(`/directory/area/${areaId}`);
    } else {
      navigate(`/directory/gate?returnTo=/directory/area/${areaId}`);
    }
  };

  const goToHerb = (herbId) => {
    if (hasDirectoryAccess()) {
      navigate(`/directory/herbs/${herbId}`);
    } else {
      navigate(`/directory/gate?returnTo=/directory/herbs/${herbId}`);
    }
  };

  /* ---- Current question ----------------------------------- */
  const currentQuestion = visibleQuestions[qIndex.current];

  /* ==== RENDER ============================================= */
  return (
    <div style={{ background: "var(--cream)", minHeight: "80vh" }}>

      {/* ---- HEADER BAND --------------------------------- */}
      <div style={{ background: "var(--green-deep)", padding: "48px 24px 40px", textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: "var(--gold)", marginBottom: 12 }}>
          RESTORUH WELLNESS GUIDE
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,5vw,48px)", fontWeight: 300, color: "var(--cream)", lineHeight: 1.1, marginBottom: 12 }}>
          How are you feeling?
        </h1>
        <p style={{ fontSize: 15, color: "var(--sage)", maxWidth: 520, margin: "0 auto" }}>
          Tell us what you are dealing with and we will guide you to the right herbs,
          areas, and protocols. Faith-based. Evidence-backed. No AI.
        </p>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ==== STEP 0: START =============================== */}
        {step === STEP.START && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🌿</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, color: "var(--green)", marginBottom: 12 }}>
              Let us find your path
            </h2>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.75, maxWidth: 480, margin: "0 auto 32px" }}>
              This works like a conversation. Select what you are feeling, answer a few quick
              questions, and we will show you exactly where to start.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => { setInputMode("tiles"); setStep(STEP.TILES); }}
                className="btn-gold" style={{ fontSize: 15, padding: "14px 28px" }}>
                Select my symptoms
              </button>
              <button onClick={() => { setInputMode("text"); setStep(STEP.TILES); }}
                className="btn-ghost" style={{ fontSize: 15, padding: "13px 28px" }}>
                Type how I am feeling
              </button>
            </div>
            <p style={{ marginTop: 20, fontSize: 13, color: "var(--muted)", fontStyle: "italic" }}>
              Revelation 22:2 -- the leaves of the tree are for the healing of the nations.
            </p>
          </div>
        )}

        {/* ==== STEP 1: SYMPTOM SELECTION ================== */}
        {step === STEP.TILES && (
          <div>
            {inputMode === "tiles" ? (
              <>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--green)", marginBottom: 6 }}>
                  What are you dealing with?
                </h2>
                <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>
                  Select everything that applies. You can pick multiple.
                </p>

                <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", marginBottom: 32 }}>
                  {SYMPTOM_TILES.map((tile) => {
                    const isSelected = selected.includes(tile.id);
                    return (
                      <button key={tile.id} onClick={() => toggleTile(tile.id)}
                        style={{
                          border: `2px solid ${isSelected ? "var(--gold)" : "rgba(61,107,80,.15)"}`,
                          borderRadius: 14, padding: "14px 12px", background: isSelected ? "rgba(201,162,74,.12)" : "var(--paper)",
                          cursor: "pointer", textAlign: "left", transition: "all .15s ease",
                        }}>
                        <div style={{ fontSize: 24, marginBottom: 6 }}>{tile.icon}</div>
                        <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: isSelected ? "var(--green)" : "var(--ink)", marginBottom: 3 }}>
                          {tile.label}
                        </p>
                        <p style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.4 }}>{tile.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--green)", marginBottom: 6 }}>
                  Tell us how you are feeling
                </h2>
                <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20 }}>
                  Type your symptoms in your own words. For example: "tired, swollen legs, bad digestion, fibroids"
                </p>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="I have been feeling tired, my legs are swollen, my digestion is off..."
                  style={{
                    width: "100%", minHeight: 120, padding: "14px 16px", borderRadius: 12,
                    border: "1.5px solid rgba(61,107,80,.2)", background: "var(--paper)",
                    fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink)",
                    outline: "none", resize: "vertical", lineHeight: 1.65,
                  }}
                />
                {/* Common examples */}
                <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["swollen legs", "hair thinning", "always tired", "gut issues", "skin problems",
                    "anxiety or mood", "hormonal issues", "fibroids", "poor sleep"].map((ex) => (
                    <button key={ex} onClick={() => setTextInput((t) => t ? t + ", " + ex : ex)}
                      style={{ borderRadius: 999, padding: "5px 12px", fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", background: "rgba(61,107,80,.08)", color: "var(--ink)" }}>
                      {ex}
                    </button>
                  ))}
                </div>
                <button onClick={() => { setInputMode("tiles"); }}
                  style={{ marginTop: 14, fontSize: 13, color: "var(--muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                  Switch to symptom tiles instead
                </button>
              </>
            )}

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              {(selected.length > 0 || (inputMode === "text" && textInput.trim())) && (
                <button onClick={proceedToQuestions} className="btn-gold" style={{ fontSize: 15, padding: "13px 28px" }}>
                  Continue
                  {selected.length > 0 && ` (${selected.length} selected)`}
                </button>
              )}
              <button onClick={reset}
                style={{ fontSize: 13, color: "var(--muted)", background: "none", border: "none", cursor: "pointer" }}>
                Start over
              </button>
            </div>
          </div>
        )}

        {/* ==== STEP 2: FOLLOW-UP QUESTIONS ================ */}
        {step === STEP.QUESTIONS && currentQuestion && (
          <div style={{ textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
            <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "var(--sage)" }}>
              QUICK QUESTION {qIndex.current + 1} OF {visibleQuestions.length}
            </div>
            {/* Progress dots */}
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 32 }}>
              {visibleQuestions.map((_, i) => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= qIndex.current ? "var(--gold)" : "rgba(61,107,80,.2)" }}/>
              ))}
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,3vw,28px)", fontWeight: 600, color: "var(--green)", marginBottom: 28, lineHeight: 1.3 }}>
              {currentQuestion.question}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {currentQuestion.options.map((opt) => (
                <button key={opt.value} onClick={() => answerQuestion(currentQuestion.id, opt.value)}
                  style={{
                    padding: "16px 24px", borderRadius: 14, fontSize: 15, fontWeight: 500,
                    cursor: "pointer", textAlign: "left",
                    border: "1.5px solid rgba(61,107,80,.15)",
                    background: "var(--paper)", color: "var(--ink)",
                    transition: "all .15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.background = "rgba(201,162,74,.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(61,107,80,.15)"; e.currentTarget.style.background = "var(--paper)"; }}>
                  {opt.label}
                </button>
              ))}
            </div>

            <button onClick={reset}
              style={{ marginTop: 24, fontSize: 13, color: "var(--muted)", background: "none", border: "none", cursor: "pointer" }}>
              Start over
            </button>
          </div>
        )}

        {/* ==== STEP 3: RESULTS ============================ */}
        {step === STEP.RESULTS && results && (
          <div>
            {/* Urgency alerts */}
            {results.urgencies.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                {results.urgencies.map((u, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, borderRadius: 12, padding: "14px 18px", background: "#fdf6e8", border: "1px solid #e3c47e", marginBottom: 10 }}>
                    <span style={{ flexShrink: 0, fontSize: 18 }}>⚠️</span>
                    <p style={{ fontSize: 13, color: "#7a5e1c", lineHeight: 1.7 }}>{u}</p>
                  </div>
                ))}
              </div>
            )}

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,4vw,34px)", fontWeight: 600, color: "var(--green)", marginBottom: 6 }}>
              {results.headline}
            </h2>
            <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 28 }}>
              Based on what you shared, here is your starting point. Everything links directly to the full research in the directory.
            </p>

            {/* Start here */}
            {results.startHere && (
              <div style={{ borderRadius: 16, padding: "20px 22px", background: "var(--green)", marginBottom: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "var(--gold)", marginBottom: 8 }}>START HERE TONIGHT</p>
                <p style={{ fontSize: 15, color: "var(--cream)", lineHeight: 1.8 }}>{results.startHere}</p>
              </div>
            )}

            {/* Top herbs */}
            {results.topHerbs.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--green)", marginBottom: 14 }}>
                  Recommended herbs for you
                </h3>
                <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))" }}>
                  {results.topHerbs.map((herbId) => {
                    const herb = HERBS.find((h) => h.id === herbId);
                    if (!herb) return null;
                    return (
                      <button key={herbId} onClick={() => goToHerb(herbId)}
                        style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4, borderRadius: 14, border: "1.5px solid rgba(61,107,80,.15)", padding: 16, background: "var(--paper)", cursor: "pointer", textAlign: "left" }}>
                        <p style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: "var(--green)" }}>{herb.name}</p>
                        <p style={{ fontSize: 12, fontStyle: "italic", color: "var(--muted)" }}>{herb.latin}</p>
                        <p style={{ fontSize: 12, color: "var(--ink)", lineHeight: 1.5 }}>{herb.uses.slice(0, 80)}...</p>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", marginTop: 4 }}>Open in directory →</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Top areas */}
            {results.topAreas.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--green)", marginBottom: 14 }}>
                  Research areas for you
                </h3>
                <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))" }}>
                  {results.topAreas.map((areaId) => {
                    const area = AREAS.find((a) => a.id === areaId);
                    if (!area) return null;
                    const Icon = area.icon;
                    return (
                      <button key={areaId} onClick={() => goToDirectory(areaId)}
                        style={{ display: "flex", gap: 12, alignItems: "flex-start", borderRadius: 14, border: "1.5px solid rgba(61,107,80,.15)", padding: 16, background: "var(--paper)", cursor: "pointer", textAlign: "left" }}>
                        <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: "var(--green)", flexShrink: 0 }}>
                          <Icon size={18} color="var(--gold)"/>
                        </span>
                        <div>
                          <p style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, color: "var(--green)", marginBottom: 4 }}>{area.short}</p>
                          <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{area.blurb.slice(0, 80)}...</p>
                          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", marginTop: 6, display: "block" }}>Explore in directory →</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Faith note */}
            {results.faithNotes.length > 0 && (
              <div style={{ borderLeft: "3px solid var(--gold)", padding: "12px 18px", borderRadius: "0 10px 10px 0", background: "rgba(201,162,74,.08)", marginBottom: 24 }}>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 14, color: "var(--green)", lineHeight: 1.75 }}>
                  {results.faithNotes[0]}
                </p>
              </div>
            )}

            {/* Directory CTA */}
            <div style={{ background: "var(--green)", borderRadius: 16, padding: "24px 22px", textAlign: "center" }}>
              <p style={{ fontSize: 14, color: "var(--sage)", marginBottom: 14, lineHeight: 1.7 }}>
                The full research -- detailed protocols, safety notes, dosing, herb evidence ratings,
                and your personal family plan -- is in the directory.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/directory" className="btn-gold">Enter the Directory</Link>
                <button onClick={reset} className="btn-ghost">Start over</button>
              </div>
            </div>

            <p style={{ marginTop: 20, fontSize: 11, color: "var(--muted)", lineHeight: 1.7, textAlign: "center" }}>
              These results are educational only. Not a medical diagnosis. Always consult your provider, especially for pregnancy, children, and existing conditions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
