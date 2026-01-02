'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CRMNavigation from '@/components/crm/CRMNavigation';
import QuickActions from '@/components/crm/QuickActions';
import { getLead, updateLeadStatus, updateLeadPriority, addNote, getNotes, getActivities } from '@/utils/crmStorage';
import { Lead, Note, Activity, STATUS_LABELS, SOURCE_LABELS, STATUS_COLORS, LeadStatus } from '@/types/crm';
import { formatCalculatorValue, getCalculatorFieldLabel } from '@/utils/calculatorFormatter';

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeadData();
  }, [leadId]);

  const loadLeadData = async () => {
    setLoading(true);
    try {
      const [leadData, notesData, activitiesData] = await Promise.all([
        getLead(leadId),
        getNotes(leadId),
        getActivities(leadId)
      ]);
      
      setLead(leadData);
      setNotes(notesData);
      setActivities(activitiesData);
    } catch (error) {
      console.error('Error loading lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (!lead) return;
    
    const success = await updateLeadStatus(leadId, newStatus);
    if (success) {
      setLead({ ...lead, status: newStatus, updated_at: new Date().toISOString() });
      await loadLeadData(); // Reload to get new activity
    }
  };

  const handlePriorityChange = async (newPriority: 'low' | 'medium' | 'high') => {
    if (!lead) return;
    
    const success = await updateLeadPriority(leadId, newPriority);
    if (success) {
      setLead({ ...lead, priority: newPriority, updated_at: new Date().toISOString() });
      await loadLeadData(); // Reload to get new activity
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim() || !lead) return;
    
    setIsAddingNote(true);
    const note = await addNote(leadId, newNote, 'system');
    
    if (note) {
      setNotes([note, ...notes]);
      setNewNote('');
      await loadLeadData(); // Reload to get new activity
    }
    setIsAddingNote(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-zfp-dark">
        <CRMNavigation />
        <div className="ml-64 flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-zfp-orange border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-white/60">Načítání...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex min-h-screen bg-zfp-dark">
        <CRMNavigation />
        <div className="ml-64 flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Poptávka nenalezena</h1>
            <button
              onClick={() => router.push('/crm/leads')}
              className="px-6 py-3 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all"
            >
              Zpět na seznam
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusColor = STATUS_COLORS[lead.status as LeadStatus] || 'bg-gray-500';

  return (
    <div className="flex min-h-screen bg-zfp-dark">
      <CRMNavigation />
      
      <div className="flex-1 p-4 md:p-8 pt-20 lg:pt-8 lg:ml-64">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => router.push('/crm/leads')}
              className="p-2 hover:bg-white/5 rounded-lg transition-all flex-shrink-0"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="min-w-0">
              <h1 className="text-xl md:text-3xl font-bold truncate">
                {lead.first_name} {lead.last_name}
              </h1>
              <p className="text-white/60 mt-1 text-xs md:text-sm">
                {SOURCE_LABELS[lead.source]} • {new Date(lead.created_at).toLocaleDateString('cs-CZ')}
              </p>
            </div>
          </div>

          <button
            onClick={loadLeadData}
            className="px-3 md:px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all flex items-center gap-2 text-sm md:text-base w-full sm:w-auto justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Obnovit
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Kontaktní údaje</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zfp-orange/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-zfp-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Email</p>
                    <a href={`mailto:${lead.email}`} className="text-zfp-gold hover:underline">
                      {lead.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zfp-gold/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-zfp-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Telefon</p>
                    <a href={`tel:${lead.phone}`} className="text-zfp-gold hover:underline">
                      {lead.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Data */}
            {lead.form_data && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Data z formuláře</h2>
                
                <div className="space-y-3">
                  {lead.form_data.subject && (
                    <div>
                      <p className="text-sm text-white/60 mb-1">Předmět</p>
                      <p className="text-white">{lead.form_data.subject}</p>
                    </div>
                  )}
                  
                  {lead.form_data.message && (
                    <div>
                      <p className="text-sm text-white/60 mb-1">Zpráva</p>
                      <p className="text-white whitespace-pre-wrap">{lead.form_data.message}</p>
                    </div>
                  )}

                  {lead.form_data.calculatorData && (
                    <div>
                      <p className="text-sm text-white/60 mb-2">Data z kalkulačky</p>
                      <div className="bg-white/5 rounded-lg p-4 space-y-3">
                        {Object.entries(lead.form_data.calculatorData).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-start gap-4">
                            <span className="text-white/60 text-sm flex-shrink-0">
                              {getCalculatorFieldLabel(key)}
                            </span>
                            <span className="text-white font-medium text-sm text-right">
                              {formatCalculatorValue(key, value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Poznámky</h2>
                <span className="text-sm text-white/60">{notes.length} poznámek</span>
              </div>

              {/* Add Note */}
              <div className="mb-6">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Přidat poznámku..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-white/40 focus:outline-none focus:border-zfp-orange/50 resize-none"
                  rows={3}
                />
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim() || isAddingNote}
                  className="mt-2 px-4 py-2 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingNote ? 'Přidávám...' : 'Přidat poznámku'}
                </button>
              </div>

              {/* Notes List */}
              <div className="space-y-4">
                {notes.length === 0 ? (
                  <p className="text-center text-white/40 py-8">Zatím žádné poznámky</p>
                ) : (
                  notes.map((note) => (
                    <div key={note.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm text-white/60">{note.created_by}</p>
                        <p className="text-xs text-white/40">
                          {new Date(note.created_at).toLocaleString('cs-CZ')}
                        </p>
                      </div>
                      <p className="text-white whitespace-pre-wrap">{note.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Status & Activity */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Status</h2>
              
              <div className="space-y-2">
                {Object.entries(STATUS_LABELS).map(([status, label]) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status as LeadStatus)}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                      lead.status === status
                        ? `${STATUS_COLORS[status as LeadStatus]} text-white`
                        : 'bg-white/5 hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{label}</span>
                      {lead.status === status && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Priorita</h2>
              
              <div className="space-y-2">
                {[
                  { value: 'low', label: 'Nízká', color: 'bg-blue-500/20 text-blue-400' },
                  { value: 'medium', label: 'Střední', color: 'bg-yellow-500/20 text-yellow-400' },
                  { value: 'high', label: 'Vysoká', color: 'bg-red-500/20 text-red-400' }
                ].map((priority) => (
                  <button
                    key={priority.value}
                    onClick={() => handlePriorityChange(priority.value as 'low' | 'medium' | 'high')}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                      lead.priority === priority.value
                        ? `${priority.color} border border-current`
                        : 'bg-white/5 hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{priority.label}</span>
                      {lead.priority === priority.value && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Historie aktivit</h2>
                <span className="text-sm text-white/60">{activities.length}</span>
              </div>

              <div className="space-y-4">
                {activities.length === 0 ? (
                  <p className="text-center text-white/40 py-4">Žádné aktivity</p>
                ) : (
                  activities.map((activity, index) => (
                    <div key={activity.id} className="relative">
                      {index !== activities.length - 1 && (
                        <div className="absolute left-2 top-8 bottom-0 w-px bg-white/10" />
                      )}
                      <div className="flex gap-3">
                        <div className="w-4 h-4 mt-1 rounded-full bg-zfp-orange flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-white">{activity.description}</p>
                          <p className="text-xs text-white/40 mt-1">
                            {new Date(activity.timestamp).toLocaleString('cs-CZ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Floating Button */}
      <QuickActions 
        phone={lead?.phone}
        email={lead?.email}
        leadId={lead?.id}
      />
    </div>
  );
}
