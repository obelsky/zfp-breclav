'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCRMAuth } from '@/contexts/CRMAuthContext';
import { 
  getAdvisors, 
  saveAdvisor, 
  updateAdvisor, 
  deleteAdvisor,
  getAdvisorLeadsCount,
  type Advisor 
} from '@/utils/crmStorage';

export default function AdvisorsPage() {
  const { user } = useCRMAuth();
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAdvisor, setEditingAdvisor] = useState<Advisor | null>(null);
  const [leadsCount, setLeadsCount] = useState<Record<string, number>>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'advisor' as 'admin' | 'advisor',
    active: true,
  });

  useEffect(() => {
    loadAdvisors();
  }, []);

  const loadAdvisors = async () => {
    setLoading(true);
    const data = await getAdvisors();
    setAdvisors(data);
    
    // Load leads count for each advisor
    const counts: Record<string, number> = {};
    for (const advisor of data) {
      counts[advisor.id] = await getAdvisorLeadsCount(advisor.id);
    }
    setLeadsCount(counts);
    
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAdvisor) {
      // Update existing
      await updateAdvisor(editingAdvisor.id, formData);
    } else {
      // Create new
      await saveAdvisor(formData);
    }
    
    setShowModal(false);
    setEditingAdvisor(null);
    setFormData({ name: '', email: '', phone: '', role: 'advisor', active: true });
    loadAdvisors();
  };

  const handleEdit = (advisor: Advisor) => {
    setEditingAdvisor(advisor);
    setFormData({
      name: advisor.name,
      email: advisor.email,
      phone: advisor.phone,
      role: advisor.role,
      active: advisor.active,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Opravdu chcete smazat tohoto poradce? Všechny jeho/její přiřazené poptávky budou odpřiřazeny.')) {
      await deleteAdvisor(id);
      loadAdvisors();
    }
  };

  const handleToggleActive = async (advisor: Advisor) => {
    await updateAdvisor(advisor.id, { active: !advisor.active });
    loadAdvisors();
  };

  if (user?.role !== 'admin') {
    return (
      <div className="flex-1 px-4 md:px-8 pt-20 lg:pt-8 lg:ml-64">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Přístup odepřen</h2>
          <p className="text-white/60">Pouze administrátoři mohou spravovat poradce.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 md:px-8 pt-20 lg:pt-8 lg:ml-64">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Poradci</h1>
            <p className="text-white/60">{advisors.length} poradců celkem</p>
          </div>
          
          <button
            onClick={() => {
              setEditingAdvisor(null);
              setFormData({ name: '', email: '', phone: '', role: 'advisor', active: true });
              setShowModal(true);
            }}
            className="px-6 py-3 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Přidat poradce
          </button>
        </div>

        {/* Advisors Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-zfp-orange border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map((advisor, i) => (
              <motion.div
                key={advisor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-zfp-orange/20 rounded-full flex items-center justify-center text-zfp-orange font-bold text-xl">
                      {advisor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{advisor.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        advisor.role === 'admin' 
                          ? 'bg-purple-500/20 text-purple-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {advisor.role === 'admin' ? 'Administrátor' : 'Poradce'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(advisor)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        advisor.active 
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                          : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                      }`}
                      title={advisor.active ? 'Aktivní' : 'Neaktivní'}
                    >
                      {advisor.active ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {advisor.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {advisor.phone}
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 mb-4">
                  <div className="text-sm text-white/40 mb-1">Aktivní poptávky</div>
                  <div className="text-2xl font-bold text-zfp-orange">{leadsCount[advisor.id] || 0}</div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(advisor)}
                    className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all text-sm"
                  >
                    Upravit
                  </button>
                  <button
                    onClick={() => handleDelete(advisor.id)}
                    className="flex-1 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg transition-all text-sm"
                  >
                    Smazat
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zfp-darker border border-white/10 rounded-2xl p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingAdvisor ? 'Upravit poradce' : 'Nový poradce'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Jméno</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'advisor' })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-zfp-orange/50"
                >
                  <option value="advisor">Poradce</option>
                  <option value="admin">Administrátor</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="active" className="text-sm text-white/60">Aktivní</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingAdvisor(null);
                  }}
                  className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-all"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all"
                >
                  {editingAdvisor ? 'Uložit' : 'Přidat'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
