'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

interface PoradnaCategory {
  id: string;
  name: string;
  slug: string;
}

// Base navigation items (without dynamic children)
const baseNavigationItems = [
  { href: '/', label: 'Domů' },
  { 
    href: '/jak-vam-muzeme-pomoci', 
    label: 'Jak vám můžeme pomoci',
    children: [
      { href: '/jak-vam-muzeme-pomoci/rozumet-financim', label: 'Rozumět financím' },
      { href: '/jak-vam-muzeme-pomoci/mit-prehled', label: 'Mít přehled a klid' },
      { href: '/jak-vam-muzeme-pomoci/rozvoj', label: 'Rozvíjet se' },
    ]
  },
  { 
    href: '/financni-vzdelavani', 
    label: 'Finanční vzdělávání',
    children: [
      { href: '/financni-vzdelavani/financni-minimum', label: 'Finanční minimum' },
      { href: '/financni-vzdelavani/financni-prehled', label: 'Finanční přehled' },
      { href: '/financni-vzdelavani/navazujici-vzdelavani', label: 'Navazující vzdělávání' },
      { href: '/financni-vzdelavani/jak-funguje-system', label: 'Jak funguje systém' },
    ]
  },
  { 
    href: '/financni-poradenstvi', 
    label: 'Finanční poradenství',
    children: [
      { href: '/financni-poradenstvi/jak-pracujeme', label: 'Jak pracujeme' },
      { href: '/financni-poradenstvi/financni-planovani', label: 'Finanční plánování' },
      { href: '/bydleni-hypoteky', label: 'Hypotéky' },
      { href: '/financni-poradenstvi/investice', label: 'Investice' },
      { href: '/financni-poradenstvi/pojisteni', label: 'Pojištění' },
      { href: '/financni-poradenstvi/reality', label: 'Reality' },
    ]
  },
  { 
    href: '/financni-nastroje', 
    label: 'Finanční nástroje',
    children: [
      { href: '/bydleni-hypoteky/kalkulacka', label: 'Hypoteční kalkulačka' },
      { href: '/bydleni-hypoteky/refinancovani#refinancing-calculator', label: 'Refinancování hypotéky' },
      { href: '/financni-poradenstvi/investice#savings-calculator', label: 'Kalkulačka spoření' },
      { href: '/financni-nastroje/duchod', label: 'Důchodová kalkulačka' },
      { href: '/financni-nastroje/kde-mizi-penize', label: 'Kde mizí peníze?' },
      { href: '/financni-nastroje/financni-zdravi', label: 'Finanční zdraví' },
      { href: '/financni-poradenstvi/pojisteni', label: 'Pojistná kalkulačka' },
      { href: '/financni-poradenstvi/reality', label: 'Kolik si můžu dovolit?' },
      { href: '/esanon', label: 'eŠanon' },
    ]
  },
  { 
    href: '/bydleni-hypoteky', 
    label: 'Bydlení & hypotéky',
    children: [
      { href: '/bydleni-hypoteky/prvni-bydleni', label: 'První bydlení' },
      { href: '/bydleni-hypoteky/rodina-s-detmi', label: 'Rodina s dětmi' },
      { href: '/bydleni-hypoteky/osvc-podnikatele', label: 'OSVČ / Podnikatelé' },
      { href: '/bydleni-hypoteky/refinancovani', label: 'Refinancování' },
      { href: '/bydleni-hypoteky/investice', label: 'Investice' },
      { href: '/bydleni-hypoteky/stavebni-upravy', label: 'Stavební úpravy' },
    ]
  },
  { 
    href: '/poradna', 
    label: 'Poradna',
    children: [], // Will be populated dynamically
    isDynamic: true,
  },
  { 
    href: '/o-kancelari', 
    label: 'O kanceláři',
    children: [
      { href: '/o-kancelari/kdo-jsme', label: 'Kdo jsme' },
      { href: '/o-kancelari/hodnoty', label: 'Hodnoty' },
      { href: '/o-kancelari/vzdelavani', label: 'Vzdělávání jako základ' },
      { href: '/o-kancelari/napojeni-na-zfp', label: 'Napojení na ZFP' },
      { href: '/o-kancelari/licence-odpovednost', label: 'Licence & odpovědnost' },
    ]
  },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const [poradnaCategories, setPoradnaCategories] = useState<PoradnaCategory[]>([]);

  // Load poradna categories from DB
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await supabase
          .from('article_categories')
          .select('id, name, slug')
          .order('sort_order');
        
        if (data) {
          setPoradnaCategories(data);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    
    loadCategories();
  }, []);

  // Build navigation items with dynamic poradna children
  const navigationItems = baseNavigationItems.map(item => {
    if (item.isDynamic && item.href === '/poradna') {
      return {
        ...item,
        children: poradnaCategories.map(cat => ({
          href: `/poradna/${cat.slug}`,
          label: cat.name,
        })),
      };
    }
    return item;
  });

  // Track hash changes for active state highlighting
  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash.slice(1));
    };
    
    // Set initial hash
    updateHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', updateHash);
    
    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  }, []);

  return (
    <>
      {/* Desktop Navigation - Vertical Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-zfp-darker border-r border-white/5 flex-col justify-between p-8 z-50">
        {/* Logo */}
        <div className="mb-12">
          <Link href="/" className="block">
            <div className="relative w-[220px] h-[150px]">
              <Image
                src="/zfp-breclav-logo.png"
                alt="ZFP GROUP Břeclav"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 space-y-1">
          {navigationItems.map((item, index) => {
            // SPECIAL HANDLING FOR TOOL LANDING PAGES VS CONTENT SECTIONS VS CROSS-LINKS
            
            // Tool landing pages: standalone calculator pages that belong to Finanční nástroje
            const toolLandingPages = [
              '/bydleni-hypoteky/kalkulacka', // Hypoteční kalkulačka - tool in Finanční nástroje
            ];
            
            // Bydlení & hypotéky content pages (should activate Bydlení menu, not Finanční nástroje)
            const bydleniContentPages = [
              '/bydleni-hypoteky/prvni-bydleni',
              '/bydleni-hypoteky/rodina-s-detmi',
              '/bydleni-hypoteky/stavebni-upravy',
              '/bydleni-hypoteky/osvc-podnikatele',
              '/bydleni-hypoteky/investice',
              '/bydleni-hypoteky/refinancovani',
              '/bydleni-hypoteky/jak-to-funguje',
              '/bydleni-hypoteky/podle-typu',
            ];
            
            // Cross-links from Finanční nástroje that point to other sections
            // These should activate the target section, not Finanční nástroje
            const crossLinkTargets = [
              '/bydleni-hypoteky/refinancovani', // Refinancování → Bydlení & hypotéky
              '/financni-poradenstvi/investice', // Kalkulačka spoření → Finanční poradenství
              '/financni-poradenstvi/pojisteni', // Pojistná kalkulačka → Finanční poradenství
              '/financni-poradenstvi/reality', // Reality kalkulačka → Finanční poradenství
            ];
            
            // Check if current path is a tool landing page, Bydlení content page, or cross-link target
            const isToolLandingPage = toolLandingPages.includes(pathname || '');
            const isBydleniContentPage = bydleniContentPages.some(page => pathname?.startsWith(page));
            const isCrossLinkTarget = crossLinkTargets.some(target => pathname?.startsWith(target));
            
            // Calculate isActive - but respect tool landing pages and cross-links!
            let isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            
            // Override isActive for special cases:
            // 1. Bydlení & hypotéky should NOT be active for tool landing pages (they belong to Finanční nástroje)
            if (item.href === '/bydleni-hypoteky' && isToolLandingPage) {
              isActive = false;
            }
            
            // 2. Finanční nástroje should NOT be active for Bydlení content pages or cross-link targets
            if (item.href === '/financni-nastroje' && (isBydleniContentPage || isCrossLinkTarget)) {
              isActive = false;
            }
            
            // 3. Finanční nástroje SHOULD be active for tool landing pages
            if (item.href === '/financni-nastroje' && isToolLandingPage) {
              isActive = true;
            }
            
            // IMPORTANT: Sections must ALWAYS be visible, never use return null!
            // Only adjust isActive and isInSection states
            
            // Check if current path is directly under this section's hierarchy
            const isDirectChild = pathname?.startsWith(item.href + '/') && !isToolLandingPage;
            
            // Check if we're on the section's main page
            const isExactMatch = pathname === item.href;
            
            // Check if current path matches any top-level navigation item
            const isTopLevelPath = navigationItems.some(navItem => pathname === navItem.href);
            
            // Check if current path is in children links
            const isChildPath = item.children?.some(child => {
              const childBasePath = child.href.split('#')[0];
              const pathMatchesChild = !isTopLevelPath && (pathname === childBasePath || pathname?.startsWith(childBasePath + '/'));
              
              if (!pathMatchesChild) return false;
              
              // CRITICAL: If this child is ALSO a parent section elsewhere (has its own nav entry with children),
              // don't consider it as "isChildPath" for THIS parent
              // This prevents opening multiple submenus
              const childIsParentSection = navigationItems.some(navItem => 
                navItem.href === childBasePath && navItem.children && navItem.children.length > 0
              );
              
              // Only return true (child path match) if the child is NOT a parent section elsewhere
              return !childIsParentSection;
            });
            
            // Check if this EXACT path (not prefix) matched as a child in an EARLIER parent
            // If so, don't open later parents that only match by prefix
            const exactPathMatchedEarlier = navigationItems.slice(0, index).some(earlierItem => {
              if (!earlierItem.children) return false;
              return earlierItem.children.some(child => {
                const childBasePath = child.href.split('#')[0];
                return pathname === childBasePath || pathname === childBasePath + '/';
              });
            });
            
            // IMPORTANT: Check if this path already matched an earlier parent
            // This prevents duplicate submenu opening for shared child links
            // EXCEPTION: If current item is the parent section (direct match, not just prefix),
            // always show its submenu regardless of earlier matches
            const isDirectParentMatch = item.href === pathname;
            const isParentSectionPath = pathname?.startsWith(item.href + '/');
            
            // If exact path matched earlier, only allow direct parent match (not prefix match)
            const isParentSection = exactPathMatchedEarlier 
              ? isDirectParentMatch 
              : (isDirectParentMatch || isParentSectionPath);
            
            // Check if this is a child of an earlier parent
            // BUT: Only block if the child is NOT a parent section itself (has no children of its own)
            const matchedByEarlierParent = !isParentSection && navigationItems.slice(0, index).some(earlierItem => {
              if (!earlierItem.children) return false;
              return earlierItem.children.some(child => {
                const childBasePath = child.href.split('#')[0];
                // Check if pathname matches or starts with this child
                const pathMatchesChild = pathname === childBasePath || pathname?.startsWith(childBasePath + '/');
                if (!pathMatchesChild) return false;
                
                // If the child is a parent section (has its own entry with children), don't block
                const childIsParentSection = navigationItems.some(navItem => 
                  navItem.href === childBasePath && navItem.children && navItem.children.length > 0
                );
                
                // Only match (and block) if child is NOT a parent section
                return !childIsParentSection;
              });
            });
            
            // Show submenu if: directly under section, exact match, or child path (but not if already matched)
            let isInSection = !matchedByEarlierParent && (isDirectChild || isExactMatch || isChildPath);
            
            // SPECIAL LOGIC FOR SPECIFIC SECTIONS:
            
            // For Finanční nástroje: Show submenu if on tool landing page
            if (item.href === '/financni-nastroje' && isToolLandingPage) {
              isInSection = true; // Open submenu for tool landing pages
            }
            
            // For Finanční nástroje: Don't show submenu if on cross-link target
            if (item.href === '/financni-nastroje' && (isBydleniContentPage || isCrossLinkTarget)) {
              isInSection = false; // Close submenu - we're in target section instead
            }
            
            // For Bydlení & hypotéky: FORCE submenu open if in content section (even if matched by earlier parent)
            if (item.href === '/bydleni-hypoteky' && isBydleniContentPage) {
              isInSection = true; // ALWAYS show submenu for our content!
            }
            
            // For Bydlení & hypotéky: Don't show submenu if on tool landing page
            if (item.href === '/bydleni-hypoteky' && isToolLandingPage) {
              isInSection = false; // Close submenu - this is Finanční nástroje tool
            }
            
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-3 px-4 text-sm font-light tracking-wide transition-all duration-300 rounded-lg ${
                    isActive
                      ? 'text-zfp-orange bg-zfp-orange/10 border-l-2 border-zfp-orange'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
                
                {/* Submenu - show when in section */}
                {item.children && isInSection && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-white/10 pl-4">
                    {item.children.map((child) => {
                      // Support hash anchors in child hrefs
                      const childBasePath = child.href.split('#')[0];
                      const childHash = child.href.split('#')[1];
                      
                      // Check if pathname matches (ignore hash for pathname comparison)
                      const pathMatches = pathname === childBasePath;
                      
                      // Use state currentHash for reactive updates
                      const hashMatches = childHash ? currentHash === childHash : true;
                      
                      // Active if path matches and (no hash requirement OR hash matches)
                      const isChildActive = pathMatches && (!childHash || hashMatches);
                      
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block py-2 text-xs transition-colors ${
                            isChildActive
                              ? 'text-zfp-orange font-medium'
                              : 'text-white/50 hover:text-white'
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-auto pt-8 border-t border-white/10">
          <Link
            href="/kontakt"
            className="block w-full py-3 px-6 text-center text-sm font-medium tracking-wider uppercase bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Kontaktujte nás
          </Link>
          
          {/* ZFP Group Logo */}
          <div className="mt-6 opacity-40">
            <div className="relative w-[160px] h-[90px]">
              <Image
                src="/zfp-breclav-logo.png"
                alt="ZFP GROUP"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-zfp-darker border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-[37px] h-[37px] flex-shrink-0">
              <Image
                src="/zfp-breclav-logo.png"
                alt="ZFP Břeclav"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-zfp-darker border-b border-white/10 max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="p-6 space-y-2">
              {navigationItems.map((item) => {
                // Tool landing pages vs content sections vs cross-links (same as desktop)
                const toolLandingPages = [
                  '/bydleni-hypoteky/kalkulacka', // Hypoteční kalkulačka - belongs to Finanční nástroje
                ];
                
                // Bydlení & hypotéky content pages (flat URLs)
                const bydleniContentPages = [
                  '/bydleni-hypoteky/prvni-bydleni',
                  '/bydleni-hypoteky/rodina-s-detmi',
                  '/bydleni-hypoteky/stavebni-upravy',
                  '/bydleni-hypoteky/osvc-podnikatele',
                  '/bydleni-hypoteky/investice',
                  '/bydleni-hypoteky/refinancovani',
                  '/bydleni-hypoteky/jak-to-funguje',
                  '/bydleni-hypoteky/podle-typu',
                ];
                
                const crossLinkTargets = [
                  '/bydleni-hypoteky/refinancovani', // Refinancování → Bydlení & hypotéky
                  '/financni-poradenstvi/investice', // Kalkulačka spoření → Finanční poradenství
                  '/financni-poradenstvi/pojisteni', // Pojistná kalkulačka → Finanční poradenství
                  '/financni-poradenstvi/reality', // Reality kalkulačka → Finanční poradenství
                ];
                
                const isToolLandingPage = toolLandingPages.includes(pathname || '');
                const isBydleniContentPage = bydleniContentPages.some(page => pathname?.startsWith(page));
                const isCrossLinkTarget = crossLinkTargets.some(target => pathname?.startsWith(target));
                
                // IMPORTANT: Sections must ALWAYS be visible (no return null!)
                // Only adjust isActive and isInSection states
                
                // Calculate isActive - but respect tool landing pages and cross-links!
                let isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                
                // Override isActive for special cases (same as desktop):
                // 1. Bydlení & hypotéky should NOT be active for tool landing pages
                if (item.href === '/bydleni-hypoteky' && isToolLandingPage) {
                  isActive = false;
                }
                
                // 2. Finanční nástroje should NOT be active for Bydlení content or cross-links
                if (item.href === '/financni-nastroje' && (isBydleniContentPage || isCrossLinkTarget)) {
                  isActive = false;
                }
                
                // 3. Finanční nástroje SHOULD be active for tool landing pages
                if (item.href === '/financni-nastroje' && isToolLandingPage) {
                  isActive = true;
                }
                
                let isInSection = !isToolLandingPage && (pathname?.startsWith(item.href + '/') || pathname === item.href);
                
                // For Finanční nástroje: Show submenu if on tool landing page
                if (item.href === '/financni-nastroje' && isToolLandingPage) {
                  isInSection = true; // Open submenu for tool landing pages
                }
                
                // For Finanční nástroje: Don't show submenu if on Bydlení content or cross-link
                if (item.href === '/financni-nastroje' && (isBydleniContentPage || isCrossLinkTarget)) {
                  isInSection = false; // Close submenu
                }
                
                // For Bydlení & hypotéky: FORCE submenu open if in content section (same as desktop)
                if (item.href === '/bydleni-hypoteky' && isBydleniContentPage) {
                  isInSection = true; // ALWAYS show submenu for our content!
                }
                
                // For Bydlení & hypotéky: Don't show submenu if on tool landing page
                if (item.href === '/bydleni-hypoteky' && isToolLandingPage) {
                  isInSection = false; // Close submenu
                }
                
                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 px-4 text-sm ${
                        isActive
                          ? 'text-zfp-orange bg-zfp-orange/10'
                          : 'text-white/70 hover:text-white'
                      } rounded-lg transition-colors`}
                    >
                      {item.label}
                    </Link>
                    
                    {item.children && isInSection && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
                        {item.children.map((child) => {
                          // Support hash anchors in child hrefs (same as desktop)
                          const childBasePath = child.href.split('#')[0];
                          const childHash = child.href.split('#')[1];
                          
                          const pathMatches = pathname === childBasePath;
                          // Use state currentHash for reactive updates
                          const hashMatches = childHash ? currentHash === childHash : true;
                          
                          const isChildActive = pathMatches && (!childHash || hashMatches);
                          
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className={`block py-2 text-xs transition-colors ${
                                isChildActive
                                  ? 'text-zfp-orange font-medium'
                                  : 'text-white/50 hover:text-white'
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              
              <Link
                href="/kontakt"
                onClick={() => setIsOpen(false)}
                className="block w-full py-3 px-6 text-center text-sm font-medium uppercase bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-colors mt-6"
              >
                Kontaktujte nás
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
