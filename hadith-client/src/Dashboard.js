import React, { useState } from "react";
import "./assets/styles/style.css";
// import CourseItemList from './pages/CourseItemList';
// import Store from './pages/Store';
import Footer from "./pages/component/Footer";
// import Pricing from './pages/component/Pricing';
// import Category from './pages/component/Category';

import Testimonial from "./pages/component/Testimonial";
import HadithSlider from "./pages/HadithSlider";
import HadithCollections from "./pages/HadithCollections";
import AboutSection from "./pages/AboutSection";
import HadithItem from "./components/HadithItem";


export default function Dashboard() {

  return (
    <>
      <section className="section-bg">
        <HadithSlider />
      </section>
      <section className="about section-bg pt-5">
        <div className="" data-aos="fade-up">
          <div className="section-title">
            <h2>Ultimate COllection of Hadith</h2>
          </div>
          <div className="p-5">
            <HadithCollections />
          </div>
        </div>
      </section>

      {/* <div className="max-w-xl mx-auto grid gap-4">
        {hadithListData.map((hadith) => (
          <HadithItem
            key={hadith.id}
            hadith={hadith}
            onClick={() => setSelectedHadith(hadith)}
          />
        ))}
      </div> */}

      {/* <section className="container bg-white py-5">
          <Testimonial />
      </section> */}
      {/* <section className="container bg-white py-5">
        <AboutSection />
      </section> */}
      <Footer />
    </>
  );
}
