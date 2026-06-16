/* ============================================================
   FILE: app/routes/directory._index.jsx
   Renders at /directory -- the home overview page.
   ============================================================ */
import Directory from '../components/Directory';

export default function DirectoryIndex() {
  return <Directory initialSection="home" />;
}
