export default function InsuranceIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield */}
      <path 
        d="M32 8L16 14V28C16 40 24 50 32 56C40 50 48 40 48 28V14L32 8Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Checkmark inside shield */}
      <path 
        d="M24 30L29 35L40 24" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Inner shield detail */}
      <path 
        d="M32 12L20 16V28C20 38 26 46 32 51C38 46 44 38 44 28V16L32 12Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        opacity="0.3"
      />
    </svg>
  );
}
