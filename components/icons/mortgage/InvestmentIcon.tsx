export default function InvestmentIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House 1 (small, back) */}
      <path 
        d="M12 38L22 28L32 38V48C32 49.1 31.1 50 30 50H14C12.9 50 12 49.1 12 48V38Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        opacity="0.4"
      />
      {/* House 2 (medium) */}
      <path 
        d="M24 34L36 22L48 34V50C48 51.1 47.1 52 46 52H26C24.9 52 24 51.1 24 50V34Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        opacity="0.7"
      />
      {/* House 3 (large, front) */}
      <path 
        d="M32 28L46 14L60 28V50C60 51.1 59.1 52 58 52H34C32.9 52 32 51.1 32 50V28Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Growth arrow */}
      <path 
        d="M4 48L14 38L24 44L34 28" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path d="M28 28L34 28L34 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
