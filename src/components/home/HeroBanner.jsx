import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaStar } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import { trackClick } from '../../utils/analytics';

export default function HeroBanner() {
  const { t } = useTranslation();
  const { settings } = useData();

  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-secondary to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <img src="/logo-ocho.jpeg" alt="Ocho Vape Store" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.4)] border border-white/20 object-cover" />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
        >
          <FaStar className="w-3.5 h-3.5 text-accent" />
          <span>{t('hero.badge')}</span>
          <FaStar className="w-3.5 h-3.5 text-accent" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6"
        >
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Vape Store Terpercaya & Terdekat</span>
          <span className="gradient-text block text-2xl sm:text-3xl md:text-4xl mt-3">di Cilangkap, Jakarta Timur</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.subheadline')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={`https://wa.me/${settings.whatsapp}?text=Halo Ocho Vape Store, saya ingin booking product`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('whatsapp')}
            className="flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-heading font-semibold hover:bg-green-500 active:scale-95 transition-all shadow-lg shadow-green-600/30 text-base sm:text-lg w-full sm:w-auto justify-center"
          >
            <FaWhatsapp className="w-5 h-5" />
            {t('hero.cta_wa')}
          </a>
          <a
            href="#products"
            onClick={(e) => handleScroll(e, '#products')}
            className="btn-outline !px-8 !py-4 !text-base sm:!text-lg w-full sm:w-auto text-center"
          >
            {t('hero.cta_products')}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-8 sm:gap-12 mt-16 pt-8 border-t border-white/10"
        >
          {[
            { value: '10+', label: t('hero.stat_years') || 'Tahun Pengalaman' },
            { value: '100%', label: t('hero.stat_guarantee') || 'Garansi Product' },
            { value: 'Ribuan', label: t('hero.stat_customers') || 'Pelanggan Puas' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-heading font-bold text-white">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <FiChevronDown className="w-6 h-6 text-gray-500" />
      </motion.div>
    </section>
  );
}
