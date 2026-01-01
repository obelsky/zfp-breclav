export default function FinanceIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 12H52V52H12V12Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M32 20V44" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M38 26C38 23.2 35.3 21 32 21C28.7 21 26 23.2 26 26C26 28.8 28.7 31 32 31C35.3 31 38 33.2 38 36C38 38.8 35.3 41 32 41C28.7 41 26 38.8 26 36" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M8 18H12M52 18H56M8 46H12M52 46H56M18 8V12M18 52V56M46 8V12M46 52V56" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
    </svg>
  );
}
