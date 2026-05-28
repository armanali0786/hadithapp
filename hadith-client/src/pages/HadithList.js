import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';
import { HadithCardSkeleton } from '../components/Skeletons';
import BookmarkButton from '../components/BookmarkButton';
import {
  FiSearch, FiFilter, FiChevronDown, FiArrowRight, FiBookOpen,
} from 'react-icons/fi';
import { FaMosque } from 'react-icons/fa';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';

/* ── grade badge ── */
const GRADE_COLORS = {
  sahih:   'bg-emerald-100 text-emerald-700',
  hasan:   'bg-blue-100 text-blue-700',
  daif:    'bg-orange-100 text-orange-700',
  mawdu:   'bg-red-100 text-red-700',
  unknown: 'bg-gray-100 text-gray-500',
};

function GradeBadge({ grade }) {
  if (!grade || grade === 'unknown') return null;
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${GRADE_COLORS[grade] || GRADE_COLORS.unknown}`}>
      {grade}
    </span>
  );
}

/* ── single hadith card ── */
function HadithCard({ hadith }) {
  const navigate = useNavigate();
  const title  = hadith.HadithTitle || hadith.HadithName || 'Untitled Hadith';
  const desc   = hadith.translations?.english || hadith.HadithDescription || '';
  const arabic = hadith.translations?.arabic  || hadith.HadithName || '';
  const coll   = hadith.hadithTypeId?.hadithtype || '';

  const handleClick = () => navigate('/hadith-details', { state: { hadith } });

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-isl-stone/50 hover:border-isl-gold/40 flex flex-col"
    >
      {/* Image */}
      {hadith.HadithImage ? (
        <div className="relative h-44 overflow-hidden flex-shrink-0">
          <img
            src={`${API}/uploads/${hadith.HadithImage}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-isl-green/60 to-transparent" />
          {hadith.isFeatured && (
            <span className="absolute top-3 left-3 bg-isl-gold text-isl-green text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Featured
            </span>
          )}
        </div>
      ) : (
        <div className="h-20 bg-gradient-to-br from-isl-green to-isl-green-light flex items-center justify-center flex-shrink-0">
          <FaMosque size={28} className="text-white/30" />
        </div>
      )}

      {/* Gold bar */}
      <div className="h-0.5 bg-gradient-to-r from-isl-gold to-isl-gold-light flex-shrink-0" />

      {/* Body */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        {/* Meta row */}
        <div className="flex items-center flex-wrap gap-2">
          {coll && (
            <span className="text-[10px] font-semibold text-isl-gold uppercase tracking-wider">
              {coll}
            </span>
          )}
          <GradeBadge grade={hadith.grade} />
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-isl-green transition-colors duration-200 font-body">
          {title}
        </h3>

        {/* Arabic preview */}
        {arabic && (
          <p className="font-arabic text-base text-isl-green/70 dir-rtl text-right line-clamp-2 leading-relaxed">
            {arabic}
          </p>
        )}

        {/* Description */}
        {desc && (
          <p className="text-xs text-gray-500 line-clamp-3 font-body leading-relaxed flex-1">
            {desc}
          </p>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-isl-stone/40">
          <BookmarkButton hadithId={hadith._id} className="!text-xs !px-2.5 !py-1" />
          <span className="flex items-center gap-1 text-isl-gold text-xs font-semibold group-hover:gap-2 transition-all">
            Read Hadith <FiArrowRight size={11} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
export default function HadithList() {
  const [allHadiths, setAllHadiths]   = useState([]);
  const [displayed, setDisplayed]     = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [search, setSearch]           = useState('');
  const [activeType, setActiveType]   = useState('all');
  const [sortBy, setSortBy]           = useState('newest');

  /* fetch */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hRes, tRes] = await Promise.all([
          axios.get(`${API}/hadith-list`),
          axios.get(`${API}/hadith-type`),
        ]);
        const hadiths = hRes.data?.data?.hadithlist || [];
        const types   = tRes.data?.hadithType || [];
        setAllHadiths(hadiths);
        setDisplayed(hadiths);
        setCollections([{ _id: 'all', hadithtype: 'All Collections' }, ...types]);
      } catch (e) {
        setError('Failed to load hadiths. Make sure the server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* filter + search + sort */
  useEffect(() => {
    let result = [...allHadiths];

    if (activeType !== 'all') {
      result = result.filter(h => {
        const id = h.hadithTypeId?._id || h.hadithTypeId;
        return id === activeType;
      });
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(h =>
        (h.HadithTitle || '').toLowerCase().includes(q) ||
        (h.HadithDescription || '').toLowerCase().includes(q) ||
        (h.HadithName || '').toLowerCase().includes(q) ||
        (h.translations?.english || '').toLowerCase().includes(q)
      );
    }

    if (sortBy === 'newest') result.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    if (sortBy === 'oldest') result.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    if (sortBy === 'featured') result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

    setDisplayed(result);
  }, [allHadiths, activeType, search, sortBy]);

  return (
    <div className="min-h-screen bg-isl-cream font-body">
      <SEO
        title="Hadith List"
        description="Browse authentic Hadiths from the Prophet Muhammad ﷺ. Filter by collection, search by topic, and read in multiple languages."
        keywords="hadith, sahih bukhari, sahih muslim, authentic hadith, Islamic knowledge"
        path="/hadith-list"
      />

      {/* ── PAGE HEADER ── */}
      <div className="bg-isl-green relative overflow-hidden">
        <div className="absolute inset-0 geometric-bg opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 text-center">
          <span className="block font-arabic text-isl-gold text-3xl mb-2">اَلأَحَادِيثُ النَّبَوِيَّة</span>
          <h1 className="font-body text-2xl md:text-3xl font-bold text-white mb-2">Hadith Collection</h1>
          <p className="text-white/60 text-sm font-body max-w-lg mx-auto">
            Authentic narrations from the Prophet Muhammad ﷺ
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* ── SEARCH + SORT BAR ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <FiSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title, topic or narrator..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-isl-stone/60 focus:border-isl-gold focus:outline-none text-sm text-gray-700 placeholder-gray-400 transition-all"
            />
          </div>
          <div className="relative">
            <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-8 py-3 rounded-xl bg-white border border-isl-stone/60 focus:border-isl-gold focus:outline-none text-sm text-gray-700 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="featured">Featured First</option>
            </select>
          </div>
        </div>

        {/* ── COLLECTION FILTER TABS ── */}
        {collections.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
            {collections.map(col => (
              <button
                key={col._id}
                onClick={() => setActiveType(col._id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  activeType === col._id
                    ? 'bg-isl-green text-white border-isl-green shadow-sm'
                    : 'bg-white text-gray-600 border-isl-stone hover:border-isl-gold hover:text-isl-gold'
                }`}
              >
                {col.hadithtype}
              </button>
            ))}
          </div>
        )}

        {/* ── RESULTS COUNT ── */}
        {!loading && !error && (
          <div className="flex items-center gap-2 mb-6">
            <FiBookOpen size={14} className="text-isl-gold" />
            <span className="text-sm text-gray-500 font-body">
              Showing <strong className="text-gray-700">{displayed.length}</strong> hadith{displayed.length !== 1 ? 's' : ''}
              {activeType !== 'all' && collections.find(c => c._id === activeType) && (
                <> in <strong className="text-isl-green">{collections.find(c => c._id === activeType)?.hadithtype}</strong></>
              )}
              {search && <> matching "<strong className="text-isl-green">{search}</strong>"</>}
            </span>
          </div>
        )}

        {/* ── ERROR ── */}
        {error && (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4 text-red-400 text-xl">!</div>
            <p className="text-red-500 font-body text-sm mb-3">{error}</p>
            <button onClick={() => window.location.reload()} className="px-5 py-2 bg-isl-green text-white rounded-xl text-sm">
              Try Again
            </button>
          </div>
        )}

        {/* ── GRID ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <HadithCardSkeleton key={i} />)}
          </div>
        ) : !error && displayed.length === 0 ? (
          <div className="text-center py-20">
            <FaMosque size={40} className="text-isl-gold/30 mx-auto mb-4" />
            <p className="text-gray-500 font-body text-sm">No hadiths found.</p>
            {(search || activeType !== 'all') && (
              <button
                onClick={() => { setSearch(''); setActiveType('all'); }}
                className="mt-3 text-isl-gold text-sm hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map(hadith => (
              <HadithCard key={hadith._id} hadith={hadith} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
