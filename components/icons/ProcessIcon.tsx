export default function ProcessIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="48" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="48" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="48" cy="48" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path 
        d="M20 16H44M16 20V44M20 48H44M48 20V44" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M28 28L36 36M36 28L28 36" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
    </svg>
  );
}
