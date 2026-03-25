import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaPhone, FaDirections } from 'react-icons/fa';
import { trackClick } from '../../utils/analytics';

export default function Location() {
  const { t } = useTranslation();
  const { settings } = useData();

  return (
    <section id="location" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('location.title')}</h2>
          <p className="section-subtitle mb-4">{t('location.subtitle')}</p>
          <p className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-body)' }}>
            Kami bangga melayani warga <strong className="font-semibold text-primary">Cilangkap, Kecamatan Cipayung, Jakarta Timur, dan sekitarnya</strong>. Dengan vapista handal dan produk terpercaya, kami siap mengatasi segala masalah vape Anda di vape store terdekat ini.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-2xl overflow-hidden border border-white/10 aspect-video lg:aspect-auto lg:min-h-[400px]"
          >
            <iframe
              src={settings.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ocho Vape Store Location"
            />
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="p-5 rounded-2xl glass border border-white/5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-heading)' }}>{t('location.address')}</h4>
                  <p className="text-sm" style={{ color: 'var(--text-body)' }}>{settings.address}</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl glass border border-white/5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <FaClock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-heading)' }}>{t('location.hours')}</h4>
                  <p className="text-sm" style={{ color: 'var(--text-body)' }}>{settings.operatingHours}</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl glass border border-white/5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <FaPhone className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-heading)' }}>{t('location.phone')}</h4>
                  <p className="text-sm" style={{ color: 'var(--text-body)' }}>{settings.phone}</p>
                </div>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(settings.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('googlemaps')}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-black font-heading font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <FaDirections className="w-5 h-5" />
              {t('location.directions')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
