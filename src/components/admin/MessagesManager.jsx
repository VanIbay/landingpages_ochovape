import { useData } from '../../context/DataContext';
import { FiTrash2, FiMail, FiLoader } from 'react-icons/fi';

export default function MessagesManager() {
  const { messages, deleteMessage, clearMessages, saving } = useData();

  const remove = async (id) => {
    try {
      await deleteMessage(id);
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Hapus semua pesan?')) return;
    try {
      await clearMessages();
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {messages.length > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">{messages.length} pesan</span>
          <button onClick={handleClearAll} disabled={saving} className="text-red-400 text-sm hover:text-red-300 transition-colors disabled:opacity-50 flex items-center gap-1">
            {saving && <FiLoader className="w-3 h-3 animate-spin" />}
            Hapus Semua
          </button>
        </div>
      )}

      {messages.length === 0 ? (
        <div className="text-center py-12">
          <FiMail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Belum ada pesan masuk.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {[...messages].reverse().map((msg) => (
            <div key={msg.id} className="p-5 rounded-xl bg-dark-card border border-white/5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-semibold text-sm">{msg.name}</h4>
                  <p className="text-gray-500 text-xs">{new Date(msg.date).toLocaleString('id-ID')}</p>
                </div>
                <button onClick={() => remove(msg.id)} disabled={saving} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div><span className="text-gray-500">WhatsApp:</span> <span className="text-gray-300">{msg.whatsapp}</span></div>
                <div><span className="text-gray-500">Motor:</span> <span className="text-gray-300">{msg.vehicle}</span></div>
                <div><span className="text-gray-500">Layanan:</span> <span className="text-gray-300">{msg.service}</span></div>
              </div>
              <p className="text-gray-400 text-sm">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
