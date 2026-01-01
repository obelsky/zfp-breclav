export default function ContactIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M52 44V50C52 51.1 51.1 52 50 52H14C12.9 52 12 51.1 12 50V14C12 12.9 12.9 12 14 12H20" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M44 12H52V20" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M32 32L52 12" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <circle 
        cx="24" 
        cy="40" 
        r="4" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
    </svg>
  );
}
