import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiLoader } from 'react-icons/fi';

export default function ServicesManager() {
  const { services, addService, updateService, deleteService, saving } = useData();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ icon: '', title: '', description: '', price: '' });

  const openNew = () => {
    setForm({ icon: '🔧', title: '', description: '', price: '' });
    setEditing('new');
  };

  const openEdit = (svc) => {
    setForm({ ...svc });
    setEditing(svc.id);
  };

  const save = async () => {
    if (!form.title.trim()) return;
    try {
      if (editing === 'new') {
        await addService(form);
      } else {
        await updateService(editing, form);
      }
      setEditing(null);
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Hapus layanan ini?')) return;
    try {
      await deleteService(id);
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={openNew} className="btn-primary !py-2 !px-4 flex items-center gap-2">
        <FiPlus className="w-4 h-4" /> Tambah Layanan
      </button>

      {/* Edit Modal */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-dark-card rounded-2xl border border-white/10 p-6 w-full max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-white font-heading font-semibold">
                {editing === 'new' ? 'Tambah Layanan' : 'Edit Layanan'}
              </h3>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Icon (emoji)" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary" />
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Judul layanan" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi" rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary resize-none" />
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Harga (contoh: Mulai Rp 35.000)" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary" />
            <button onClick={save} disabled={saving} className="btn-primary w-full !py-2.5 flex items-center justify-center gap-2 disabled:opacity-50">
              {saving ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiSave className="w-4 h-4" />}
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((svc) => (
          <div key={svc.id} className="p-4 rounded-xl bg-dark-card border border-white/5 flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <span className="text-2xl">{svc.icon}</span>
              <div className="min-w-0">
                <h4 className="text-white font-semibold text-sm">{svc.title}</h4>
                <p className="text-gray-500 text-xs truncate">{svc.description}</p>
                <p className="text-accent text-xs mt-1">{svc.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <button onClick={() => openEdit(svc)} className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                <FiEdit2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => remove(svc.id)} disabled={saving} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50">
                <FiTrash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
