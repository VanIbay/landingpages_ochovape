import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiPlus, FiTrash2, FiX, FiLoader } from 'react-icons/fi';

export default function GalleryManager() {
  const { gallery, addGalleryItem, deleteGalleryItem, saving } = useData();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ url: '', caption: '' });

  const add = async () => {
    if (!form.caption.trim()) return;
    try {
      await addGalleryItem(form);
      setForm({ url: '', caption: '' });
      setShowAdd(false);
    } catch (err) {
      alert('Gagal menambah: ' + err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Hapus foto ini?')) return;
    try {
      await deleteGalleryItem(id);
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={() => setShowAdd(true)} className="btn-primary !py-2 !px-4 flex items-center gap-2">
        <FiPlus className="w-4 h-4" /> Tambah Foto
      </button>

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-dark-card rounded-2xl border border-white/10 p-6 w-full max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-white font-heading font-semibold">Tambah Foto</h3>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-white"><FiX className="w-5 h-5" /></button>
            </div>
            <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="URL gambar (kosongkan untuk placeholder)" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary" />
            <input value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} placeholder="Caption" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary" />
            <button onClick={add} disabled={saving} className="btn-primary w-full !py-2.5 flex items-center justify-center gap-2 disabled:opacity-50">
              {saving ? <FiLoader className="w-4 h-4 animate-spin" /> : null}
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {gallery.map((item) => (
          <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-square">
            {item.url ? (
              <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                <span className="text-3xl opacity-50">📸</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button onClick={() => remove(item.id)} disabled={saving} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50">
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-xs truncate">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
