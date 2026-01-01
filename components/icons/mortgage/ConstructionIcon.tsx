export default function ConstructionIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House */}
      <path 
        d="M12 30L32 14L52 30V50C52 51.1 51.1 52 50 52H14C12.9 52 12 51.1 12 50V30Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Window being renovated */}
      <rect x="20" y="32" width="10" height="10" stroke="currentColor" strokeWidth="1.5" rx="1" strokeDasharray="2 2"/>
      <rect x="34" y="32" width="10" height="10" stroke="currentColor" strokeWidth="1.5" rx="1"/>
      {/* Hammer */}
      <path 
        d="M42 22L48 16L50 18L44 24L42 22Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="round"
      />
      <rect x="40" y="22" width="3" height="8" transform="rotate(-45 40 22)" stroke="currentColor" strokeWidth="1.5"/>
      {/* Wrench */}
      <circle cx="20" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M22 22L26 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 26L26 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Paint brush */}
      <path d="M52 38L56 34L58 36L54 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M52 38L48 42L46 40L50 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
