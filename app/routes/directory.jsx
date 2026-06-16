/* ============================================================
   FILE: app/routes/directory.jsx  — v2
   Embeds the full RestoRuh Research Directory.

   SETUP REQUIRED (one-time, in Codespace terminal):
     1. Open terminal in Codespace (Ctrl + backtick)
     2. Run: npm install lucide-react
     3. Upload restoruh-directory.jsx content to:
        app/components/Directory.jsx
     4. Then this route renders it automatically.

   Until step 3 is done, it shows the branded landing page below.
   ============================================================ */

// Try to import the full directory. If not present, falls back to landing.
let DirectoryApp = null;
try {
  // This import will work once app/components/Directory.jsx exists
  DirectoryApp = (await import('../components/Directory.jsx')).default;
} catch (e) {
  // Directory component not yet added — show landing page
}

import { Link } from 'react-router';

export const meta = () => [
  { title: 'The RestoRuh Directory | Faith-Based Wellness Research' },
  { name: 'description', content: 'Free faith-based wellness research. 65+ herbs, 11 body systems, family wellness plans, and more. Completely free.' },
];

const sections = [
  { icon:'🌿', label:'Herb Library',          sub:'65+ herbs with evidence ratings, tiers, and safety notes' },
  { icon:'🫀', label:'11 Body Systems',        sub:'Gut, immune, nervous, endocrine, cardiovascular and more' },
  { icon:'👨‍👩‍👧‍👦', label:'Family Wellness Plan',   sub:'Week by week research protocols for the whole household' },
  { icon:'🧬', label:'Gut Health Deep Dive',   sub:'Microbiome, leaky gut, pre/pro/postbiotics, SIBO' },
  { icon:'💧', label:'Toxicity and Detox',     sub:'Viral overload, heavy metals, copper, mercury guidance' },
  { icon:'✨', label:'Hair and Skin',           sub:'From the inside; gut recipes, nutrient protocols' },
  { icon:'🦷', label:'Oral Health',            sub:'Oil pulling, remineralization, microbiome balance' },
  { icon:'🏕️', label:'Preparedness',           sub:'Herb kits, Kratky hydroponics, seed saving' },
  { icon:'💊', label:'Nutrients and Deficiencies', sub:'Iron, B12, zinc, magnesium, vitamin D and more' },
  { icon:'🧒', label:'For Little Ones',        sub:'Safe herbs and dosing for infants 7 months and up' },
  { icon:'📖', label:'Healing Scriptures',     sub:'The Word as foundation for every wellness protocol' },
  { icon:'🌱', label:'Wellness Guide',         sub:'Symptom navigator; find the right protocol for you' },
];

function DirectoryLanding() {
  return (
    <div style={{ background:'var(--cream)' }}>
      {/* Hero */}
      <div style={{ background:'var(--green-deep)', padding:'72px 24px 64px' }}>
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
          <img src="/images/restoruh-logo.png" alt="RestoRuh"
            style={{ width:68, height:68, objectFit:'contain', margin:'0 auto 20px', filter:'brightness(0) invert(1)', opacity:.7 }}/>
          <p style={{ fontSize:11, fontWeight:700, letterSpacing:4, color:'var(--gold)', marginBottom:16 }}>FREE RESEARCH PLATFORM</p>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,60px)', fontWeight:300, color:'var(--cream)', lineHeight:1.05, marginBottom:20 }}>
            The RestoRuh Directory
          </h1>
          <p style={{ fontSize:17, color:'var(--sage)', lineHeight:1.75, maxWidth:540, margin:'0 auto 32px' }}>
            Faith-based wellness research. Published studies, tested tradition,
            and practical guidance for every household. Always free.
          </p>
          <p style={{ fontSize:13, color:'rgba(201,162,74,.8)', fontStyle:'italic' }}>
            "The leaves of the tree are for the healing of the nations." - Revelation 22:2
          </p>
        </div>
      </div>

      {/* What is inside */}
      <div className="container" style={{ padding:'64px 24px 80px' }}>
        <p className="section-eyebrow text-center">INSIDE THE DIRECTORY</p>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(24px,4vw,40px)', fontWeight:600, color:'var(--green)', textAlign:'center', marginBottom:48 }}>
          Everything your household needs to know
        </h2>

        <div style={{ display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', marginBottom:56 }}>
          {sections.map(s => (
            <div key={s.label} style={{ padding:'24px 20px', borderRadius:14, background:'var(--paper)', border:'1.5px solid rgba(61,107,80,.1)', display:'flex', gap:14, alignItems:'flex-start' }}>
              <span style={{ fontSize:24, flexShrink:0, marginTop:2 }}>{s.icon}</span>
              <div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:600, color:'var(--green)', marginBottom:4 }}>{s.label}</h3>
                <p style={{ fontSize:12, color:'var(--muted)', lineHeight:1.55 }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Balance philosophy */}
        <div style={{ background:'rgba(201,162,74,.1)', borderLeft:'3px solid var(--gold)', borderRadius:12, padding:'20px 24px', marginBottom:48, maxWidth:640, margin:'0 auto 48px' }}>
          <p style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:16, color:'var(--green)', lineHeight:1.7 }}>
            "Heal your gut and you can eat just about anything. Everything in moderation.
            Everything that creates balance is good, and balance is what we were made for."
          </p>
        </div>

        <div style={{ textAlign:'center' }}>
          <p style={{ fontSize:13, color:'var(--muted)', marginBottom:20 }}>
            The full interactive directory is being integrated into this page. Coming very soon.
          </p>
          <Link to="/shop" className="btn-gold" style={{ marginRight:12 }}>Shop Products</Link>
          <Link to="/about" className="btn-ghost">Our Story</Link>
        </div>
      </div>
    </div>
  );
}

export default function DirectoryPage() {
  // Once app/components/Directory.jsx is added, render the full app
  if (DirectoryApp) {
    return <DirectoryApp />;
  }
  // Until then, show the branded landing
  return <DirectoryLanding />;
}
