// Format calculator data values with proper units and formatting
export function formatCalculatorValue(key: string, value: any): string {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const stringValue = String(value).toLowerCase();
  const keyLower = key.toLowerCase();

  // Interest rate fields (percentages)
  if (keyLower.includes('sazba') || keyLower.includes('rate') || 
      keyLower.includes('procent') || keyLower.includes('urok')) {
    const num = parseFloat(String(value));
    if (isNaN(num)) return String(value);
    return `${num.toFixed(2)} %`;
  }

  // Duration/term fields (years)
  if (keyLower.includes('splatnost') || keyLower.includes('let') || 
      keyLower.includes('doba') || keyLower.includes('years') || 
      keyLower.includes('term') || keyLower.includes('duration')) {
    const num = parseFloat(String(value));
    if (isNaN(num)) return String(value);
    const rounded = Math.round(num);
    return `${rounded} let`;
  }

  // Type field - return as text
  if (keyLower === 'type' || keyLower === 'typ') {
    return String(value);
  }

  // Check if it's a number and large enough to be currency
  const num = parseFloat(String(value));
  if (!isNaN(num)) {
    // If it's a number larger than 100, treat as currency
    if (Math.abs(num) >= 100) {
      const rounded = Math.round(num);
      return formatCurrency(rounded);
    }
    // Small numbers might be percentages or ratios - return as is
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
