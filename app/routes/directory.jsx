/* ============================================================
   FILE: app/routes/directory.jsx  -- v3
   FIXED: removed dynamic import that broke the build
   ADDED: email gate -- must subscribe to browse
   No em dashes anywhere in this file
   ============================================================ */
import { Link, Form, useActionData, useNavigation } from 'react-router';
import { useState } from 'react';

export const meta = () => [
  { title: 'The RestoRuh Directory -- Faith-Based Wellness Research' },
  { name: 'description', content: 'Faith-based wellness research platform. Subscribe free to access 65+ herbs, 11 body systems, family plans, and more.' },
];

export async function loader({ request, context }) {
  // Check if user has already subscribed (cookie-based gate)
  const cookie = request.headers.get('Cookie') ?? '';
  const hasAccess = cookie.includes('ruh_dir=1');
  return { hasAccess };
}

// Server action -- subscribes email and grants directory access via cookie
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
    // TAKEN means already a subscriber -- still grant access
    const isOk   = errors.length === 0 || errors.some(e => e.code === 'TAKEN');

    if (!isOk) {
      return { error: 'Something went wrong. Please try again.' };
    }

    // Set cookie and redirect to directory with access
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/directory',
        'Set-Cookie': 'ruh_dir=1; Path=/; Max-Age=31536000; SameSite=Lax',
      },
    });
  } catch (e) {
    return { error: 'Unable to subscribe right now. Please try again.' };
  }
}

/* ---- SECTIONS DATA --------------------------------------- */
const SECTIONS = [
  { icon: '🌱', label: 'Wellness Guide',          sub: 'Symptom navigator -- find the right protocol for you' },
  { icon: '🌿', label: 'Herb Library',             sub: '65+ herbs with evidence ratings, tiers, and safety notes' },
  { icon: '🫀', label: '11 Body Systems',           sub: 'Gut, immune, nervous, endocrine, cardiovascular and more' },
  { icon: '👨‍👩‍👧‍👦', label: 'Family Wellness Plan',     sub: 'Week by week research protocols for the whole household' },
  { icon: '🧬', label: 'Gut Health Deep Dive',      sub: 'Microbiome, leaky gut, pre/pro/postbiotics, SIBO' },
  { icon: '💧', label: 'Toxicity and Detox',        sub: 'Viral overload, heavy metals, copper, and mercury guidance' },
  { icon: '✨', label: 'Hair and Skin',              sub: 'From the inside -- gut recipes and nutrient protocols' },
  { icon: '🦷', label: 'Oral Health',               sub: 'Oil pulling, remineralization, microbiome balance' },
  { icon: '🏕️', label: 'Preparedness',              sub: 'Herb kits, Kratky hydroponics, seed saving' },
  { icon: '💊', label: 'Nutrients and Deficiencies', sub: 'Iron, B12, zinc, magnesium, vitamin D and more' },
  { icon: '🧒', label: 'For Little Ones',           sub: 'Safe herbs and dosing for infants 7 months and up' },
  { icon: '📖', label: 'Healing Scriptures',        sub: 'The Word as foundation for every wellness protocol' },
];

/* ---- EMAIL GATE ------------------------------------------ */
function EmailGate() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const submitting = navigation.state === 'submitting';

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: 'var(--green-deep)', padding: '64px 24px 56px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <img
            src="/images/restoruh-logo.png"
            alt="RestoRuh"
            style={{ width: 64, height: 64, objectFit: 'contain', margin: '0 auto 20px', filter: 'brightness(0) invert(1)', opacity: .7 }}
          />
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'var(--gold)', marginBottom: 14 }}>FREE RESEARCH PLATFORM</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,5vw,54px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.08, marginBottom: 18 }}>
            The RestoRuh Directory
          </h1>
          <p style={{ fontSize: 16, color: 'var(--sage)', lineHeight: 1.75, maxWidth: 500, margin: '0 auto 12px' }}>
            Faith-based wellness research covering 65+ herbs, 11 body systems, family protocols, and more.
            Free to access. Just tell us where to send updates.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(201,162,74,.75)', fontStyle: 'italic' }}>
            Revelation 22:2 -- the leaves of the tree are for the healing of the nations.
          </p>
        </div>
      </div>

      {/* Preview of what is inside -- shown to everyone */}
      <div className="container" style={{ padding: '48px 24px 0' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: 'var(--gold)', marginBottom: 24, textAlign: 'center' }}>
          INSIDE THE DIRECTORY
        </p>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', marginBottom: 48 }}>
          {SECTIONS.map(s => (
            <div key={s.label} style={{
              padding: '18px 16px', borderRadius: 12,
              background: 'var(--paper)',
              border: '1.5px solid rgba(61,107,80,.1)',
              display: 'flex', gap: 12, alignItems: 'flex-start',
              filter: 'blur(0)',
            }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{s.icon}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--green)', marginBottom: 2 }}>{s.label}</p>
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email gate */}
      <div style={{ padding: '0 24px 80px' }}>
        <div style={{
          maxWidth: 520, margin: '0 auto',
          background: 'var(--green)', borderRadius: 20,
          padding: '40px 36px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🔓</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,30px)', fontWeight: 600, color: 'var(--cream)', marginBottom: 10 }}>
            Get free access
          </h2>
          <p style={{ fontSize: 14, color: 'var(--sage)', lineHeight: 1.7, marginBottom: 28 }}>
            Subscribe with your email to unlock the full directory. You will be the first to know when
            new research, herbs, and products are added.
          </p>

          <Form method="post" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email" name="email" required
              placeholder="your@email.com"
              style={{
                flex: '1 1 220px', padding: '13px 20px',
                borderRadius: 999, border: '1.5px solid rgba(201,162,74,.3)',
                background: 'rgba(255,255,255,.1)', color: 'var(--cream)',
                fontFamily: 'var(--font-body)', fontSize: 15, outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn-gold"
              disabled={submitting}
              style={{ flexShrink: 0 }}
            >
              {submitting ? 'Unlocking...' : 'Unlock the Directory'}
            </button>
          </Form>

          {actionData?.error && (
            <p style={{ marginTop: 12, fontSize: 13, color: '#f9c0c0' }}>{actionData.error}</p>
          )}

          <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(138,166,148,.7)' }}>
            Free forever. No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---- DIRECTORY CONTENT (shown after subscribing) --------- */
function DirectoryContent() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh' }}>
      <div style={{ background: 'var(--green-deep)', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <img src="/images/restoruh-logo.png" alt="RestoRuh"
            style={{ width: 56, height: 56, objectFit: 'contain', margin: '0 auto 16px', filter: 'brightness(0) invert(1)', opacity: .7 }}/>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, color: 'var(--gold)', marginBottom: 12 }}>WELCOME TO THE DIRECTORY</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,50px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1, marginBottom: 16 }}>
            The RestoRuh Research Directory
          </h1>
          <p style={{ fontSize: 15, color: 'var(--sage)', lineHeight: 1.7 }}>
            Revelation 22:2 -- the leaves of the tree are for the healing of the nations.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '56px 24px 80px' }}>
        <p className="section-eyebrow text-center">EXPLORE THE DIRECTORY</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,36px)', fontWeight: 600, color: 'var(--green)', textAlign: 'center', marginBottom: 40 }}>
          Where would you like to start?
        </h2>

        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', marginBottom: 56 }}>
          {SECTIONS.map(s => (
            <div key={s.label} className="card-lift" style={{
              padding: '24px 20px', borderRadius: 14,
              background: 'var(--paper)', border: '1.5px solid rgba(61,107,80,.1)',
              cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: 26, flexShrink: 0 }}>{s.icon}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--green)', marginBottom: 4 }}>{s.label}</h3>
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55 }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Balance philosophy note */}
        <div style={{ background: 'rgba(201,162,74,.1)', borderLeft: '3px solid var(--gold)', borderRadius: 12, padding: '20px 24px', maxWidth: 640, margin: '0 auto 48px' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, color: 'var(--green)', lineHeight: 1.7 }}>
            "Heal your gut and you can eat just about anything. Everything in moderation.
            Everything that creates balance is good, and balance is what we were made for."
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 20 }}>
            The full interactive directory is being integrated. Each section will launch as a live tool shortly.
          </p>
          <Link to="/shop" className="btn-gold" style={{ marginRight: 12 }}>Shop Products</Link>
          <Link to="/about" className="btn-ghost">Our Story</Link>
        </div>
      </div>
    </div>
  );
}

/* ---- PAGE EXPORT ----------------------------------------- */
import { useLoaderData } from 'react-router';

export default function DirectoryPage() {
  const { hasAccess } = useLoaderData();
  return hasAccess ? <DirectoryContent /> : <EmailGate />;
}

/* ---- GRAPHQL --------------------------------------------- */
const SUBSCRIBE_MUTATION = `#graphql
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email }
      customerUserErrors { code field message }
    }
  }
`;
