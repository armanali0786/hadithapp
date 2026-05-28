import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMosque } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

const API = 'http://localhost:4040';

const GRADE_COLORS = {
  sahih:   'bg-emerald-100 text-emerald-700',
  hasan:   'bg-blue-100 text-blue-700',
  daif:    'bg-orange-100 text-orange-700',
  unknown: 'bg-gray-100 text-gray-500',
};

export default function HadithCard({ hadith }) {
  const navigate = useNavigate();

  const title   = hadith.HadithTitle || hadith.HadithName || 'Untitled Hadith';
  const arabic  = hadith.translations?.arabic || hadith.HadithName || '';
  const desc    = hadith.translations?.english || hadith.HadithDescription || '';
  const coll    = hadith.hadithTypeId?.hadithtype || '';

  const handleClick = () => navigate('/hadith-details', { state: { hadith } });

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-isl-stone/50 hover:border-isl-gold/40 flex flex-col"
    >
      {/* Image */}
      {hadith.HadithImage ? (
        <div className="relative h-44 overflow-hidden flex-shrink-0">
          <img
            src={`${API}/uploads/${hadith.HadithImage}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-isl-green/50 to-transparent" />
          {hadith.isFeatured && (
            <span className="absolute top-3 left-3 bg-isl-gold text-isl-green text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Featured
            </span>
          )}
        </div>
      ) : (
        <div className="h-16 bg-gradient-to-br from-isl-green to-isl-green-light flex items-center justify-center flex-shrink-0">
          <FaMosque size={22} className="text-white/30" />
        </div>
      )}

      {/* Gold bar */}
      <div className="h-0.5 bg-gradient-to-r from-isl-gold to-isl-gold-light flex-shrink-0" />

      {/* Body */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        {/* Meta */}
        <div className="flex items-center flex-wrap gap-2">
          {coll && (
            <span className="text-[10px] font-bold text-isl-gold uppercase tracking-wider">✦ {coll}</span>
          )}
          {hadith.grade && hadith.grade !== 'unknown' && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${GRADE_COLORS[hadith.grade] || GRADE_COLORS.unknown}`}>
              {hadith.grade}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-isl-green transition-colors font-body">
          {title}
        </h3>

        {/* Arabic preview */}
        {arabic && (
          <p className="font-arabic text-base text-isl-green/60 dir-rtl text-right line-clamp-1 leading-relaxed">
            {arabic}
          </p>
        )}

        {/* Description */}
        {desc && (
          <p className="text-xs text-gray-500 line-clamp-2 font-body leading-relaxed flex-1">
            {desc}
          </p>
        )}

        {/* Read more */}
        <div className="flex items-center justify-end mt-2 pt-2 border-t border-isl-stone/40">
          <span className="flex items-center gap-1 text-isl-gold text-xs font-semibold group-hover:gap-2 transition-all">
            Read <FiArrowRight size={11} />
          </span>
        </div>
      </div>
    </div>
  );
}
