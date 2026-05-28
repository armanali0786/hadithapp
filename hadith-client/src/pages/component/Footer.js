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
    arabic: "مصادر إسلامية",
    desc: "Bringing people closer to Allah through authentic knowledge",
    to: "/hadith-list",
    linkText: "Explore Hadith",
    accent: "#c9a227",
  },
  {
    Icon: FaHandHoldingHeart,
    title: "Sadaqah Jariyah",
    arabic: "صدقة جارية",
    desc: "Help us reach Muslims worldwide with the light of knowledge",
    to: "/donation",
    linkText: "Donate Now",
    accent: "#e0b733",
  },
  {
    Icon: FaUsers,
    title: "Volunteer for the Ummah",
    arabic: "تطوع للأمة",
    desc: "Got skills? Use them for the sake of Allah and the community",
    to: "#",
    linkText: "Get Involved",
    accent: "#c9a227",
  },
  {
    Icon: FaQuestionCircle,
    title: "Hadith Quiz",
    arabic: "اختبر نفسك",
    desc: "Test your knowledge of the Prophet's ﷺ teachings",
    to: "/quiz",
    linkText: "Take the Quiz",
    accent: "#e0b733",
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

      {/* Feature Banner */}
      <div className="relative overflow-hidden bg-isl-green-dark border-b border-isl-gold/20">
        {/* Subtle geometric overlay */}
        <div className="absolute inset-0 geometric-bg opacity-30 pointer-events-none" />

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {bannerCells.map(({ Icon, title, arabic, desc, to, linkText, accent }) => (
            <NavLink
              key={title}
              to={to}
              className="group flex flex-col gap-3 px-7 py-8 no-underline hover:bg-white/5 transition-all duration-300"
            >
              {/* Icon circle */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mb-1 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${accent}1a`, border: `1.5px solid ${accent}55` }}
              >
                <Icon style={{ color: accent, fontSize: '1.1rem' }} />
              </div>

              {/* Arabic subtitle */}
              <div className="font-arabic text-sm leading-none" style={{ color: `${accent}99` }}>
                {arabic}
              </div>

              {/* Title */}
              <h3 className="font-body font-bold text-white text-sm leading-snug">
                {title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-xs font-body leading-relaxed flex-1">
                {desc}
              </p>

              {/* Link */}
              <div className="flex items-center gap-1.5 text-xs font-semibold mt-1 transition-colors duration-200"
                style={{ color: accent }}>
                {linkText}
                <FaArrowRight
                  className="text-[9px] transition-transform duration-200 group-hover:translate-x-1"
                />
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-xl font-body">IlmHadith</h3>
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
          <strong className="text-isl-gold/80">IlmHadith</strong>. All Rights Reserved.
        </span>
        <span className="flex items-center gap-1.5 text-gray-400 text-xs font-body">
          Made with <FaHeart className="text-isl-gold text-xs" /> by Arman Ali
        </span>
      </div>

    </footer>
  );
}
