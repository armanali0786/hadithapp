import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/',              label: 'Home'       },
  { to: '/hadith-list',   label: 'Blogs'      },
  { to: '/quiz',          label: 'Hadith Quiz'},
  { to: '/donation',      label: 'Donation'   },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bismillah Bar */}
      <div className="bg-isl-gold text-isl-green text-center py-1.5 px-4 text-sm font-arabic tracking-widest font-semibold">
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-isl-green border-b-2 border-isl-gold shadow-lg">
        <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">

          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-isl-gold/20 border-2 border-isl-gold flex items-center justify-center text-isl-gold font-arabic text-lg select-none">
              ☪
            </div>
            <div>
              <div className="text-white font-bold text-lg font-body leading-none">Hadith Hub</div>
              <div className="text-isl-gold text-[10px] font-body tracking-wider uppercase">Authentic Islamic Knowledge</div>
            </div>
          </NavLink>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-isl-gold font-semibold bg-white/10'
                        : 'text-white/85 hover:text-isl-gold hover:bg-white/10'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink
              to="/login"
              className="px-4 py-2 text-sm font-medium text-isl-gold border border-isl-gold rounded-lg hover:bg-isl-gold hover:text-isl-green transition-all duration-200"
            >
              Login
            </NavLink>
            <NavLink
              to="/sign-up"
              className="px-4 py-2 text-sm font-semibold bg-isl-gold text-isl-green rounded-lg hover:bg-isl-gold-light transition-all duration-200"
            >
              Sign Up
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <span className="w-6 h-0.5 bg-white block rounded-full"></span>
            <span className="w-4 h-0.5 bg-white block rounded-full"></span>
            <span className="w-6 h-0.5 bg-white block rounded-full"></span>
          </button>

        </nav>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-isl-green z-50 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-isl-gold font-arabic text-xl">☪ Hadith Hub</span>
          <button
            onClick={() => setOpen(false)}
            className="text-white/60 hover:text-white text-xl leading-none"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Bismillah */}
        <div className="text-center py-3 text-isl-gold text-sm font-arabic border-b border-white/10">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>

        {/* Nav Links */}
        <ul className="p-4 space-y-1">
          {[...navLinks, { to: '/donation-list', label: 'Donor List' }].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-isl-gold bg-white/10 font-semibold'
                      : 'text-white/85 hover:text-isl-gold hover:bg-white/10'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className="my-3 border-t border-white/10 pt-3"></li>
          <li>
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-isl-gold border border-isl-gold hover:bg-isl-gold hover:text-isl-green transition-all duration-200 text-center"
            >
              Login
            </NavLink>
          </li>
          <li className="mt-2">
            <NavLink
              to="/sign-up"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-semibold bg-isl-gold text-isl-green hover:bg-isl-gold-light transition-all duration-200 text-center"
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
