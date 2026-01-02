'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const navigationItems = [
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
    href: '/bydleni-hypoteky', 
    label: 'Bydlení & hypotéky',
    children: [
      { href: '/bydleni-hypoteky/situace/prvni-bydleni', label: 'První bydlení' },
      { href: '/bydleni-hypoteky/situace/rodina-s-detmi', label: 'Rodina s dětmi' },
      { href: '/bydleni-hypoteky/situace/osvc-podnikatele', label: 'OSVČ / Podnikatelé' },
      { href: '/bydleni-hypoteky/situace/refinancovani', label: 'Refinancování' },
      { href: '/bydleni-hypoteky/situace/investice', label: 'Investice' },
      { href: '/bydleni-hypoteky/situace/stavebni-upravy', label: 'Stavební úpravy' },
      { href: '/bydleni-hypoteky/kalkulacka', label: 'Hypoteční kalkulačka' },
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
      { href: '/financni-poradenstvi/sluzby/financni-planovani', label: 'Finanční plánování' },
      { href: '/bydleni-hypoteky', label: 'Hypotéky' },
      { href: '/financni-poradenstvi/sluzby/investice', label: 'Investice' },
      { href: '/financni-poradenstvi/sluzby/pojisteni', label: 'Pojištění' },
      { href: '/financni-poradenstvi/sluzby/reality', label: 'Reality' },
      { href: '/o-kancelari/kdo-jsme', label: 'Náš tým' },
    ]
  },
  { 
    href: '/financni-nastroje', 
    label: 'Finanční nástroje',
    children: [
      { href: '/bydleni-hypoteky/kalkulacka', label: 'Hypoteční kalkulačka' },
      { href: '/bydleni-hypoteky/situace/refinancovani', label: 'Refinancování hypotéky' },
      { href: '/financni-poradenstvi/sluzby/investice#savings-calculator', label: 'Kalkulačka spoření' },
      { href: '/financni-nastroje/duchod', label: 'Důchodová kalkulačka' },
      { href: '/financni-nastroje/kde-mizi-penize', label: 'Kde mizí peníze?' },
      { href: '/financni-nastroje/financni-zdravi', label: 'Finanční zdraví' },
      { href: '/financni-poradenstvi/sluzby/pojisteni', label: 'Pojistná kalkulačka' },
      { href: '/financni-poradenstvi/sluzby/reality', label: 'Kolik si můžu dovolit?' },
      { href: '/esanon', label: 'eŠanon' },
    ]
  },
  { 
    href: '/poradna', 
    label: 'Poradna',
    children: [
      { href: '/poradna/finance', label: 'Finance' },
      { href: '/poradna/investovani', label: 'Investování' },
      { href: '/poradna/pojisteni', label: 'Pojištění' },
      { href: '/poradna/reality', label: 'Reality' },
      { href: '/poradna/legislativa', label: 'Legislativa' },
    ]
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
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            
            // Check if current path is directly under this section's hierarchy
            const isDirectChild = pathname?.startsWith(item.href + '/');
            
            // Check if we're on the section's main page
            const isExactMatch = pathname === item.href;
            
            // Check if current path matches any top-level navigation item
            const isTopLevelPath = navigationItems.some(navItem => pathname === navItem.href);
            
            // Check if current path is in children links
            // BUT: don't match if current path is a top-level item in navigation
            const isChildPath = item.children?.some(child => {
              const childBasePath = child.href.split('#')[0];
              return !isTopLevelPath && (pathname === childBasePath || pathname?.startsWith(childBasePath + '/'));
            });
            
            // Show submenu if: directly under section, exact match, or child path
            const isInSection = isDirectChild || isExactMatch || isChildPath;
            
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
                      const isChildActive = pathname === child.href;
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
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-zfp-darker/95 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="relative w-[180px] h-[122px]">
            <Image
              src="/zfp-breclav-logo.png"
              alt="ZFP GROUP Břeclav"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white/70 hover:text-white"
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
                const isActive = pathname === item.href;
                const isInSection = pathname?.startsWith(item.href + '/') || pathname === item.href;
                
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
                          const isChildActive = pathname === child.href;
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
