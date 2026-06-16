/* ============================================================
   FILE: app/components/directory/DirectoryUI.jsx
   Shared UI primitives used across all directory sections.
   ============================================================ */
import { Link }      from "react-router";
import { ArrowLeft, ShieldAlert } from "lucide-react";

/* Evidence badge */
export function EvidenceBadge({ level }) {
  const map = {
    supported:   { label: "Supported by research", color: "#3f7d4f" },
    emerging:    { label: "Emerging research",      color: "#b9892f" },
    traditional: { label: "Traditional use",        color: "#8a8170" },
  };
  const e = map[level];
  if (!e) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 500,
      background: e.color + "22", color: e.color,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: e.color }} />
      {e.label}
    </span>
  );
}

/* Card panel */
export function Panel({ title, icon: Icon, children, border }) {
  return (
    <div style={{
      borderRadius: 16, border: `1px solid ${border || "rgba(61,107,80,.12)"}`,
      padding: 20, background: "var(--paper)",
    }}>
      {(title || Icon) && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          {Icon && <Icon size={17} color="var(--gold)" />}
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: "var(--green)" }}>
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
}

/* Chip tags */
export function Chips({ items, tone }) {
  const bg  = tone === "gold" ? "rgba(201,162,74,.18)"  : "rgba(126,144,121,.16)";
  const col = tone === "gold" ? "#9a7a25"               : "#3d5640";
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {items.map((f) => (
        <span key={f} style={{ borderRadius: 999, padding: "6px 12px", fontSize: 13, background: bg, color: col }}>
          {f}
        </span>
      ))}
    </div>
  );
}

/* Back button -- accepts `to` (Link) or `onClick` (button) */
export function BackBtn({ to, onClick, label }) {
  const inner = (
    <>
      <ArrowLeft size={16} />
      {label}
    </>
  );
  const shared = {
    display: "inline-flex", alignItems: "center", gap: 4,
    fontSize: 14, fontWeight: 600, color: "var(--gold)",
    marginBottom: 24, background: "none", border: "none",
    cursor: "pointer", textDecoration: "none", padding: 0,
  };
  if (to)
    return <Link to={to} style={shared}>{inner}</Link>;
  return <button onClick={onClick} style={shared}>{inner}</button>;
}

/* Caution box */
export function CautionBox({ children }) {
  return (
    <div style={{
      display: "flex", gap: 12, borderRadius: 12,
      border: "1px solid #e3c47e", padding: 16, background: "#fdf6e8",
    }}>
      <ShieldAlert size={20} color="#b9892f" style={{ marginTop: 2, flexShrink: 0 }} />
      <p style={{ fontSize: 14, color: "#7a5e1c", lineHeight: 1.65 }}>{children}</p>
    </div>
  );
}

/* Section header used on most pages */
export function SectionHeader({ title, sub }) {
  return (
    <div style={{ paddingTop: 32, paddingBottom: 8 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,4vw,38px)",
        fontWeight: 600, color: "var(--green)", marginBottom: sub ? 8 : 0 }}>
        {title}
      </h1>
      {sub && <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65 }}>{sub}</p>}
    </div>
  );
}

/* Green hero band used on area/section pages */
export function HeroBand({ icon: Icon, title, sub, caution }) {
  return (
    <div style={{ borderRadius: 20, padding: "28px 28px", background: "var(--green)", marginBottom: 24 }}>
      {Icon && (
        <span style={{
          display: "grid", placeItems: "center", width: 48, height: 48,
          borderRadius: 12, background: "rgba(201,162,74,.18)", marginBottom: 14,
        }}>
          <Icon size={22} color="var(--gold)" />
        </span>
      )}
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,4vw,32px)",
        fontWeight: 600, color: "var(--cream)", lineHeight: 1.15, marginBottom: 10 }}>
        {title}
      </h1>
      {sub && <p style={{ fontSize: 14, color: "var(--sage)", lineHeight: 1.7, maxWidth: 640 }}>{sub}</p>}
      {caution && (
        <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 10, background: "rgba(255,200,100,.15)", border: "1px solid rgba(255,200,100,.3)" }}>
          <p style={{ fontSize: 13, color: "#f0c060" }}>{caution}</p>
        </div>
      )}
    </div>
  );
}

/* Page wrapper -- consistent padding for all directory pages */
export function DirPage({ children }) {
  return (
    <div style={{ background: "var(--cream)", minHeight: "70vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        {children}
      </div>
    </div>
  );
}
