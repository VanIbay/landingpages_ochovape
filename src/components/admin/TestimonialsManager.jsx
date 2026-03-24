import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiLoader } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

export default function TestimonialsManager() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, saving } = useData();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', vehicle: '', rating: 5, text: '', avatar: '' });

  const openNew = () => { setForm({ name: '', vehicle: '', rating: 5, text: '', avatar: '' }); setEditing('new'); };
  const openEdit = (t) => { setForm({ ...t }); setEditing(t.id); };

  const save = async () => {
    if (!form.name.trim() || !form.text.trim()) return;
    try {
      if (editing === 'new') {
        await addTestimonial(form);
      } else {
        await updateTestimonial(editing, form);
      }
      setEditing(null);
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Hapus testimoni ini?')) return;
    try {
      await deleteTestimonial(id);
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={openNew} className="btn-primary !py-2 !px-4 flex items-center gap-2">
        <FiPlus className="w-4 h-4" /> Tambah Testimoni
      </button>

      {editing !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-dark-card rounded-2xl border border-white/10 p-6 w-full max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-white font-heading font-semibold">{editing === 'new' ? 'Tambah' : 'Edit'} Testimoni</h3>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white"><FiX className="w-5 h-5" /></button>
            </div>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama pelanggan" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary" />
            <input value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })} placeholder="Jenis motor" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary" />
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-sm mr-2">Rating:</span>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setForm({ ...form, rating: n })} className="p-1">
                  <FaStar className={`w-5 h-5 ${n <= form.rating ? 'text-accent' : 'text-gray-600'}`} />
                </button>
              ))}
            </div>
            <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Testimoni" rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary resize-none" />
            <button onClick={save} disabled={saving} className="btn-primary w-full !py-2.5 flex items-center justify-center gap-2 disabled:opacity-50">
              {saving ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiSave className="w-4 h-4" />}
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="p-4 rounded-xl bg-dark-card border border-white/5 flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-semibold text-sm">{t.name}</span>
                <span className="text-gray-600 text-xs">— {t.vehicle}</span>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className={`w-3 h-3 ${i < t.rating ? 'text-accent' : 'text-gray-600'}`} />
                ))}
              </div>
              <p className="text-gray-400 text-xs line-clamp-2">{t.text}</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <button onClick={() => openEdit(t)} className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><FiEdit2 className="w-3.5 h-3.5" /></button>
              <button onClick={() => remove(t.id)} disabled={saving} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"><FiTrash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
