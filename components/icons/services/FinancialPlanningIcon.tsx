export default function FinancialPlanningIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document/plan */}
      <rect x="16" y="8" width="32" height="48" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      
      {/* Checklist lines */}
      <path d="M24 18H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 26H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 34H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      
      {/* Checkmarks */}
      <path d="M20 18L21 19L23 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 26L21 27L23 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 34L21 35L23 33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Chart */}
      <path d="M24 42H28V48H24V42Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M30 38H34V48H30V38Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M36 44H40V48H36V44Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}
