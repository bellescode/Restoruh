/* ============================================================
   FILE: app/root.jsx
   Drop this in: your GitHub repo at app/root.jsx
   This replaces the existing root.jsx entirely.
   ============================================================ */

import {useNonce, Analytics} from '@shopify/hydrogen';
import {defer} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  Link,
} from '@remix-run/react';
import {useState} from 'react';
import stylesheet from '~/styles/app.css?url';

export const links = () => [
  {rel: 'stylesheet', href: stylesheet},
  {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
  {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous'},
];

export async function loader({context}) {
  const {storefront, customerAccount, cart} = context;
  const cartPromise = cart.get();
  const [header, footer] = await Promise.all([
    storefront.query(HEADER_QUERY),
    storefront.query(FOOTER_QUERY),
  ]);
  return defer({header, footer, cart: cartPromise, isLoggedIn: customerAccount.isLoggedIn()});
}

/* --- HEADER ----------------------------------------------- */
function SiteHeader({cart}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV = [
    {label: 'Shop',      to: '/shop'},
    {label: 'About',     to: '/about'},
    {label: 'Directory', to: '/directory', special: true},
  ];

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="header-logo">
            <span className="logo-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C12 2 6 8 6 14a6 6 0 0012 0C18 8 12 2 12 2z" fill="#16291f"/>
                <line x1="12" y1="2" x2="12" y2="22" stroke="#16291f" strokeWidth="1.5"/>
                <path d="M12 10C12 10 8 13 8 17" stroke="#16291f" strokeWidth="1" opacity="0.5"/>
                <path d="M12 10C12 10 16 13 16 17" stroke="#16291f" strokeWidth="1" opacity="0.5"/>
              </svg>
            </span>
            <div>
              <span className="logo-name">Resto<span>Ruh</span></span>
              <span className="logo-tagline">REVELATION 22:2</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="header-nav">
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/directory" className="nav-link-directory">Directory</Link>
            <Link to="/cart" className="nav-link" style={{marginLeft: 8}}>
              Cart {cart?.totalQuantity > 0 && `(${cart.totalQuantity})`}
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
          {[
            {label: 'Home',      to: '/'},
            {label: 'Shop',      to: '/shop'},
            {label: 'About',     to: '/about'},
            {label: 'Directory', to: '/directory'},
            {label: 'Cart',      to: '/cart'},
          ].map(item => (
            <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

/* --- FOOTER ----------------------------------------------- */
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="leaf-rule" style={{marginBottom: 48}} />
        <div className="footer-grid">
          <div>
            <div style={{fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--cream)', marginBottom: 8}}>
              Resto<span style={{color: 'var(--gold)'}}>Ruh</span>
            </div>
            <p style={{fontSize: 13, color: 'var(--sage)', lineHeight: 1.6}}>
              Covenant wellness. Whole plant. Researched and rooted in the Word.
            </p>
          </div>
          <div>
            <p className="footer-heading">EXPLORE</p>
            {['/', '/shop', '/directory', '/about'].map((path, i) => (
              <Link key={path} to={path} className="footer-link">
                {['Home', 'Shop', 'Directory', 'About'][i]}
              </Link>
            ))}
          </div>
          <div>
            <p className="footer-heading">THE WORD</p>
            <p className="footer-scripture">
              "The leaves of the tree are for the healing of the nations."
            </p>
            <p className="footer-ref">Revelation 22:2</p>
          </div>
        </div>
        <div className="leaf-rule" style={{marginBottom: 24}} />
        <p className="footer-legal">2025 RestoRuh. Educational content only. Not medical advice.</p>
        <p className="footer-disclaimer">
          These statements have not been evaluated by the Food and Drug Administration.
          These products are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </footer>
  );
}

/* --- ROOT LAYOUT ------------------------------------------ */
export default function App() {
  const nonce = useNonce();
  const data = useRouteLoaderData('root');
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SiteHeader cart={data?.cart} />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <Analytics.Provider
          cart={data?.cart}
          shop={data?.header?.shop}
          consent={{checkoutDomain: data?.header?.shop?.primaryDomain?.url}}
        />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head><Meta /><Links /></head>
      <body style={{background: 'var(--green-deep)', color: 'var(--cream)', display: 'grid', placeItems: 'center', minHeight: '100vh', fontFamily: 'Georgia, serif'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: 48, marginBottom: 16}}>🌿</div>
          <h1 style={{fontSize: 32, marginBottom: 12}}>Something went wrong</h1>
          <p style={{color: '#7e9079'}}>Head back home and try again.</p>
          <a href="/" style={{marginTop: 24, display: 'inline-block', background: '#c9a24a', color: '#16291f', padding: '12px 28px', borderRadius: 999, fontWeight: 700}}>Go home</a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

/* --- GRAPHQL QUERIES -------------------------------------- */
const HEADER_QUERY = `#graphql
  query Header {
    shop { id name primaryDomain { url } }
  }
`;

const FOOTER_QUERY = `#graphql
  query Footer {
    shop { id }
  }
`;
