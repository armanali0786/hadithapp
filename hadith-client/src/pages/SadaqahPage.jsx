import React, { useState } from 'react';
import '../assets/styles/sadaqah_page.css';
import ScannerImage from '../assets/img/scanner.jpeg'
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
    payDesc:
      "Your donation will help people in need. Any amount you give will help change lives.",

    donateNowBtn: "DONATE NOW",
    langBtn: "हिंदी में देखें",
    donationCards: [
      {
        icon: "🍚",
        amount: "₹ 500",
        en: "Could provide a full month of essential food.",
        hi: "एक महीने का आवश्यक भोजन उपलब्ध करा सकता है।"
      },
      {
        icon: "💧",
        amount: "₹ 1000",
        en: "Could provide clean drinking water for a month.",
        hi: "पूरा महीना साफ पीने का पानी उपलब्ध करा सकता है।"
      },
      {
        icon: "🏠",
        amount: "₹ 2000",
        en: "Could ensure safe shelter for vulnerable families.",
        hi: "ज़रूरतमंद परिवारों को सुरक्षित आश्रय दे सकता है।"
      },
      {
        icon: "➕",
        amount: "₹ 5000",
        en: "Could provide life-saving medicines and care.",
        hi: "जीवनरक्षक दवाइयाँ और देखभाल उपलब्ध करा सकता है।"
      },
      {
        icon: "📦",
        amount: "₹ 10000",
        en: "Could provide an emergency relief package.",
        hi: "आपातकालीन राहत पैकेज प्रदान कर सकता है।"
      }
    ]
  },

  hi: {
    logoArabic: "सूरत-उर-रहमा",
    logoSubtitle: "THE MOSQUE OF LIGHT",
    mosqueName: "कादरी जामे मस्जिद ",

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
    payDesc:
      "आपका सदक़ा कई ज़रूरतमंद लोगों की मदद कर सकता है। आपकी दी हुई कोई भी रकम उनके जीवन में बदलाव ला सकती है।",

    donateNowBtn: "अभी दान करें",
    langBtn: "View in English",
    donationCards: [
      {
        icon: "🍚",
        amount: "₹ 500",
        en: "Could provide a full month of essential food.",
        hi: "एक महीने का आवश्यक भोजन उपलब्ध करा सकता है।"
      },
      {
        icon: "💧",
        amount: "₹ 1000",
        en: "Could provide clean drinking water for a month.",
        hi: "पूरा महीना साफ पीने का पानी उपलब्ध करा सकता है।"
      },
      {
        icon: "🏠",
        amount: "₹ 2000",
        en: "Could ensure safe shelter for vulnerable families.",
        hi: "ज़रूरतमंद परिवारों को सुरक्षित आश्रय दे सकता है।"
      },
      {
        icon: "➕",
        amount: "₹ 5000",
        en: "Could provide life-saving medicines and care.",
        hi: "जीवनरक्षक दवाइयाँ और देखभाल उपलब्ध करा सकता है।"
      },
      {
        icon: "📦",
        amount: "₹ 10000",
        en: "Could provide an emergency relief package.",
        hi: "आपातकालीन राहत पैकेज प्रदान कर सकता है।"
      }
    ]
  },
};




const SadaqahPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lang, setLang] = useState("en");

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  // Helper function to handle button click
  const handleDonateClick = (e) => {
    e.preventDefault(); // Prevent default if it's a form/link
    openModal();
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "hi" : "en");
  };
  return (
    <div className="sadaqah-page">
      {/* 1. Header/Hero Section */}
      <header className="sadaqah-hero">
        <div className="sadaqah-hero__content">
          <div className="sadaqah-hero__top-bar">
            {/* The Arabic text and icon are placeholders */}
            <div className="sadaqah-hero__logo">
              <span className="logo-arabic">{TEXT[lang].logoArabic}</span>
              <span className="logo-subtitle">{TEXT[lang].logoSubtitle}</span>
            </div>
            <div className="sadaqah-hero__mosque-info">
              <span>{TEXT[lang].mosqueName}</span>
              {/* <a href="#">
                <i className="fab fa-twitter"></i>
              </a>{' '}
              <a href="#">
                <i className="fas fa-search"></i>
              </a> */}
            </div>
            <button
              onClick={toggleLang}
              className="ml-2 mt-2 px-4 py-2 bg-black text-white text-sm rounded-lg"
            >
              {TEXT[lang].langBtn}
            </button>
          </div>

          <div className="sadaqah-hero__text">
            <h1 className="sadaqah-hero__title">{TEXT[lang].title}</h1>
            <p className="sadaqah-hero__subtitle">{TEXT[lang].subtitle}</p>
            <p className="sadaqah-hero__description">{TEXT[lang].description}</p>
            <button className="sadaqah-hero__button" onClick={handleDonateClick}>
              {TEXT[lang].donateNowBtn}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content Section: What is Sadaqah? */}
      <main className="sadaqah-main">
        <section className="sadaqah-section sadaqah-section--intro">
          {/* <h2 className="sadaqah-section__heading">What is Sadaqah in Islam?</h2>
          <p className="sadaqah-section__text">
            Acts of kindness can the fundanl Sakul; ctels tos voluniary pchunlt
            that benefits in need. The Sadtsteng is thef ten gives frealy from the
            Kindness hearts.
          </p> */}
        </section>

        <section className="sadaqah-section sadaqah-section--details">
          <div className="sadaqah-section__card">
            <h3 className="sadaqah-section__subheading">{TEXT[lang].whatIsTitle}</h3>
            <p className="sadaqah-section__text">{TEXT[lang].whatIsDesc}</p>
          </div>
          <div className="sadaqah-section__quote">
            <p>{TEXT[lang].quote}</p>
          </div>
        </section>

        {/* 3. Donation Options Section */}
        <section className="sadaqah-section sadaqah-section--pay">
          <h2 className="sadaqah-section__heading">{TEXT[lang].payOnline}</h2>
          <p className="sadaqah-section__text">{TEXT[lang].payDesc}</p>


          <div className="donation-cards">
            {TEXT[lang].donationCards.map((card, index) => (
              <div
                key={index}
                className={`donation-card ${index === 2 ? "donation-card--highlight" : ""}`}
              >
                <div className="donation-card__icon">
                  <span>{card.icon}</span>
                </div>

                <p className="donation-card__amount">{card.amount}</p>

                <p className="donation-card__description">
                  {lang === "en" ? card.en : card.hi}
                </p>
              </div>
            ))}
          </div>


          <button className="sadaqah-section__button" onClick={handleDonateClick}>
            {TEXT[lang].donateNowBtn}
          </button>
        </section>
      </main>

      {/* 4. Footer Section */}
      <footer className="sadaqah-footer">
        <p className="sadaqah-footer__text">QADRI JAME MASJID</p>
        <p className="sadaqah-footer__legal">
          Donation
        </p>
      </footer>
      <DonationModal isVisible={isModalVisible} onClose={closeModal} ScannerImage={ScannerImage} />
    </div>
  );
};

export default SadaqahPage;