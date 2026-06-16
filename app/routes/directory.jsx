/* ============================================================
   FILE: app/routes/directory.jsx  -- FINAL
   - Email gate with animated unlock transition
   - Static import of Directory component
   - Cookie-based access persistence
   - No em dashes
   ============================================================ */
import { Link, Form, useActionData, useNavigation, useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';
import Directory from '../components/Directory';

export const meta = () => [
  { title: 'The RestoRuh Directory -- Faith-Based Wellness Research' },
  { name: 'description', content: 'Faith-based wellness research platform. Subscribe free to access 65+ herbs, 11 body systems, family plans, and more.' },
];

export async function loader({ request }) {
  const cookie    = request.headers.get('Cookie') ?? '';
  const hasAccess = cookie.includes('ruh_dir=1');
  return { hasAccess };
}

export async function action({ request, context }) {
  const formData = await request.formData();
  const email    = String(formData.get('email') ?? '').trim();

  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address.' };
  }

  try {
    const result = await context.storefront.mutate(SUBSCRIBE_MUTATION, {
      variables: {
        input: {
          email,
          acceptsMarketing: true,
          password: `RUH${Math.random().toString(36).slice(2, 10).toUpperCase()}!`,
        },
      },
    });
    const errors = result?.customerCreate?.customerUserErrors ?? [];
    const isOk   = errors.length === 0 || errors.some(e => e.code === 'TAKEN');
    if (!isOk) return { error: 'Something went wrong. Please try again.' };

    // Return success data AND set the access cookie
    const { data } = await import('react-router');
    return data(
      { subscribed: true },
      { headers: { 'Set-Cookie': 'ruh_dir=1; Path=/; Max-Age=31536000; SameSite=Lax' } }
    );
  } catch {
    return { error: 'Unable to subscribe right now. Please try again.' };
  }
}

/* ---- EMAIL GATE ------------------------------------------ */
function EmailGate({ onUnlocked }) {
  const actionData = useActionData();
  const navigation = useNavigation();
  const submitting = navigation.state === 'submitting';
  const [animating, setAnimating] = useState(false);

  // When subscribed, trigger the animated transition
  useEffect(() => {
    if (actionData?.subscribed) {
      setAnimating(true);
      // After animation completes, reveal directory
      setTimeout(() => onUnlocked(), 2200);
    }
  }, [actionData?.subscribed]);

  if (animating) {
    return <UnlockAnimation />;
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header preview */}
      <div style={{ background: 'var(--green-deep)', padding: '60px 24px 52px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <img src="/images/restoruh-logo.png" alt="RestoRuh"
            style={{ width: 60, height: 60, objectFit: 'contain', margin: '0 auto 18px', filter: 'brightness(0) invert(1)', opacity: .7 }}/>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'var(--gold)', marginBottom: 14 }}>
            FREE RESEARCH PLATFORM
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,5vw,54px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.08, marginBottom: 16 }}>
            The RestoRuh Directory
          </h1>
          <p style={{ fontSize: 15, color: 'var(--sage)', lineHeight: 1.75, maxWidth: 500, margin: '0 auto 10px' }}>
            Faith-based wellness research covering 65+ herbs, 11 body systems, family protocols, and more.
            Free to access. Subscribe to enter and stay in the loop.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(201,162,74,.7)', fontStyle: 'italic' }}>
            Revelation 22:2 -- the leaves of the tree are for the healing of the nations.
          </p>
        </div>
      </div>

      {/* Section preview */}
      <div className="container" style={{ padding: '44px 24px 0' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: 'var(--gold)', marginBottom: 20, textAlign: 'center' }}>
          INSIDE THE DIRECTORY
        </p>
        <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(230px,1fr))', marginBottom: 44 }}>
          {SECTIONS.map(s => (
            <div key={s.label} style={{ padding: '16px 14px', borderRadius: 12, background: 'var(--paper)', border: '1.5px solid rgba(61,107,80,.1)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{s.icon}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--green)', marginBottom: 2 }}>{s.label}</p>
                <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email gate card */}
      <div style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 500, margin: '0 auto', background: 'var(--green)', borderRadius: 20, padding: '36px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 30, marginBottom: 14 }}>🔓</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 600, color: 'var(--cream)', marginBottom: 10 }}>
            Unlock free access
          </h2>
          <p style={{ fontSize: 14, color: 'var(--sage)', lineHeight: 1.7, marginBottom: 24 }}>
            Enter your email to unlock the full directory. You will be the first to know when new research, herbs, and products are added.
          </p>
          <Form method="post" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" name="email" required placeholder="your@email.com"
              style={{ flex: '1 1 200px', padding: '13px 18px', borderRadius: 999, border: '1.5px solid rgba(201,162,74,.3)', background: 'rgba(255,255,255,.1)', color: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none' }}/>
            <button type="submit" className="btn-gold" disabled={submitting} style={{ flexShrink: 0, fontSize: 14 }}>
              {submitting ? 'Unlocking...' : 'Unlock the Directory'}
            </button>
          </Form>
          {actionData?.error && (
            <p style={{ marginTop: 10, fontSize: 12, color: '#f9c0c0' }}>{actionData.error}</p>
          )}
          <p style={{ marginTop: 14, fontSize: 11, color: 'rgba(138,166,148,.7)' }}>
            Free forever. No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---- ANIMATED UNLOCK TRANSITION -------------------------- */
function UnlockAnimation() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);   // leaves start rising
    const t2 = setTimeout(() => setPhase(2), 900);   // text fades in
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes rise { from { opacity:0; transform:translateY(40px) scale(.8); } to { opacity:1; transform:none; } }
        @keyframes floatLeaf { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-12px) rotate(8deg);} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:none;} }
        @keyframes glow { 0%,100%{opacity:.5;} 50%{opacity:1;} }
        .unlock-leaf { animation: floatLeaf 2s ease-in-out infinite; }
      `}</style>
      <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'var(--green-deep)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>

        {/* Botanical leaves rising */}
        <div style={{ position: 'relative', width: 120, height: 120 }}>
          {['2.4s', '1.8s', '2.8s', '2.1s', '2.6s'].map((dur, i) => (
            <span key={i} className="unlock-leaf" style={{
              position: 'absolute',
              fontSize: [28,22,32,20,26][i],
              left: ['50%','20%','70%','10%','80%'][i],
              top: ['0%','30%','20%','60%','50%'][i],
              transform: 'translate(-50%,-50%)',
              animationDelay: `${i * 0.15}s`,
              animationDuration: dur,
              opacity: phase >= 1 ? 1 : 0,
              transition: 'opacity .5s ease',
            }}>🌿</span>
          ))}
          <img
            src="/images/restoruh-logo.png"
            alt="RestoRuh"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: phase >= 1 ? .9 : 0, transition: 'opacity .6s ease', animation: 'glow 2s ease-in-out infinite' }}
          />
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center', opacity: phase >= 2 ? 1 : 0, transition: 'opacity .6s ease', animation: phase >= 2 ? 'fadeIn .6s ease both' : 'none' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'var(--gold)', marginBottom: 12 }}>WELCOME</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,4vw,36px)', color: 'var(--cream)', fontWeight: 300, lineHeight: 1.2 }}>
            Entering the Directory
          </p>
          <p style={{ fontSize: 13, color: 'var(--sage)', marginTop: 10, fontStyle: 'italic' }}>
            The leaves of the tree are for the healing of the nations.
          </p>
        </div>

        {/* Leaf rule pulse */}
        <div style={{ width: 160, height: 1, background: 'linear-gradient(90deg,transparent,var(--gold),transparent)', opacity: phase >= 2 ? 1 : 0, transition: 'opacity .8s ease' }}/>
      </div>
    </>
  );
}

/* ---- PAGE EXPORT ----------------------------------------- */
export default function DirectoryPage() {
  const { hasAccess }   = useLoaderData();
  const [entered, setEntered] = useState(hasAccess);

  // If they return with cookie, show directory immediately with a subtle fade
  if (entered) {
    return (
      <>
        <style>{`@keyframes directoryFadeIn{from{opacity:0;}to{opacity:1;}} .dir-root{animation:directoryFadeIn .8s ease both;}`}</style>
        <div className="dir-root"><Directory /></div>
      </>
    );
  }

  return <EmailGate onUnlocked={() => setEntered(true)} />;
}

/* ---- SECTIONS DATA --------------------------------------- */
const SECTIONS = [
  { icon: '🌱', label: 'Wellness Guide',          sub: 'Symptom navigator for the whole family' },
  { icon: '🌿', label: 'Herb Library',             sub: '65+ herbs with evidence and safety ratings' },
  { icon: '🫀', label: '11 Body Systems',           sub: 'Gut, immune, nervous, endocrine, and more' },
  { icon: '👨‍👩‍👧‍👦', label: 'Family Wellness Plan',     sub: 'Week by week research protocols' },
  { icon: '🧬', label: 'Gut Health Deep Dive',      sub: 'Microbiome, leaky gut, pre/pro/postbiotics' },
  { icon: '💧', label: 'Toxicity and Detox',        sub: 'Viral overload, heavy metals guidance' },
  { icon: '✨', label: 'Hair and Skin',              sub: 'Inside out -- gut recipes and nutrients' },
  { icon: '🦷', label: 'Oral Health',               sub: 'Oil pulling, remineralization, microbiome' },
  { icon: '🏕️', label: 'Preparedness',              sub: 'Herb kits, hydroponics, seed saving' },
  { icon: '💊', label: 'Nutrients and Deficiencies', sub: 'Iron, B12, zinc, magnesium, vitamin D' },
  { icon: '🧒', label: 'For Little Ones',           sub: 'Safe herbs for infants 7 months and up' },
  { icon: '📖', label: 'Healing Scriptures',        sub: 'The Word as foundation for wellness' },
];

/* ---- GRAPHQL --------------------------------------------- */
const SUBSCRIBE_MUTATION = `#graphql
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email }
      customerUserErrors { code field message }
    }
  }
`;
