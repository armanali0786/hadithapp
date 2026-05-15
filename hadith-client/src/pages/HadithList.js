import { useNavigate } from "react-router-dom";
import { HadithDb } from "../data/HadithDb";
import { FaClock, FaArrowRight } from "react-icons/fa";

export default function HadithList() {
  const navigate = useNavigate();

  const getFirstNWords = (text, n) => text.split(" ").slice(0, n).join(" ");

  const removeHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleCourseDetails = () => navigate("/hadith-details");

  return (
    <div className="bg-isl-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="pt-10 pb-4">

          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="block font-arabic text-isl-gold text-2xl mb-1">
              اَلأَحَادِيثُ النَّبَوِيَّة
            </span>
            <h2 className="font-body text-2xl md:text-3xl font-bold text-isl-green">
              Discover Hadith & Articles
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3 mb-3">
              <div className="h-px bg-isl-gold/40 w-16"></div>
              <span className="text-isl-gold text-xs">✦</span>
              <div className="h-px bg-isl-gold/40 w-16"></div>
            </div>
            <p className="text-gray-500 text-sm font-body max-w-xl mx-auto">
              Explore authentic teachings and the latest updates from our community
            </p>
          </div>

          {/* Featured Banner */}
          <section className="max-w-5xl mx-auto mb-14">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
              onClick={handleCourseDetails}
            >
              <img
                className="w-full h-72 md:h-[28rem] object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://images.pexels.com/photos/28823663/pexels-photo-28823663.jpeg"
                alt="Featured Hadith"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-10">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-widest text-isl-green bg-isl-gold rounded-full shadow-lg">
                  FEATURED
                </span>
                <h3 className="text-3xl md:text-4xl text-white font-bold font-body mb-2">
                  Reciting Quran and Hadith Blogs
                </h3>
                <p className="text-white/70 text-sm font-body flex items-center gap-2">
                  <FaClock className="text-isl-gold" /> Updated Now
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {HadithDb.map((hadith, index) => {
            const numWordsToShow = hadith.title.split(" ").length > 5 ? 5 : 10;
            const descriptionText = removeHtmlTags(hadith.title);
            const dateParts = hadith.Date ? hadith.Date.split(" ") : ["01", "July"];

            return (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100"
                onClick={handleCourseDetails}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hadith.img}
                    alt="Hadith"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-isl-green/60 to-transparent" />
                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-isl-green rounded-xl px-3 py-2 shadow-lg flex flex-col items-center border border-isl-gold/30">
                    <span className="text-lg font-bold leading-none">{dateParts[0]}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold">{dateParts[1] || ''}</span>
                  </div>
                </div>

                {/* Gold Bar */}
                <div className="h-1 bg-gradient-to-r from-isl-gold to-isl-gold-light" />

                {/* Body */}
                <div className="p-5 flex flex-col gap-2">
                  <span className="text-xs font-bold tracking-widest text-isl-gold font-body">ARTICLE</span>
                  <h3 className="text-base font-semibold text-isl-green leading-snug line-clamp-2 font-body group-hover:text-isl-gold transition-colors duration-200">
                    {getFirstNWords(descriptionText, numWordsToShow)}...
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3 font-body">
                    Explore the profound wisdom and guidance from authentic Hadith collections.
                  </p>
                  <div className="flex justify-between items-center mt-1 font-body">
                    <span className="flex items-center text-gray-400 text-xs gap-1.5">
                      <FaClock /> 6 mins ago
                    </span>
                    <span className="flex items-center text-isl-gold font-semibold text-xs uppercase tracking-wide gap-1 group-hover:translate-x-1 transition-transform duration-200">
                      Read More <FaArrowRight />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
