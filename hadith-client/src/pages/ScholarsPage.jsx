import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUser } from 'react-icons/fi';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-isl-stone/40 animate-pulse flex gap-4">
      <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0" />
      <div className="flex-1">
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
        <div className="h-3 bg-gray-100 rounded w-full mb-2" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
    </div>
  );
}

export default function ScholarsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get(`${API}/scholars?active=true`)
      .then(res => {
        const data = res.data?.scholars || res.data?.data || res.data || [];
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('Failed to load scholars. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'featured' ? items.filter(i => i.isFeatured) : items;

  return (
    <div className="min-h-screen bg-isl-cream font-body">
      {/* Hero */}
      <div className="bg-isl-green geometric-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-isl-green-dark/60 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="font-arabic text-5xl text-isl-gold mb-3">العلماء</div>
          <h1 className="text-3xl font-bold text-white mb-2">Scholars</h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Learn from the wisdom of renowned Islamic scholars
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="sticky top-[calc(4rem+1.75rem)] z-30 bg-isl-cream/95 backdrop-blur border-b border-isl-stone shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-2 py-3">
            {['all', 'featured'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                  filter === f
                    ? 'bg-isl-green text-white shadow-md'
                    : 'bg-white text-gray-600 border border-isl-stone hover:border-isl-gold hover:text-isl-gold'
                }`}
              >
                {f === 'all' ? 'All Scholars' : 'Featured'}
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
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <FiUser size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No scholars available yet.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((item, i) => (
              <div
                key={item._id || i}
                className="bg-white rounded-2xl border border-isl-stone/40 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl.startsWith('http') ? item.imageUrl : `${API}/${item.imageUrl}`}
                          alt={item.scholarName}
                          className="w-16 h-16 rounded-full object-cover border-2 border-isl-gold/30"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-isl-green/10 border-2 border-isl-gold/30 flex items-center justify-center">
                          <FiUser size={24} className="text-isl-green/60" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <h3 className="text-base font-bold text-gray-800">{item.scholarName}</h3>
                        {item.isFeatured && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-isl-gold/20 text-yellow-700 border border-isl-gold/30">
                            Featured
                          </span>
                        )}
                      </div>
                      {item.scholarTitle && (
                        <p className="text-xs text-isl-gold font-semibold mb-3">{item.scholarTitle}</p>
                      )}

                      {/* Arabic quote */}
                      {item.arabicQuote && (
                        <p className="font-arabic text-lg text-gray-700 text-right dir-rtl leading-relaxed mb-3">
                          {item.arabicQuote}
                        </p>
                      )}

                      {/* Recommendation / bio text */}
                      {item.recommendationText && (
                        <p className="text-sm text-gray-600 leading-relaxed italic">
                          "{item.recommendationText}"
                        </p>
                      )}
                    </div>
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
