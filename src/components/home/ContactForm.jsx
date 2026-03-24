import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function ContactForm() {
  const { t } = useTranslation();
  const { settings, services, addMessage } = useData();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    whatsapp: '',
    vehicle: '',
    service: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addMessage(form);
      setSuccess(true);
      setForm({ name: '', whatsapp: '', vehicle: '', service: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('contact.name')}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                />
                <input
                  type="tel"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder={t('contact.whatsapp')}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="vehicle"
                  value={form.vehicle}
                  onChange={handleChange}
                  placeholder={t('contact.vehicle')}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                />
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm appearance-none"
                >
                  <option value="" className="bg-dark-card">{t('contact.select_service')}</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title} className="bg-dark-card">{s.title}</option>
                  ))}
                </select>
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t('contact.message')}
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm resize-none"
              />

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
                >
                  <FiCheckCircle className="w-4 h-4" />
                  {t('contact.success')}
                </motion.div>
              )}

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full sm:w-auto btn-primary !py-3 !px-8"
              >
                <FiSend className="w-4 h-4" />
                {t('contact.send')}
              </button>
            </form>
          </motion.div>

          {/* Contact Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl glass border border-white/5 hover:border-green-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                <FaWhatsapp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h4 className="font-semibold text-sm" style={{ color: 'var(--text-heading)' }}>WhatsApp</h4>
                <p className="text-xs" style={{ color: 'var(--text-body)' }}>{settings.phone}</p>
              </div>
            </a>

            <a
              href={`https://instagram.com/${settings.instagram?.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl glass border border-white/5 hover:border-pink-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500/20 transition-colors">
                <FaInstagram className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h4 className="font-semibold text-sm" style={{ color: 'var(--text-heading)' }}>Instagram</h4>
                <p className="text-xs" style={{ color: 'var(--text-body)' }}>{settings.instagram}</p>
              </div>
            </a>

            <a
              href={`https://tiktok.com/${settings.tiktok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl glass border border-white/5 hover:border-white/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                <FaTiktok className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm" style={{ color: 'var(--text-heading)' }}>TikTok</h4>
                <p className="text-xs" style={{ color: 'var(--text-body)' }}>{settings.tiktok}</p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
