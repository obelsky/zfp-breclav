import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface ArticleData {
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
  category_name?: string;
  category_slug?: string;
  category_color?: string;
  author_name?: string;
  author_bio?: string;
  author_photo?: string;
  author_certifications?: string[];
  author_specializations?: string[];
  reviewer_name?: string;
}

async function getArticle(slug: string): Promise<ArticleData | null> {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      article_categories(name, slug, color)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) {
    console.error('Error fetching article:', error);
    return null;
  }

  // Get author info separately
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  
  if (!article) {
    return {
      title: 'Článek nenalezen | ZFP GROUP Břeclav',
    };
  }

  return {
    title: article.meta_title || `${article.title} | ZFP GROUP Břeclav`,
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

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

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
      logo: {
        '@type': 'ImageObject',
        url: 'https://zfpbreclav.cz/zfp-breclav-logo.png',
      },
    },
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="min-h-screen bg-zfp-dark">
        {/* Hero */}
        <section className="relative py-16 md:py-24 border-b border-white/10">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-white/60">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Domů
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/poradna" className="hover:text-white transition-colors">
                    Poradna
                  </Link>
                </li>
                {article.category_name && (
                  <>
                    <li>/</li>
                    <li>
                      <Link 
                        href={`/poradna/kategorie/${article.category_slug}`}
                        className="hover:text-white transition-colors"
                      >
                        {article.category_name}
                      </Link>
                    </li>
                  </>
                )}
              </ol>
            </nav>

            <div className="max-w-4xl">
              {/* Category */}
              {article.category_name && (
                <span 
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-4"
                  style={{ backgroundColor: article.category_color || '#D4A853' }}
                >
                  {article.category_name}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-white/60">
                {article.author_name && (
                  <div className="flex items-center gap-2">
                    {article.author_photo ? (
                      <img 
                        src={article.author_photo} 
                        alt={article.author_name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
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
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
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
                {/* Featured Image */}
                {article.featured_image && (
                  <img
                    src={article.featured_image}
                    alt={article.featured_image_alt || article.title}
                    className="w-full rounded-2xl mb-8"
                  />
                )}

                {/* Excerpt */}
                {article.excerpt && (
                  <p className="text-xl text-white/80 mb-8 leading-relaxed border-l-4 border-zfp-gold pl-6">
                    {article.excerpt}
                  </p>
                )}

                {/* Content */}
                <div 
                  className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-white prose-headings:font-bold
                    prose-p:text-white/80 prose-p:leading-relaxed
                    prose-a:text-zfp-orange prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white
                    prose-ul:text-white/80 prose-ol:text-white/80
                    prose-blockquote:border-zfp-gold prose-blockquote:text-white/70
                    prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  "
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Disclaimer */}
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

                {/* Sources */}
                {article.sources && article.sources.length > 0 && (
                  <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="text-white font-semibold mb-4">Zdroje</h4>
                    <ul className="space-y-2">
                      {article.sources.map((source, i) => (
                        <li key={i} className="text-white/60 text-sm">
                          {source.startsWith('http') ? (
                            <a 
                              href={source} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-zfp-orange hover:underline"
                            >
                              {source}
                            </a>
                          ) : (
                            source
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Last updated */}
                {article.reviewed_at && (
                  <p className="mt-8 text-white/40 text-sm">
                    Naposledy ověřeno: {new Date(article.reviewed_at).toLocaleDateString('cs-CZ')}
                    {article.reviewer_name && ` • ${article.reviewer_name}`}
                  </p>
                )}
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                {/* Author Box - EEAT */}
                {article.author_name && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 sticky top-8">
                    <h3 className="text-sm font-medium text-white/60 mb-4">O autorovi</h3>
                    
                    <div className="flex items-center gap-4 mb-4">
                      {article.author_photo ? (
                        <img 
                          src={article.author_photo} 
                          alt={article.author_name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
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

                    {/* Certifications - YMYL Trust signals */}
                    {article.author_certifications && article.author_certifications.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-xs font-medium text-white/40 mb-2">Certifikace</h5>
                        <div className="flex flex-wrap gap-2">
                          {article.author_certifications.map((cert, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-xs"
                            >
                              ✓ {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specializations */}
                    {article.author_specializations && article.author_specializations.length > 0 && (
                      <div>
                        <h5 className="text-xs font-medium text-white/40 mb-2">Specializace</h5>
                        <div className="flex flex-wrap gap-2">
                          {article.author_specializations.map((spec, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 bg-white/5 rounded text-white/60 text-xs"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <Link
                        href="/kontakt"
                        className="block w-full py-3 bg-gradient-to-r from-zfp-gold to-zfp-orange text-white text-center font-medium rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Kontaktovat autora
                      </Link>
                    </div>
                  </div>
                )}

                {/* Related Articles placeholder */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Další články</h3>
                  <Link
                    href="/poradna"
                    className="text-zfp-orange hover:underline text-sm"
                  >
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
            <h2 className="text-3xl font-bold text-white mb-4">
              Potřebujete pomoc s tímto tématem?
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Naši finanční poradci vám rádi pomohou. Konzultace je nezávazná a zdarma.
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
    </>
  );
}
