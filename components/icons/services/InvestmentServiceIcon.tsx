export default function InvestmentServiceIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Growth chart line */}
      <path 
        d="M8 48L18 38L28 42L38 28L48 32L56 18" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Arrow at end */}
      <path d="M50 18L56 18L56 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Coins stack */}
      <circle cx="18" cy="38" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="18" cy="38" rx="3" ry="1" fill="currentColor" opacity="0.2"/>
      
      <circle cx="28" cy="42" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="28" cy="42" rx="3" ry="1" fill="currentColor" opacity="0.2"/>
      
      <circle cx="38" cy="28" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="38" cy="28" rx="3" ry="1" fill="currentColor" opacity="0.2"/>
    </svg>
  );
}
