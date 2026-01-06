import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Finanční poradna | ZFP GROUP Břeclav',
  description: 'Odborné články o financích, investování, pojištění a hypotékách od certifikovaných finančních poradců.',
};

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('article_categories')
    .select('*')
    .order('sort_order');

  if (error) {
    console.error('Error loading categories:', error);
    return [];
  }

  return data || [];
}

async function getCategoryArticleCount(categoryId: string): Promise<number> {
  const { count } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', categoryId)
    .eq('status', 'published');
  
  return count || 0;
}

// Icon paths mapping
const ICON_PATHS: Record<string, string> = {
  dollar: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  chart: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  document: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  building: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  heart: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  calculator: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  briefcase: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  lightbulb: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  scale: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  gift: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
  star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  folder: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
};

// Get icon path - fallback to folder if not found
function getIconPath(iconId: string): string {
  return ICON_PATHS[iconId] || ICON_PATHS.folder;
}

// Color mapping
function getTextColor(hex: string): string {
  const colors: Record<string, string> = {
    '#D4A853': 'text-zfp-gold',
    '#10B981': 'text-green-400',
    '#3B82F6': 'text-blue-400',
    '#F97316': 'text-zfp-orange',
    '#8B5CF6': 'text-purple-400',
    '#06B6D4': 'text-cyan-400',
    '#EC4899': 'text-pink-400',
    '#EF4444': 'text-red-400',
  };
  return colors[hex] || 'text-zfp-gold';
}

export default async function PoradnaPage() {
  const categories = await getCategories();
  
  // Get article counts for each category
  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => ({
      ...cat,
      articleCount: await getCategoryArticleCount(cat.id),
    }))
  );

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
        <div className="container-custom">
          <div className="mb-16">
            <div className="mb-6">
              <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" />
            </div>
            <h1 className="mb-6">
              Finanční <span className="text-transparent bg-clip-text bg-gradient-to-r from-zfp-gold to-zfp-orange">poradna</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
              Odborné články a rady od našich certifikovaných finančních poradců. 
              Pomůžeme vám zorientovat se ve světě financí.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {categoriesWithCounts.map((category, index) => (
              <Link
                key={category.id}
                href={`/poradna/${category.slug}`}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`mb-4 ${getTextColor(category.color)}`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={getIconPath(category.icon || 'folder')} />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-2 group-hover:${getTextColor(category.color)} transition-colors`}>
                  {category.name}
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm">
                    {category.articleCount} {category.articleCount === 1 ? 'článek' : category.articleCount < 5 ? 'články' : 'článků'}
                  </span>
                  <span className={`${getTextColor(category.color)} text-sm group-hover:translate-x-1 transition-transform`}>
                    Zobrazit →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-zfp-orange/10 to-zfp-dark border border-zfp-orange/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl mb-6">Potřebujete osobní radu?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Naši finanční poradci vám pomohou s jakýmkoliv dotazem. 
              Sjednejte si nezávaznou konzultaci zdarma.
            </p>
            <Link 
              href="/kontakt"
              className="inline-block px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Kontaktovat poradce
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
