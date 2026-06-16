/* ============================================================
   FILE: app/root.jsx
   Changes: rR logo, 2026 footer, fixed nav, cart connected
   ============================================================ */
import { useNonce, Analytics } from '@shopify/hydrogen';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteLoaderData, Link } from 'react-router';
import { useState } from 'react';
import stylesheet from '~/styles/app.css?url';

export const links = () => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
];

export async function loader({ context }) {
  const { customerAccount, cart } = context;
  const cartData   = await cart.get();
  const isLoggedIn = await customerAccount.isLoggedIn();
  return { cart: cartData, isLoggedIn };
}

function SiteHeader({ cart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const qty = cart?.totalQuantity > 0 ? ` (${cart.totalQuantity})` : '';

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">

          {/* LOGO  --  rR mark in a cream circle on the dark header */}
          <Link to="/" className="header-logo">
            <span className="logo-mark">
              <img
                src="/images/restoruh-logo.png"
                alt="RestoRuh logo"
                style={{ width: 28, height: 28, objectFit: 'contain' }}
              />
            </span>
            <div>
              <span className="logo-name">Resto<span>Ruh</span></span>
              <span className="logo-tagline">REVELATION 22:2</span>
            </div>
          </Link>

          {/* Desktop nav  --  no item is permanently highlighted */}
          <nav className="header-nav">
            <Link to="/shop"      className="nav-link">Shop</Link>
            <Link to="/about"     className="nav-link">About</Link>
            <Link to="/directory" className="nav-link-directory">Directory</Link>
            <Link to="/account"   className="nav-link" aria-label="Account" style={{ padding:'7px 10px' }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/><path d="M5 20v-1a7 7 0 0114 0v1"/>
              </svg>
            </Link>
            <Link to="/cart"      className="nav-link" style={{ marginLeft: 4 }}>
              Cart{qty}
            </Link>
          </nav>

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

        <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
          {[['Home','/'],['Shop','/shop'],['About','/about'],['Directory','/directory'],['Cart','/cart']].map(([label,to]) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="leaf-rule" style={{ marginBottom: 48 }} />
        <div className="footer-grid">
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
              <img src="/images/restoruh-logo.png" alt="RestoRuh" style={{ width:36, height:36, objectFit:'contain', filter:'brightness(0) invert(1)', opacity:.8 }}/>
              <span style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:'var(--cream)' }}>
                Resto<span style={{ color:'var(--gold)' }}>Ruh</span>
              </span>
            </div>
            <p style={{ fontSize:13, color:'var(--sage)', lineHeight:1.6 }}>
              Covenant wellness. Whole plant. Researched and rooted in the Word.
            </p>
          </div>
          <div>
            <p className="footer-heading">EXPLORE</p>
            {[['Home','/'],['Shop','/shop'],['Directory','/directory'],['About','/about']].map(([label,to]) => (
              <Link key={to} to={to} className="footer-link">{label}</Link>
            ))}
          </div>
          <div>
            <p className="footer-heading">THE WORD</p>
            <p className="footer-scripture">"The leaves of the tree are for the healing of the nations."</p>
            <p className="footer-ref">Revelation 22:2</p>
          </div>
        </div>
        <div className="leaf-rule" style={{ marginBottom: 24 }} />
        <p className="footer-legal">2026 RestoRuh. Educational content only. Not medical advice.</p>
        <p className="footer-disclaimer">
          These statements have not been evaluated by the Food and Drug Administration.
          These products are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const nonce = useNonce();
  const data  = useRouteLoaderData('root');
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta /><Links />
      </head>
      <body>
        <SiteHeader cart={data?.cart} />
        <main><Outlet /></main>
        <SiteFooter />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        {data?.cart && (
          <Analytics.Provider cart={data.cart} shop={null} consent={{ checkoutDomain: '' }} />
        )}
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head><Meta /><Links /></head>
      <body style={{ background:'#2e5240', color:'#f5f0e3', display:'grid', placeItems:'center', minHeight:'100vh', fontFamily:'Georgia,serif' }}>
        <div style={{ textAlign:'center' }}>
          <img src="/images/restoruh-logo.png" alt="RestoRuh" style={{ width:72, height:72, objectFit:'contain', margin:'0 auto 20px', filter:'brightness(0) invert(1)', opacity:.6 }}/>
          <h1 style={{ fontSize:28, marginBottom:12, color:'#f5f0e3' }}>Something went wrong</h1>
          <p style={{ color:'#8aa694', marginBottom:24 }}>Head back home and try again.</p>
          <a href="/" style={{ background:'#c9a24a', color:'#1e3a2c', padding:'12px 28px', borderRadius:999, fontWeight:700, textDecoration:'none' }}>Go home</a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
