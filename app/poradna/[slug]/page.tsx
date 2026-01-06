import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// ============================================
// TYPES
// ============================================

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  featured_image_alt: string | null;
  published_at: string;
  updated_at: string;
  reading_time: number;
  view_count: number;
  meta_title: string | null;
  meta_description: string | null;
  sources: string[] | null;
  disclaimer: string | null;
  reviewed_at: string | null;
  category_id: string | null;
  category_name?: string;
  category_slug?: string;
  category_color?: string;
  author_name?: string;
  author_bio?: string;
  author_photo?: string;
  author_certifications?: string[];
  author_specializations?: string[];
}

// ============================================
// DATA FETCHING
// ============================================

async function getCategory(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('article_categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data;
}

async function getCategoryArticles(categoryId: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, excerpt, featured_image, published_at, reading_time, author_id')
    .eq('category_id', categoryId)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error || !data) return [];

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
  })) as Article[];
}

async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select(`*, article_categories(name, slug, color)`)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) return null;

  // Get author info
  let authorData = null;
  if (data.author_id) {
    const { data: author } = await supabase
      .from('advisors')
      .select('name, bio, photo_url, certifications, specializations')
      .eq('id', data.author_id)
      .single();
    authorData = author;
  }

  // Increment view count
  await supabase
    .from('articles')
    .update({ view_count: (data.view_count || 0) + 1 })
    .eq('id', data.id);

  return {
    ...data,
    category_name: (data.article_categories as any)?.name,
    category_slug: (data.article_categories as any)?.slug,
    category_color: (data.article_categories as any)?.color,
    author_name: authorData?.name,
    author_bio: authorData?.bio,
    author_photo: authorData?.photo_url,
    author_certifications: authorData?.certifications,
    author_specializations: authorData?.specializations,
  };
}

// ============================================
// METADATA
// ============================================

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Check if it's a category first
  const category = await getCategory(params.slug);
  if (category) {
    return {
      title: `${category.name} | Finanční poradna | ZFP GROUP Břeclav`,
      description: category.description || `Články o tématu ${category.name} od certifikovaných finančních poradců.`,
    };
  }

  // Otherwise it's an article
  const article = await getArticle(params.slug);
  if (!article) {
    return { title: 'Nenalezeno | ZFP GROUP Břeclav' };
  }

  const categoryName = article.category_name || 'Finanční poradna';
  const title = article.meta_title || `${article.title} | ${categoryName} | ZFP GROUP Břeclav`;

  return {
    title,
    description: article.meta_description || article.excerpt,
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt,
      type: 'article',
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: article.author_name ? [article.author_name] : undefined,
    },
  };
}

// ============================================
// PAGE COMPONENT
// ============================================

export default async function DynamicPoradnaPage({ params }: { params: { slug: string } }) {
  // First check if slug matches a category
  const category = await getCategory(params.slug);
  
  if (category) {
    // Render category page
    const articles = await getCategoryArticles(category.id);
    return <CategoryPage category={category} articles={articles} />;
  }

  // Otherwise try to find an article
  const article = await getArticle(params.slug);
  
  if (!article) {
    notFound();
  }

  return <ArticlePage article={article} />;
}

// ============================================
// CATEGORY PAGE COMPONENT
// ============================================

function CategoryPage({ category, articles }: { category: Category; articles: Article[] }) {
  // Color mapping for text colors
  const getTextColor = (hex: string) => {
    const colors: Record<string, string> = {
      '#D4A853': 'text-zfp-gold',
      '#10B981': 'text-green-400',
      '#3B82F6': 'text-blue-400',
      '#F97316': 'text-zfp-orange',
      '#8B5CF6': 'text-purple-400',
      '#06B6D4': 'text-cyan-400',  // Hypotéky
      '#EC4899': 'text-pink-400',
      '#EF4444': 'text-red-400',
    };
    return colors[hex] || 'text-zfp-gold';
  };

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
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${getTextColor(category.color)}`}>
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-white/70 max-w-3xl leading-relaxed">{category.description}</p>
          )}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl mb-8">Články</h2>
          
          {articles.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
              <p className="text-white/60">Připravujeme pro vás obsah. Brzy zde najdete užitečné články a rady.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <Link key={article.id} href={`/poradna/${article.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all">
                  {article.featured_image && (
                    <div className="aspect-video overflow-hidden">
                      <img src={article.featured_image} alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-zfp-gold transition-colors">{article.title}</h3>
                    {article.excerpt && <p className="text-white/60 text-sm mb-4 line-clamp-2">{article.excerpt}</p>}
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <span>{article.author_name || 'ZFP Team'}</span>
                      <div className="flex items-center gap-2">
                        <span>{article.reading_time || 5} min</span>
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

        <div className="rounded-2xl p-12 text-center" style={{ background: `linear-gradient(to bottom right, ${category.color}15, transparent)`, borderColor: `${category.color}30`, borderWidth: 1 }}>
          <h2 className="text-3xl mb-6">Potřebujete osobní radu?</h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Spojte se s námi a probereme téma {category.name.toLowerCase()}
          </p>
          <Link href="/kontakt" 
            className="inline-block px-10 py-5 text-white font-medium tracking-wider uppercase rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: category.color }}>
            Kontaktovat poradce
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// ARTICLE PAGE COMPONENT
// ============================================

function ArticlePage({ article }: { article: Article }) {
  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: article.author_name ? {
      '@type': 'Person',
      name: article.author_name,
      description: article.author_bio,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'ZFP GROUP Břeclav',
      logo: { '@type': 'ImageObject', url: 'https://zfpbreclav.cz/zfp-breclav-logo.png' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <main className="min-h-screen bg-zfp-dark">
        {/* Hero */}
        <section className="relative py-16 md:py-24 border-b border-white/10">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-white/60">
                <li><Link href="/" className="hover:text-white transition-colors">Domů</Link></li>
                <li>/</li>
                <li><Link href="/poradna" className="hover:text-white transition-colors">Poradna</Link></li>
                {article.category_name && (
                  <>
                    <li>/</li>
                    <li>
                      <Link href={`/poradna/${article.category_slug}`} className="hover:text-white transition-colors">
                        {article.category_name}
                      </Link>
                    </li>
                  </>
                )}
              </ol>
            </nav>

            <div className="max-w-4xl">
              {article.category_name && (
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-4"
                  style={{ backgroundColor: article.category_color || '#D4A853' }}>
                  {article.category_name}
                </span>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/60">
                {article.author_name && (
                  <div className="flex items-center gap-2">
                    {article.author_photo ? (
                      <img src={article.author_photo} alt={article.author_name}
                        className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-zfp-gold/20 flex items-center justify-center text-zfp-gold font-bold text-sm">
                        {article.author_name.charAt(0)}
                      </div>
                    )}
                    <span>{article.author_name}</span>
                  </div>
                )}
                <span>•</span>
                <span>{new Date(article.published_at).toLocaleDateString('cs-CZ', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}</span>
                <span>•</span>
                <span>{article.reading_time || 5} min čtení</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Article Content */}
              <article className="lg:col-span-8">
                {article.featured_image && (
                  <img src={article.featured_image} alt={article.featured_image_alt || article.title}
                    className="w-full rounded-2xl mb-8" />
                )}

                {article.excerpt && (
                  <p className="text-xl text-white/80 mb-8 leading-relaxed border-l-4 border-zfp-gold pl-6">
                    {article.excerpt}
                  </p>
                )}

                <div className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-p:text-white/80 prose-p:leading-relaxed
                  prose-a:text-zfp-orange prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white
                  prose-ul:text-white/80 prose-ol:text-white/80
                  prose-blockquote:border-zfp-gold prose-blockquote:text-white/70
                  prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded"
                  dangerouslySetInnerHTML={{ __html: article.content }} />

                {article.disclaimer && (
                  <div className="mt-12 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                    <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Právní upozornění
                    </h4>
                    <p className="text-white/70 text-sm">{article.disclaimer}</p>
                  </div>
                )}

                {article.sources && article.sources.length > 0 && (
                  <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="text-white font-semibold mb-4">Zdroje</h4>
                    <ul className="space-y-2">
                      {article.sources.map((source, i) => (
                        <li key={i} className="text-white/60 text-sm">
                          {source.startsWith('http') ? (
                            <a href={source} target="_blank" rel="noopener noreferrer"
                              className="text-zfp-orange hover:underline">{source}</a>
                          ) : source}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {article.reviewed_at && (
                  <p className="mt-8 text-white/40 text-sm">
                    Naposledy ověřeno: {new Date(article.reviewed_at).toLocaleDateString('cs-CZ')}
                  </p>
                )}
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                {article.author_name && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 sticky top-8">
                    <h3 className="text-sm font-medium text-white/60 mb-4">O autorovi</h3>
                    
                    <div className="flex items-center gap-4 mb-4">
                      {article.author_photo ? (
                        <img src={article.author_photo} alt={article.author_name}
                          className="w-16 h-16 rounded-full object-cover" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zfp-gold to-zfp-orange flex items-center justify-center text-white font-bold text-2xl">
                          {article.author_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="text-white font-semibold">{article.author_name}</h4>
                        <p className="text-white/60 text-sm">Finanční poradce</p>
                      </div>
                    </div>

                    {article.author_bio && (
                      <p className="text-white/70 text-sm mb-4">{article.author_bio}</p>
                    )}

                    {article.author_certifications && article.author_certifications.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-xs font-medium text-white/40 mb-2">Certifikace</h5>
                        <div className="flex flex-wrap gap-2">
                          {article.author_certifications.map((cert, i) => (
                            <span key={i} className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-xs">
                              ✓ {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <Link href="/kontakt"
                        className="block w-full py-3 bg-gradient-to-r from-zfp-gold to-zfp-orange text-white text-center font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Kontaktovat autora
                      </Link>
                    </div>
                  </div>
                )}

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Další články</h3>
                  <Link href="/poradna" className="text-zfp-orange hover:underline text-sm">
                    Zobrazit všechny články →
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-zfp-gold/10 to-zfp-orange/10 border-t border-white/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Potřebujete pomoc s tímto tématem?</h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Naši finanční poradci vám rádi pomohou. Konzultace je nezávazná a zdarma.
            </p>
            <Link href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-zfp-gold to-zfp-orange hover:from-zfp-gold/90 hover:to-zfp-orange/90 text-white font-semibold rounded-xl transition-all">
              Sjednat konzultaci
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
