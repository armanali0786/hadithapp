import React from "react";

export default function HadithCard({ hadith, onClick }) {
  const descriptionText = new DOMParser().parseFromString(
    hadith.HadithTitle,
    "text/html"
  ).body.textContent;

  const getFirstNWords = (text, n) => text.split(" ").slice(0, n).join(" ");

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="relative h-44 sm:h-48 md:h-52 w-full">
        <img
          className="w-full cursor-pointer"
          src={`http://localhost:4040/uploads/${hadith.HadithImage}`}
          alt="Hadith Image"
          onClick={onClick}
        />
      </div>
      <div className="px-4 py-2">
        <h3 className="font-semibold text-lg text-gray-800 leading-snug mb-1">{getFirstNWords(descriptionText, 5)}...</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{hadith.HadithDescription}</p>
      </div>
    </div>
  );
}
