import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:4040';

const TABS = ['Morning Adhkar', 'Evening Adhkar'];

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-isl-stone/40 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-4/5 ml-auto mb-4" />
      <div className="h-4 bg-gray-100 rounded w-full mb-2" />
      <div className="h-4 bg-gray-100 rounded w-5/6 mb-4" />
      <div className="h-6 bg-gray-100 rounded w-16" />
    </div>
  );
}

function TapCounter({ target = 1 }) {
  const [count, setCount] = useState(0);
  const done = count >= target;
  return (
    <div className="flex items-center gap-2 mt-3">
      <button
        onClick={() => setCount(c => Math.min(c + 1, target))}
        disabled={done}
        className={`w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-200 shadow-sm ${
          done
            ? 'bg-isl-gold text-isl-green cursor-default'
            : 'bg-isl-green text-white hover:bg-isl-green-light active:scale-95'
        }`}
        aria-label="Tap to count"
      >
        {done ? '✓' : '+'}
      </button>
      <span className={`text-sm font-medium ${done ? 'text-isl-gold' : 'text-gray-500'}`}>
        {count} / {target}
      </span>
      {count > 0 && !done && (
        <button
          onClick={() => setCount(0)}
          className="text-xs text-gray-400 hover:text-gray-600 underline ml-1"
        >
          reset
        </button>
      )}
      {done && (
        <span className="text-xs text-isl-gold font-semibold ml-1">Complete!</span>
      )}
    </div>
  );
}

function AdhkarCard({ item }) {
  return (
    <div className="bg-white rounded-2xl border-l-4 border-isl-green shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        {/* Count badge */}
        {item.count && (
          <div className="flex justify-end mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-isl-green/10 text-isl-green border border-isl-green/20">
              &times; {item.count}
            </span>
          </div>
        )}

        {/* Arabic */}
        {item.arabic && (
          <p className="font-arabic text-2xl text-gray-800 text-right dir-rtl leading-loose mb-4">
            {item.arabic}
          </p>
        )}

        {/* Transliteration */}
        {item.transliteration && (
          <p className="text-sm italic text-gray-500 mb-3 leading-relaxed">
            {item.transliteration}
          </p>
        )}

        {/* Translation */}
        {item.translation && (
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            {item.translation}
          </p>
        )}

        {/* Reference */}
        {item.reference && (
          <p className="text-xs text-isl-gold font-semibold border-t border-isl-stone/50 pt-3 mb-3">
            {item.reference}
          </p>
        )}

        {/* Tap counter */}
        <TapCounter target={item.count || 1} />
      </div>
    </div>
  );
}

export default function AdhkarPage() {
  const [adhkar, setAdhkar]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [activeTab, setActiveTab] = useState(TABS[0]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/adhkar?active=true`)
      .then(res => {
        const data = res.data?.data || res.data || [];
        setAdhkar(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('Failed to load adhkar. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const isMorning = activeTab === TABS[0];
  const filtered  = adhkar.filter(a => {
    const type = (a.type || a.category || '').toLowerCase();
    return isMorning ? type.includes('morning') : type.includes('evening');
  });

  return (
    <div className="min-h-screen bg-isl-cream font-body">
      {/* Hero */}
      <div className="bg-isl-green geometric-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-isl-green-dark/60 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="font-arabic text-5xl text-isl-gold mb-3 dir-rtl">أذكار الصباح والمساء</div>
          <h1 className="text-3xl font-bold text-white mb-2">Morning & Evening Adhkar</h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Daily remembrance of Allah — the morning and evening adhkar from the Sunnah
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[calc(4rem+1.75rem)] z-30 bg-isl-cream/95 backdrop-blur border-b border-isl-stone shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1 py-3">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-isl-green text-white shadow-md'
                    : 'bg-white text-gray-600 border border-isl-stone hover:border-isl-gold hover:text-isl-gold'
                }`}
              >
                {tab === TABS[0] ? '🌅 ' : '🌙 '}{tab}
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
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="font-arabic text-5xl text-isl-gold mb-4">
              {isMorning ? 'صَبَاحُ الْخَيْر' : 'مَسَاءُ الْخَيْر'}
            </div>
            <p className="text-gray-500 mb-2">
              No {isMorning ? 'morning' : 'evening'} adhkar found.
            </p>
            <p className="text-gray-400 text-sm">
              Adhkar will appear here once they are added.
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
            {filtered.map((item, idx) => (
              <AdhkarCard key={item._id || idx} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
