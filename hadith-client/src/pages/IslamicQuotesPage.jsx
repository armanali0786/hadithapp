import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMessageSquare } from 'react-icons/fi';

const API = 'http://localhost:4040';

const CATEGORY_STYLES = {
  general:  'bg-gray-100 text-gray-600 border border-gray-200',
  morning:  'bg-yellow-50 text-yellow-700 border border-yellow-200',
  evening:  'bg-indigo-50 text-indigo-700 border border-indigo-200',
  friday:   'bg-green-50 text-green-700 border border-green-200',
  ramadan:  'bg-emerald-50 text-emerald-700 border border-emerald-200',
};

const CATEGORIES = ['All', 'general', 'morning', 'evening', 'friday', 'ramadan'];

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-isl-stone/40 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 ml-auto mb-4" />
      <div className="h-4 bg-gray-100 rounded w-full mb-2" />
      <div className="h-4 bg-gray-100 rounded w-5/6 mb-4" />
      <div className="h-3 bg-gray-100 rounded w-1/4" />
    </div>
  );
}

export default function IslamicQuotesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    axios.get(`${API}/islamic-quotes?active=true`)
      .then(res => {
        const data = res.data?.quotes || res.data?.data || res.data || [];
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('Failed to load quotes. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(i => (i.category || 'general') === activeCategory);

  return (
    <div className="min-h-screen bg-isl-cream font-body">
      {/* Hero */}
      <div className="bg-isl-green geometric-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-isl-green-dark/60 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="font-arabic text-5xl text-isl-gold mb-3">اقتباسات إسلامية</div>
          <h1 className="text-3xl font-bold text-white mb-2">Islamic Quotes</h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Inspiring words of wisdom from the Quran, Sunnah and Islamic scholars
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-[calc(4rem+1.75rem)] z-30 bg-isl-cream/95 backdrop-blur border-b border-isl-stone shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-isl-green text-white shadow-md'
                    : 'bg-white text-gray-600 border border-isl-stone hover:border-isl-gold hover:text-isl-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {error && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <FiMessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No quotes found in this category.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((item, i) => (
              <div
                key={item._id || i}
                className="bg-white rounded-2xl border-l-4 border-isl-gold shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  {/* Category + Featured badges */}
                  <div className="flex items-center justify-between mb-3">
                    {item.category && (
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${CATEGORY_STYLES[item.category] || CATEGORY_STYLES.general}`}>
                        {item.category}
                      </span>
                    )}
                    {item.isFeatured && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-isl-gold/20 text-yellow-700 border border-isl-gold/30">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Arabic text */}
                  {item.arabicText && (
                    <p className="font-arabic text-2xl text-gray-800 text-right dir-rtl leading-loose mb-4">
                      {item.arabicText}
                    </p>
                  )}

                  {/* English / translation text */}
                  {item.text && (
                    <p className="text-sm text-gray-700 italic leading-relaxed mb-4">
                      "{item.text}"
                    </p>
                  )}

                  {/* Author */}
                  {(item.author || item.authorTitle) && (
                    <div className="pt-3 border-t border-isl-stone/50">
                      <p className="text-xs font-semibold text-isl-gold">
                        {item.author}
                        {item.authorTitle && (
                          <span className="text-gray-400 font-normal ml-1">— {item.authorTitle}</span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
