import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';
import BookmarkButton from '../components/BookmarkButton';
import {
  FiArrowLeft, FiShare2, FiBookmark, FiVolume2, FiChevronDown,
  FiChevronUp, FiExternalLink, FiTag,
} from 'react-icons/fi';
import { FaQuoteLeft, FaMosque, FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

const API = 'http://localhost:4040';

const LANG_TABS = [
  { key: 'english',  label: 'English',  dir: 'ltr' },
  { key: 'arabic',   label: 'عربي',     dir: 'rtl', font: true },
  { key: 'urdu',     label: 'اردو',     dir: 'rtl', font: true },
  { key: 'bengali',  label: 'বাংলা',    dir: 'ltr' },
];

const GRADE_STYLES = {
  sahih:   { bg: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'Sahih (Authentic)' },
  hasan:   { bg: 'bg-blue-100 text-blue-700 border-blue-200',          label: 'Hasan (Good)' },
  daif:    { bg: 'bg-orange-100 text-orange-700 border-orange-200',    label: 'Da\'if (Weak)' },
  mawdu:   { bg: 'bg-red-100 text-red-700 border-red-200',            label: 'Mawdu\' (Fabricated)' },
  unknown: { bg: 'bg-gray-100 text-gray-500 border-gray-200',          label: 'Grade Unknown' },
};

/* ── small helpers ── */
function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-isl-gold/30" />
      <span className="text-isl-gold text-xs">✦</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-isl-gold/30" />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-5 bg-isl-gold rounded-full" />
      <span className="text-xs font-bold text-isl-green uppercase tracking-widest font-body">{children}</span>
    </div>
  );
}

/* ── Related hadith card (sidebar) ── */
function RelatedCard({ hadith, currentId }) {
  const navigate = useNavigate();
  if (hadith._id === currentId) return null;
  return (
    <button
      onClick={() => navigate('/hadith-details', { state: { hadith } })}
      className="w-full text-left group bg-isl-cream hover:bg-white border border-isl-stone/50 hover:border-isl-gold/40 rounded-xl p-4 transition-all duration-200"
    >
      <p className="text-xs font-semibold text-gray-700 group-hover:text-isl-green line-clamp-2 mb-1 font-body leading-relaxed">
        {hadith.HadithTitle || hadith.HadithName || 'Untitled Hadith'}
      </p>
      {hadith.HadithDescription && (
        <p className="text-xs text-gray-400 line-clamp-2 font-body">{hadith.HadithDescription}</p>
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
export default function HadithDetails() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const hadith    = state?.hadith || null;

  const [activeLang, setActiveLang]     = useState('english');
  const [tafsirOpen, setTafsirOpen]     = useState(false);
  const [related, setRelated]           = useState([]);
  const [relatedLoading, setRelLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioEl, setAudioEl]           = useState(null);

  /* redirect if no hadith */
  useEffect(() => {
    if (!hadith) navigate('/hadith-list', { replace: true });
  }, [hadith, navigate]);

  /* fetch related hadiths from same collection */
  useEffect(() => {
    if (!hadith?.hadithTypeId) return;
    const typeId = hadith.hadithTypeId?._id || hadith.hadithTypeId;
    if (!typeId) return;
    setRelLoading(true);
    axios.get(`${API}/hadith-list/filter?hadithTypeId=${typeId}`)
      .then(res => setRelated(res.data?.data?.hadithList || []))
      .catch(() => {})
      .finally(() => setRelLoading(false));
  }, [hadith]);

  /* update active lang tab if that translation is empty */
  useEffect(() => {
    if (!hadith) return;
    const trans = hadith.translations || {};
    if (!trans[activeLang] && trans.english) setActiveLang('english');
  }, [hadith]);

  if (!hadith) return null;

  const collectionName = hadith.hadithTypeId?.hadithtype || hadith.hadithTypeId || '';
  const grade          = hadith.grade || 'unknown';
  const gradeStyle     = GRADE_STYLES[grade] || GRADE_STYLES.unknown;
  const trans          = hadith.translations || {};

  /* current translation text */
  const displayText = (() => {
    if (activeLang === 'arabic')  return trans.arabic  || hadith.HadithName        || '';
    if (activeLang === 'urdu')    return trans.urdu    || '';
    if (activeLang === 'bengali') return trans.bengali || '';
    return trans.english || hadith.HadithDescription || '';
  })();

  /* available tabs (only show ones that have content) */
  const availableTabs = LANG_TABS.filter(t => {
    if (t.key === 'english')  return trans.english  || hadith.HadithDescription;
    if (t.key === 'arabic')   return trans.arabic   || hadith.HadithName;
    if (t.key === 'urdu')     return trans.urdu;
    if (t.key === 'bengali')  return trans.bengali;
    return false;
  });

  /* audio toggle */
  const toggleAudio = () => {
    if (!hadith.audioUrl) return;
    if (!audioEl) {
      const el = new Audio(`${API}/${hadith.audioUrl}`);
      el.onended = () => setAudioPlaying(false);
      el.play();
      setAudioEl(el);
      setAudioPlaying(true);
    } else if (audioPlaying) {
      audioEl.pause();
      setAudioPlaying(false);
    } else {
      audioEl.play();
      setAudioPlaying(true);
    }
  };

  /* share */
  const handleShare = () => {
    const title = hadith.HadithTitle || 'IlmHadith';
    const text  = hadith.HadithDescription || '';
    if (navigator.share) {
      navigator.share({ title, text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-isl-cream font-body">
      <SEO
        title={hadith.HadithTitle || 'Hadith Details'}
        description={hadith.HadithDescription || 'Read authentic hadith from IlmHadith'}
        path="/hadith-details"
      />

      {/* ── BREADCRUMB ── */}
      <div className="bg-white border-b border-isl-stone/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-xs text-gray-400 font-body flex-wrap">
          <NavLink to="/" className="hover:text-isl-green transition-colors no-underline text-gray-400">Home</NavLink>
          <span>/</span>
          <NavLink to="/hadith-list" className="hover:text-isl-green transition-colors no-underline text-gray-400">Hadith List</NavLink>
          {collectionName && (
            <>
              <span>/</span>
              <span className="text-gray-500">{collectionName}</span>
            </>
          )}
          <span>/</span>
          <span className="text-isl-green font-medium truncate max-w-xs">
            {hadith.HadithTitle || 'Hadith Details'}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ════════════════════════════════════
              MAIN CONTENT
          ════════════════════════════════════ */}
          <main className="flex-1 min-w-0">

            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-isl-green transition-colors mb-6 group"
            >
              <FiArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Hadith List
            </button>

            {/* ── HEADER CARD ── */}
            <div className="bg-white rounded-3xl shadow-sm border border-isl-stone/50 overflow-hidden mb-6">
              {/* Image */}
              {hadith.HadithImage && (
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={`${API}/uploads/${hadith.HadithImage}`}
                    alt={hadith.HadithTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-isl-green/70 to-transparent" />
                  {hadith.isFeatured && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-isl-gold text-isl-green text-[10px] font-bold uppercase tracking-widest rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              )}

              {/* Title + meta */}
              <div className="p-7">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {collectionName && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-isl-green/8 text-isl-green border border-isl-green/20 rounded-full text-[11px] font-semibold">
                      <FaMosque size={10} /> {collectionName}
                    </span>
                  )}
                  <span className={`px-3 py-1 border rounded-full text-[11px] font-semibold ${gradeStyle.bg}`}>
                    {gradeStyle.label}
                  </span>
                  {hadith.isRamadanContent && (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full text-[11px] font-semibold">
                      🌙 Ramadan
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-isl-green leading-snug mb-2">
                  {hadith.HadithTitle || hadith.HadithName}
                </h1>

                {/* Narrator chain */}
                {hadith.narratorChain && (
                  <p className="text-sm text-gray-500 italic">
                    Narrated by: <span className="text-gray-700 font-medium">{hadith.narratorChain}</span>
                  </p>
                )}

                {/* Tags */}
                {hadith.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {hadith.tags.map(tag => (
                      <span
                        key={tag._id || tag}
                        className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border"
                        style={{
                          background: `${tag.color || '#c9a227'}15`,
                          color: tag.color || '#a07810',
                          borderColor: `${tag.color || '#c9a227'}40`,
                        }}
                      >
                        <FiTag size={9} />
                        {tag.name || tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── ARABIC TEXT ── */}
            <div className="bg-white rounded-3xl shadow-sm border border-isl-stone/50 p-7 mb-6">
              <SectionLabel>Hadith Text</SectionLabel>

              {/* Big Arabic */}
              <div className="bg-isl-cream rounded-2xl p-6 md:p-8 mb-5 border border-isl-stone/40">
                <FaQuoteLeft size={20} className="text-isl-gold/40 mb-4" />
                <p className="font-arabic text-2xl md:text-3xl text-isl-green dir-rtl leading-[2] text-right">
                  {trans.arabic || hadith.HadithName || ''}
                </p>
              </div>

              {/* Language tabs */}
              {availableTabs.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {availableTabs.map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveLang(tab.key)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        activeLang === tab.key
                          ? 'bg-isl-green text-white shadow-sm'
                          : 'bg-isl-cream text-gray-500 border border-isl-stone hover:border-isl-gold hover:text-isl-gold'
                      } ${tab.font ? 'font-arabic' : 'font-body'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Translation */}
              {displayText && (
                <div
                  className={`text-gray-700 leading-relaxed text-base ${
                    (activeLang === 'arabic' || activeLang === 'urdu') ? 'dir-rtl text-right font-arabic text-xl' : 'font-body'
                  }`}
                >
                  {displayText}
                </div>
              )}
            </div>

            {/* ── TAFSIR ── */}
            {hadith.tafsir && (
              <div className="bg-white rounded-3xl shadow-sm border border-isl-stone/50 overflow-hidden mb-6">
                <button
                  onClick={() => setTafsirOpen(o => !o)}
                  className="w-full flex items-center justify-between px-7 py-5 hover:bg-isl-cream transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-isl-gold rounded-full" />
                    <span className="text-xs font-bold text-isl-green uppercase tracking-widest font-body">
                      Tafsir & Explanation
                    </span>
                  </div>
                  {tafsirOpen ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                </button>
                {tafsirOpen && (
                  <div className="px-7 pb-7 border-t border-isl-stone/40">
                    <p className="text-gray-600 leading-relaxed font-body text-sm pt-5">{hadith.tafsir}</p>
                  </div>
                )}
              </div>
            )}

            {/* ── NARRATOR + DATE ── */}
            <div className="bg-white rounded-3xl shadow-sm border border-isl-stone/50 p-7">
              <SectionLabel>Source & Reference</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {collectionName && (
                  <div className="bg-isl-cream rounded-2xl p-4 border border-isl-stone/40">
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Collection</p>
                    <p className="font-semibold text-gray-800 text-sm">{collectionName}</p>
                  </div>
                )}
                {hadith.narratorChain && (
                  <div className="bg-isl-cream rounded-2xl p-4 border border-isl-stone/40">
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Narrator</p>
                    <p className="font-semibold text-gray-800 text-sm">{hadith.narratorChain}</p>
                  </div>
                )}
                <div className="bg-isl-cream rounded-2xl p-4 border border-isl-stone/40">
                  <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Grade</p>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${gradeStyle.bg}`}>
                    {gradeStyle.label}
                  </span>
                </div>
                {hadith.Date && (
                  <div className="bg-isl-cream rounded-2xl p-4 border border-isl-stone/40">
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Added</p>
                    <p className="font-semibold text-gray-800 text-sm">
                      {new Date(hadith.Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </main>

          {/* ════════════════════════════════════
              SIDEBAR
          ════════════════════════════════════ */}
          <aside className="w-full lg:w-80 lg:flex-shrink-0 space-y-5 lg:sticky lg:top-24">

            {/* Actions card */}
            <div className="bg-white rounded-3xl shadow-sm border border-isl-stone/50 p-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 font-body">Actions</p>
              <div className="space-y-3">
                <BookmarkButton hadithId={hadith._id} className="w-full justify-center" />

                {hadith.audioUrl && (
                  <button
                    onClick={toggleAudio}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      audioPlaying
                        ? 'bg-isl-green text-white border-isl-green'
                        : 'bg-isl-cream text-isl-green border-isl-stone hover:border-isl-green'
                    }`}
                  >
                    {audioPlaying
                      ? <><FaPauseCircle size={15} /> Pause Audio</>
                      : <><FaPlayCircle size={15} /> Play Audio</>
                    }
                  </button>
                )}

                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-isl-cream text-gray-600 border border-isl-stone hover:border-isl-green hover:text-isl-green text-sm font-medium transition-all"
                >
                  <FiShare2 size={14} /> Share Hadith
                </button>
              </div>
            </div>

            {/* Collection info */}
            {collectionName && (
              <div className="bg-isl-green rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 geometric-bg opacity-20" />
                <div className="relative">
                  <FaMosque size={22} className="text-isl-gold mb-3" />
                  <p className="text-white font-semibold font-body text-sm mb-1">{collectionName}</p>
                  <p className="text-white/60 text-xs font-body mb-4">
                    Authentic hadith collection
                  </p>
                  <NavLink
                    to="/hadith-list"
                    className="flex items-center gap-1.5 text-isl-gold text-xs font-semibold no-underline hover:underline"
                  >
                    View All <FiExternalLink size={11} />
                  </NavLink>
                </div>
              </div>
            )}

            {/* Related hadiths */}
            {(related.length > 1 || relatedLoading) && (
              <div className="bg-white rounded-3xl shadow-sm border border-isl-stone/50 p-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 font-body">
                  From the Same Collection
                </p>
                {relatedLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-16 bg-isl-cream rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {related.filter(r => r._id !== hadith._id).slice(0, 5).map(r => (
                      <RelatedCard key={r._id} hadith={r} currentId={hadith._id} />
                    ))}
                  </div>
                )}
              </div>
            )}

          </aside>
        </div>
      </div>
    </div>
  );
}
