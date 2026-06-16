/* ============================================================
   FILE: app/routes/directory.gate.jsx
   Email subscription gate -- visible without cookie.
   On success sets cookie and redirects to /directory.
   ============================================================ */
import { Form, useActionData, useNavigation } from "react-router";
import { useState, useEffect }                from "react";

export const meta = () => [
  { title: "The RestoRuh Directory -- Unlock Free Access" },
];

export async function action({ request, context }) {
  const formData = await request.formData();
  const email    = String(formData.get("email") ?? "").trim();
  if (!email || !email.includes("@")) return { error: "Please enter a valid email address." };

  try {
    const result = await context.storefront.mutate(SUBSCRIBE, {
      variables: { input: {
        email, acceptsMarketing: true,
        password: `RUH${Math.random().toString(36).slice(2, 10).toUpperCase()}!`,
      }},
    });
    const errors = result?.customerCreate?.customerUserErrors ?? [];
    const ok     = errors.length === 0 || errors.some((e) => e.code === "TAKEN");
    if (!ok) return { error: "Something went wrong. Please try again." };

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/directory",
        "Set-Cookie": "ruh_dir=1; Path=/; Max-Age=31536000; SameSite=Lax",
      },
    });
  } catch {
    return { error: "Unable to subscribe right now. Please try again." };
  }
}

const SECTIONS = [
  ["🌱","Wellness Guide","Symptom navigator for the whole family"],
  ["🌿","Herb Library","65+ herbs with evidence and safety ratings"],
  ["🫀","11 Body Systems","Gut, immune, nervous, endocrine, and more"],
  ["👨\u200d👩\u200d👧\u200d👦","Family Wellness Plan","Week by week research protocols"],
  ["🧬","Gut Health Deep Dive","Microbiome, leaky gut, pre/pro/postbiotics"],
  ["💧","Toxicity and Detox","Viral overload, heavy metals guidance"],
  ["✨","Hair and Skin","Inside out -- gut recipes and nutrients"],
  ["🦷","Oral Health","Oil pulling, remineralization, microbiome"],
  ["🏕️","Preparedness","Herb kits, hydroponics, seed saving"],
  ["💊","Nutrients","Iron, B12, zinc, magnesium, vitamin D"],
  ["🧒","For Little Ones","Safe herbs for infants 7 months and up"],
  ["📖","Healing Scriptures","The Word as foundation for wellness"],
];

function UnlockAnimation({ onDone }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setP(1), 100);
    const t2 = setTimeout(() => setP(2), 700);
    const t3 = setTimeout(() => onDone(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  return (
    <>
      <style>{`
        @keyframes rf { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes rg { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes rs { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
      `}</style>
      <div style={{ position:"fixed", inset:0, zIndex:9999, background:"var(--green-deep)",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28 }}>
        <div style={{ position:"relative", width:90, height:90 }}>
          {["🌿","🌱","🍃","🌾"].map((e,i) => (
            <span key={i} style={{
              position:"absolute", fontSize:[22,16,26,14][i],
              left:["50%","10%","80%","20%"][i], top:["0%","40%","20%","70%"][i],
              transform:"translate(-50%,-50%)",
              opacity: p>=1 ? 1 : 0, transition:`opacity .4s ease ${i*.12}s`,
              animation: p>=1 ? `rf ${[2,1.7,2.3,1.9][i]}s ease-in-out infinite ${i*.18}s` : "none",
            }}>{e}</span>
          ))}
          <img src="/images/restoruh-logo.png" alt="RestoRuh" style={{
            position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"contain", filter:"brightness(0) invert(1)",
            opacity: p>=1 ? .85 : 0, transition:"opacity .6s ease",
            animation: p>=1 ? "rg 2s ease-in-out infinite" : "none",
          }}/>
        </div>
        <div style={{ textAlign:"center", opacity:p>=2?1:0, animation:p>=2?"rs .6s ease both":"none" }}>
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:"var(--gold)", marginBottom:10 }}>WELCOME</p>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"clamp(20px,4vw,30px)", color:"var(--cream)", fontWeight:300 }}>
            Entering the Directory
          </p>
          <p style={{ fontSize:12, color:"var(--sage)", marginTop:8, fontStyle:"italic" }}>
            The leaves of the tree are for the healing of the nations.
          </p>
        </div>
        <div style={{ width:120, height:1, background:"linear-gradient(90deg,transparent,var(--gold),transparent)",
          opacity:p>=2?1:0, transition:"opacity .8s ease .3s" }}/>
      </div>
    </>
  );
}

export default function DirectoryGatePage() {
  const actionData = useActionData();
  const nav        = useNavigation();
  const submitting = nav.state === "submitting";
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (actionData?.subscribed) setAnimating(true);
  }, [actionData?.subscribed]);

  /* After animation, the redirect from the action will have already fired via cookie */
  if (animating) return <UnlockAnimation onDone={() => window.location.href = "/directory"} />;

  return (
    <div style={{ background:"var(--cream)", minHeight:"80vh" }}>
      <div style={{ background:"var(--green-deep)", padding:"60px 24px 48px" }}>
        <div style={{ maxWidth:660, margin:"0 auto", textAlign:"center" }}>
          <img src="/images/restoruh-logo.png" alt="RestoRuh" style={{ width:54, height:54, objectFit:"contain", margin:"0 auto 14px", filter:"brightness(0) invert(1)", opacity:.7 }}/>
          <p style={{ fontSize:11, fontWeight:700, letterSpacing:4, color:"var(--gold)", marginBottom:12 }}>FREE RESEARCH PLATFORM</p>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,5vw,50px)", fontWeight:300, color:"var(--cream)", lineHeight:1.1, marginBottom:14 }}>
            The RestoRuh Directory
          </h1>
          <p style={{ fontSize:15, color:"var(--sage)", lineHeight:1.75, maxWidth:500, margin:"0 auto 10px" }}>
            Faith-based wellness research. Subscribe free to enter.
            Already subscribed? Enter the same email to go straight in.
          </p>
          <p style={{ fontSize:12, color:"rgba(201,162,74,.7)", fontStyle:"italic" }}>
            Revelation 22:2 -- the leaves of the tree are for the healing of the nations.
          </p>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px 0" }}>
        <p style={{ fontSize:11, fontWeight:700, letterSpacing:3, color:"var(--gold)", marginBottom:14, textAlign:"center" }}>INSIDE THE DIRECTORY</p>
        <div style={{ display:"grid", gap:8, gridTemplateColumns:"repeat(auto-fill, minmax(200px,1fr))", marginBottom:32 }}>
          {SECTIONS.map(([icon,label,sub]) => (
            <div key={label} style={{ padding:"10px 12px", borderRadius:10, background:"var(--paper)", border:"1.5px solid rgba(61,107,80,.1)", display:"flex", gap:9, alignItems:"flex-start" }}>
              <span style={{ fontSize:15, flexShrink:0 }}>{icon}</span>
              <div>
                <p style={{ fontFamily:"var(--font-display)", fontSize:12, fontWeight:600, color:"var(--green)", marginBottom:1 }}>{label}</p>
                <p style={{ fontSize:10, color:"var(--muted)", lineHeight:1.5 }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"0 24px 64px" }}>
        <div style={{ maxWidth:460, margin:"0 auto", background:"var(--green)", borderRadius:20, padding:"28px 24px", textAlign:"center" }}>
          <div style={{ fontSize:26, marginBottom:10 }}>🔓</div>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(17px,3vw,24px)", fontWeight:600, color:"var(--cream)", marginBottom:8 }}>Unlock free access</h2>
          <p style={{ fontSize:13, color:"var(--sage)", lineHeight:1.7, marginBottom:18 }}>Enter your email to access the directory.</p>
          <Form method="post" style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
            <input type="email" name="email" required placeholder="your@email.com"
              style={{ flex:"1 1 180px", padding:"11px 16px", borderRadius:999, border:"1.5px solid rgba(201,162,74,.3)", background:"rgba(255,255,255,.1)", color:"var(--cream)", fontFamily:"var(--font-body)", fontSize:14, outline:"none" }}/>
            <button type="submit" className="btn-gold" disabled={submitting} style={{ flexShrink:0, fontSize:13 }}>
              {submitting ? "Unlocking..." : "Unlock"}
            </button>
          </Form>
          {actionData?.error && <p style={{ marginTop:8, fontSize:12, color:"#f9c0c0" }}>{actionData.error}</p>}
          <p style={{ marginTop:10, fontSize:11, color:"rgba(138,166,148,.7)" }}>Free forever. No spam.</p>
        </div>
      </div>
    </div>
  );
}

const SUBSCRIBE = `#graphql
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email }
      customerUserErrors { code field message }
    }
  }
`;
