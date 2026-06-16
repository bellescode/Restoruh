/* ============================================================
   FILE: app/routes/directory.area.$id.jsx
   Renders at /directory/area/:id
   Examples: /directory/area/gut, /directory/area/inflammation
   ============================================================ */
import { useParams } from 'react-router';
import Directory from '../components/Directory';

export default function DirectoryArea() {
  const { id } = useParams();
  return <Directory initialSection="area" initialId={id} />;
}
