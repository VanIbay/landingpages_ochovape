import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiLoader } from 'react-icons/fi';

export default function FAQManager() {
  const { faqs, addFaq, updateFaq, deleteFaq, saving } = useData();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ question: '', answer: '' });

  const openNew = () => { setForm({ question: '', answer: '' }); setEditing('new'); };
  const openEdit = (f) => { setForm({ ...f }); setEditing(f.id); };

  const save = async () => {
    if (!form.question.trim() || !form.answer.trim()) return;
    try {
      if (editing === 'new') {
        await addFaq(form);
      } else {
        await updateFaq(editing, form);
      }
      setEditing(null);
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Hapus FAQ ini?')) return;
    try {
      await deleteFaq(id);
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={openNew} className="btn-primary !py-2 !px-4 flex items-center gap-2">
        <FiPlus className="w-4 h-4" /> Tambah FAQ
      </button>

      {editing !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-dark-card rounded-2xl border border-white/10 p-6 w-full max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-white font-heading font-semibold">{editing === 'new' ? 'Tambah' : 'Edit'} FAQ</h3>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white"><FiX className="w-5 h-5" /></button>
            </div>
            <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="Pertanyaan" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary" />
            <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} placeholder="Jawaban" rows={4} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary resize-none" />
            <button onClick={save} disabled={saving} className="btn-primary w-full !py-2.5 flex items-center justify-center gap-2 disabled:opacity-50">
              {saving ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiSave className="w-4 h-4" />}
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={faq.id} className="p-4 rounded-xl bg-dark-card border border-white/5 flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-gray-600 text-xs">#{i + 1}</span>
                <h4 className="text-white font-medium text-sm">{faq.question}</h4>
              </div>
              <p className="text-gray-500 text-xs line-clamp-2">{faq.answer}</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <button onClick={() => openEdit(faq)} className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><FiEdit2 className="w-3.5 h-3.5" /></button>
              <button onClick={() => remove(faq.id)} disabled={saving} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"><FiTrash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
