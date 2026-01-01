'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NasTymPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect after 2 seconds
    const timeout = setTimeout(() => {
      router.push('/o-kancelari/kdo-jsme');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <section className="pt-24 lg:pt-32 pb-20 min-h-screen flex items-center justify-center">
      <div className="container-custom text-center">
        <div className="mb-6">
          <div className="inline-block w-12 h-1 bg-gradient-to-r from-zfp-gold to-zfp-orange mx-auto" />
        </div>
        <h1 className="mb-6">Přesměrování...</h1>
        <p className="text-xl text-white/70 mb-8">
          Stránka Náš tým se přesunula do sekce O kanceláři
        </p>
        <Link 
          href="/o-kancelari/kdo-jsme"
          className="inline-flex items-center px-10 py-5 bg-zfp-orange hover:bg-zfp-orange-hover text-white font-medium tracking-wider uppercase rounded-lg transition-all duration-300"
        >
          Přejít na Náš tým
        </Link>
      </div>
    </section>
  );
}
