export default function InvestmentIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 48L24 36L32 44L52 24" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M42 24H52V34" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="24" 
        cy="36" 
        r="2" 
        fill="currentColor"
      />
      <circle 
        cx="32" 
        cy="44" 
        r="2" 
        fill="currentColor"
      />
      <circle 
        cx="52" 
        cy="24" 
        r="2" 
        fill="currentColor"
      />
    </svg>
  );
}
