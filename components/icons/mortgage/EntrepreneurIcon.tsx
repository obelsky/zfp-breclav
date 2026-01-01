export default function EntrepreneurIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House background */}
      <path 
        d="M12 30L32 14L52 30V50C52 51.1 51.1 52 50 52H14C12.9 52 12 51.1 12 50V30Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        opacity="0.3"
      />
      {/* Briefcase */}
      <rect 
        x="20" 
        y="32" 
        width="24" 
        height="18" 
        rx="2" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
      {/* Briefcase handle */}
      <path 
        d="M26 32V28C26 26.9 26.9 26 28 26H36C37.1 26 38 26.9 38 28V32" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
      {/* Briefcase lock */}
      <circle cx="32" cy="41" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M32 43V45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Document lines inside briefcase */}
      <path d="M24 37H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M36 37H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}
