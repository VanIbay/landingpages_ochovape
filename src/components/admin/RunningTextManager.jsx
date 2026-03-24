import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiPlus, FiTrash2, FiToggleLeft, FiToggleRight, FiLoader } from 'react-icons/fi';

export default function RunningTextManager() {
  const { runningTexts, addRunningText, updateRunningText, deleteRunningText, saving } = useData();
  const [newText, setNewText] = useState('');

  const addText = async () => {
    if (!newText.trim()) return;
    try {
      await addRunningText({ text: newText.trim(), active: true });
      setNewText('');
    } catch (err) {
      alert('Gagal menambah: ' + err.message);
    }
  };

  const toggleActive = async (item) => {
    try {
      await updateRunningText(item.id, { ...item, active: !item.active });
    } catch (err) {
      alert('Gagal mengubah: ' + err.message);
    }
  };

  const remove = async (id) => {
    try {
      await deleteRunningText(id);
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add new */}
      <div className="flex gap-3">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Tambah teks baru..."
          onKeyDown={(e) => e.key === 'Enter' && addText()}
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary outline-none text-sm"
        />
        <button onClick={addText} disabled={saving} className="btn-primary !py-2 !px-4 flex items-center gap-2 disabled:opacity-50">
          {saving ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiPlus className="w-4 h-4" />} Tambah
        </button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {runningTexts.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
              item.active ? 'bg-dark-card border-white/10' : 'bg-dark-card/50 border-white/5 opacity-60'
            }`}
          >
            <span className="text-white text-sm flex-1 mr-4">{item.text}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleActive(item)}
                disabled={saving}
                className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                  item.active ? 'text-green-400 hover:bg-green-500/10' : 'text-gray-500 hover:bg-white/5'
                }`}
                title={item.active ? 'Aktif' : 'Nonaktif'}
              >
                {item.active ? <FiToggleRight className="w-5 h-5" /> : <FiToggleLeft className="w-5 h-5" />}
              </button>
              <button
                onClick={() => remove(item.id)}
                disabled={saving}
                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
