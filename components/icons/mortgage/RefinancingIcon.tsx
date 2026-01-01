export default function RefinancingIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House */}
      <path 
        d="M16 32L32 18L48 32V50C48 51.1 47.1 52 46 52H18C16.9 52 16 51.1 16 50V32Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Door */}
      <path 
        d="M28 52V44C28 42.9 28.9 42 30 42H34C35.1 42 36 42.9 36 44V52" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
      {/* Circular arrow (refinancing) */}
      <path 
        d="M52 24C50 18 45 14 39 14C33 14 28 18 26 24" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path d="M48 24L52 24L52 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Second arrow */}
      <path 
        d="M12 40C14 46 19 50 25 50C31 50 36 46 38 40" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path d="M16 40L12 40L12 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
