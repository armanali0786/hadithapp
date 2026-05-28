import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBell, FiCalendar } from 'react-icons/fi';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';

const TYPE_STYLES = {
  general:  'bg-blue-50 text-blue-700 border border-blue-200',
  event:    'bg-green-50 text-green-700 border border-green-200',
  reminder: 'bg-amber-50 text-amber-700 border border-amber-200',
  alert:    'bg-red-50 text-red-700 border border-red-200',
};

const TYPES = ['All', 'general', 'event', 'reminder', 'alert'];

function formatDate(d) {
  if (!d) return null;
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-isl-stone/40 animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="h-5 bg-gray-200 rounded w-1/2" />
        <div className="h-5 bg-gray-100 rounded w-16" />
      </div>
      <div className="h-4 bg-gray-100 rounded w-full mb-2" />
      <div className="h-4 bg-gray-100 rounded w-5/6 mb-4" />
      <div className="h-3 bg-gray-100 rounded w-1/4" />
    </div>
  );
}

export default function AnnouncementsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeType, setActiveType] = useState('All');

  useEffect(() => {
    axios.get(`${API}/announcements?active=true`)
      .then(res => {
        const data = res.data?.announcements || res.data?.data || res.data || [];
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('Failed to load announcements. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeType === 'All'
    ? items
    : items.filter(i => (i.type || 'general') === activeType);

  return (
    <div className="min-h-screen bg-isl-cream font-body">
      {/* Hero */}
      <div className="bg-isl-green geometric-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-isl-green-dark/60 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="font-arabic text-5xl text-isl-gold mb-3">الإعلانات</div>
          <h1 className="text-3xl font-bold text-white mb-2">Announcements</h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Stay up to date with the latest news, events and reminders
          </p>
        </div>
      </div>

      {/* Type Filter */}
      <div className="sticky top-[calc(4rem+1.75rem)] z-30 bg-isl-cream/95 backdrop-blur border-b border-isl-stone shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                  activeType === t
                    ? 'bg-isl-green text-white shadow-md'
                    : 'bg-white text-gray-600 border border-isl-stone hover:border-isl-gold hover:text-isl-gold'
                }`}
              >
                {t}
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
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <FiBell size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No announcements at this time.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="flex flex-col gap-4">
            {filtered.map((item, i) => (
              <div
                key={item._id || i}
                className="bg-white rounded-2xl border-l-4 border-isl-gold shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    {item.isFeatured && (
                      <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-isl-gold/20 text-yellow-700 border border-isl-gold/30">
                        Featured
                      </span>
                    )}
                    {item.arabicTitle && (
                      <p className="font-arabic text-lg text-gray-700 text-right dir-rtl mb-1">{item.arabicTitle}</p>
                    )}
                    <h3 className="text-base font-bold text-gray-800">{item.title}</h3>
                  </div>
                  <span className={`flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${TYPE_STYLES[item.type] || TYPE_STYLES.general}`}>
                    {item.type || 'general'}
                  </span>
                </div>

                {item.content && (
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{item.content}</p>
                )}

                {(item.startDate || item.endDate) && (
                  <div className="flex items-center gap-2 text-xs text-gray-400 pt-3 border-t border-isl-stone/40">
                    <FiCalendar size={12} />
                    {item.startDate && <span>{formatDate(item.startDate)}</span>}
                    {item.startDate && item.endDate && <span>—</span>}
                    {item.endDate && <span>{formatDate(item.endDate)}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
