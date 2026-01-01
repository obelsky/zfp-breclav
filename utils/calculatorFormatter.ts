// Format calculator data values with proper units and formatting
export function formatCalculatorValue(key: string, value: any): string {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const stringValue = String(value).toLowerCase();

  // Interest rate fields (percentages)
  if (key.includes('sazba') || key.includes('rate') || key.includes('procent')) {
    const num = parseFloat(String(value));
    if (isNaN(num)) return String(value);
    return `${num.toFixed(2)} %`;
  }

  // Duration/term fields (years)
  if (key.includes('splatnost') || key.includes('let') || key.includes('doba') || 
      key.includes('years') || key.includes('term') || key.includes('duration')) {
    const num = parseFloat(String(value));
    if (isNaN(num)) return String(value);
    const rounded = Math.round(num);
    return `${rounded} let`;
  }

  // Currency fields (amounts, prices, payments, etc.)
  if (key.includes('cena') || key.includes('vyse') || key.includes('hodnota') || 
      key.includes('splatka') || key.includes('castka') || key.includes('price') || 
      key.includes('amount') || key.includes('payment') || key.includes('loan') ||
      key.includes('vlastni') || key.includes('hypoteka') || key.includes('nemovit')) {
    const num = parseFloat(String(value));
    if (isNaN(num)) return String(value);
    const rounded = Math.round(num);
    return formatCurrency(rounded);
  }

  // Type field
  if (key === 'type' || key === 'typ') {
    return String(value);
  }

  // Default: return as string
  return String(value);
}

// Format currency with spaces and Kč
function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('cs-CZ', { 
    maximumFractionDigits: 0 
  }).replace(/\s/g, ' ')} Kč`;
}

// Get readable label for calculator field
export function getCalculatorFieldLabel(key: string): string {
  const labels: Record<string, string> = {
    type: 'Typ',
    typ: 'Typ',
    splatnost: 'Splatnost',
    urokovaSazba: 'Úroková sazba',
    vyseHypoteky: 'Výše hypotéky',
    mesicniSplatka: 'Měsíční splátka',
    cenanemovitosti: 'Cena nemovitosti',
    cenaNemovitosti: 'Cena nemovitosti',
    vlastniProstredky: 'Vlastní prostředky',
    loanAmount: 'Výše půjčky',
    interestRate: 'Úroková sazba',
    monthlyPayment: 'Měsíční splátka',
    duration: 'Doba splácení',
    propertyValue: 'Hodnota nemovitosti',
    downPayment: 'Vlastní prostředky',
  };

  return labels[key] || formatKeyName(key);
}

// Format camelCase key to readable name
function formatKeyName(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}
