import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  published_at: string;
  reading_time: number;
  author_name?: string;
}

async function getCategory(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('article_categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

async function getCategoryArticles(categoryId: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, excerpt, featured_image, published_at, reading_time, author_id')
    .eq('category_id', categoryId)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error || !data) {
    return [];
  }

  // Get author names
  const authorIds = [...new Set(data.filter(a => a.author_id).map(a => a.author_id))];
  let authorsMap: Record<string, string> = {};
  
  if (authorIds.length > 0) {
    const { data: authors } = await supabase
      .from('advisors')
      .select('id, name')
      .in('id', authorIds);
    
    if (authors) {
      authorsMap = Object.fromEntries(authors.map(a => [a.id, a.name]));
    }
  }

  return data.map(article => ({
    ...article,
    author_name: article.author_id ? authorsMap[article.author_id] : undefined,
  }));
}

async function getAllCategories(): Promise<Category[]> {
  const { data } = await supabase
    .from('article_categories')
    .select('*')
    .order('sort_order');
  
  return data || [];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategory(params.slug);
  
  if (!category) {
    return {
      title: 'Kategorie nenalezena | ZFP GROUP Břeclav',
    };
  }

  return {
    title: `${category.name} | Finanční poradna | ZFP GROUP Břeclav`,
    description: category.description || `Články o tématu ${category.name} od certifikovaných finančních poradců.`,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, allCategories] = await Promise.all([
    getCategory(params.slug),
    getAllCategories(),
  ]);

  if (!category) {
    notFound();
  }

  const articles = await getCategoryArticles(category.id);

  return (
    <main className="min-h-screen bg-zfp-dark">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 right-0 w-1/2 h-full opacity-20"
            style={{ background: `linear-gradient(to left, ${category.color}, transparent)` }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Domů</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/poradna" className="hover:text-white transition-colors">Poradna</Link>
              </li>
              <li>/</li>
              <li className="text-white">{category.name}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span 
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-white mb-4"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-xl text-white/70">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Categories Nav */}
      <section className="py-6 border-b border-white/10 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/poradna"
              className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full text-sm font-medium transition-all"
            >
              Všechny články
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/poradna/kategorie/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat.id === category.id
                    ? 'text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                style={cat.id === category.id ? { backgroundColor: cat.color } : {}}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Zatím žádné články v této kategorii
              </h2>
              <p className="text-white/60 mb-6">
                Brzy zde přidáme užitečný obsah.
              </p>
              <Link
                href="/poradna"
                className="inline-flex items-center gap-2 text-zfp-orange hover:underline"
              >
                ← Zpět na všechny články
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-white/60">
                  {articles.length} {articles.length === 1 ? 'článek' : articles.length < 5 ? 'články' : 'článků'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-zfp-gold/30 transition-all duration-300"
                  >
                    <Link href={`/poradna/${article.slug}`}>
                      <div className="aspect-video bg-gradient-to-br from-zfp-gold/20 to-zfp-orange/20 relative overflow-hidden">
                        {article.featured_image ? (
                          <img
                            src={article.featured_image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="p-6">
                      <Link href={`/poradna/${article.slug}`}>
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-zfp-gold transition-colors line-clamp-2">
                          {article.title}
                        </h2>
                      </Link>
                      
                      {article.excerpt && (
                        <p className="text-white/60 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-sm text-white/40">
                        <span>{article.author_name || 'ZFP Team'}</span>
                        <div className="flex items-center gap-3">
                          <span>{article.reading_time || 5} min</span>
                          <span>
                            {new Date(article.published_at).toLocaleDateString('cs-CZ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-zfp-gold/10 to-zfp-orange/10 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Potřebujete osobní konzultaci?
          </h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Naši finanční poradci vám pomohou s jakýmkoliv dotazem ohledně {category.name.toLowerCase()}.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-zfp-gold to-zfp-orange hover:from-zfp-gold/90 hover:to-zfp-orange/90 text-white font-semibold rounded-xl transition-all"
          >
            Sjednat konzultaci
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
