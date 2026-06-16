/* ============================================================
   FILE: app/components/directory/DirectoryContext.jsx
   Provides favorites and plan phases across all directory routes.
   Uses localStorage. Import useDirectoryContext() in any view.
   ============================================================ */
import { createContext, useContext, useState, useEffect } from "react";

const DirectoryContext = createContext(null);

export function DirectoryProvider({ children }) {
  const [favs,       setFavs]       = useState([]);
  const [planPhases, setPlanPhases] = useState({});
  const [loaded,     setLoaded]     = useState(false);

  useEffect(() => {
    try {
      const f = localStorage.getItem("ruh:favs");
      const p = localStorage.getItem("ruh:phases");
      if (f) setFavs(JSON.parse(f));
      if (p) setPlanPhases(JSON.parse(p));
    } catch (_) {}
    setLoaded(true);
  }, []);

  const toggleFav = (id) => {
    setFavs((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try { localStorage.setItem("ruh:favs", JSON.stringify(next)); } catch (_) {}
      return next;
    });
  };

  const togglePhase = (key) => {
    setPlanPhases((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try { localStorage.setItem("ruh:phases", JSON.stringify(next)); } catch (_) {}
      return next;
    });
  };

  return (
    <DirectoryContext.Provider value={{ favs, toggleFav, planPhases, togglePhase, loaded }}>
      {children}
    </DirectoryContext.Provider>
  );
}

export const useDirectoryContext = () => {
  const ctx = useContext(DirectoryContext);
  if (!ctx) throw new Error("useDirectoryContext must be used inside DirectoryProvider");
  return ctx;
};
