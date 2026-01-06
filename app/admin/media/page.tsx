'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useCRMAuth } from '@/contexts/CRMAuthContext';

interface MediaItem {
  id: string;
  filename: string;
  original_name: string;
  file_type: string;
  file_size: number;
  url: string;
  alt_text: string;
  created_at: string;
}

export default function MediaPage() {
  const { user } = useCRMAuth();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setMedia(data);
      }
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(Math.round((i / files.length) * 100));

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `articles/${fileName}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          // If bucket doesn't exist, create a public URL directly
          // For now, we'll store the file info with a placeholder URL
          alert(`Chyba při nahrávání: ${uploadError.message}. Zkuste použít přímou URL.`);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

        // Save to database
        const { error: dbError } = await supabase
          .from('media')
          .insert([{
            filename: fileName,
            original_name: file.name,
            file_type: file.type,
            file_size: file.size,
            url: urlData.publicUrl,
            uploaded_by: user?.id || null,
          }]);

        if (dbError) {
          console.error('Database error:', dbError);
        }
      }

      setUploadProgress(100);
      await loadMedia();
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Chyba při nahrávání souborů');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      console.error('Error copying:', error);
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Opravdu chcete smazat "${item.original_name}"?`)) return;

    try {
      // Delete from storage
      const filePath = item.url.split('/').pop();
      if (filePath) {
        await supabase.storage
          .from('media')
          .remove([`articles/${filePath}`]);
      }

      // Delete from database
      await supabase
        .from('media')
        .delete()
        .eq('id', item.id);

      setMedia(media.filter(m => m.id !== item.id));
      setSelectedMedia(null);
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const isImage = (type: string) => type?.startsWith('image/');

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Média</h1>
          <p className="text-white/60 mt-1">Knihovna obrázků a souborů</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all font-medium cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Nahrát obrázky
          </label>
        </div>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="animate-spin w-5 h-5 border-2 border-zfp-orange border-t-transparent rounded-full" />
            <span className="text-white">Nahrávám soubory...</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-zfp-orange transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Info box */}
      <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <p className="text-blue-400 text-sm">
          💡 <strong>Tip:</strong> Klikněte na obrázek pro zobrazení detailu a zkopírování URL. 
          URL pak vložte do editoru článku pomocí tlačítka "Vložit obrázek".
        </p>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-zfp-orange border-t-transparent rounded-full" />
        </div>
      ) : media.length === 0 ? (
        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Žádná média</h3>
          <p className="text-white/60 mb-6">Nahrajte první obrázky</p>
          <label
            htmlFor="file-upload"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zfp-orange hover:bg-zfp-orange-hover text-white rounded-lg transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Nahrát obrázky
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => setSelectedMedia(item)}
              className="group relative aspect-square bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-zfp-orange/50 transition-all"
            >
              {isImage(item.file_type) ? (
                <img
                  src={item.url}
                  alt={item.alt_text || item.original_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs truncate">{item.original_name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Media Detail Modal */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zfp-dark border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Preview */}
            {isImage(selectedMedia.file_type) && (
              <div className="aspect-video bg-black flex items-center justify-center">
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.alt_text || selectedMedia.original_name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            {/* Info */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{selectedMedia.original_name}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Typ:</span>
                  <span className="text-white">{selectedMedia.file_type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Velikost:</span>
                  <span className="text-white">{formatFileSize(selectedMedia.file_size)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Nahráno:</span>
                  <span className="text-white">{new Date(selectedMedia.created_at).toLocaleDateString('cs-CZ')}</span>
                </div>
              </div>

              {/* URL */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/60 mb-2">URL obrázku</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedMedia.url}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(selectedMedia.url)}
                    className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                      copiedUrl === selectedMedia.url
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-zfp-orange hover:bg-zfp-orange-hover text-white'
                    }`}
                  >
                    {copiedUrl === selectedMedia.url ? '✓ Zkopírováno' : 'Kopírovat'}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
                >
                  Zavřít
                </button>
                <button
                  onClick={() => handleDelete(selectedMedia)}
                  className="px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                >
                  Smazat
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
