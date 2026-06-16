/* ============================================================
   FILE: app/routes/directory.jsx  -- SINGLE ROUTE (no layout)
   Handles /directory (home). Gate + sub-nav built in.
   No Outlet. No layout nesting. Root.jsx handles header/footer.
   ============================================================ */
import { Form, Link, useActionData, useNavigation, useLoaderData, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import Directory from '../components/Directory';

export const meta = () => [
  { title: 'The RestoRuh Directory' },
  { name: 'description', content: 'Faith-based wellness research. 65+ herbs, 11 body systems, family wellness plans.' },
];

export async function loader({ request }) {
  const cookie = request.headers.get('Cookie') ?? '';
  return { hasAccess: cookie.includes('ruh_dir=1') };
}

export async function action({ request, context }) {
  const formData = await request.formData();
  const email    = String(formData.get('email') ?? '').trim();
  if (!email || !email.includes('@')) return { error: 'Please enter a valid email address.' };
  try {
    const result = await context.storefront.mutate(SUBSCRIBE_MUTATION, {
      variables: { input: { email, acceptsMarketing: true,
        password: `RUH${Math.random().toString(36).slice(2, 10).toUpperCase()}!` } },
    });
    const errors = result?.customerCreate?.customerUserErrors ?? [];
    if (errors.length > 0 && !errors.some(e => e.code === 'TAKEN')) return { error: 'Something went wrong.' };
    return new Response(JSON.stringify({ subscribed: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json',
        'Set-Cookie': 'ruh_dir=1; Path=/; Max-Age=31536000; SameSite=Lax' },
    });
  } catch { return { error: 'Unable to subscribe right now.' }; }
}

export default function DirectoryPage() {
  const { hasAccess }     = useLoaderData();
  const actionData        = useActionData();
  const navigation        = useNavigation();
  const [entered, setEntered] = useState(hasAccess);
  const [animating, setAnimating] = useState(false);
  const submitting = navigation.state === 'submitting';

  useEffect(() => {
    if (actionData?.subscribed) { setAnimating(true); setTimeout(() => setEntered(true), 2400); }
  }, [actionData?.subscribed]);

  if (animating && !entered) return <UnlockAnimation />;

  if (!entered) return (
    <EmailGate submitting={submitting} error={actionData?.error} />
  );

  return (
    <>
      <DirectorySubNav />
      <Directory initialSection="home" />
    </>
  );
}

/* ---- SUBSCRIPTION GRAPHQL --------------------------------- */
const SUBSCRIBE_MUTATION = `#graphql
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email }
      customerUserErrors { code field message }
    }
  }
`;

/* ---- DIRECTORY SUB-NAV ------------------------------------ */
export const DIR_CATS = [
  { id:'explore', label:'Explore', items:[
    { label:'Wellness Areas',      to:'/directory' },
    { label:'Body Systems',        to:'/directory/systems' },
    { label:'Gut Health',          to:'/directory/gut-health' },
    { label:'Oral Health',         to:'/directory/oral-health' },
    { label:'Viral and Toxicity',  to:'/directory/toxicity' },
    { label:'Ailments',            to:'/directory/ailments' },
  ]},
  { id:'herbs', label:'Herbs', items:[
    { label:'Herb Library',        to:'/directory/herbs' },
    { label:'Cleansing',           to:'/directory/cleansing' },
    { label:'Nutrients',           to:'/directory/nutrients' },
  ]},
  { id:'plan', label:'My Plan', items:[
    { label:'Family Plan',         to:'/directory/family-plan' },
    { label:'Nutrition',           to:'/directory/nutrition' },
    { label:'Movement',            to:'/directory/movement' },
    { label:'Are You Prepared',    to:'/directory/prepared' },
  ]},
];

export function DirectorySubNav() {
  const location = useLocation();
  const [open, setOpen] = useState(null);

  useEffect(() => { setOpen(null); }, [location.pathname]);

  return (
    <>
      <style>{`.dir-dropdown-link:hover{background:rgba(245,240,227,.1)!important}`}</style>
      <div style={{
        position:'sticky', top:64, zIndex:28,
        background:'rgba(46,82,64,.98)',
        borderBottom:'1px solid rgba(201,162,74,.18)',
      }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 20px',
          display:'flex', alignItems:'center', gap:6, height:44, overflowX:'auto' }}>

          <Link to="/directory" style={{ flexShrink:0, fontSize:12, fontWeight:700,
            color:location.pathname==='/directory' ? 'var(--gold)' : 'var(--sage)',
            textDecoration:'none', marginRight:6 }}>Directory</Link>
          <span style={{ color:'rgba(138,166,148,.35)', fontSize:11 }}>/</span>

          {DIR_CATS.map(cat => {
            const isActive = cat.items.some(i =>
              i.to === location.pathname || location.pathname.startsWith(i.to + '/'));
            const isOpen   = open === cat.id;
            return (
              <div key={cat.id} style={{ position:'relative', flexShrink:0 }}>
                <button onClick={() => setOpen(isOpen ? null : cat.id)}
                  style={{ background: isOpen||isActive ? 'var(--gold)' : 'transparent',
                    color: isOpen||isActive ? '#1e3a2c' : 'var(--cream)',
                    border:'none', borderRadius:999, padding:'5px 14px',
                    fontSize:13, fontWeight:600, cursor:'pointer',
                    display:'flex', alignItems:'center', gap:4, whiteSpace:'nowrap' }}>
                  {cat.label}
                  <span style={{ fontSize:9, opacity:.7 }}>{isOpen ? '▲' : '▼'}</span>
                </button>

                {isOpen && (
                  <>
                    {/* click-outside overlay */}
                    <div onClick={() => setOpen(null)}
                      style={{ position:'fixed', inset:0, zIndex:40 }}/>
                    <div style={{
                      position:'absolute', top:'110%', left:0, zIndex:41,
                      background:'var(--green-deep)', border:'1px solid rgba(201,162,74,.2)',
                      borderRadius:12, padding:'6px 4px', minWidth:190,
                      boxShadow:'0 12px 32px rgba(0,0,0,.35)',
                    }}>
                      {cat.items.map(item => {
                        const active = location.pathname === item.to;
                        return (
                          <Link key={item.to} to={item.to}
                            className="dir-dropdown-link"
                            style={{ display:'block', padding:'8px 14px',
                              fontSize:13, fontWeight: active ? 700 : 400,
                              color: active ? 'var(--gold)' : 'var(--cream)',
                              textDecoration:'none', borderRadius:8,
                              background: active ? 'rgba(201,162,74,.12)' : 'transparent' }}>
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ---- UNLOCK ANIMATION ------------------------------------- */
function UnlockAnimation() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes ruh-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes ruh-glow  { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes ruh-slide { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
      `}</style>
      <div style={{ position:'fixed', inset:0, zIndex:9999, background:'var(--green-deep)',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:28 }}>
        <div style={{ position:'relative', width:90, height:90 }}>
          {['🌿','🌱','🍃','🌾'].map((e,i) => (
            <span key={i} style={{ position:'absolute', fontSize:[22,16,26,14][i],
              left:['50%','10%','80%','20%'][i], top:['0%','40%','20%','70%'][i],
              transform:'translate(-50%,-50%)',
              opacity: phase>=1 ? 1 : 0, transition:`opacity .4s ease ${i*.12}s`,
              animation: phase>=1 ? `ruh-float ${[2,1.7,2.3,1.9][i]}s ease-in-out infinite ${i*.18}s` : 'none' }}>{e}</span>
          ))}
          <img src="/images/restoruh-logo.png" alt="RestoRuh" style={{
            position:'absolute', inset:0, width:'100%', height:'100%',
            objectFit:'contain', filter:'brightness(0) invert(1)',
            opacity: phase>=1 ? .85 : 0, transition:'opacity .6s ease',
            animation: phase>=1 ? 'ruh-glow 2s ease-in-out infinite' : 'none' }}/>
        </div>
        <div style={{ textAlign:'center', opacity:phase>=2?1:0,
          animation:phase>=2?'ruh-slide .6s ease both':'none' }}>
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:'var(--gold)', marginBottom:10 }}>WELCOME</p>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'clamp(20px,4vw,30px)', color:'var(--cream)', fontWeight:300 }}>
            Entering the Directory
          </p>
          <p style={{ fontSize:12, color:'var(--sage)', marginTop:8, fontStyle:'italic' }}>
            The leaves of the tree are for the healing of the nations.
          </p>
        </div>
        <div style={{ width:120, height:1, background:'linear-gradient(90deg,transparent,var(--gold),transparent)',
          opacity:phase>=2?1:0, transition:'opacity .8s ease .3s' }}/>
      </div>
    </>
  );
}

/* ---- EMAIL GATE ------------------------------------------- */
const SECTIONS_PREVIEW = [
  ['🌱','Wellness Guide','Symptom navigator for the whole family'],
  ['🌿','Herb Library','65+ herbs with evidence and safety ratings'],
  ['🫀','11 Body Systems','Gut, immune, nervous, endocrine, and more'],
  ['👨‍👩‍👧‍👦','Family Wellness Plan','Week by week research protocols'],
  ['🧬','Gut Health Deep Dive','Microbiome, leaky gut, pre/pro/postbiotics'],
  ['💧','Toxicity and Detox','Viral overload, heavy metals guidance'],
  ['✨','Hair and Skin','Inside out -- gut recipes and nutrients'],
  ['🦷','Oral Health','Oil pulling, remineralization, microbiome'],
  ['🏕️','Preparedness','Herb kits, hydroponics, seed saving'],
  ['💊','Nutrients','Iron, B12, zinc, magnesium, vitamin D'],
  ['🧒','For Little Ones','Safe herbs for infants 7 months and up'],
  ['📖','Healing Scriptures','The Word as foundation for wellness'],
];

function EmailGate({ submitting, error }) {
  return (
    <div style={{ background:'var(--cream)', minHeight:'80vh' }}>
      <div style={{ background:'var(--green-deep)', padding:'60px 24px 48px' }}>
        <div style={{ maxWidth:660, margin:'0 auto', textAlign:'center' }}>
          <img src="/images/restoruh-logo.png" alt="RestoRuh"
            style={{ width:54, height:54, objectFit:'contain', margin:'0 auto 14px',
              filter:'brightness(0) invert(1)', opacity:.7 }}/>
          <p style={{ fontSize:11, fontWeight:700, letterSpacing:4, color:'var(--gold)', marginBottom:12 }}>
            FREE RESEARCH PLATFORM
          </p>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(26px,5vw,50px)',
            fontWeight:300, color:'var(--cream)', lineHeight:1.1, marginBottom:14 }}>
            The RestoRuh Directory
          </h1>
          <p style={{ fontSize:15, color:'var(--sage)', lineHeight:1.75, maxWidth:500, margin:'0 auto 10px' }}>
            Faith-based wellness research. Subscribe free to enter.
            Already subscribed? Enter the same email to go straight in.
          </p>
          <p style={{ fontSize:12, color:'rgba(201,162,74,.7)', fontStyle:'italic' }}>
            Revelation 22:2 -- the leaves of the tree are for the healing of the nations.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding:'32px 24px 0' }}>
        <p style={{ fontSize:11, fontWeight:700, letterSpacing:3, color:'var(--gold)', marginBottom:14, textAlign:'center' }}>
          INSIDE THE DIRECTORY
        </p>
        <div style={{ display:'grid', gap:8, gridTemplateColumns:'repeat(auto-fill, minmax(200px,1fr))', marginBottom:32 }}>
          {SECTIONS_PREVIEW.map(([icon,label,sub]) => (
            <div key={label} style={{ padding:'10px 12px', borderRadius:10, background:'var(--paper)',
              border:'1.5px solid rgba(61,107,80,.1)', display:'flex', gap:9, alignItems:'flex-start' }}>
              <span style={{ fontSize:15, flexShrink:0 }}>{icon}</span>
              <div>
                <p style={{ fontFamily:'var(--font-display)', fontSize:12, fontWeight:600,
                  color:'var(--green)', marginBottom:1 }}>{label}</p>
                <p style={{ fontSize:10, color:'var(--muted)', lineHeight:1.5 }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:'0 24px 64px' }}>
        <div style={{ maxWidth:460, margin:'0 auto', background:'var(--green)',
          borderRadius:20, padding:'28px 24px', textAlign:'center' }}>
          <div style={{ fontSize:26, marginBottom:10 }}>🔓</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(17px,3vw,24px)',
            fontWeight:600, color:'var(--cream)', marginBottom:8 }}>Unlock free access</h2>
          <p style={{ fontSize:13, color:'var(--sage)', lineHeight:1.7, marginBottom:18 }}>
            Enter your email to unlock the directory.
          </p>
          <Form method="post" style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center' }}>
            <input type="email" name="email" required placeholder="your@email.com"
              style={{ flex:'1 1 180px', padding:'11px 16px', borderRadius:999,
                border:'1.5px solid rgba(201,162,74,.3)', background:'rgba(255,255,255,.1)',
                color:'var(--cream)', fontFamily:'var(--font-body)', fontSize:14, outline:'none' }}/>
            <button type="submit" className="btn-gold" disabled={submitting} style={{ flexShrink:0, fontSize:13 }}>
              {submitting ? 'Unlocking...' : 'Unlock'}
            </button>
          </Form>
          {error && <p style={{ marginTop:8, fontSize:12, color:'#f9c0c0' }}>{error}</p>}
          <p style={{ marginTop:10, fontSize:11, color:'rgba(138,166,148,.7)' }}>
            Free forever. No spam.
          </p>
        </div>
      </div>
    </div>
  );
}
