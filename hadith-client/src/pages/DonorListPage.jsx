import React, { useState } from 'react';
import '../assets/styles/donarlist_page.css';

// Sample data for the donor list
const donorData = [
  {
    id: 1,
    name: "Aarav Sharma",
    name_hi: "आरव शर्मा",
    date: "Oct 26, 2023",
    date_hi: "26 अक्टूबर 2023",
    amount: "₹500",
    amount_hi: "₹500"
  },
  {
    id: 2,
    name: "Olivia Chen",
    name_hi: "ओलिविया चेन",
    date: "Nov 15, 2023",
    date_hi: "15 नवम्बर 2023",
    amount: "₹250",
    amount_hi: "₹250"
  },
  {
    id: 3,
    name: "David Smith",
    name_hi: "डेविड स्मिथ",
    date: "Jan 01, 2024",
    date_hi: "1 जनवरी 2024",
    amount: "₹100",
    amount_hi: "₹100"
  },
  {
    id: 4,
    name: "Maria Rodriguez",
    name_hi: "मारिया रोड्रिगेज़",
    date: "Jan 10, 2024",
    date_hi: "10 जनवरी 2024",
    amount: "₹75",
    amount_hi: "₹75"
  },
  {
    id: 5,
    name: "Samantha Jones",
    name_hi: "समांथा जोन्स",
    date: "Mar 05, 2024",
    date_hi: "5 मार्च 2024",
    amount: "₹1,000",
    amount_hi: "₹1,000"
  },
  {
    id: 6,
    name: "Kenji Tanaka",
    name_hi: "केनजी तनाका",
    date: "Apr 12, 2024",
    date_hi: "12 अप्रैल 2024",
    amount: "₹300",
    amount_hi: "₹300"
  },
  {
    id: 7,
    name: "Isabble Nkrumah",
    name_hi: "इसाबेल नकुरुमाह",
    date: "Jun 18, 2024",
    date_hi: "18 जून 2024",
    amount: "₹200",
    amount_hi: "₹200"
  },
  {
    id: 8,
    name: "Liam Gallagher",
    name_hi: "लियम गैलघर",
    date: "Jul 01, 2024",
    date_hi: "1 जुलाई 2024",
    amount: "₹120",
    amount_hi: "₹120"
  },
  {
    id: 9,
    name: "Sofia Rossi",
    name_hi: "सोफिया रॉसी",
    date: "Sep 09, 2024",
    date_hi: "9 सितम्बर 2024",
    amount: "₹4400",
    amount_hi: "₹4400"
  },
  
];


const lastUpdatedDate = "October 26, 2024";
const organizationName = "[Your Organization Name]";

// 🔥 TEXT for English & Hindi
const TEXT = {
  en: {
    header: "THANK YOU FOR YOUR GENEROSITY!",
    sectionTitle: "OUR VALUED DONORS",
    thankYou: "Thank You",
    messageBody:
      "Every contribution makes a difference. We are profoundly grateful for your support, which enables us to continue our mission. Below is a list of individuals and organizations who have generously donated.",
    tableName: "NAME",
    tableDate: "DONATION DATE",
    tableAmount: "AMOUNT",
    lastUpdated: "Last updated:",
    copyright: "All Rights reserved.",
    langBtn: "हिंदी में देखें",
  },

  hi: {
    header: "आपकी उदारता के लिए धन्यवाद!",
    sectionTitle: "हमारे सम्मानित दानदाता",
    thankYou: "धन्यवाद",
    messageBody:
      "हर योगदान एक बदलाव लाता है। आपके समर्थन के लिए हम अत्यंत आभारी हैं, जो हमें अपना मिशन जारी रखने में सक्षम बनाता है। नीचे उन व्यक्तियों और संस्थाओं की सूची है जिन्होंने उदारतापूर्वक योगदान दिया है।",
    tableName: "नाम",
    tableDate: "दान तिथि",
    tableAmount: "राशि",
    lastUpdated: "अंतिम अपडेट:",
    copyright: "सर्वाधिकार सुरक्षित।",
    langBtn: "See in English",
  },
};

const DonorListPage = () => {
  const [lang, setLang] = useState("en");

  return (
    <div className="donor-page-container">

      {/* Hindi Toggle Button */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", padding: "15px" }}>
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="lang-toggle-btn"
          style={{
            padding: "10px 18px",
            background: "#000000ff",
            color: "#fff",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {TEXT[lang].langBtn}
        </button>
      </div>

      {/* Header Banner */}
      <div className="header-banner">
        <h1 className="header-text">{TEXT[lang].header}</h1>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <h2 className="section-title">{TEXT[lang].sectionTitle}</h2>

        <div className="donor-list-layout">
          {/* Thank You Message Section */}
          <div className="thank-you-message">
            <p className="thank-you-script">{TEXT[lang].thankYou}</p>
            <p className="message-body">{TEXT[lang].messageBody}</p>
          </div>

          {/* Donor Table Section */}
          <div className="donor-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>{TEXT[lang].tableName}</th>
                  <th>{TEXT[lang].tableDate}</th>
                  <th>{TEXT[lang].tableAmount}</th>
                </tr>
              </thead>

              <tbody>
                {donorData.map((donor) => (
                  <tr key={donor.id}>
                    <td>{lang === "hi" ? donor.name_hi : donor.name}</td>
                    <td>{lang === "hi" ? donor.date_hi : donor.date}</td>
                    <td>{lang === "hi" ? donor.amount_hi : donor.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="last-updated">
              {TEXT[lang].lastUpdated} {lastUpdatedDate}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-section">
        <div className="social-icons">
          <span>●</span> <span>●</span> <span>●</span> <span>●</span>
        </div>

        <p className="copyright">
          © 2024 {organizationName}, {TEXT[lang].copyright}
        </p>
      </div>
    </div>
  );
};

export default DonorListPage;
