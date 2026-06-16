/* ============================================================
   FILE: app/components/directory/DirectorySubNav.jsx
   Fixed: dropdowns now use position:fixed with getBoundingClientRect
   so they escape the overflowX:auto clipping context.
   ============================================================ */
import { Link, useLocation } from "react-router";
import { useState, useRef, useCallback } from "react";

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
  const location    = useLocation();
  const [open, setOpen]    = useState(null);
  const [dropPos, setDropPos] = useState({ top: 108, left: 120 });
  const btnRefs     = useRef({});

  const handleToggle = useCallback((catId) => {
    if (open === catId) { setOpen(null); return; }
    const btn  = btnRefs.current[catId];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setDropPos({ top: rect.bottom + 4, left: rect.left });
    }
    setOpen(catId);
  }, [open]);

  /* Close on route change */
  const prevPath = useRef(location.pathname);
  if (prevPath.current !== location.pathname) {
    prevPath.current = location.pathname;
    if (open) setOpen(null);
  }

  const isActive = (to) =>
    to === "/directory"
      ? location.pathname === "/directory"
      : location.pathname.startsWith(to);

  const activeCat = DIR_CATS.find((c) => c.items.some((i) => isActive(i.to)));

  /* Current open cat's items */
  const openCat = DIR_CATS.find((c) => c.id === open);

  return (
    <>
      <style>{`
        .dir-dd-link { display:block; padding:9px 16px; font-size:13px; color:var(--cream);
          text-decoration:none; border-radius:8px; white-space:nowrap; }
        .dir-dd-link:hover { background:rgba(245,240,227,.1); }
        .dir-dd-link.active { background:rgba(201,162,74,.15); color:var(--gold); font-weight:700; }
      `}</style>

      {/* Fixed click-outside overlay */}
      {open && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 48 }}
          onClick={() => setOpen(null)}
        />
      )}

      {/* Fixed dropdown -- rendered outside overflow container */}
      {open && openCat && (
        <div style={{
          position: "fixed",
          top: dropPos.top,
          left: dropPos.left,
          zIndex: 49,
          background: "var(--green-deep)",
          border: "1px solid rgba(201,162,74,.25)",
          borderRadius: 12,
          padding: "6px 4px",
          minWidth: 200,
          boxShadow: "0 16px 40px rgba(0,0,0,.4)",
        }}>
          {openCat.items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`dir-dd-link${isActive(item.to) ? " active" : ""}`}
              onClick={() => setOpen(null)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Sticky sub-nav bar */}
      <div style={{
        position: "sticky", top: 64, zIndex: 28,
        background: "rgba(46,82,64,.98)",
        borderBottom: "1px solid rgba(201,162,74,.18)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 20px",
          display: "flex", alignItems: "center", gap: 4, height: 44,
          overflowX: "auto", overflowY: "visible",
        }}>
          <Link to="/directory" style={{
            flexShrink: 0, fontSize: 12, fontWeight: 700, letterSpacing: 1,
            color: location.pathname === "/directory" ? "var(--gold)" : "var(--sage)",
            textDecoration: "none", marginRight: 8, whiteSpace: "nowrap",
          }}>
            Directory
          </Link>
          <span style={{ color: "rgba(138,166,148,.35)", fontSize: 11, marginRight: 4 }}>/</span>

          {DIR_CATS.map((cat) => {
            const isOpen    = open === cat.id;
            const catActive = cat.id === activeCat?.id;
            return (
              <button
                key={cat.id}
                ref={(el) => { btnRefs.current[cat.id] = el; }}
                onClick={() => handleToggle(cat.id)}
                style={{
                  flexShrink: 0,
                  background: isOpen || catActive ? "var(--gold)" : "transparent",
                  color:      isOpen || catActive ? "#1e3a2c"    : "var(--cream)",
                  border: "none", borderRadius: 999, padding: "5px 14px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
                }}
              >
                {cat.label}
                <span style={{ fontSize: 9, opacity: 0.7 }}>{isOpen ? "▲" : "▼"}</span>
              </button>
            );
          })}

          {/* How Are You Feeling quick link */}
          <div style={{ marginLeft: "auto", flexShrink: 0 }}>
            <Link to="/wellness-guide" style={{
              display: "flex", alignItems: "center", gap: 5,
              fontSize: 12, fontWeight: 700, color: "var(--gold)",
              textDecoration: "none", padding: "4px 12px",
              borderRadius: 999, border: "1px solid rgba(201,162,74,.35)",
              whiteSpace: "nowrap",
            }}>
              ✦ How are you feeling?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
