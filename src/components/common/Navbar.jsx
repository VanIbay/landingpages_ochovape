import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useData } from '../../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import { trackClick } from '../../utils/analytics';

const navLinks = [
  { key: 'home', href: '#hero' },
  { key: 'products', href: '#products' },
  { key: 'about', href: '#why-us' },
  { key: 'gallery', href: '#gallery' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'blog', href: '#blog' },
  { key: 'faq', href: '#faq' },
  { key: 'contact', href: '#contact' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { settings } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleLang = () => {
    const newLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(newLang);
    localStorage.setItem('ocho-lang', newLang);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-2 bg-black/70 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group" onClick={(e) => handleNavClick(e, '#hero')}>
            <img src="/logo-ocho.jpeg" alt="Ocho Vape" className="w-8 h-8 rounded-full border border-white/20 shadow-lg object-cover" />
            <span className="text-2xl font-heading font-bold text-primary group-hover:text-accent transition-colors">
              Ocho<span className="text-white">Vape</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary transition-colors rounded-lg hover:bg-white/5"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-all"
              aria-label="Toggle language"
            >
              <FiGlobe className="w-4 h-4" />
              <span className="uppercase font-medium">{i18n.language}</span>
            </button>
            <a
              href={`https://wa.me/${settings.whatsapp}?text=Halo Ocho Vape Store, saya ingin booking product`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('whatsapp')}
              className="btn-primary !py-2 !px-4 !text-sm"
            >
              {t('nav.booking')}
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-300 hover:text-white rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-2xl font-heading font-semibold text-gray-200 hover:text-primary transition-colors"
                >
                  {t(`nav.${link.key}`)}
                </motion.a>
              ))}
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white border border-white/20 rounded-lg"
                >
                  <FiGlobe className="w-5 h-5" />
                  <span className="uppercase font-medium">{i18n.language === 'id' ? 'EN' : 'ID'}</span>
                </button>
              </div>
              <a
                href={`https://wa.me/${settings.whatsapp}?text=Halo Ocho Vape Store, saya ingin booking product`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { trackClick('whatsapp'); setMobileOpen(false); }}
                className="btn-primary mt-4 !text-lg"
              >
                {t('nav.booking')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
