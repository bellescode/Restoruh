/* ============================================================
   FILE: app/routes/directory.jsx
   Directory landing page — full research platform
   ============================================================ */
export const meta = () => [
  { title: 'The RestoRuh Directory — Faith-Based Wellness Research' },
  { name: 'description', content: 'Free faith-based wellness research platform. 65+ herbs, 11 body systems, family plans, and more.' },
];

// No loader needed — this is a client-rendered page
export default function DirectoryPage() {
  const sections = [
    { icon: '🌿', label: 'Herb Library',       sub: '65+ herbs with evidence ratings and safety notes' },
    { icon: '🫀', label: '11 Body Systems',     sub: 'Gut, immune, nervous, endocrine, and more' },
    { icon: '👨‍👩‍👧‍👦', label: 'Family Plan',         sub: 'Week by week research protocol for the whole household' },
    { icon: '🧬', label: 'Gut Health Deep Dive',sub: 'Microbiome, leaky gut, pre/pro/postbiotics' },
    { icon: '💧', label: 'Toxicity & Detox',    sub: 'Viral overload, heavy metals, copper, mercury' },
    { icon: '✨', label: 'Hair & Skin',          sub: 'From the inside — gut recipes and nutrient protocols' },
    { icon: '🦷', label: 'Oral Health',          sub: 'Oil pulling, remineralization, microbiome' },
    { icon: '🏕️', label: 'Preparedness',         sub: 'Herb kits, Kratky hydroponics, seed saving' },
    { icon: '📖', label: 'Healing Scriptures',   sub: 'The Word as foundation for every protocol' },
  ];

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh' }}>

      {/* Hero */}
      <div style={{ background: 'var(--green-deep)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <img
            src="/images/restoruh-logo.png"
            alt="RestoRuh"
            style={{ width: 72, height: 72, objectFit: 'contain', margin: '0 auto 24px', filter: 'brightness(0) invert(1)', opacity: .7 }}
          />
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'var(--gold)', marginBottom: 16 }}>
            FREE RESEARCH PLATFORM
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,60px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1, marginBottom: 20 }}>
            The RestoRuh Directory
          </h1>
          <p style={{ fontSize: 18, color: 'var(--sage)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 36px' }}>
            Faith-based wellness research. Published studies, tested tradition,
            and practical guidance for every household. Completely free.
          </p>
          <p style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600, letterSpacing: 1 }}>
            REVELATION 22:2 — "The leaves of the tree are for the healing of the nations."
          </p>
        </div>
      </div>

      {/* What's inside */}
      <div className="container" style={{ padding: '64px 24px 80px' }}>
        <p className="section-eyebrow text-center">WHAT IS IN THE DIRECTORY</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 600, color: 'var(--green)', textAlign: 'center', marginBottom: 48 }}>
          Everything your household needs to know
        </h2>

        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', marginBottom: 56 }}>
          {sections.map(s => (
            <div
              key={s.label}
              style={{
                padding: '28px 24px',
                borderRadius: 16,
                background: 'var(--paper)',
                border: '1.5px solid rgba(61,107,80,.1)',
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
              }}
            >
              <span style={{ fontSize: 28, flexShrink: 0 }}>{s.icon}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--green)', marginBottom: 4 }}>{s.label}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Launch button — links to the full interactive directory */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://restoruh-c.myshopify.dev/pages/directory"
            className="btn-gold"
            style={{ fontSize: 16, padding: '16px 40px' }}
          >
            Launch the Full Directory
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 12 }}>
            Always free. No account required to browse.
          </p>
        </div>
      </div>
    </div>
  );
}
