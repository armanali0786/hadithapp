import React, { useState } from 'react';
import ScannerImage from '../assets/img/scanner.jpeg';
import DonationModal from './DonationModal';

const TEXT = {
  en: {
    logoArabic: "سورة الرحمة",
    logoSubtitle: "THE MOSQUE OF LIGHT",
    mosqueName: "QADRI JAME MASJID",
    title: "Sadaqah",
    subtitle: "invest in your akhirah",
    description:
      "Acts of kindness can bring a smile to many faces around the world. Invest in your akhirah and help those in greatest need. Your assistance is their lifeline, so donate now.",
    whatIsTitle: "What is Sadaqah in Islam?",
    whatIsDesc:
      "Helping others is a fundamental part of faith. Any act of voluntary charity benefits those in need.",
    quote:
      `"Those who spend their wealth by night and by day, secretly and publicly, will have their reward with their Lord." (Qur'an 2:274)`,
    payOnline: "Pay Sadaqah Online",
    payDesc: "Your donation will help people in need. Any amount you give will help change lives.",
    donateNowBtn: "DONATE NOW",
    langBtn: "हिंदी में देखें",
    donationCards: [
      { icon: "🍚", amount: "₹ 500",   en: "Could provide a full month of essential food.",        hi: "एक महीने का आवश्यक भोजन उपलब्ध करा सकता है।" },
      { icon: "💧", amount: "₹ 1000",  en: "Could provide clean drinking water for a month.",       hi: "पूरा महीना साफ पीने का पानी उपलब्ध करा सकता है।" },
      { icon: "🏠", amount: "₹ 2000",  en: "Could ensure safe shelter for vulnerable families.",    hi: "ज़रूरतमंद परिवारों को सुरक्षित आश्रय दे सकता है।" },
      { icon: "➕", amount: "₹ 5000",  en: "Could provide life-saving medicines and care.",         hi: "जीवनरक्षक दवाइयाँ और देखभाल उपलब्ध करा सकता है।" },
      { icon: "📦", amount: "₹ 10000", en: "Could provide an emergency relief package.",            hi: "आपातकालीन राहत पैकेज प्रदान कर सकता है।" },
    ],
  },
  hi: {
    logoArabic: "सूरत-उर-रहमा",
    logoSubtitle: "THE MOSQUE OF LIGHT",
    mosqueName: "कादरी जामे मस्जिद",
    title: "सदक़ा",
    subtitle: "अपनी आख़िरत में निवेश करें",
    description:
      "आपकी नेकी किसी जरूरतमंद के चेहरे पर मुस्कान ला सकती है। अपनी आख़िरत के लिए निवेश करें और ज़रूरतमंदों की मदद करें। आपका सहयोग उनकी जीवनरेखा है, अभी दान करें।",
    whatIsTitle: "इस्लाम में सदक़ा क्या है?",
    whatIsDesc:
      "दूसरों की मदद करना ईमान का एक अहम हिस्सा है। अपनी मर्ज़ी से दी गई कोई भी भलाई ज़रूरतमंदों के काम आती है।",
    quote:
      `"जो लोग रात और दिन, छिपकर और खुले तौर पर अल्लाह की राह में खर्च करते हैं, उनके लिए उनके रब के पास बड़ा सवाब है।" (कुरआन 2:274)`,
    payOnline: "ऑनलाइन सदक़ा अदा करें",
    payDesc: "आपका सदक़ा कई ज़रूरतमंद लोगों की मदद कर सकता है। आपकी दी हुई कोई भी रकम उनके जीवन में बदलाव ला सकती है।",
    donateNowBtn: "अभी दान करें",
    langBtn: "View in English",
    donationCards: [
      { icon: "🍚", amount: "₹ 500",   en: "Could provide a full month of essential food.",        hi: "एक महीने का आवश्यक भोजन उपलब्ध करा सकता है।" },
      { icon: "💧", amount: "₹ 1000",  en: "Could provide clean drinking water for a month.",       hi: "पूरा महीना साफ पीने का पानी उपलब्ध करा सकता है।" },
      { icon: "🏠", amount: "₹ 2000",  en: "Could ensure safe shelter for vulnerable families.",    hi: "ज़रूरतमंद परिवारों को सुरक्षित आश्रय दे सकता है।" },
      { icon: "➕", amount: "₹ 5000",  en: "Could provide life-saving medicines and care.",         hi: "जीवनरक्षक दवाइयाँ और देखभाल उपलब्ध करा सकता है।" },
      { icon: "📦", amount: "₹ 10000", en: "Could provide an emergency relief package.",            hi: "आपातकालीन राहत पैकेज प्रदान कर सकता है।" },
    ],
  },
};

const SadaqahPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lang, setLang] = useState("en");
  const t = TEXT[lang];

  const handleDonateClick = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  return (
    <div className="bg-isl-cream min-h-screen font-body">

      {/* Hero */}
      <div className="bg-isl-green text-white relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-isl-gold/10 translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-3">
            <div className="text-left">
              <div className="font-arabic text-isl-gold text-lg">{t.logoArabic}</div>
              <div className="text-white/50 text-xs tracking-widest uppercase">{t.logoSubtitle}</div>
            </div>
            <div className="text-white/70 text-sm font-semibold tracking-wider">{t.mosqueName}</div>
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/20 transition-all duration-200"
            >
              {t.langBtn}
            </button>
          </div>

          {/* Hero Text */}
          <div className="space-y-4">
            <h1 className="font-arabic text-5xl md:text-6xl text-isl-gold">{t.title}</h1>
            <p className="text-isl-gold/80 text-lg font-medium tracking-wide">{t.subtitle}</p>
            <p className="text-white/70 text-sm leading-relaxed max-w-2xl mx-auto">{t.description}</p>
            <div className="pt-4">
              <button
                onClick={handleDonateClick}
                className="px-8 py-3.5 bg-isl-gold text-isl-green font-bold text-sm rounded-xl hover:bg-isl-gold-light hover:scale-105 transition-all duration-200 shadow-xl shadow-black/20 tracking-widest"
              >
                {t.donateNowBtn}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* What is Sadaqah */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-isl-gold/20">
            <h3 className="text-lg font-bold text-isl-green mb-3 font-body">{t.whatIsTitle}</h3>
            <p className="text-gray-600 text-sm leading-relaxed font-body">{t.whatIsDesc}</p>
          </div>

          {/* Quote Card */}
          <div className="bg-isl-green rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-3 left-4 font-arabic text-isl-gold text-4xl opacity-20">"</div>
            <p className="text-white/85 text-sm leading-relaxed font-body relative z-10 pt-4">{t.quote}</p>
          </div>
        </div>
      </div>

      {/* Donation Options */}
      <div className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-isl-green font-body">{t.payOnline}</h2>
            <div className="flex items-center justify-center gap-3 mt-3 mb-3">
              <div className="h-px bg-isl-gold/40 w-16"></div>
              <span className="text-isl-gold text-xs">✦</span>
              <div className="h-px bg-isl-gold/40 w-16"></div>
            </div>
            <p className="text-gray-500 text-sm font-body">{t.payDesc}</p>
          </div>

          {/* Donation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {t.donationCards.map((card, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 text-center border-2 transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${
                  index === 2
                    ? 'bg-isl-green border-isl-gold text-white shadow-lg scale-105'
                    : 'bg-white border-gray-100 hover:border-isl-gold/50'
                }`}
              >
                <div className="text-4xl mb-3">{card.icon}</div>
                <p className={`text-2xl font-bold mb-2 font-body ${index === 2 ? 'text-isl-gold' : 'text-isl-green'}`}>
                  {card.amount}
                </p>
                <p className={`text-xs leading-relaxed font-body ${index === 2 ? 'text-white/75' : 'text-gray-500'}`}>
                  {lang === "en" ? card.en : card.hi}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleDonateClick}
              className="px-10 py-3.5 bg-isl-gold text-isl-green font-bold text-sm rounded-xl hover:bg-isl-gold-light hover:scale-105 transition-all duration-200 shadow-lg tracking-widest"
            >
              {t.donateNowBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-isl-dark text-center py-6 px-4">
        <p className="text-white/70 text-sm font-body font-semibold tracking-widest">QADRI JAME MASJID</p>
        <p className="text-white/40 text-xs font-body mt-1">Donation</p>
      </div>

      <DonationModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} ScannerImage={ScannerImage} />
    </div>
  );
};

export default SadaqahPage;
