import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  FiHome, FiImage, FiList, FiBookOpen, FiHelpCircle, FiLayers, FiHeart,
  FiLogOut, FiMenu, FiX, FiChevronRight, FiExternalLink,
  FiMusic, FiBell, FiMessageSquare, FiStar, FiRepeat, FiUser, FiTag
} from 'react-icons/fi';

const coreNavItems = [
  { to: '/admin', label: 'Dashboard', icon: FiHome, end: true },
  { to: '/admin/slider', label: 'Home Slider', icon: FiImage },
  { to: '/admin/collections', label: 'Collections', icon: FiList },
  { to: '/admin/hadiths', label: 'Hadith List', icon: FiBookOpen },
  { to: '/admin/quiz', label: 'Quiz Questions', icon: FiHelpCircle },
  { to: '/admin/quiz-sets', label: 'Quiz Sets', icon: FiLayers },
  { to: '/admin/organizations', label: 'Sadaqah Orgs', icon: FiHeart },
];

const contentNavItems = [
  { to: '/admin/audio', label: 'Audio Hadiths', icon: FiMusic },
  { to: '/admin/announcements', label: 'Announcements', icon: FiBell },
  { to: '/admin/quotes', label: 'Islamic Quotes', icon: FiMessageSquare },
  { to: '/admin/duas-admin', label: 'Dua Collection', icon: FiStar },
  { to: '/admin/adhkar-admin', label: 'Adhkar', icon: FiRepeat },
  { to: '/admin/scholars', label: 'Scholars', icon: FiUser },
  { to: '/admin/tags', label: 'Topic Tags', icon: FiTag },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const renderNavLink = ({ to, label, icon: Icon, end }) => (
    <NavLink
      key={to}
      to={to}
      end={end}
      onClick={() => setSidebarOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
          isActive
            ? 'bg-isl-gold text-isl-green shadow-md'
            : 'text-white/70 hover:bg-white/10 hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={18} />
          <span className="flex-1">{label}</span>
          {isActive && <FiChevronRight size={14} />}
        </>
      )}
    </NavLink>
  );

  return (
    <div className="flex h-screen bg-gray-100 font-body overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-isl-green shadow-2xl transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <div className="font-arabic text-isl-gold text-xl leading-tight">الإدارة</div>
            <div className="text-white font-bold text-sm tracking-wide">HADITH ADMIN</div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {coreNavItems.map(renderNavLink)}

          {/* Content Management Divider */}
          <div className="pt-4 pb-2 px-1">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/40 text-xs font-semibold tracking-wider uppercase whitespace-nowrap">
                Content
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          </div>

          {contentNavItems.map(renderNavLink)}
        </nav>

        {/* View Site + Logout */}
        <div className="px-4 pb-6 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium bg-isl-gold/15 text-isl-gold hover:bg-isl-gold/25 transition-all duration-200 no-underline"
          >
            <FiExternalLink size={18} />
            <span className="flex-1">IlmHadith Home</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-isl-green"
          >
            <FiMenu size={22} />
          </button>
          <div className="flex-1">
            <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-isl-green border border-isl-green/30 hover:bg-isl-green hover:text-white transition-all duration-200 no-underline"
            >
              <FiExternalLink size={13} /> View Site
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-isl-green flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <span className="hidden sm:block text-sm text-gray-600 font-medium">Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
