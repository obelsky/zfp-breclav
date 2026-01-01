export default function TeamIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="18" r="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="22" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="46" cy="22" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path 
        d="M24 52C24 46 27 42 32 42C37 42 40 46 40 52" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M12 48C12 44 14 41 18 41C22 41 24 44 24 48" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M40 48C40 44 42 41 46 41C50 41 52 44 52 48" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
    </svg>
  );
}
