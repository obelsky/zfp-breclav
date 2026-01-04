'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  const [wastedTime, setWastedTime] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [investmentValue, setInvestmentValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWastedTime(prev => prev + 1);
      // Pokud bychom investovali 1 Kč za každou vteřinu při 5% ročním výnosu
      const potentialValue = (wastedTime * 1.05 ** (1/31536000)).toFixed(2);
      setInvestmentValue(parseFloat(potentialValue));
    }, 1000);

    return () => clearInterval(interval);
  }, [wastedTime]);

  const funnyTips = [
    "Tato stránka neexistuje, stejně jako 'zaručené' investice bez rizika.",
    "404 = stránka nenalezena. Podobně jako většina lidí nenachází čas na finanční plánování.",
    "Ztratili jste se? Nebojte se, většina lidí se ztrácí i ve svých financích.",
    "Hledáte něco? My taky - hledáme lidi, kteří mají finanční plán.",
  ];

  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % funnyTips.length);
    }, 5000);

    return () => clearInterval(tipInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zfp-darker via-zfp-dark to-zfp-darker flex items-center justify-center px-4 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-zfp-gold/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Giant 404 */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="relative"
          >
            <h1 className="text-[12rem] md:text-[16rem] font-bold leading-none mb-0">
              <span className="bg-gradient-to-r from-zfp-gold via-zfp-orange to-zfp-gold bg-clip-text text-transparent">
                404
              </span>
            </h1>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 right-1/4 text-6xl"
            >
              💸
            </motion.div>
          </motion.div>

          {/* Main message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Gratulujeme! Právě jste objevili...
            </h2>
            <p className="text-xl md:text-2xl text-white/70">
              ...finanční ekvivalent černé díry. Stránka, která pohltila váš čas.
            </p>
          </motion.div>

          {/* Wasted Time Calculator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-4xl">⏱️</span>
              <h3 className="text-2xl font-bold text-white">
                Kalkulačka ztracených vteřin™
              </h3>
              <span className="text-4xl">💰</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-6">
                <div className="text-sm text-white/60 mb-2">Čas strávený na této stránce:</div>
                <div className="text-5xl font-bold text-red-400">
                  {wastedTime}s
                </div>
                <div className="text-xs text-white/40 mt-2">
                  A počítá se...
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
                <div className="text-sm text-white/60 mb-2">Potenciální investiční hodnota:</div>
                <div className="text-5xl font-bold text-green-400">
                  {wastedTime} Kč
                </div>
                <div className="text-xs text-white/40 mt-2">
                  @1 Kč/s při 5% p.a. 📈
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 p-4 bg-zfp-orange/20 border border-zfp-orange/40 rounded-lg"
            >
              <p className="text-sm text-orange-200">
                <strong>💡 Finanční moudro:</strong> Kdybychom investovali 1 Kč za každou vteřinu 
                strávenou hledáním neexistujících stránek, za rok bychom měli {(31536000 * 1.05).toLocaleString('cs-CZ')} Kč!
              </p>
            </motion.div>
          </motion.div>

          {/* Funny rotating tips */}
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mb-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">🤔</span>
              <p className="text-lg text-white/80 italic">
                "{funnyTips[currentTip]}"
              </p>
            </div>
          </motion.div>

          {/* Useful links */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Link
              href="/"
              className="group bg-gradient-to-br from-zfp-gold/20 to-zfp-orange/20 hover:from-zfp-gold/30 hover:to-zfp-orange/30 border border-zfp-gold/30 rounded-xl p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-2">🏠</div>
              <div className="font-semibold text-white mb-1">Domů</div>
              <div className="text-sm text-white/60">Bezpečný přístav</div>
            </Link>

            <Link
              href="/financni-nastroje"
              className="group bg-gradient-to-br from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-500/30 rounded-xl p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-2">🧮</div>
              <div className="font-semibold text-white mb-1">Kalkulačky</div>
              <div className="text-sm text-white/60">Funkční stránky!</div>
            </Link>

            <Link
              href="/kontakt"
              className="group bg-gradient-to-br from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 rounded-xl p-6 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-2">💬</div>
              <div className="font-semibold text-white mb-1">Kontakt</div>
              <div className="text-sm text-white/60">Pomůžeme vám</div>
            </Link>
          </div>

          {/* Easter egg button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              {showCalculator ? '📊 Skrýt' : '🎯 Klikni pro finanční easter egg'}
            </button>

            {showCalculator && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl"
              >
                <h4 className="text-lg font-semibold text-white mb-3">
                  🎉 Našli jste tajnou kalkulačku!
                </h4>
                <p className="text-white/70 mb-4">
                  Pokud byste každý den strávili 1 minutu hledáním neexistujících stránek 
                  a místo toho bychom investovali 10 Kč denně při 7% ročním výnosu:
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">18 250 Kč</div>
                    <div className="text-sm text-white/60">Za 5 let</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">42 150 Kč</div>
                    <div className="text-sm text-white/60">Za 10 let</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">199 317 Kč</div>
                    <div className="text-sm text-white/60">Za 20 let</div>
                  </div>
                </div>
                <p className="text-xs text-white/40 mt-4">
                  * Výpočet je orientační. Investování s sebou nese rizika. Ale hledání 404 stránek taky! 😄
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Footer message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-12 text-center"
          >
            <p className="text-white/40 text-sm">
              P.S. Děkujeme, že jste našli náš malý finanční experiment. 
              Pokud vás tohle pobavilo, představte si, jak zábavné může být skutečné finanční plánování! 
              (No dobře, možná ne až tak zábavné, ale určitě užitečnější.) 😊
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
