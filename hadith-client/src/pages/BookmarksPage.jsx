import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaBookmark } from 'react-icons/fa';
import { FiBookmark, FiTrash2, FiArrowRight } from 'react-icons/fi';

const API = 'http://localhost:4040';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-isl-stone/40 animate-pulse">
      <div className="h-36 bg-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-100 rounded w-full mb-1" />
        <div className="h-3 bg-gray-100 rounded w-5/6 mb-4" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
      </div>
    </div>
  );
}

export default function BookmarksPage() {
  const [hadiths, setHadiths]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [bookmarks, setBookmarks] = useState(() =>
    JSON.parse(localStorage.getItem('ilm-bookmarks') || '[]')
  );

  useEffect(() => {
    if (bookmarks.length === 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    axios.get(`${API}/hadith-list`)
      .then(res => {
        const all = res.data?.data?.hadithlist || res.data?.data || res.data || [];
        const saved = JSON.parse(localStorage.getItem('ilm-bookmarks') || '[]');
        setHadiths(all.filter(h => saved.includes(h._id)));
      })
      .catch(() => setError('Failed to load bookmarks. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const removeBookmark = (hadithId) => {
    const saved    = JSON.parse(localStorage.getItem('ilm-bookmarks') || '[]');
    const updated  = saved.filter(id => id !== hadithId);
    localStorage.setItem('ilm-bookmarks', JSON.stringify(updated));
    setBookmarks(updated);
    setHadiths(prev => prev.filter(h => h._id !== hadithId));
  };

  const truncate = (text, len = 120) => {
    if (!text) return '';
    return text.length > len ? text.slice(0, len) + '…' : text;
  };

  return (
    <div className="min-h-screen bg-isl-cream font-body">
      {/* Header */}
      <div className="bg-isl-green geometric-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-isl-green-dark/60 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-2">
            <FaBookmark className="text-isl-gold text-3xl" />
            <h1 className="text-3xl font-bold text-white">My Bookmarks</h1>
            {!loading && !error && (
              <span className="ml-2 px-3 py-0.5 bg-isl-gold/20 border border-isl-gold/40 text-isl-gold rounded-full text-sm font-semibold">
                {hadiths.length}
              </span>
            )}
          </div>
          <p className="text-white/70 text-sm">Your saved hadiths, available anytime</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {error && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-red-600 font-medium mb-4">{error}</p>
          </div>
        )}

        {loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && !error && hadiths.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-isl-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiBookmark className="text-isl-gold text-4xl" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No bookmarks yet</h2>
            <p className="text-gray-500 mb-6">
              Save hadiths you love and find them here anytime.
            </p>
            <Link
              to="/hadith-list"
              className="inline-flex items-center gap-2 px-6 py-3 bg-isl-green text-white rounded-xl font-medium hover:bg-isl-green-light transition-all duration-200 no-underline"
            >
              Browse Hadiths <FiArrowRight />
            </Link>
          </div>
        )}

        {!loading && !error && hadiths.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
            {hadiths.map(hadith => (
              <div
                key={hadith._id}
                className="bg-white rounded-2xl overflow-hidden border border-isl-stone/40 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                {/* Image */}
                {hadith.HadithImage && (
                  <div className="h-36 overflow-hidden">
                    <img
                      src={hadith.HadithImage}
                      alt={hadith.HadithTitle || 'Hadith'}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Collection name */}
                  {(hadith.HadithName || hadith.hadithTypeId?.name) && (
                    <span className="text-xs text-isl-gold font-semibold uppercase tracking-wide mb-1">
                      {hadith.HadithName || hadith.hadithTypeId?.name}
                    </span>
                  )}

                  {/* Title */}
                  {hadith.HadithTitle && (
                    <h3 className="font-semibold text-gray-800 text-sm mb-2 leading-snug">
                      {hadith.HadithTitle}
                    </h3>
                  )}

                  {/* Description */}
                  {hadith.HadithDescription && (
                    <p className="text-xs text-gray-500 leading-relaxed flex-1">
                      {truncate(hadith.HadithDescription)}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-isl-stone/40">
                    <Link
                      to="/hadith-details"
                      state={{ hadith }}
                      className="text-xs text-isl-green font-medium hover:underline no-underline flex items-center gap-1"
                    >
                      Read more <FiArrowRight size={11} />
                    </Link>
                    <button
                      onClick={() => removeBookmark(hadith._id)}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors duration-200 px-2 py-1 rounded hover:bg-red-50"
                      aria-label="Remove bookmark"
                    >
                      <FiTrash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
