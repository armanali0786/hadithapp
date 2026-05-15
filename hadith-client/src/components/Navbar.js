import React, { useState } from 'react'
import '../assets/styles/navbar.scss';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/img/logo.png';
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="header bg-light" id="header">
        <nav className="navbar container">

          {/* LEFT - LOGO */}
          <section className="navbar__left">
            <NavLink to="/" className="brand">
              <img src={Logo} alt="logo" className='h-20' />
            </NavLink>
          </section>

          {/* RIGHT SIDE BURGER MENU (Mobile Only) */}
          <div 
            className="burger" 
            onClick={() => setSidebarOpen(true)}
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </div>

          {/* OVERLAY */}
          <div 
            className={`overlay ${sidebarOpen ? 'is-active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* CENTER - SIDEBAR / MENU */}
          <section className="navbar__center">
            <div className={`menu ${sidebarOpen ? 'is-active' : ''}`} id="menu">

              {/* SIDEBAR HEADER (Mobile Only) */}
              <div className={`menu__header ${sidebarOpen ? 'is-active' : ''}`}>
                <span 
                  className="menu__arrow" 
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className="bx bx-chevron-left"></i>
                </span>
                <span className="menu__title">Menu</span>
              </div>

              <ul className="menu__inner">

                <li className={({ isActive }) => isActive ? "menu__link active" : "menu__link"}><NavLink to="/" className="menu__link" onClick={() => setSidebarOpen(false)}>Home</NavLink></li>
                <li className={({ isActive }) => isActive ? "menu__link active" : "menu__link"}><NavLink to="/hadith-list" className="menu__link" onClick={() => setSidebarOpen(false)}>Blogs</NavLink></li>
                <li className={({ isActive }) => isActive ? "menu__link active" : "menu__link"}><NavLink to="/donation" className="menu__link" onClick={() => setSidebarOpen(false)}>Donation</NavLink></li>
                <li className={({ isActive }) => isActive ? "menu__link active" : "menu__link"}><NavLink to="/donation-list" className="menu__link" onClick={() => setSidebarOpen(false)}>Donation List</NavLink></li>
                <li className={({ isActive }) => isActive ? "menu__link active" : "menu__link"}><NavLink to="/quiz" className="menu__link" onClick={() => setSidebarOpen(false)}>Hadith Quiz</NavLink></li>

              </ul>
            </div>
          </section>

        </nav>
      </header>
    </>
  );
}
