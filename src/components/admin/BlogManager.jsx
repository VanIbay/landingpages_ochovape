import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiCalendar, FiLoader } from 'react-icons/fi';

export default function BlogManager() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, saving } = useData();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', content: '', tags: '', date: '', thumbnail: '' });

  const openNew = () => {
    setForm({ title: '', slug: '', content: '', tags: '', date: new Date().toISOString().split('T')[0], thumbnail: '' });
    setEditing('new');
  };

  const openEdit = (post) => {
    setForm({ ...post, tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '' });
    setEditing(post.id);
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const save = async () => {
    if (!form.title.trim() || !form.content.trim()) return;
    const data = {
      ...form,
      slug: form.slug || generateSlug(form.title),
      tags: typeof form.tags === 'string' ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : form.tags,
    };
    try {
      if (editing === 'new') {
        await addBlogPost(data);
      } else {
        await updateBlogPost(editing, data);
      }
      setEditing(null);
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Hapus artikel ini?')) return;
    try {
      await deleteBlogPost(id);
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={openNew} className="btn-primary !py-2 !px-4 flex items-center gap-2">
        <FiPlus className="w-4 h-4" /> Tambah Artikel
      </button>

      {editing !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-dark-card rounded-2xl border border-white/10 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-white font-heading font-semibold">{editing === 'new' ? 'Tambah' : 'Edit'} Artikel</h3>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white"><FiX className="w-5 h-5" /></button>
            </div>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} placeholder="Judul artikel" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary" />
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug (auto-generated)" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm outline-none focus:border-primary" />
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary" />
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags (pisahkan dengan koma)" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary" />
            <input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} placeholder="URL thumbnail (opsional)" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary" />
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Konten artikel..." rows={8} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary resize-none" />
            <button onClick={save} disabled={saving} className="btn-primary w-full !py-2.5 flex items-center justify-center gap-2 disabled:opacity-50">
              {saving ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiSave className="w-4 h-4" />}
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {blogPosts.map((post) => (
          <div key={post.id} className="p-4 rounded-xl bg-dark-card border border-white/5 flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold text-sm mb-1">{post.title}</h4>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><FiCalendar className="w-3 h-3" />{post.date}</span>
                <span>{post.tags?.join(', ')}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <button onClick={() => openEdit(post)} className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><FiEdit2 className="w-3.5 h-3.5" /></button>
              <button onClick={() => remove(post.id)} disabled={saving} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"><FiTrash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
