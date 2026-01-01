export type LeadStatus = 
  | 'new'
  | 'contacted'
  | 'meeting_scheduled'
  | 'in_progress'
  | 'offer_sent'
  | 'closed_won'
  | 'closed_lost'
  | 'postponed';

export type LeadSource =
  | 'contact_form'
  | 'mortgage_calculator'
  | 'retirement_calculator'
  | 'expense_analyzer'
  | 'financial_health'
  | 'savings_calculator'
  | 'insurance_calculator'
  | 'refinancing'
  | 'property_affordability'
  | 'esanon';

export interface Lead {
  id: string;
  createdAt: string;
  updatedAt: string;
  
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  source: LeadSource;
  status: LeadStatus;
  priority: 'low' | 'medium' | 'high';
  
  assignedTo: string | null;
  
  formData: Record<string, any>;
  
  notes: Note[];
  activities: Activity[];
}

export interface Note {
  id: string;
  createdAt: string;
  createdBy: string;
  content: string;
}

export interface Activity {
  id: string;
  timestamp: string;
  type: 'created' | 'status_changed' | 'assigned' | 'note_added' | 'contacted';
  description: string;
  userId: string;
}

export interface Advisor {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  active: boolean;
  leadsCount: number;
}

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'Nová',
  contacted: 'Kontaktován',
  meeting_scheduled: 'Schůzka naplánována',
  in_progress: 'V řešení',
  offer_sent: 'Nabídka odeslána',
  closed_won: 'Uzavřeno - úspěch',
  closed_lost: 'Uzavřeno - neúspěch',
  postponed: 'Odloženo',
};

export const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  contacted: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  meeting_scheduled: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  in_progress: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  offer_sent: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  closed_won: 'bg-green-500/20 text-green-400 border-green-500/30',
  closed_lost: 'bg-red-500/20 text-red-400 border-red-500/30',
  postponed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export const SOURCE_LABELS: Record<LeadSource, string> = {
  contact_form: 'Kontaktní formulář',
  mortgage_calculator: 'Hypoteční kalkulačka',
  retirement_calculator: 'Důchodová kalkulačka',
  expense_analyzer: 'Kde mizí peníze',
  financial_health: 'Finanční zdraví',
  savings_calculator: 'Kalkulačka spoření',
  insurance_calculator: 'Pojistná kalkulačka',
  refinancing: 'Refinancování',
  property_affordability: 'Kolik si můžu dovolit',
  esanon: 'eŠanon',
};
