import React, { useState } from 'react';

const donorData = [
  { id: 1, name: "Aarav Sharma",     name_hi: "आरव शर्मा",       date: "Oct 26, 2023", date_hi: "26 अक्टूबर 2023", amount: "₹500",   amount_hi: "₹500"   },
  { id: 2, name: "Olivia Chen",      name_hi: "ओलिविया चेन",     date: "Nov 15, 2023", date_hi: "15 नवम्बर 2023",  amount: "₹250",   amount_hi: "₹250"   },
  { id: 3, name: "David Smith",      name_hi: "डेविड स्मिथ",     date: "Jan 01, 2024", date_hi: "1 जनवरी 2024",    amount: "₹100",   amount_hi: "₹100"   },
  { id: 4, name: "Maria Rodriguez",  name_hi: "मारिया रोड्रिगेज़", date: "Jan 10, 2024", date_hi: "10 जनवरी 2024",   amount: "₹75",    amount_hi: "₹75"    },
  { id: 5, name: "Samantha Jones",   name_hi: "समांथा जोन्स",    date: "Mar 05, 2024", date_hi: "5 मार्च 2024",     amount: "₹1,000", amount_hi: "₹1,000" },
  { id: 6, name: "Kenji Tanaka",     name_hi: "केनजी तनाका",     date: "Apr 12, 2024", date_hi: "12 अप्रैल 2024",  amount: "₹300",   amount_hi: "₹300"   },
  { id: 7, name: "Isabble Nkrumah",  name_hi: "इसाबेल नकुरुमाह", date: "Jun 18, 2024", date_hi: "18 जून 2024",      amount: "₹200",   amount_hi: "₹200"   },
  { id: 8, name: "Liam Gallagher",   name_hi: "लियम गैलघर",      date: "Jul 01, 2024", date_hi: "1 जुलाई 2024",    amount: "₹120",   amount_hi: "₹120"   },
  { id: 9, name: "Sofia Rossi",      name_hi: "सोफिया रॉसी",     date: "Sep 09, 2024", date_hi: "9 सितम्बर 2024",  amount: "₹4400",  amount_hi: "₹4400"  },
];

const lastUpdatedDate = "October 26, 2024";
const organizationName = "Qadri Jame Masjid";

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
    copyright: "All Rights Reserved.",
    langBtn: "हिंदी में देखें",
  },
  hi: {
    header: "आपकी उदारता के लिए धन्यवाद!",
    sectionTitle: "हमारे सम्मानित दानदाता",
    thankYou: "धन्यवाद",
    messageBody:
      "हर योगदान एक बदलाव लाता है। आपके समर्थन के लिए हम अत्यंत आभारी हैं, जो हमें अपना मिशन जारी रखने में सक्षम बनाता है।",
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
  const t = TEXT[lang];

  return (
    <div className="bg-isl-cream min-h-screen font-body">

      {/* Lang Toggle */}
      <div className="flex justify-end px-6 pt-4">
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="px-4 py-2 bg-isl-dark text-white text-xs font-semibold rounded-lg hover:bg-isl-green transition-colors duration-200"
        >
          {t.langBtn}
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-isl-green text-center py-12 px-6">
        <div className="font-arabic text-isl-gold text-2xl mb-3">اَلأَحَادِيثُ النَّبَوِيَّة</div>
        <h1 className="text-white font-bold text-2xl md:text-3xl font-body tracking-wide">{t.header}</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-isl-green font-bold text-xl text-center mb-10 tracking-widest font-body uppercase">
          {t.sectionTitle}
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Thank You Message */}
          <div className="lg:w-64 flex-shrink-0 text-center lg:text-left">
            <p className="font-arabic text-isl-gold text-4xl mb-3">{t.thankYou}</p>
            <p className="text-gray-600 text-sm leading-relaxed font-body">{t.messageBody}</p>
          </div>

          {/* Donor Table */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-isl-green text-white">
                    <th className="px-5 py-3.5 text-left text-xs font-bold tracking-widest uppercase font-body">{t.tableName}</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold tracking-widest uppercase font-body">{t.tableDate}</th>
                    <th className="px-5 py-3.5 text-right text-xs font-bold tracking-widest uppercase font-body">{t.tableAmount}</th>
                  </tr>
                </thead>
                <tbody>
                  {donorData.map((donor, i) => (
                    <tr
                      key={donor.id}
                      className={`border-b border-gray-50 hover:bg-isl-cream/50 transition-colors duration-150 ${
                        i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-5 py-3.5 font-medium text-gray-800 font-body">
                        {lang === "hi" ? donor.name_hi : donor.name}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 font-body">
                        {lang === "hi" ? donor.date_hi : donor.date}
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-isl-green font-body">
                        {lang === "hi" ? donor.amount_hi : donor.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-body">
                  {t.lastUpdated} {lastUpdatedDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-isl-dark text-center py-6 px-4">
        <div className="flex justify-center gap-3 mb-3">
          {['●', '●', '●', '●'].map((dot, i) => (
            <span key={i} className="text-isl-gold/50 text-xs">{dot}</span>
          ))}
        </div>
        <p className="text-white/40 text-xs font-body">
          © 2024 {organizationName}, {t.copyright}
        </p>
      </div>

    </div>
  );
};

export default DonorListPage;
