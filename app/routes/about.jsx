/* ============================================================
   FILE: app/routes/about.jsx
   About page  --  brand story and mission
   ============================================================ */
import { Link } from 'react-router';

export const meta = () => [
  { title: 'About  --  RestoRuh' },
  { name: 'description', content: 'RestoRuh is a faith-rooted herbal wellness brand built on Revelation 22:2. Whole plant teas, powdered blends, and free research for every household.' },
];

export default function AboutPage() {
  const pillars = [
    { icon:'📖', label:'Scripture-Rooted',    desc:'Every protocol, every herb, every product is anchored in the understanding that Yahweh Rapha is the God who heals. The plants are His provision.' },
    { icon:'🔬', label:'Evidence-Based',       desc:'We cite published research. Traditional use is honored, but every claim is traceable to real science and real studies.' },
    { icon:'👨‍👩‍👧‍👦', label:'Family-Centered',       desc:'From 7 months to seniors. Dosing, safety notes, and protocols for the whole household, not just one person.' },
    { icon:'🌿', label:'Pantry-First',         desc:'Every protocol begins with what you already have  --  ginger, garlic, chamomile. Specialty herbs come later when the foundation is built.' },
    { icon:'🆓', label:'Education is Free',    desc:'The Directory is free and always will be. The knowledge belongs to every household. Products fund the mission, not the other way around.' },
  ];

  return (
    <div style={{ background:'var(--cream)' }}>

      {/* Hero */}
      <div style={{ background:'var(--green-deep)', padding:'80px 24px 72px' }}>
        <div style={{ maxWidth:720, margin:'0 auto', textAlign:'center' }}>
          <img src="/images/restoruh-logo.png" alt="RestoRuh"
            style={{ width:80, height:80, objectFit:'contain', margin:'0 auto 28px', filter:'brightness(0) invert(1)', opacity:.75 }}/>
          <p style={{ fontSize:11, fontWeight:700, letterSpacing:4, color:'var(--gold)', marginBottom:16 }}>OUR MANDATE</p>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,58px)', fontWeight:300, color:'var(--cream)', lineHeight:1.1, marginBottom:24 }}>
            The leaves of the tree<br/>are for the healing of the nations.
          </h1>
          <p style={{ fontSize:14, color:'var(--gold)', fontWeight:600, letterSpacing:2 }}>REVELATION 22:2</p>
        </div>
      </div>

      <div className="container" style={{ padding:'64px 24px 80px' }}>

        {/* Story */}
        <div style={{ maxWidth:680, margin:'0 auto 72px' }}>
          <p className="section-eyebrow">THE STORY</p>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(26px,4vw,40px)', fontWeight:600, color:'var(--green)', marginBottom:24, lineHeight:1.15 }}>
            Built for the household searching at 2am
          </h2>
          <p style={{ fontSize:16, color:'var(--muted)', lineHeight:1.85, marginBottom:20 }}>
            RestoRuh began with a child's skin. Months of inflammation, sleepless nights, every topical product tried
            and none of them working. The pediatrician said to wait it out. We did not.
          </p>
          <p style={{ fontSize:16, color:'var(--muted)', lineHeight:1.85, marginBottom:20 }}>
            What followed was months of research  --  published studies, traditional herbalism, the nutritional science
            of the gut-skin connection. When we brewed elderberry, stinging nettle, calendula, and ginger for our
            son at 7 months old, the scratching stopped within 24 hours. He slept through the night for the
            first time in weeks.
          </p>
          <p style={{ fontSize:16, color:'var(--muted)', lineHeight:1.85, marginBottom:20 }}>
            That is Little Leaf. That is RestoRuh. What God provides, we steward. What we learn, we share.
          </p>
          <p style={{ fontSize:16, color:'var(--muted)', lineHeight:1.85 }}>
            The mission is to make that knowledge accessible to every household  --  faith-rooted, evidence-backed,
            family-centered, and starting in your own pantry.
          </p>
        </div>

        <div className="leaf-rule" style={{ marginBottom:72 }}/>

        {/* Five pillars */}
        <p className="section-eyebrow text-center">WHAT WE STAND ON</p>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(24px,3vw,38px)', fontWeight:600, color:'var(--green)', textAlign:'center', marginBottom:48 }}>
          Five pillars of RestoRuh
        </h2>
        <div style={{ display:'grid', gap:20, gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', marginBottom:72 }}>
          {pillars.map(p => (
            <div key={p.label} style={{ padding:'28px 24px', borderRadius:16, background:'var(--paper)', border:'1.5px solid rgba(61,107,80,.1)' }}>
              <div style={{ fontSize:32, marginBottom:14 }}>{p.icon}</div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:19, fontWeight:600, color:'var(--green)', marginBottom:10 }}>{p.label}</h3>
              <p style={{ fontSize:14, color:'var(--muted)', lineHeight:1.65 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background:'var(--green)', borderRadius:24, padding:'48px 40px', textAlign:'center' }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(24px,3vw,36px)', fontWeight:600, color:'var(--cream)', marginBottom:12 }}>
            Start with the Directory
          </h2>
          <p style={{ color:'var(--sage)', fontSize:16, lineHeight:1.7, maxWidth:480, margin:'0 auto 32px' }}>
            The research platform is free, always. Explore 65+ herbs, 11 body systems, and a complete family wellness plan.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/directory" className="btn-gold">Explore the Directory</Link>
            <Link to="/shop" className="btn-ghost">Shop All Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
