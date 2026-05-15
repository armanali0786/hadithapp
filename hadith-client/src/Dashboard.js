import React from "react";
import Footer from "./pages/component/Footer";
import HadithSlider from "./pages/HadithSlider";
import HadithCollections from "./pages/HadithCollections";

export default function Dashboard() {
  return (
    <>
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
