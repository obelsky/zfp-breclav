import { supabase, type Lead, type Note, type Activity } from '@/lib/supabase';

// Get all leads - optionally filtered by advisor
export async function getLeads(advisorId?: string): Promise<Lead[]> {
  try {
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    // Pokud je zadáno advisorId, filtruj pouze přidělené poptávky
    if (advisorId) {
      query = query.eq('assigned_advisor_id', advisorId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
}

// Get single lead
export async function getLead(id: string): Promise<Lead | null> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching lead:', error);
    return null;
  }
}

// Save new lead
export async function saveLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead | null> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single();

    if (error) throw error;

    // Add activity
    if (data) {
      await supabase.from('activities').insert([{
        lead_id: data.id,
        type: 'created',
        description: 'Poptávka vytvořena',
        user_id: 'system'
      }]);
    }

    return data;
  } catch (error) {
    console.error('Error saving lead:', error);
    return null;
  }
}

// Update lead status
export async function updateLeadStatus(id: string, status: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('leads')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;

    // Add activity
    await supabase.from('activities').insert([{
      lead_id: id,
      type: 'status_changed',
      description: `Status změněn na: ${status}`,
      user_id: 'system'
    }]);

    return true;
  } catch (error) {
    console.error('Error updating lead status:', error);
    return false;
  }
}

// Update lead priority
export async function updateLeadPriority(id: string, priority: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('leads')
      .update({ 
        priority,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;

    // Add activity
    await supabase.from('activities').insert([{
      lead_id: id,
      type: 'priority_changed',
      description: `Priorita změněna na: ${priority === 'high' ? 'vysoká' : priority === 'medium' ? 'střední' : 'nízká'}`,
      user_id: 'system'
    }]);

    return true;
  } catch (error) {
    console.error('Error updating lead priority:', error);
    return false;
  }
}

// Add note to lead
export async function addNote(leadId: string, content: string, createdBy: string): Promise<Note | null> {
  try {
    const { data, error } = await supabase
      .from('notes')
      .insert([{
        lead_id: leadId,
        content,
        created_by: createdBy
      }])
      .select()
      .single();

    if (error) throw error;

    // Add activity
    await supabase.from('activities').insert([{
      lead_id: leadId,
      type: 'note_added',
      description: 'Poznámka přidána',
      user_id: createdBy
    }]);

    return data;
  } catch (error) {
    console.error('Error adding note:', error);
    return null;
  }
}

// Get notes for lead
export async function getNotes(leadId: string): Promise<Note[]> {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
}

// Get activities for lead
export async function getActivities(leadId: string): Promise<Activity[]> {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('lead_id', leadId)
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
}

// Get lead statistics
// Get lead statistics - optionally filtered by advisor
export async function getLeadStats(advisorId?: string) {
  try {
    let query = supabase
      .from('leads')
      .select('status, assigned_advisor_id');

    // Pokud je zadáno advisorId, filtruj pouze přidělené poptávky
    if (advisorId) {
      query = query.eq('assigned_advisor_id', advisorId);
    }

    const { data: leads, error } = await query;

    if (error) throw error;

    const stats = {
      total: leads?.length || 0,
      new: leads?.filter(l => l.status === 'new').length || 0,
      inProgress: leads?.filter(l => l.status === 'in_progress').length || 0,
      closed: leads?.filter(l => ['closed_won', 'closed_lost'].includes(l.status)).length || 0,
    };

    return stats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      total: 0,
      new: 0,
      inProgress: 0,
      closed: 0,
    };
  }
}

// Delete lead
export async function deleteLead(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting lead:', error);
    return false;
  }
}

// ============= ADVISOR MANAGEMENT =============

export interface Advisor {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'advisor';
  active: boolean;
  created_at: string;
  // Přihlašovací údaje
  username?: string;
  password?: string;
  last_login_at?: string;
}

export interface AdvisorInput {
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'advisor';
  active: boolean;
  username: string;
  password?: string;
}

// Get all advisors
export async function getAdvisors(): Promise<Advisor[]> {
  try {
    const { data, error } = await supabase
      .from('advisors')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      // Return mock data for development
      return getMockAdvisors();
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching advisors:', error);
    return getMockAdvisors();
  }
}

// Get single advisor
export async function getAdvisor(id: string): Promise<Advisor | null> {
  try {
    const { data, error} = await supabase
      .from('advisors')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching advisor:', error);
    // Return mock data
    const advisors = getMockAdvisors();
    return advisors.find(a => a.id === id) || null;
  }
}

// Save new advisor
export async function saveAdvisor(advisor: AdvisorInput & { requirePasswordChange?: boolean }): Promise<Advisor | null> {
  try {
    // Připrav data pro uložení - POUZE platné sloupce!
    const advisorData: Record<string, any> = {
      name: advisor.name,
      email: advisor.email,
      phone: advisor.phone,
      role: advisor.role,
      active: advisor.active,
    };
    
    // Přidej username pokud je vyplněné
    if (advisor.username && advisor.username.trim()) {
      advisorData.username = advisor.username.toLowerCase().trim();
    }
    
    // Přidej heslo pouze pokud je vyplněné a má min. 6 znaků
    if (advisor.password && advisor.password.length >= 6) {
      advisorData.password = advisor.password;
    }

    console.log('Saving advisor with data:', { ...advisorData, password: advisorData.password ? '***' : undefined });

    const { data, error } = await supabase
      .from('advisors')
      .insert([advisorData])
      .select()
      .single();

    if (error) {
      console.error('Supabase INSERT error:', error);
      throw error;
    }
    
    console.log('Advisor saved successfully:', data?.id);
    return data;
  } catch (error) {
    console.error('Error saving advisor:', error);
    return null;
  }
}

// Update advisor
export async function updateAdvisor(id: string, updates: Partial<AdvisorInput> & { requirePasswordChange?: boolean }): Promise<Advisor | null> {
  try {
    // Připrav data pro update - POUZE platné sloupce!
    const updateData: Record<string, any> = {};
    
    // Kopíruj pouze platné sloupce
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.role !== undefined) updateData.role = updates.role;
    if (updates.active !== undefined) updateData.active = updates.active;
    
    // Zpracuj username - lowercase a trim
    if (updates.username && updates.username.trim()) {
      updateData.username = updates.username.toLowerCase().trim();
    }
    
    // Zpracuj heslo - aktualizuj pouze pokud je vyplněné a má min. 6 znaků
    if (updates.password && updates.password.length >= 6) {
      updateData.password = updates.password;
    }
    
    // NEZAHRNOVAT: requirePasswordChange (není v DB)

    console.log('Updating advisor', id, 'with data:', { ...updateData, password: updateData.password ? '***' : undefined });

    const { data, error } = await supabase
      .from('advisors')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase UPDATE error:', error);
      throw error;
    }
    
    console.log('Advisor updated successfully:', data?.id);
    return data;
  } catch (error) {
    console.error('Error updating advisor:', error);
    return null;
  }
}

// Delete advisor
export async function deleteAdvisor(id: string): Promise<boolean> {
  try {
    // First, unassign all leads from this advisor
    await supabase
      .from('leads')
      .update({ assigned_advisor_id: null })
      .eq('assigned_advisor_id', id);

    // Then delete the advisor
    const { error } = await supabase
      .from('advisors')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting advisor:', error);
    return false;
  }
}

// Assign advisor to lead
export async function assignAdvisorToLead(leadId: string, advisorId: string | null): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('leads')
      .update({ assigned_advisor_id: advisorId })
      .eq('id', leadId);

    if (error) throw error;

    // Add activity
    if (advisorId) {
      const advisor = await getAdvisor(advisorId);
      await supabase.from('activities').insert([{
        lead_id: leadId,
        type: 'assigned',
        description: `Přiřazeno poradci: ${advisor?.name || 'Neznámý'}`,
        user_id: advisorId,
      }]);
    }

    return true;
  } catch (error) {
    console.error('Error assigning advisor:', error);
    return false;
  }
}

// Get advisor's leads count
export async function getAdvisorLeadsCount(advisorId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('assigned_advisor_id', advisorId)
      .not('status', 'in', '(closed_won,closed_lost)');

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error counting advisor leads:', error);
    return 0;
  }
}

// Mock advisors for development/testing
function getMockAdvisors(): Advisor[] {
  return [
    {
      id: 'advisor-1',
      name: 'Ondřej Bělský',
      email: 'ondrej@zfpbreclav.cz',
      phone: '+420 777 123 456',
      role: 'admin',
      active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 'advisor-2',
      name: 'Testovací Poradce',
      email: 'test@zfpbreclav.cz',
      phone: '+420 777 654 321',
      role: 'advisor',
      active: true,
      created_at: new Date().toISOString(),
    },
  ];
}

