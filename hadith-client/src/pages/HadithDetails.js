import HadithDetailsCard from "../components/HadithDetailsCard";
import { FaBookmark, FaStar, FaMoon, FaCheckCircle } from 'react-icons/fa';
import SEO from '../components/SEO';

const DETAILS_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Ultimate Collection of Hadith — Ramadan Planner",
    "description": "Authentic Hadith guidance for Ramadan planning including Salah, Dhikr, Quran tracker, Laylatul Qadr preparation and Eid-ul-Fitr.",
    "author": { "@type": "Organization", "name": "IlmHadith" },
    "publisher": { "@type": "Organization", "name": "IlmHadith", "url": "https://ilmhadith.com" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://ilmhadith.com/hadith-details" }
  }
];

export default function HadithDetails() {
  return (
    <div className="section-bg min-h-screen py-12 px-4 relative overflow-hidden">
      <SEO
        title="Ultimate Collection of Hadith"
        description="Explore the ultimate Hadith collection with Ramadan planner, Salah checklist, Dhikr tracker, Quran progress, Laylatul Qadr guide and more from IlmHadith."
        keywords="hadith collection, Ramadan planner, salah checklist, dhikr, Quran tracker, Laylatul Qadr, eid preparation"
        path="/hadith-details"
        schema={DETAILS_SCHEMA}
      />
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-isl-gold/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-isl-green/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Premium Header */}
        <div className="isl-section-header pb-6">
          <span className="arabic-deco">مَجْمُوعَةُ الْأَحَادِيث</span>
          <h2>Ultimate Collection of Hadith</h2>
          <div className="isl-divider">
            <span className="isl-divider-star">✦</span>
          </div>
          <p className="text-isl-text-light mt-2 text-lg">Best Ramadan Planner 2024 [Free PDF]: Make Your Ramadan Fruitful</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-[20px] shadow-xl border border-[rgba(201,162,39,0.2)] p-8 md:p-12 space-y-10 relative overflow-hidden">
            {/* Top gold accent bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-isl-gold via-yellow-200 to-isl-gold"></div>
            
            <div className="space-y-4 relative">
              <div className="flex items-center gap-3">
                <FaMoon className="text-isl-gold text-2xl" />
                <h3 className="text-2xl font-bold text-[#0d4a2e] font-['Jost']">
                  Why Do You Need Ramadan Plans?
                </h3>
              </div>
              <p className="text-gray-600 font-body text-base leading-relaxed pl-9">
                The blessed month of Ramadan is at our doorsteps. Surely you don't want to miss out on its rewards,
                for there is one night in this month which is better than a thousand months. A Ramadan planner can
                help you a lot to get ready for the Ramadan.
              </p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8"></div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaStar className="text-isl-gold text-2xl" />
                <h3 className="text-2xl font-bold text-[#0d4a2e] font-['Jost']">
                  Ramadan Day Planner for Who?
                </h3>
              </div>
              <div className="ml-9 bg-[rgba(201,162,39,0.05)] border-l-4 border-isl-gold rounded-r-xl px-6 py-4 text-gray-700 font-body text-base italic shadow-sm">
                "Anyone can benefit from this 30-day Ramadan schedule and make his/her Ramadan fruitful."
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8"></div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FaBookmark className="text-isl-gold text-2xl" />
                <h3 className="text-2xl font-bold text-[#0d4a2e] font-['Jost']">
                  Ramadan Planner Ideas to Maximise Your Ramadan
                </h3>
              </div>
              <ul className="space-y-4 pl-9">
                {[
                  { title: "Salah Checklist", text: "Keep track of 5 daily prayers, Tarawih, Duha and more." },
                  { title: "Dhikr Checklist", text: "Track your Istigfar, Send prayers to Prophet ﷺ, Morning and Evening Adhkars and more." },
                  { title: "Quran Tracker", text: "Keep track of how many verses and pages you have recited from the holy Quran. It'll help you see your progress." },
                  { title: "Other Ibadah Tracker", text: "Keep track of your charity, Salah in the congregation and Tafsir reading progress." },
                  { title: "Dua of the Day", text: "Learn a new dua each day." },
                  { title: "Take Notes", text: "This section is for you. You can write down points, comments, extra ibadah etc." },
                  { title: "Laylatul Qadr & Itikaf", text: "Learn about Laylatul Qadr and recommended deeds and duas." },
                  { title: "Eid-ul-Fitr", text: "Learn how to prepare for Eid and the Sunnah on that joyous day." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-gray-50 border border-transparent hover:border-gray-100">
                    <FaCheckCircle className="text-isl-green mt-1 text-xl flex-shrink-0" />
                    <div>
                      <strong className="text-isl-green font-['Jost'] block text-lg mb-1">{item.title}:</strong>
                      <span className="text-gray-600 font-body text-sm leading-relaxed">{item.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar Card */}
          <div className="w-full lg:w-[380px] lg:flex-shrink-0">
            <HadithDetailsCard />
          </div>

        </div>
      </div>
    </div>
  );
}
