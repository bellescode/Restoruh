/* ============================================================
   FILE: app/routes/directory.jsx -- FINAL v2
   - Static import of Directory component
   - Email gate with animated unlock transition
   - Cookie-based access persistence
   - No em dashes, no browser-only storage
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
    if (!isOk) {
      return new Response(
        JSON.stringify({ error: 'Something went wrong. Please try again.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Set cookie and return success -- client handles the animation
    return new Response(
      JSON.stringify({ subscribed: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'ruh_dir=1; Path=/; Max-Age=31536000; SameSite=Lax',
        },
      }
    );
  } catch {
    return { error: 'Unable to subscribe right now. Please try again.' };
  }
}

/* ---- UNLOCK ANIMATION ------------------------------------ */
function UnlockAnimation({ onDone }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 700);
    const t3 = setTimeout(() => onDone(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes riseLeaf  { from{opacity:0;transform:translateY(30px) scale(.7)} to{opacity:1;transform:none} }
        @keyframes floatRuh  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes glowPulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
      `}</style>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'var(--green-deep)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 28,
      }}>
        {/* Floating botanical emojis */}
        <div style={{ position: 'relative', width: 100, height: 100 }}>
          {['🌿','🌱','🍃','🌾','🌿'].map((emoji, i) => (
            <span key={i} style={{
              position: 'absolute',
              fontSize: [24,18,28,16,22][i],
              left: ['50%','15%','75%','5%','85%'][i],
              top: ['5%','35%','20%','65%','55%'][i],
              transform: 'translate(-50%,-50%)',
              opacity: phase >= 1 ? 1 : 0,
              transition: `opacity .4s ease ${i * 0.1}s`,
              animation: phase >= 1 ? `floatRuh ${[2.2,1.8,2.5,2.0,2.3][i]}s ease-in-out infinite ${i*0.2}s` : 'none',
            }}>{emoji}</span>
          ))}
          {/* Logo mark */}
          <img src="/images/restoruh-logo.png" alt="RestoRuh" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
            opacity: phase >= 1 ? .85 : 0,
            transition: 'opacity .6s ease',
            animation: phase >= 1 ? 'glowPulse 2s ease-in-out infinite' : 'none',
          }}/>
        </div>

        {/* Text */}
        <div style={{
          textAlign: 'center',
          opacity: phase >= 2 ? 1 : 0,
          animation: phase >= 2 ? 'fadeSlide .6s ease both' : 'none',
        }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 4, color: 'var(--gold)', marginBottom: 10 }}>
            WELCOME
          </p>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px,4vw,32px)',
            color: 'var(--cream)', fontWeight: 300, lineHeight: 1.2,
          }}>
            Entering the Directory
          </p>
          <p style={{ fontSize: 13, color: 'var(--sage)', marginTop: 10, fontStyle: 'italic' }}>
            The leaves of the tree are for the healing of the nations.
          </p>
        </div>

        {/* Gold line */}
        <div style={{
          width: 140, height: 1,
          background: 'linear-gradient(90deg,transparent,var(--gold),transparent)',
          opacity: phase >= 2 ? 1 : 0,
          transition: 'opacity .8s ease .3s',
        }}/>
      </div>
    </>
  );
}

/* ---- EMAIL GATE ------------------------------------------ */
function EmailGate({ onUnlocked }) {
  const actionData = useActionData();
  const navigation = useNavigation();
  const submitting = navigation.state === 'submitting';
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (actionData?.subscribed) {
      setAnimating(true);
    }
  }, [actionData?.subscribed]);

  if (animating) {
    return <UnlockAnimation onDone={onUnlocked} />;
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh' }}>
      {/* Hero */}
      <div style={{ background: 'var(--green-deep)', padding: '60px 24px 52px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <img src="/images/restoruh-logo.png" alt="RestoRuh" style={{ width: 58, height: 58, objectFit: 'contain', margin: '0 auto 18px', filter: 'brightness(0) invert(1)', opacity: .7 }}/>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'var(--gold)', marginBottom: 14 }}>FREE RESEARCH PLATFORM</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,5vw,52px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1, marginBottom: 16 }}>
            The RestoRuh Directory
          </h1>
          <p style={{ fontSize: 15, color: 'var(--sage)', lineHeight: 1.75, maxWidth: 500, margin: '0 auto 10px' }}>
            Faith-based wellness research covering 65+ herbs, 11 body systems, family protocols, and more.
            Subscribe free to enter.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(201,162,74,.7)', fontStyle: 'italic' }}>
            Revelation 22:2 -- the leaves of the tree are for the healing of the nations.
          </p>
        </div>
      </div>

      {/* Sections preview */}
      <div className="container" style={{ padding: '40px 24px 0' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: 'var(--gold)', marginBottom: 18, textAlign: 'center' }}>INSIDE THE DIRECTORY</p>
        <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', marginBottom: 40 }}>
          {SECTIONS.map(s => (
            <div key={s.label} style={{ padding: '14px 12px', borderRadius: 12, background: 'var(--paper)', border: '1.5px solid rgba(61,107,80,.1)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 17, flexShrink: 0 }}>{s.icon}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--green)', marginBottom: 2 }}>{s.label}</p>
                <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gate */}
      <div style={{ padding: '0 24px 72px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', background: 'var(--green)', borderRadius: 20, padding: '32px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🔓</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,3vw,26px)', fontWeight: 600, color: 'var(--cream)', marginBottom: 10 }}>
            Unlock free access
          </h2>
          <p style={{ fontSize: 13, color: 'var(--sage)', lineHeight: 1.7, marginBottom: 22 }}>
            Enter your email to unlock the full directory and stay informed when new research and products launch.
            Already subscribed? Just enter the same email -- you will go straight in.
          </p>
          <Form method="post" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" name="email" required placeholder="your@email.com"
              style={{ flex: '1 1 190px', padding: '12px 16px', borderRadius: 999, border: '1.5px solid rgba(201,162,74,.3)', background: 'rgba(255,255,255,.1)', color: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none' }}/>
            <button type="submit" className="btn-gold" disabled={submitting} style={{ flexShrink: 0, fontSize: 13 }}>
              {submitting ? 'Unlocking...' : 'Unlock the Directory'}
            </button>
          </Form>
          {actionData?.error && (
            <p style={{ marginTop: 10, fontSize: 12, color: '#f9c0c0' }}>{actionData.error}</p>
          )}
          <p style={{ marginTop: 12, fontSize: 11, color: 'rgba(138,166,148,.7)' }}>
            Free forever. No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---- PAGE EXPORT ----------------------------------------- */
export default function DirectoryPage() {
  const { hasAccess }     = useLoaderData();
  const [entered, setEntered] = useState(hasAccess);

  if (entered) {
    return (
      <>
        <style>{`.dir-fade-in{animation:dirFade .7s ease both;} @keyframes dirFade{from{opacity:0;}to{opacity:1;}}`}</style>
        <div className="dir-fade-in"><Directory /></div>
      </>
    );
  }

  return <EmailGate onUnlocked={() => setEntered(true)} />;
}

/* ---- SECTION PREVIEW DATA -------------------------------- */
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
