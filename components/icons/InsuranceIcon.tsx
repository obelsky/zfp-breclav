export default function InsuranceIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M32 10L14 18V30C14 42 20 50 32 54C44 50 50 42 50 30V18L32 10Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M26 32L30 36L38 28" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
