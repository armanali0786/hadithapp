import React from "react";
import {
  FaTwitter, FaFacebook, FaInstagram, FaYoutube,
  FaHeart, FaBookOpen, FaHandHoldingHeart, FaUsers,
  FaQuestionCircle, FaArrowRight,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const bannerCells = [
  {
    Icon: FaBookOpen,
    title: "10+ Islamic Resources",
    desc: "Bringing people closer to Allah through authentic knowledge",
    to: "/hadith-list",
    linkText: "Explore Hadith",
    bg: "bg-isl-green",
  },
  {
    Icon: FaHandHoldingHeart,
    title: "Sadaqah Jariyah",
    desc: "Help us reach Muslims worldwide with the light of knowledge",
    to: "/donation",
    linkText: "Donate Now",
    bg: "bg-isl-gold",
    dark: true,
  },
  {
    Icon: FaUsers,
    title: "Volunteer for the Ummah",
    desc: "Got skills? Use them for the sake of Allah and the community",
    to: "#",
    linkText: "Get Involved",
    bg: "bg-amber-800",
  },
  {
    Icon: FaQuestionCircle,
    title: "Hadith Quiz",
    desc: "Test your knowledge of the Prophet's ﷺ teachings",
    to: "/quiz",
    linkText: "Take the Quiz",
    bg: "bg-isl-dark",
  },
];

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/hadith-list', label: 'Blogs' },
  { to: '/quiz', label: 'Hadith Quiz' },
  { to: '/donation', label: 'Donate' },
  { to: '/donation-list', label: 'Donor List' },
];

const resources = ['About Us', 'Volunteer', 'Contact Us', 'Help & Support', 'Privacy Policy'];

export default function Footer() {
  return (
    <footer className="bg-isl-dark">

      {/* Top 2×2 Banner Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {bannerCells.map(({ Icon, title, desc, to, linkText, bg, dark }) => (
          <div key={title} className={`${bg} p-6 flex flex-col items-start gap-3`}>
            <Icon className={`text-2xl ${dark ? 'text-isl-green' : 'text-white/90'}`} />
            <h2 className={`font-bold text-sm leading-tight font-body ${dark ? 'text-isl-green' : 'text-white'}`}>
              {title}
            </h2>
            <p className={`text-xs font-body leading-relaxed flex-1 ${dark ? 'text-isl-green/80' : 'text-white/70'}`}>
              {desc}
            </p>
            <NavLink
              to={to}
              className={`flex items-center gap-1.5 text-xs font-semibold mt-1 group no-underline ${
                dark ? '!text-isl-green hover:!text-isl-dark' : '!text-white hover:text-gray-200'
              }`}
            >
              {linkText} <FaArrowRight className="text-[9px] group-hover:translate-x-0.5 transition-transform" />
            </NavLink>
          </div>
        ))}
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-xl font-body">Hadith Hub</h3>
            <span className="block font-arabic text-isl-gold text-xl">اَلأَحَادِيثُ النَّبَوِيَّة</span>
            <p className="text-gray-400 text-xs font-body">Qadri Jame Masjid Foundation</p>
            <p className="text-gray-400 text-xs font-body">Parsauni Khas, Gopalganj, Bihar, India</p>
            <p className="text-xs font-body">
              <strong className="text-isl-gold/80">Phone:</strong>{" "}
              <a href="tel:+917319977276" className="text-isl-gold/80 hover:text-isl-gold transition-colors duration-200">
                +91 731 9977 276
              </a>
            </p>
            <p className="text-xs font-body">
              <strong className="text-isl-gold/80">Email:</strong>{" "}
              <a href="mailto:armanali.shaikh77@gmail.com" className="text-isl-gold/80 hover:text-isl-gold transition-colors duration-200">
                armanali.shaikh77@gmail.com
              </a>
            </p>
            {/* Social Icons */}
            <div className="flex gap-2.5 pt-1">
              {[FaTwitter, FaFacebook, FaInstagram, FaYoutube].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-8 h-8 rounded-full border border-isl-gold/30 flex items-center justify-center text-isl-gold/60 hover:bg-isl-gold hover:text-isl-dark hover:border-isl-gold transition-all duration-200 cursor-pointer"
                >
                  <Icon className="text-xs" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider font-body uppercase">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className="!text-gray-400 hover:!text-isl-gold text-xs font-body transition-colors duration-200 no-underline"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider font-body uppercase">Resources</h4>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="!text-gray-400 hover:!text-isl-gold text-xs font-body transition-colors duration-200 cursor-pointer text-left no-underline"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Daily Reminder */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider font-body uppercase">Daily Reminder</h4>
            <div className="bg-isl-gold/10 border border-isl-gold/20 rounded-xl p-4">
              <p className="font-arabic text-isl-gold text-xl text-center leading-loose mb-2">
                إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ
              </p>
              <p className="text-xs text-gray-400 text-center font-body leading-relaxed">
                "Actions are judged by intentions."<br />
                <em>— Sahih al-Bukhari</em>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-gray-400 text-xs font-body">
          © {new Date().getFullYear()}{" "}
          <strong className="text-isl-gold/80">Hadith Hub</strong>. All Rights Reserved.
        </span>
        <span className="flex items-center gap-1.5 text-gray-400 text-xs font-body">
          Made with <FaHeart className="text-isl-gold text-xs" /> by Arman Ali
        </span>
      </div>

    </footer>
  );
}
