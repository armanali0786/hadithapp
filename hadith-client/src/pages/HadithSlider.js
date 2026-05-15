import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from "react-router-dom";
import slides from '../data/SliderDb';

const getFirstNWords = (text, n) => text.split(" ").slice(0, n).join(" ");
const removeHtmlTags = (html) =>
  new DOMParser().parseFromString(html, 'text/html').body.textContent || "";

export default function SlickSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="bg-isl-green py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-7">
          <div className="font-arabic text-xl text-isl-gold mb-2 tracking-widest">
            ٱلسَّلَامُ عَلَيْكُمْ
          </div>
          <h1 className="font-body text-2xl md:text-3xl font-bold text-white">
            Explore the Wisdom of Hadith
          </h1>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px bg-isl-gold/40 w-16"></div>
            <span className="text-isl-gold text-xs">✦</span>
            <div className="h-px bg-isl-gold/40 w-16"></div>
          </div>
        </div>

        {/* Slider */}
        {slides.length > 0 && (
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <Carousel
              showThumbs={false}
              showStatus={false}
              autoPlay={true}
              infiniteLoop={true}
              interval={4000}
              transitionTime={600}
              showArrows={false}
              showIndicators={false}
              selectedItem={currentSlide}
              onChange={setCurrentSlide}
              swipeable={true}
            >
              {slides.map((slide, index) => {
                const numWordsToShow = slide.title.split(' ').length > 2 ? 10 : 20;
                const descriptionText = removeHtmlTags(slide.description);
                return (
                  <div key={index} className="relative">
                    <img
                      src={slide.large_image}
                      alt={slide.title}
                      className="w-full h-64 sm:h-80 md:h-[440px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-left">
                      <div className="text-isl-gold text-xs font-body font-bold tracking-widest mb-2">
                        ✦ FEATURED ARTICLE ✦
                      </div>
                      <h3 className="text-white font-body font-bold text-xl md:text-2xl mb-2 leading-snug">
                        {slide.title}
                      </h3>
                      <p className="text-white/75 text-sm font-body mb-4 line-clamp-2">
                        {getFirstNWords(descriptionText, numWordsToShow)}...
                      </p>
                      <NavLink
                        to="/hadith-list"
                        className="inline-block px-5 py-2 bg-isl-gold text-isl-green text-sm font-semibold font-body rounded-lg hover:bg-isl-gold-light transition-colors duration-200"
                      >
                        Read More
                      </NavLink>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        )}

        {/* Custom Dots */}
        {slides.length > 0 && (
          <div className="flex justify-center gap-2 mt-5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-7 h-3 bg-isl-gold'
                    : 'w-3 h-3 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
