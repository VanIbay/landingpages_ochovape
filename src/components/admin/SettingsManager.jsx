import { useData } from '../../context/DataContext';
import { FiSave, FiLoader } from 'react-icons/fi';
import { useState } from 'react';

export default function SettingsManager() {
  const { settings, saveSettings, saving } = useData();
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = async () => {
    try {
      await saveSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message);
    }
  };

  const generalFields = [
    { name: 'shopName', label: 'Nama Vape Store', type: 'text' },
    { name: 'tagline', label: 'Tagline', type: 'text' },
    { name: 'address', label: 'Alamat', type: 'text' },
    { name: 'phone', label: 'No. Telepon', type: 'tel' },
    { name: 'whatsapp', label: 'WhatsApp (format: 628xxx)', type: 'tel' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'instagram', label: 'Instagram', type: 'text' },
    { name: 'tiktok', label: 'TikTok', type: 'text' },
    { name: 'operatingHours', label: 'Jam Operasional', type: 'text' },
    { name: 'mapEmbedUrl', label: 'Google Maps Embed URL', type: 'url' },
  ];

  const heroFields = [
    { name: 'heroTitle1', label: 'Teks Banner (Baris 1)', type: 'text' },
    { name: 'heroTitle2', label: 'Teks Banner (Baris 2)', type: 'text' },
    { name: 'heroSubtitle', label: 'Sub-teks Banner', type: 'text' },
  ];

  const renderField = (field) => (
    <div key={field.name}>
      <label className="block text-gray-400 text-xs mb-1.5">{field.label}</label>
      <input
        type={field.type}
        name={field.name}
        value={form[field.name] || ''}
        onChange={handleChange}
        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-primary transition-all"
      />
    </div>
  );

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h3 className="text-white font-medium mb-4 text-lg border-b border-white/10 pb-2">Pengaturan Umum</h3>
        <div className="space-y-4">
          {generalFields.map(renderField)}
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-4 text-lg border-b border-white/10 pb-2">Hero Section</h3>
        <div className="space-y-4">
          {heroFields.map(renderField)}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={save} disabled={saving} className="btn-primary !py-2.5 flex items-center gap-2 disabled:opacity-50">
          {saving ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiSave className="w-4 h-4" />}
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
        {saved && <span className="text-green-400 text-sm">✓ Tersimpan!</span>}
      </div>
    </div>
  );
}
