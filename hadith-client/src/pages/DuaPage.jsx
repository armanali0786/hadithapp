import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';

const CATEGORIES = ['All', 'Morning', 'Evening', 'After Prayer', 'General', 'Travel', 'Eating', 'Sleeping', 'Other'];

const CATEGORY_COLORS = {
  Morning:       'bg-amber-50   text-amber-700   border border-amber-200',
  Evening:       'bg-indigo-50  text-indigo-700  border border-indigo-200',
  'After Prayer':'bg-green-50   text-green-700   border border-green-200',
  General:       'bg-blue-50    text-blue-700    border border-blue-200',
  Travel:        'bg-sky-50     text-sky-700     border border-sky-200',
  Eating:        'bg-orange-50  text-orange-700  border border-orange-200',
  Sleeping:      'bg-purple-50  text-purple-700  border border-purple-200',
  Other:         'bg-gray-50    text-gray-600    border border-gray-200',
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-isl-stone/40 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 ml-auto mb-4" />
      <div className="h-4 bg-gray-100 rounded w-full mb-2" />
      <div className="h-4 bg-gray-100 rounded w-5/6 mb-4" />
      <div className="h-3 bg-gray-100 rounded w-1/3" />
    </div>
  );
}

export default function DuaPage() {
  const [duas, setDuas]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/duas?active=true`)
      .then(res => {
        const data = res.data?.data || res.data || [];
        setDuas(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('Failed to load duas. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeTab === 'All'
    ? duas
    : duas.filter(d => (d.category || '').toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="min-h-screen bg-isl-cream font-body">
      {/* Hero Header */}
      <div className="bg-isl-green geometric-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-isl-green-dark/60 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="font-arabic text-5xl text-isl-gold mb-3 dir-rtl">أدعية مأثورة</div>
          <h1 className="text-3xl font-bold text-white mb-2">Dua Collection</h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Authentic supplications from the Quran and Sunnah for every occasion
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[calc(4rem+1.75rem)] z-30 bg-isl-cream/95 backdrop-blur border-b border-isl-stone shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === cat
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
            <div className="font-arabic text-5xl text-isl-gold mb-4">لَا بَأْسَ</div>
            <p className="text-gray-500">No duas found in this category.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
            {filtered.map((dua, idx) => (
              <div
                key={dua._id || idx}
                className="bg-white rounded-2xl border-l-4 border-isl-gold shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  {/* Category badge */}
                  {dua.category && (
                    <div className="flex justify-end mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[dua.category] || CATEGORY_COLORS.Other}`}>
                        {dua.category}
                      </span>
                    </div>
                  )}

                  {/* Arabic text */}
                  {dua.arabic && (
                    <p className="font-arabic text-2xl text-gray-800 text-right dir-rtl leading-loose mb-4">
                      {dua.arabic}
                    </p>
                  )}

                  {/* Transliteration */}
                  {dua.transliteration && (
                    <p className="text-sm italic text-gray-500 mb-3 leading-relaxed">
                      {dua.transliteration}
                    </p>
                  )}

                  {/* English translation */}
                  {dua.translation && (
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      {dua.translation}
                    </p>
                  )}

                  {/* Reference */}
                  {dua.reference && (
                    <div className="pt-3 border-t border-isl-stone/50">
                      <p className="text-xs text-isl-gold font-semibold">{dua.reference}</p>
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
