import { supabase, type Lead, type Note, type Activity } from '@/lib/supabase';

// Get all leads
export async function getLeads(): Promise<Lead[]> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

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
export async function getLeadStats() {
  try {
    const { data: leads, error } = await supabase
      .from('leads')
      .select('status');

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
