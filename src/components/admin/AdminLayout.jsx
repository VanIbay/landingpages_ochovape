import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../utils/auth';
import {
  FiHome, FiType, FiTool, FiImage, FiStar, FiHelpCircle,
  FiFileText, FiMail, FiSettings, FiLogOut, FiMenu, FiX, FiChevronLeft,
} from 'react-icons/fi';

const menuItems = [
  { key: 'dashboard', label: 'Dashboard', icon: FiHome },
  { key: 'running-text', label: 'Running Text', icon: FiType },
  { key: 'products', label: 'Produk', icon: FiTool },
  { key: 'gallery', label: 'Galeri', icon: FiImage },
  { key: 'testimonials', label: 'Testimoni', icon: FiStar },
  { key: 'faq', label: 'FAQ', icon: FiHelpCircle },
  { key: 'blog', label: 'Blog', icon: FiFileText },
  { key: 'messages', label: 'Pesan Masuk', icon: FiMail },
  { key: 'settings', label: 'Pengaturan', icon: FiSettings },
];

export default function AdminLayout({ children, activeMenu, onMenuChange }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/sadux/login');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo-ocho.jpeg" alt="Ocho Vape" className="w-8 h-8 rounded-full border border-white/20 object-cover" />
            <span className="text-xl font-heading font-bold text-primary">
              Ocho<span className="text-white">Vape</span>
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { onMenuChange(item.key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition-all ${
                  isActive
                    ? 'text-primary bg-primary/10 border-r-2 border-primary font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                <FiMenu className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-heading font-semibold text-white capitalize">
                {menuItems.find((m) => m.key === activeMenu)?.label || 'Dashboard'}
              </h1>
            </div>
            <Link to="/" className="flex items-center gap-1 text-sm text-gray-400 hover:text-primary transition-colors">
              <FiChevronLeft className="w-4 h-4" />
              Ke Website
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
