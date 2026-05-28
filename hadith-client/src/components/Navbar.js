import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaUserCircle, FaShieldAlt } from 'react-icons/fa';
import { FiSearch, FiChevronDown, FiChevronUp, FiX, FiMenu, FiBookOpen, FiMic, FiMessageSquare, FiBell, FiUser, FiBookmark, FiHelpCircle } from 'react-icons/fi';
import logoImg from '../assets/logo/ilmhadith.png';

const NAV = [
  { label: 'Home', to: '/' },
  {
    label: 'Hadith',
    children: [
      { label: 'Hadith List',   to: '/hadith-list',   desc: 'Browse all authenticated hadiths',   icon: <FiBookOpen size={16} /> },
      { label: 'Hadith Quiz',   to: '/quiz',           desc: 'Test your knowledge with a quiz',    icon: <FiHelpCircle size={16} /> },
    ],
  },
  {
    label: 'Explore',
    children: [
      { label: 'Duas & Adhkar',   to: '/duas',           desc: 'Supplications & remembrances',    icon: <FiBookmark size={16} /> },
      { label: 'Audio Hadiths',   to: '/audio-hadiths',  desc: 'Listen to recitations',           icon: <FiMic size={16} /> },
      { label: 'Islamic Quotes',  to: '/quotes',         desc: 'Words of wisdom',                 icon: <FiMessageSquare size={16} /> },
      { label: 'Announcements',   to: '/announcements',  desc: 'News, events & reminders',        icon: <FiBell size={16} /> },
      { label: 'Scholars',        to: '/scholars',       desc: 'Learn from renowned scholars',    icon: <FiUser size={16} /> },
    ],
  },
  { label: 'Donation',  to: '/donation' },
  { label: 'Bookmarks', to: '/bookmarks' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);
  const closeTimer = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  const openDropdown = (label) => {
    clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const toggleMobileSection = (label) => {
    setMobileExpanded(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      {/* Bismillah Bar */}
      <div className="bg-isl-gold text-isl-green text-center py-1.5 px-4 text-sm font-arabic tracking-widest font-semibold">
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-isl-green border-b-2 border-isl-gold shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-3 no-underline flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-isl-gold/20 border-2 border-isl-gold flex items-center justify-center overflow-hidden">
              <img src={logoImg} alt="IlmHadith" className="w-full h-full object-contain p-1" />
            </div>
            <div>
              <div className="text-white font-bold text-lg font-body leading-none">IlmHadith</div>
              <div className="text-isl-gold text-[10px] font-body tracking-wider uppercase">Authentic Islamic Knowledge</div>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {NAV.map((item) =>
              item.children ? (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openDropdown(item.label)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeDropdown === item.label
                        ? 'text-isl-gold bg-white/10'
                        : 'text-white hover:text-isl-gold hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                    {activeDropdown === item.label
                      ? <FiChevronUp size={13} />
                      : <FiChevronDown size={13} />}
                  </button>

                  {/* Dropdown Panel */}
                  {activeDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 min-w-[240px]"
                      onMouseEnter={() => openDropdown(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="px-3 py-2 bg-isl-green/5 border-b border-gray-100">
                        <span className="text-xs font-semibold text-isl-green uppercase tracking-wider">{item.label}</span>
                      </div>
                      <ul className="py-2">
                        {item.children.map((child) => (
                          <li key={child.to}>
                            <NavLink
                              to={child.to}
                              onClick={() => setActiveDropdown(null)}
                              className={({ isActive }) =>
                                `flex items-start gap-3 px-4 py-3 transition-colors duration-150 no-underline group ${
                                  isActive ? 'bg-isl-green/5' : 'hover:bg-gray-50'
                                }`
                              }
                            >
                              <span className="mt-0.5 text-isl-green/60 group-hover:text-isl-green transition-colors flex-shrink-0">
                                {child.icon}
                              </span>
                              <div>
                                <div className="text-sm font-semibold text-gray-800 group-hover:text-isl-green transition-colors">
                                  {child.label}
                                </div>
                                {child.desc && (
                                  <div className="text-xs text-gray-400 mt-0.5">{child.desc}</div>
                                )}
                              </div>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 no-underline ${
                        isActive
                          ? '!text-isl-gold font-semibold bg-white/10'
                          : '!text-white hover:!text-isl-gold hover:bg-white/10'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => navigate('/hadith-list')}
              className="p-2 rounded-lg text-white/70 hover:text-isl-gold hover:bg-white/10 transition-all"
              aria-label="Search hadiths"
            >
              <FiSearch size={18} />
            </button>

            {user ? (
              <>
                {user.isAdmin && (
                  <NavLink
                    to="/admin"
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-isl-gold border border-isl-gold/50 rounded-lg hover:bg-isl-gold/10 transition-all duration-200 no-underline"
                  >
                    <FaShieldAlt className="text-xs" /> Admin
                  </NavLink>
                )}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
                  <FaUserCircle className="text-isl-gold text-lg" />
                  <span className="text-white text-sm font-body">{user.name?.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium !text-white border border-white/30 rounded-lg hover:bg-red-500/20 hover:border-red-400/50 hover:!text-red-300 transition-all duration-200"
                >
                  <FaSignOutAlt className="text-xs" /> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm font-medium !text-isl-gold border border-isl-gold rounded-lg hover:bg-isl-gold hover:!text-isl-green transition-all duration-200 no-underline"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/sign-up"
                  className="px-4 py-2 text-sm font-semibold bg-isl-gold !text-isl-green rounded-lg hover:bg-isl-gold-light transition-all duration-200 no-underline"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-white hover:text-isl-gold transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu size={24} />
          </button>

        </nav>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-isl-green z-50 transition-transform duration-300 overflow-y-auto flex flex-col lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-isl-gold/20 border border-isl-gold flex items-center justify-center overflow-hidden">
              <img src={logoImg} alt="IlmHadith" className="w-full h-full object-contain p-0.5" />
            </div>
            <span className="text-white font-bold text-base">IlmHadith</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Bismillah */}
        <div className="text-center py-2.5 text-isl-gold text-sm font-arabic border-b border-white/10 flex-shrink-0">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-3 px-3">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="mb-1">
                {/* Section header (accordion toggle) */}
                <button
                  onClick={() => toggleMobileSection(item.label)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors duration-150 text-white hover:bg-white/10"
                >
                  <span>{item.label}</span>
                  {mobileExpanded[item.label]
                    ? <FiChevronUp size={16} className="text-isl-gold" />
                    : <FiChevronDown size={16} className="text-white/60" />}
                </button>

                {/* Accordion children */}
                {mobileExpanded[item.label] && (
                  <div className="ml-4 mt-1 mb-2 border-l-2 border-isl-gold/30 pl-3 space-y-0.5">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 no-underline ${
                            isActive
                              ? '!text-isl-gold bg-white/10 font-semibold'
                              : '!text-white/80 hover:!text-isl-gold hover:bg-white/10'
                          }`
                        }
                      >
                        <span className="text-isl-gold/70 flex-shrink-0">{child.icon}</span>
                        <div>
                          <div className="font-medium">{child.label}</div>
                          {child.desc && <div className="text-xs text-white/40 mt-0.5">{child.desc}</div>}
                        </div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 no-underline mb-1 ${
                    isActive
                      ? '!text-isl-gold bg-white/10 font-semibold'
                      : '!text-white hover:!text-isl-gold hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}

          {/* Divider */}
          <div className="my-3 border-t border-white/10" />

          {/* Auth section */}
          {user ? (
            <>
              {user.isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium !text-isl-gold hover:bg-white/10 transition-colors no-underline mb-1"
                >
                  <FaShieldAlt size={14} /> Admin Panel
                </NavLink>
              )}
              <div className="px-4 py-2 text-xs text-white/50">
                Signed in as <span className="text-white font-semibold">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium !text-red-300 hover:bg-red-500/20 transition-colors mt-1"
              >
                <FaSignOutAlt size={13} /> Logout
              </button>
            </>
          ) : (
            <div className="space-y-2 mt-1">
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium !text-isl-gold border border-isl-gold hover:bg-isl-gold hover:!text-isl-green transition-all no-underline text-center"
              >
                Login
              </NavLink>
              <NavLink
                to="/sign-up"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-semibold bg-isl-gold !text-isl-green hover:bg-isl-gold-light transition-all no-underline text-center"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
