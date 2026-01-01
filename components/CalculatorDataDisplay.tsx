'use client';

interface CalculatorDataDisplayProps {
  data: Record<string, any>;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CalculatorDataDisplay({ data, checked, onChange }: CalculatorDataDisplayProps) {
  const formatValue = (key: string, value: any): string => {
    if (typeof value === 'number') {
      // Pokud klíč obsahuje "procent" nebo "sazba", zobraz jako %
      if (key.toLowerCase().includes('procent') || key.toLowerCase().includes('sazba') || key.toLowerCase().includes('ratio')) {
        return `${value.toFixed(1)}%`;
      }
      // Pokud je to velké číslo (nad 1000), formátuj jako měnu
      if (value >= 1000) {
        return new Intl.NumberFormat('cs-CZ', {
          style: 'currency',
          currency: 'CZK',
          maximumFractionDigits: 0,
        }).format(value);
      }
      return value.toString();
    }
    return value;
  };

  const getDisplayName = (key: string): string => {
    const nameMap: Record<string, string> = {
      // Hypotéka
      cenaNemovitosti: 'Cena nemovitosti',
      vlastniProstredky: 'Vlastní prostředky',
      vyseHypoteky: 'Výše hypotéky',
      urokovaSazba: 'Úroková sazba',
      splatnost: 'Splatnost',
      mesicniSplatka: 'Měsíční splátka',
      
      // Refinancování
      zbyvajiciDluh: 'Zbývající dluh',
      soucasnaUrokova: 'Současná sazba',
      novaUrokova: 'Nová sazba',
      mesicniUspora: 'Měsíční úspora',
      celkovaUspora: 'Celková úspora',
      
      // Spoření
      mesicniVklad: 'Měsíční vklad',
      dobaSporeni: 'Doba spoření',
      konecnaHodnota: 'Konečná hodnota',
      celkovyZisk: 'Celkový zisk',
      
      // Pojištění
      rodinnyStav: 'Rodinný stav',
      pojisteniScore: 'Hodnocení pojištění',
      chybejiPojisteni: 'Chybějící pojištění',
      
      // Reality
      mesicniPrijem: 'Měsíční příjem',
      maxCenaNemovitosti: 'Max. cena nemovitosti',
      dtiRatio: 'DTI ratio',
      
      // Analyzér výdajů
      celkoveVydaje: 'Celkové výdaje',
      zbyvaPenize: 'Zbývá peněz',
      potencialniUspora: 'Potenciální úspora',
      
      // Důchod
      soucasnyVek: 'Současný věk',
      duchodovyVek: 'Důchodový věk',
      celkemPotrebuje: 'Celkem potřebuje',
      celkemUsporim: 'Celkem uspoří',
      chybi: 'Chybí',
      
      // Finanční zdraví
      score: 'Skóre',
      hodnoceni: 'Hodnocení',
      rezerva: 'Rezerva',
      sporeniProcent: 'Spoření %',
    };
    
    return nameMap[key] || key;
  };

  // Filtr pouze důležitých klíčů (ne type)
  const importantKeys = Object.keys(data).filter(key => {
    if (key === 'type') return false;
    
    // Pro každý typ kalkulačky vybereme max 5 nejdůležitějších hodnot
    const type = data.type;
    
    if (type === 'hypotéka') {
      return ['vyseHypoteky', 'mesicniSplatka', 'urokovaSazba', 'splatnost'].includes(key);
    }
    
    if (type === 'refinancování') {
      return ['zbyvajiciDluh', 'mesicniUspora', 'celkovaUspora', 'novaUrokova'].includes(key);
    }
    
    if (type === 'spoření') {
      return ['mesicniVklad', 'dobaSporeni', 'konecnaHodnota', 'celkovyZisk'].includes(key);
    }
    
    if (type === 'pojištění') {
      return ['rodinnyStav', 'pojisteniScore', 'chybejiPojisteni'].includes(key);
    }
    
    if (type === 'reality') {
      return ['mesicniPrijem', 'maxCenaNemovitosti', 'dtiRatio'].includes(key);
    }
    
    if (type === 'analyzér výdajů') {
      return ['mesicniPrijem', 'celkoveVydaje', 'zbyvaPenize', 'potencialniUspora'].includes(key);
    }
    
    if (type === 'důchodová kalkulačka') {
      return ['soucasnyVek', 'duchodovyVek', 'celkemPotrebuje', 'chybi'].includes(key);
    }
    
    if (type === 'finanční zdraví') {
      return ['score', 'hodnoceni', 'rezerva', 'sporeniProcent'].includes(key);
    }
    
    return true; // default: zobraz všechno kromě type
  });

  const getCalculatorTitle = (type: string): string => {
    const titleMap: Record<string, string> = {
      'hypotéka': 'hypoteční kalkulačky',
      'refinancování': 'refinancovací kalkulačky',
      'spoření': 'spořící kalkulačky',
      'pojištění': 'pojistné kalkulačky',
      'reality': 'reality kalkulačky',
      'analyzér výdajů': 'analyzéru výdajů',
      'důchodová kalkulačka': 'důchodové kalkulačky',
      'finanční zdraví': 'hodnocení finančního zdraví',
    };
    
    return titleMap[type] || 'kalkulačky';
  };

  return (
    <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4">
      <label className="flex items-start space-x-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 w-5 h-5 rounded border-blue-500 bg-blue-500/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold text-blue-300">
              Zahrnout data z {getCalculatorTitle(data.type)}
            </span>
          </div>
          
          {/* Zobrazení dat */}
          <div className="space-y-1.5 mb-2">
            {importantKeys.map((key) => (
              <div key={key} className="flex justify-between items-center text-sm">
                <span className="text-white/60">{getDisplayName(key)}:</span>
                <span className="font-medium text-white/90">{formatValue(key, data[key])}</span>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-white/50">
            Pomůže nám lépe porozumět vašim finančním možnostem
          </p>
        </div>
      </label>
    </div>
  );
}
