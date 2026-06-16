/* ============================================================
   FILE: app/components/directory/DirectorySubNav.jsx
   Sticky secondary navigation for all /directory/* pages.
   ============================================================ */
import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";

const DIR_CATS = [
  { id: "explore", label: "Explore", items: [
    { label: "Wellness Areas",     to: "/directory" },
    { label: "Body Systems",       to: "/directory/systems" },
    { label: "Gut Health",         to: "/directory/gut-health" },
    { label: "Oral Health",        to: "/directory/oral-health" },
    { label: "Viral and Toxicity", to: "/directory/toxicity" },
    { label: "Ailments",          to: "/directory/ailments" },
  ]},
  { id: "herbs", label: "Herbs", items: [
    { label: "Herb Library",  to: "/directory/herbs" },
    { label: "Cleansing",     to: "/directory/cleansing" },
    { label: "Nutrients",     to: "/directory/nutrients" },
  ]},
  { id: "plan", label: "My Plan", items: [
    { label: "Family Plan",      to: "/directory/family-plan" },
    { label: "Nutrition",        to: "/directory/nutrition" },
    { label: "Movement",         to: "/directory/movement" },
    { label: "Are You Prepared", to: "/directory/prepared" },
  ]},
];

export function DirectorySubNav() {
  const location = useLocation();
  const [open, setOpen] = useState(null);

  useEffect(() => { setOpen(null); }, [location.pathname]);

  const isActive = (to) =>
    to === "/directory"
      ? location.pathname === "/directory"
      : location.pathname.startsWith(to);

  return (
    <>
      <style>{`
        .dir-dd-link { display:block; padding:8px 14px; font-size:13px; color:var(--cream);
          text-decoration:none; border-radius:8px; transition:background .1s ease; }
        .dir-dd-link:hover { background:rgba(245,240,227,.1); }
        .dir-dd-link.active { background:rgba(201,162,74,.15); color:var(--gold); font-weight:700; }
      `}</style>
      <div style={{
        position: "sticky", top: 64, zIndex: 28,
        background: "rgba(46,82,64,.98)",
        borderBottom: "1px solid rgba(201,162,74,.18)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 20px",
          display: "flex", alignItems: "center", gap: 4, height: 44, overflowX: "auto",
        }}>
          <Link to="/directory" style={{
            flexShrink: 0, fontSize: 12, fontWeight: 700, letterSpacing: 1,
            color: location.pathname === "/directory" ? "var(--gold)" : "var(--sage)",
            textDecoration: "none", marginRight: 8,
          }}>
            Directory
          </Link>
          <span style={{ color: "rgba(138,166,148,.35)", fontSize: 11, marginRight: 4 }}>/</span>

          {DIR_CATS.map((cat) => {
            const catActive = cat.items.some((i) => isActive(i.to));
            const isOpen    = open === cat.id;
            return (
              <div key={cat.id} style={{ position: "relative", flexShrink: 0 }}>
                <button
                  onClick={() => setOpen(isOpen ? null : cat.id)}
                  style={{
                    background: isOpen || catActive ? "var(--gold)" : "transparent",
                    color: isOpen || catActive ? "#1e3a2c" : "var(--cream)",
                    border: "none", borderRadius: 999, padding: "4px 14px",
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap",
                  }}
                >
                  {cat.label}
                  <span style={{ fontSize: 9, opacity: 0.7 }}>{isOpen ? "▲" : "▼"}</span>
                </button>

                {isOpen && (
                  <>
                    <div
                      onClick={() => setOpen(null)}
                      style={{ position: "fixed", inset: 0, zIndex: 40 }}
                    />
                    <div style={{
                      position: "absolute", top: "110%", left: 0, zIndex: 41,
                      background: "var(--green-deep)",
                      border: "1px solid rgba(201,162,74,.2)",
                      borderRadius: 12, padding: "6px 4px", minWidth: 190,
                      boxShadow: "0 12px 32px rgba(0,0,0,.35)",
                    }}>
                      {cat.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`dir-dd-link${isActive(item.to) ? " active" : ""}`}
                        >
                          {item.label}
                        </Link>
                      ))}
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
