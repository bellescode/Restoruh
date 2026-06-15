/* ============================================================
   FILE: app/routes/_index.jsx
   Replace entire contents of app/routes/_index.jsx with this.
   Fixed: removed @shopify/remix-oxygen and @remix-run/react
   Uses only react-router and @shopify/hydrogen
   ============================================================ */

import { useLoaderData, Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { useState } from 'react';

export const meta = () => [
  { title: 'RestoRuh | Healing for the Nations' },
  {
    name: 'description',
    content:
      'Organic loose leaf teas and herbal blends rooted in Revelation 22:2. Whole plant wellness for your household.',
  },
];

export async function loader({ context }) {
  const { storefront } = context;
  const [teas, blends] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: { handle: 'teas', first: 6 },
    }),
    storefront.query(COLLECTION_QUERY, {
      variables: { handle: 'blends', first: 5 },
    }),
  ]);
  return { teas, blends };
}

/* --- HERO ------------------------------------------------- */
function Hero() {
  return (
    <section className="hero">
      <svg className="hero-leaf-bg" viewBox="0 0 200 200" fill="none">
        <path d="M100 10 Q130 50 100 90 Q70 50 100 10Z"      fill="#c9a24a" />
        <path d="M100 40 Q140 80 100 120 Q60 80 100 40Z"     fill="#c9a24a" />
        <path d="M100 70 Q150 110 100 150 Q50 110 100 70Z"   fill="#c9a24a" />
        <path d="M100 100 Q155 140 100 180 Q45 140 100 100Z" fill="#c9a24a" />
        <line x1="100" y1="10" x2="100" y2="195" stroke="#c9a24a" strokeWidth="1.5" />
        <path d="M60 10 Q90 50 60 90 Q30 50 60 10Z"        fill="#c9a24a" opacity=".5" />
        <path d="M140 30 Q170 70 140 110 Q110 70 140 30Z"  fill="#c9a24a" opacity=".5" />
      </svg>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <p className="hero-eyebrow fade-up">REVELATION 22:2</p>
        <h1 className="hero-headline fade-up-1">
          The leaves were always
          <br />
          <em>for your healing.</em>
        </h1>
        <p className="hero-sub fade-up-2">
          Curated loose leaf teas, powdered herbal blends, and the most
          comprehensive faith-based wellness directory available.
        </p>
        <div className="hero-actions fade-up-3">
          <Link to="/shop" className="btn-gold">
            Explore the Shop
          </Link>
          <Link to="/directory" className="btn-ghost">
            Enter the Directory
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --- PRODUCT CATEGORIES ---------------------------------- */
function ProductCategories() {
  const cats = [
    {
      icon: '🍃',
      label: 'Tea Library',
      sub: 'Loose leaf, whole herb teas',
      badge: 'Pre-Order',
      to: '/collections/teas',
      dark: false,
    },
    {
      icon: '✦',
      label: 'Herbal Blends',
      sub: 'Powdered blends for smoothies and daily use',
      badge: 'Pre-Order',
      to: '/collections/blends',
      dark: false,
    },
    {
      icon: '📖',
      label: 'The Directory',
      sub: 'Research, herb library, family wellness plan. Free.',
      badge: 'Live Now',
      to: '/directory',
      dark: true,
    },
  ];

  return (
    <section className="section" style={{ background: 'var(--paper)' }}>
      <div className="container">
        <p className="section-eyebrow text-center">WHAT WE OFFER</p>
        <h2
          className="section-title text-center"
          style={{ marginBottom: 48 }}
        >
          Everything your household needs
        </h2>
        <div
          style={{
            display: 'grid',
            gap: 24,
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {cats.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              className="card-lift"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                padding: '40px 32px',
                borderRadius: 20,
                background: c.dark ? 'var(--green)' : 'var(--cream)',
                border: `1.5px solid ${
                  c.dark ? 'transparent' : 'rgba(30,58,44,.12)'
                }`,
                textDecoration: 'none',
              }}
            >
              <div style={{ fontSize: 32 }}>{c.icon}</div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 2,
                  background: c.dark
                    ? 'rgba(201,162,74,.2)'
                    : 'rgba(30,58,44,.08)',
                  color: c.dark ? 'var(--gold)' : 'var(--sage)',
                }}
              >
                {c.badge}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 24,
                  fontWeight: 600,
                  color: c.dark ? 'var(--cream)' : 'var(--green)',
                }}
              >
                {c.label}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: c.dark ? 'var(--sage)' : 'var(--muted)',
                  lineHeight: 1.6,
                }}
              >
                {c.sub}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- MISSION BAND ---------------------------------------- */
function MissionBand() {
  return (
    <section className="mission-band">
      <div className="container">
        <div
          style={{
            fontSize: 28,
            textAlign: 'center',
            marginBottom: 24,
            color: 'var(--gold)',
          }}
        >
          🌿
        </div>
        <p className="mission-quote">
          "God has already provided everything needed for the healing of the
          nations.{' '}
          <em>
            The work is in the knowing, the stewarding, and the sharing."
          </em>
        </p>
        <div
          className="leaf-rule"
          style={{ maxWidth: 200, margin: '24px auto' }}
        />
        <p
          style={{
            textAlign: 'center',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 3,
            color: 'var(--sage)',
          }}
        >
          THE RESTORUH MANDATE
        </p>
      </div>
    </section>
  );
}

/* --- PRODUCT CARD ---------------------------------------- */
function ProductCard({ product }) {
  const image = product.images?.nodes?.[0];
  const price = product.priceRange?.minVariantPrice;

  return (
    <Link
      to={`/products/${product.handle}`}
      className="card-lift"
      style={{
        minWidth: 280,
        maxWidth: 300,
        flexShrink: 0,
        borderRadius: 16,
        overflow: 'hidden',
        background: 'var(--paper)',
        border: '1.5px solid rgba(30,58,44,.12)',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          aspectRatio: '1',
          overflow: 'hidden',
          background: 'rgba(30,58,44,.05)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {image ? (
          <Image
            data={image}
            aspectRatio="1/1"
            sizes="300px"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ fontSize: 48 }}>🌿</span>
        )}
      </div>
      <div style={{ padding: 20 }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            color: 'var(--sage)',
            marginBottom: 6,
            textTransform: 'uppercase',
          }}
        >
          {product.productType || 'Herbal'}
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--green)',
            marginBottom: 8,
          }}
        >
          {product.title}
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
          }}
        >
          <span className="badge-soon">Pre-Order</span>
          {price && (
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                fontWeight: 600,
                color: 'var(--green)',
              }}
            >
              <Money data={price} />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* --- TEA PREVIEW ----------------------------------------- */
function TeaPreview({ teas }) {
  const products = teas?.collection?.products?.nodes || [];
  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 40,
          }}
        >
          <div>
            <p className="section-eyebrow">LOOSE LEAF TEAS</p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px,4vw,40px)',
                fontWeight: 600,
                color: 'var(--green)',
              }}
            >
              The Tea Library
            </h2>
          </div>
          <Link
            to="/collections/teas"
            className="btn-ghost"
            style={{ fontSize: 13, padding: '9px 22px' }}
          >
            View all teas
          </Link>
        </div>
        <div className="scroll-row">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- BLEND PREVIEW --------------------------------------- */
function BlendPreview({ blends }) {
  const products = blends?.collection?.products?.nodes || [];
  return (
    <section className="section" style={{ background: 'var(--paper)' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 40,
          }}
        >
          <div>
            <p className="section-eyebrow">HERBAL BLENDS</p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px,4vw,40px)',
                fontWeight: 600,
                color: 'var(--green)',
              }}
            >
              Powdered Blends
            </h2>
          </div>
          <Link
            to="/collections/blends"
            className="btn-ghost"
            style={{ fontSize: 13, padding: '9px 22px' }}
          >
            View all blends
          </Link>
        </div>
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- DIRECTORY CALLOUT ----------------------------------- */
function DirectoryCallout() {
  const features = [
    '11 body systems with herbs and foods',
    '65+ herbs labeled by evidence and safety',
    'Gut health, oral health, and toxicity deep dives',
    'Week by week research-based family plan',
    'Hair, skin, and nutrition from within',
    'Emergency preparedness and herb growing guide',
    'Symptom-based wellness guide',
    'Nutrient deficiency reference',
  ];

  return (
    <section className="section" style={{ background: 'var(--green)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gap: 48,
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            alignItems: 'center',
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 4,
                color: 'var(--gold)',
                marginBottom: 16,
              }}
            >
              FREE TO USE
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px,4vw,48px)',
                fontWeight: 600,
                color: 'var(--cream)',
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              The RestoRuh Research Directory
            </h2>
            <p
              style={{
                fontSize: 16,
                color: 'var(--sage)',
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              Faith-based wellness research. Published studies, tested
              tradition, and practical guidance for every household.
              Completely free.
            </p>
            <Link to="/directory" className="btn-gold">
              Launch the Directory
              <svg
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {features.map((f) => (
              <div
                key={f}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(201,162,74,.2)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <svg
                    width="11" height="11" viewBox="0 0 24 24"
                    fill="none" stroke="#c9a24a" strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: 'var(--sage)',
                    lineHeight: 1.5,
                  }}
                >
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- NEWSLETTER ------------------------------------------ */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone]   = useState(false);

  const submit = () => {
    if (email.includes('@')) setDone(true);
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div style={{ fontSize: 28, marginBottom: 20 }}>✉️</div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px,3vw,36px)',
            fontWeight: 600,
            color: 'var(--green)',
            marginBottom: 12,
          }}
        >
          Be first when the teas launch
        </h2>
        <p
          style={{
            fontSize: 15,
            color: 'var(--muted)',
            lineHeight: 1.6,
            maxWidth: 480,
            margin: '0 auto 32px',
          }}
        >
          Our teas and blends are in final development. Join the list for
          first access and the founding member offer.
        </p>
        {done ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              background: 'rgba(63,125,79,.15)',
              padding: '16px 24px',
              borderRadius: 12,
              maxWidth: 400,
              margin: '0 auto',
            }}
          >
            <svg
              width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="#3f7d4f" strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <p style={{ fontWeight: 600, color: '#3f7d4f' }}>
              You are on the list.
            </p>
          </div>
        ) : (
          <div className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="your@email.com"
              className="newsletter-input"
            />
            <button onClick={submit} className="btn-gold">
              Notify me
            </button>
          </div>
        )}
        <p style={{ marginTop: 16, fontSize: 12, color: 'var(--muted)' }}>
          No spam. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}

/* --- PAGE EXPORT ----------------------------------------- */
export default function Homepage() {
  const { teas, blends } = useLoaderData();
  return (
    <>
      <Hero />
      <ProductCategories />
      <MissionBand />
      <TeaPreview   teas={teas}     />
      <BlendPreview blends={blends} />
      <DirectoryCallout />
      <Newsletter />
    </>
  );
}

/* --- GRAPHQL --------------------------------------------- */
const PRODUCT_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id handle title productType
    priceRange { minVariantPrice { amount currencyCode } }
    images(first: 1) { nodes { url altText width height } }
  }
`;

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_FRAGMENT}
  query Collection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id title
      products(first: $first) {
        nodes { ...ProductCard }
      }
    }
  }
`;
