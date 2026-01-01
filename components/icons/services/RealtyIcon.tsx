export default function RealtyIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House */}
      <path 
        d="M12 28L32 12L52 28V52C52 53.1 51.1 54 50 54H14C12.9 54 12 53.1 12 52V28Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Door */}
      <path 
        d="M26 54V42C26 40.9 26.9 40 28 40H36C37.1 40 38 40.9 38 42V54" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
      
      {/* Windows */}
      <rect x="20" y="30" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1"/>
      <rect x="36" y="30" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1"/>
      
      {/* Key icon (real estate) */}
      <circle cx="44" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M47 21L52 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 24L48 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M52 22L50 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
