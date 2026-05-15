import React from "react";

export default function HadithCard({ hadith, onClick }) {
  const descriptionText = new DOMParser()
    .parseFromString(hadith.HadithTitle, "text/html")
    .body.textContent;

  const getFirstNWords = (text, n) => text.split(" ").slice(0, n).join(" ");

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={`http://localhost:4040/uploads/${hadith.HadithImage}`}
          alt="Hadith"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-isl-green/60 to-transparent" />
      </div>

      {/* Gold accent bar */}
      <div className="h-1 bg-gradient-to-r from-isl-gold to-isl-gold-light" />

      {/* Body */}
      <div className="p-5 flex flex-col gap-2">
        <span className="text-xs font-bold tracking-widest text-isl-gold font-body">✦ Hadith ✦</span>
        <h3 className="text-base font-semibold text-isl-green leading-snug line-clamp-2 font-body group-hover:text-isl-gold transition-colors duration-200">
          {getFirstNWords(descriptionText, 6)}...
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3 font-body">{hadith.HadithDescription}</p>
        <div className="flex items-center gap-1 text-isl-gold font-semibold text-sm mt-1 font-body">
          Read More{" "}
          <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
        </div>
      </div>
    </div>
  );
}
