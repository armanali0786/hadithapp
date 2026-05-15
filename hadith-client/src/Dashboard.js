import React from "react";
import Footer from "./pages/component/Footer";
import HadithSlider from "./pages/HadithSlider";
import HadithCollections from "./pages/HadithCollections";
import SEO from "./components/SEO";

const HOME_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://ilmhadith.com/#webpage",
    "url": "https://ilmhadith.com/",
    "name": "IlmHadith — Authentic Hadith & Islamic Knowledge",
    "description": "Browse authentic Hadiths of Prophet Muhammad ﷺ, explore Islamic knowledge, take Hadith quizzes and donate for the Ummah.",
    "isPartOf": { "@id": "https://ilmhadith.com" },
    "primaryImageOfPage": { "@id": "https://ilmhadith.com/og-image.png" }
  }
];

export default function Dashboard() {
  return (
    <>
      <SEO
        title="Home"
        description="Discover authentic Hadiths of Prophet Muhammad ﷺ. Browse the ultimate Hadith collection, take Islamic quizzes, and grow in Islamic knowledge with IlmHadith."
        keywords="hadith, Islamic knowledge, Prophet Muhammad, Sunnah, Quran, Islamic quiz, sahih hadith"
        path="/"
        schema={HOME_SCHEMA}
      />
      {/* Hero Slider */}
      <section>
        <HadithSlider />
      </section>

      {/* Hadith Collections */}
      <section className="bg-isl-cream py-14">
        <div className="max-w-6xl mx-auto px-4">

          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="block font-arabic text-isl-gold text-2xl mb-1">
              اَلأَحَادِيثُ النَّبَوِيَّة
            </span>
            <h2 className="font-body text-2xl md:text-3xl font-bold text-isl-green">
              Ultimate Collection of Hadith
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3 mb-3">
              <div className="h-px bg-isl-gold/40 w-16"></div>
              <span className="text-isl-gold text-xs">✦</span>
              <div className="h-px bg-isl-gold/40 w-16"></div>
            </div>
            <p className="text-gray-500 text-sm font-body max-w-xl mx-auto">
              Authentic narrations from the Prophet Muhammad ﷺ — browse by collection
            </p>
          </div>

          <HadithCollections />
        </div>
      </section>

      <Footer />
    </>
  );
}
