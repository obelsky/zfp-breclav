import { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Investování | Finanční poradna | ZFP GROUP Břeclav',
  description: 'Odborné články o investování od certifikovaných finančních poradců.',
};

const CATEGORY_SLUG = 'investovani';

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

async function getArticles(): Promise<Article[]> {
  // First get the category ID
  const { data: category } = await supabase
    .from('article_categories')
    .select('id')
    .eq('slug', CATEGORY_SLUG)
    .single();

  if (!category) return [];

  // Then get articles for this category
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, slug, excerpt, featured_image, published_at, reading_time, author_id')
    .eq('category_id', category.id)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error || !articles) return [];

  // Get author names
  const authorIds = [...new Set(articles.filter(a => a.author_id).map(a => a.author_id))];
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

  return articles.map(article => ({
    ...article,
    author_name: article.author_id ? authorsMap[article.author_id] : undefined,
  }));
}

export default async function InvestovaniPage() {
  const articles = await getArticles();

  return (
    <section className="pt-24 lg:pt-32 pb-20 min-h-screen">
      <div className="container-custom">
        <Link href="/poradna" className="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zpět na Poradnu
        </Link>

        <div className="mb-16">
          <div className="mb-6"><div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange" /></div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-6">Investování</h1>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            Jak investovat, kam dát peníze a jak se vyhnout chybám
          </p>
        </div>

        {/* Articles List */}
        <div className="mb-20">
          <h2 className="text-3xl mb-8">Články</h2>
          
          {articles.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
              <p className="text-white/60">
                Připravujeme pro vás obsah. Brzy zde najdete užitečné články a rady.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/poradna/${article.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-green-400/30 transition-all"
                >
                  {article.featured_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.featured_image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-white/60 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <span>{article.author_name || 'ZFP Team'}</span>
                      <div className="flex items-center gap-2">
                        <span>{article.reading_time || 5} min čtení</span>
                        <span>•</span>
                        <span>{new Date(article.published_at).toLocaleDateString('cs-CZ')}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-green-500/10 to-zfp-dark border border-green-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl mb-6">Potřebujete osobní radu?</h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Spojte se s námi a probereme vaši investiční strategii
          </p>
          <Link 
            href="/kontakt" 
            className="inline-block px-10 py-5 bg-green-500 hover:bg-green-600 text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Kontaktovat poradce
          </Link>
        </div>
      </div>
    </section>
  );
}
