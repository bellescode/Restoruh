/* ============================================================
   FILE: app/routes/directory.$section.jsx
   Renders at /directory/:section
   Examples: /directory/herbs, /directory/gut-health,
             /directory/family-plan, /directory/systems
   ============================================================ */
import { useParams, useSearchParams } from 'react-router';
import Directory from '../components/Directory';

/* Map URL slugs to the directory's internal view names */
const SLUG_TO_SECTION = {
  'herbs':        'herbs',
  'systems':      'systems',
  'gut-health':   'gut-health',
  'oral-health':  'oral-health',
  'toxicity':     'toxicity',
  'ailments':     'ailments',
  'nutrients':    'nutrients',
  'nutrition':    'nutrition',
  'cleansing':    'cleansing',
  'movement':     'movement',
  'family-plan':  'plan',
  'prepared':     'prepared',
};

export default function DirectorySection() {
  const { section }   = useParams();
  const [sp]          = useSearchParams();
  const id            = sp.get('id') || undefined;
  const viewOverride  = sp.get('view');  // e.g. ?view=master-blend

  const initialSection = viewOverride || SLUG_TO_SECTION[section] || section;

  return <Directory initialSection={initialSection} initialId={id} />;
}
