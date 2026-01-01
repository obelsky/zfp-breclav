export default function AdvisoryIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle 
        cx="32" 
        cy="20" 
        r="8" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
      <path 
        d="M20 52C20 44 25 38 32 38C39 38 44 44 44 52" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M48 16L52 20L48 24" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M16 16L12 20L16 24" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
