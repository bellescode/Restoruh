/* ============================================================
   FILE: app/routes/directory.$section.jsx
   Handles /directory/:section -- all sub-pages.
   Self-contained: cookie check, sub-nav, Directory component.
   No layout nesting. Root.jsx handles header/footer.
   ============================================================ */
import { redirect, useLoaderData, useParams, useSearchParams } from 'react-router';
import Directory from '../components/Directory';
import { DirectorySubNav } from './directory';

export async function loader({ request }) {
  const cookie = request.headers.get('Cookie') ?? '';
  if (!cookie.includes('ruh_dir=1')) {
    return redirect('/directory');
  }
  return { hasAccess: true };
}

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

export default function DirectorySectionPage() {
  const { section }  = useParams();
  const [sp]         = useSearchParams();
  const id           = sp.get('id') || undefined;
  const viewOverride = sp.get('view');
  const initialSection = viewOverride || SLUG_TO_SECTION[section] || section;

  return (
    <>
      <DirectorySubNav />
      <Directory initialSection={initialSection} initialId={id} />
    </>
  );
}
