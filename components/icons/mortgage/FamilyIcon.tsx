export default function FamilyIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House roof */}
      <path 
        d="M10 30L32 12L54 30" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* House base */}
      <path 
        d="M14 30V52C14 53.1 14.9 54 16 54H48C49.1 54 50 53.1 50 52V30" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      {/* Family figures (parent 1) */}
      <circle cx="24" cy="38" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M24 41C24 41 21 41 21 44V48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 41C24 41 27 41 27 44V48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Family figures (parent 2) */}
      <circle cx="32" cy="38" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M32 41C32 41 29 41 29 44V48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 41C32 41 35 41 35 44V48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Child */}
      <circle cx="40" cy="40" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 42C40 42 38 42 38 44V48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M40 42C40 42 42 42 42 44V48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
