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

// Icons based on slug
function getCategoryIcon(slug: string) {
  const icons: Record<string, JSX.Element> = {
    finance: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    investovani: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    pojisteni: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    reality: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    legislativa: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    hypoteky: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  };
  
  return icons[slug] || (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

// Color mapping
function getTextColor(hex: string): string {
  const colors: Record<string, string> = {
    '#D4A853': 'text-zfp-gold',
    '#10B981': 'text-green-400',
    '#3B82F6': 'text-blue-400',
    '#F97316': 'text-zfp-orange',
    '#8B5CF6': 'text-purple-400',
    '#EC4899': 'text-pink-400',
    '#6366F1': 'text-indigo-400',
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
                  {getCategoryIcon(category.slug)}
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
