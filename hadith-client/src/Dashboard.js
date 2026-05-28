import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Footer from './pages/component/Footer';
import HadithCollections from './pages/HadithCollections';
import SEO from './components/SEO';
import TasbeehCounter from './components/TasbeehCounter';
import IslamicCalendarWidget from './components/IslamicCalendarWidget';
import ReadingStreak from './components/ReadingStreak';
import BookmarkButton from './components/BookmarkButton';
import {
  FiSearch, FiVolume2, FiBell, FiChevronRight, FiChevronLeft,
  FiStar, FiMoon, FiSun, FiBookOpen, FiMessageCircle, FiUsers,
  FiPlayCircle, FiArrowRight, FiHeart, FiBookmark
} from 'react-icons/fi';
import { FaQuoteLeft, FaMosque, FaHandHoldingHeart } from 'react-icons/fa';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';

const HOME_SCHEMA = [{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://ilmhadith.com/#webpage",
  "url": "https://ilmhadith.com/",
  "name": "IlmHadith — Authentic Hadith & Islamic Knowledge",
}];

/* ── divider helper ── */
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-isl-gold/40" />
      <span className="text-isl-gold text-xs">✦</span>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-isl-gold/40" />
    </div>
  );
}

/* ── section header ── */
function SectionHeader({ arabic, title, subtitle }) {
  return (
    <div className="text-center mb-10">
      {arabic && (
        <span className="block font-arabic text-isl-gold text-2xl mb-1">{arabic}</span>
      )}
      <h2 className="font-body text-2xl md:text-3xl font-bold text-isl-green">{title}</h2>
      <GoldDivider />
      {subtitle && (
        <p className="text-gray-500 text-sm font-body max-w-xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   1. HERO — HADITH OF THE DAY
═══════════════════════════════════════════════ */
function HadithOfDay() {
  const [hadith, setHadith] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/hadith-list`)
      .then(res => {
        const list = res.data?.data?.hadithlist || [];
        const featured = list.find(h => h.isFeatured) || list[0];
        setHadith(featured || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-isl-cream via-white to-isl-beige geometric-bg">
      {/* Decorative circle */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-isl-gold/5 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-isl-green/5 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-isl-gold/10 border border-isl-gold/30 mb-6">
          <FiSun size={13} className="text-isl-gold" />
          <span className="text-isl-gold text-xs font-body font-semibold tracking-[0.2em] uppercase">
            Hadith of the Day
          </span>
        </div>

        {loading ? (
          <div className="space-y-4 animate-pulse max-w-2xl mx-auto">
            <div className="h-8 bg-isl-stone rounded-lg w-3/4 mx-auto" />
            <div className="h-4 bg-isl-stone/60 rounded w-full" />
            <div className="h-4 bg-isl-stone/60 rounded w-5/6 mx-auto" />
          </div>
        ) : hadith ? (
          <>
            {/* Arabic */}
            <div className="font-arabic text-3xl md:text-4xl text-isl-green leading-[1.8] dir-rtl mb-6 max-w-3xl mx-auto">
              {hadith.translations?.arabic || hadith.HadithName || ''}
            </div>

            <GoldDivider />

            {/* English */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed font-body max-w-2xl mx-auto mb-6">
              {hadith.translations?.english || hadith.HadithDescription || ''}
            </p>

            {/* Attribution */}
            {(hadith.HadithTitle || hadith.narratorChain) && (
              <div className="inline-block px-5 py-2 bg-isl-green/5 border border-isl-green/10 rounded-full text-xs text-gray-500 font-body mb-8">
                — {hadith.HadithTitle || hadith.narratorChain}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-center flex-wrap gap-3">
              <BookmarkButton hadithId={hadith._id} />
              <NavLink
                to="/hadith-list"
                className="flex items-center gap-2 px-5 py-2.5 bg-isl-green text-white rounded-xl text-sm font-medium hover:bg-isl-green-light transition-all no-underline"
              >
                Browse All Hadiths <FiArrowRight size={14} />
              </NavLink>
            </div>
          </>
        ) : (
          <div className="text-gray-400 py-8 font-body">
            <FaMosque size={36} className="mx-auto mb-3 text-isl-gold/40" />
            <p>No hadith available yet.</p>
            <p className="text-xs mt-1">Hadiths will appear here once added from the admin panel.</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   2. SEARCH BAR
═══════════════════════════════════════════════ */
function SearchSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/hadith-list?search=${encodeURIComponent(query.trim())}`);
  };

  const quickTags = ['Prayer', 'Patience', 'Charity', 'Family', 'Knowledge', 'Fasting'];

  return (
    <section className="bg-isl-green py-12">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h3 className="text-white font-body font-semibold text-xl mb-2">
          Search Authentic Hadiths
        </h3>
        <p className="text-white/60 text-sm font-body mb-6">
          Explore thousands of narrations from Prophet Muhammad ﷺ
        </p>
        <form onSubmit={handleSearch} className="relative mb-4">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by topic, narrator, or keyword..."
            className="w-full pl-5 pr-14 py-4 rounded-2xl text-gray-700 font-body text-sm outline-none bg-white shadow-lg placeholder-gray-400 border-2 border-transparent focus:border-isl-gold transition-all"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-isl-gold flex items-center justify-center hover:bg-isl-gold-light transition-colors"
          >
            <FiSearch size={18} className="text-isl-green" />
          </button>
        </form>
        {/* Quick tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {quickTags.map(tag => (
            <button
              key={tag}
              onClick={() => navigate(`/hadith-list?search=${encodeURIComponent(tag)}`)}
              className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-body hover:bg-isl-gold hover:text-isl-green transition-all border border-white/20"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   3. ISLAMIC TOOLS ROW
═══════════════════════════════════════════════ */
function IslamicToolsRow() {
  const navigate = useNavigate();
  const tools = [
    {
      icon: '📿',
      title: 'Tasbeeh Counter',
      desc: 'SubhanAllah · Alhamdulillah · Allahu Akbar',
      action: () => document.getElementById('tasbeeh-section')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      icon: '🌙',
      title: 'Islamic Calendar',
      desc: "Today's Hijri date",
      action: () => document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      icon: '🌅',
      title: 'Morning Adhkar',
      desc: 'Start your day with dhikr',
      action: () => navigate('/adhkar'),
    },
    {
      icon: '🤲',
      title: 'Dua Collection',
      desc: 'Duas for every occasion',
      action: () => navigate('/duas'),
    },
  ];

  return (
    <section className="bg-isl-sand py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tools.map(({ icon, title, desc, action }) => (
            <button
              key={title}
              onClick={action}
              className="bg-white rounded-2xl p-5 text-left shadow-sm border border-isl-stone/50 hover:shadow-md hover:border-isl-gold/40 transition-all duration-200 group"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <div className="font-body font-semibold text-isl-green text-sm mb-1 group-hover:text-isl-green-light">{title}</div>
              <div className="text-gray-400 text-xs">{desc}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   4. DAILY REMINDER BANNER
═══════════════════════════════════════════════ */
function DailyReminder() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/islamic-quotes/random`)
      .then(res => setQuote(res.data?.data?.quote || res.data?.data?.quotes?.[0] || res.data?.quote || null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && !quote) return null;

  return (
    <section className="bg-gradient-to-r from-isl-green via-isl-green-light to-isl-green py-14 relative overflow-hidden">
      <div className="absolute inset-0 geometric-bg opacity-30" />
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
          <FiStar size={12} className="text-isl-gold" />
          <span className="text-isl-gold text-xs font-body tracking-widest uppercase">Daily Reminder</span>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-8 bg-white/20 rounded w-3/4 mx-auto" />
            <div className="h-4 bg-white/10 rounded w-full mx-auto" />
          </div>
        ) : quote ? (
          <>
            <div className="font-arabic text-3xl text-isl-gold dir-rtl leading-[1.8] mb-5">
              {quote.arabicText}
            </div>
            <p className="text-white/90 text-base md:text-lg font-body leading-relaxed mb-4 italic">
              "{quote.translationText}"
            </p>
            <div className="text-white/50 text-xs font-body">
              — {quote.author}{quote.authorTitle ? `, ${quote.authorTitle}` : ''}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   5. AUDIO HADITHS
═══════════════════════════════════════════════ */
function AudioHadithsSection() {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    axios.get(`${API}/audio-hadiths?active=true`)
      .then(res => {
        const list = res.data?.data?.audioHadiths || res.data?.audioHadiths || [];
        setAudios(Array.isArray(list) ? list : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handlePlay = (item) => {
    if (playing === item._id) {
      audioRef.current?.pause();
      setPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = `${API}/${item.audioUrl}`;
        audioRef.current.play().catch(() => {});
      }
      setPlaying(item._id);
    }
  };

  if (!loading && audios.length === 0) return null;

  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          arabic="الحديث الصوتي"
          title="Audio Hadiths"
          subtitle="Listen to authentic hadiths recited by renowned scholars"
        />
        <audio ref={audioRef} onEnded={() => setPlaying(null)} />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 bg-isl-cream rounded-2xl animate-pulse border border-isl-stone/40" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {audios.map(item => (
              <div
                key={item._id}
                className="bg-isl-cream border border-isl-stone/50 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all duration-200 hover:border-isl-gold/40"
              >
                <button
                  onClick={() => handlePlay(item)}
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    playing === item._id
                      ? 'bg-isl-green text-white shadow-lg scale-105'
                      : 'bg-isl-green/10 text-isl-green hover:bg-isl-green hover:text-white'
                  }`}
                >
                  <FiPlayCircle size={22} />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="font-body font-semibold text-gray-800 text-sm truncate">{item.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5 flex items-center gap-2">
                    <FiVolume2 size={11} />
                    {item.reciterName}
                    {item.duration && <span className="text-gray-400">· {item.duration}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   6. ISLAMIC QUOTES CAROUSEL
═══════════════════════════════════════════════ */
function QuotesCarousel() {
  const [quotes, setQuotes] = useState([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    axios.get(`${API}/islamic-quotes?active=true`)
      .then(res => {
        const list = res.data?.data?.quotes || res.data?.quotes || [];
        setQuotes(Array.isArray(list) ? list : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (quotes.length <= 1) return;
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % quotes.length), 5000);
    return () => clearInterval(timerRef.current);
  }, [quotes.length]);

  const prev = () => { clearInterval(timerRef.current); setIdx(i => (i - 1 + quotes.length) % quotes.length); };
  const next = () => { clearInterval(timerRef.current); setIdx(i => (i + 1) % quotes.length); };

  if (!loading && quotes.length === 0) return null;

  const q = quotes[idx];

  return (
    <section className="py-14 bg-isl-sand">
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeader
          arabic="اقتباسات إسلامية"
          title="Islamic Wisdom"
          subtitle="Timeless words from the scholars and companions of Islam"
        />

        {loading ? (
          <div className="h-40 bg-white rounded-2xl animate-pulse border border-isl-stone/40" />
        ) : q ? (
          <div className="relative bg-white rounded-3xl shadow-sm border border-isl-stone/50 p-8 md:p-12 text-center">
            {/* Quote mark */}
            <FaQuoteLeft size={28} className="text-isl-gold/30 mx-auto mb-4" />

            <div className="font-arabic text-2xl md:text-3xl text-isl-green dir-rtl leading-[1.8] mb-5">
              {q.arabicText}
            </div>
            <p className="text-gray-600 text-base italic leading-relaxed font-body mb-5">
              "{q.translationText}"
            </p>
            <div className="text-xs text-gray-400 font-body">
              — {q.author}{q.authorTitle ? `, ${q.authorTitle}` : ''}
            </div>

            {/* Navigation */}
            {quotes.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button onClick={prev} className="w-9 h-9 rounded-full bg-isl-cream border border-isl-stone hover:border-isl-gold flex items-center justify-center text-gray-500 hover:text-isl-gold transition-all">
                  <FiChevronLeft size={16} />
                </button>
                <div className="flex gap-1.5">
                  {quotes.map((_, i) => (
                    <button key={i} onClick={() => setIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-isl-gold w-5' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
                <button onClick={next} className="w-9 h-9 rounded-full bg-isl-cream border border-isl-stone hover:border-isl-gold flex items-center justify-center text-gray-500 hover:text-isl-gold transition-all">
                  <FiChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   7. COMMUNITY ANNOUNCEMENTS
═══════════════════════════════════════════════ */
function AnnouncementsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/announcements?active=true`)
      .then(res => {
        const list = res.data?.data?.announcements || res.data?.announcements || [];
        setItems(Array.isArray(list) ? list.slice(0, 4) : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && items.length === 0) return null;

  const typeColors = {
    ramadan: 'bg-green-100 text-green-700',
    event:   'bg-blue-100 text-blue-700',
    news:    'bg-purple-100 text-purple-700',
    eid:     'bg-yellow-100 text-yellow-700',
    general: 'bg-gray-100 text-gray-600',
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          arabic="إعلانات المجتمع"
          title="Community Announcements"
          subtitle="Stay connected with the latest news and events"
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-isl-cream rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {items.map(item => (
              <div
                key={item._id}
                className={`bg-isl-cream border rounded-2xl p-6 hover:shadow-sm transition-all ${item.isFeatured ? 'border-isl-gold/50 bg-isl-beige' : 'border-isl-stone/50'}`}
              >
                <div className="flex items-start gap-3">
                  <FiBell size={16} className="text-isl-gold mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <h3 className="font-body font-semibold text-gray-800 text-sm">{item.title}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${typeColors[item.type] || typeColors.general}`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{item.content}</p>
                    {item.createdAt && (
                      <p className="text-gray-400 text-[10px] mt-2">
                        {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   8. SCHOLAR RECOMMENDATIONS
═══════════════════════════════════════════════ */
function ScholarSection() {
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/scholars?active=true`)
      .then(res => {
        const list = res.data?.data?.scholars || res.data?.scholars || [];
        setScholars(Array.isArray(list) ? list.slice(0, 3) : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && scholars.length === 0) return null;

  return (
    <section className="py-14 bg-isl-sand">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          arabic="توصيات العلماء"
          title="Scholar Recommendations"
          subtitle="Wisdom shared by respected Islamic scholars"
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scholars.map(s => (
              <div key={s._id} className="bg-white rounded-2xl p-6 border border-isl-stone/50 shadow-sm hover:shadow-md transition-all text-center">
                {/* Scholar image */}
                <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden bg-isl-green/10 flex items-center justify-center border-2 border-isl-gold/30">
                  {s.scholarImage ? (
                    <img src={`${API}/${s.scholarImage}`} alt={s.scholarName} className="w-full h-full object-cover" />
                  ) : (
                    <FiUsers size={24} className="text-isl-green/50" />
                  )}
                </div>
                <h3 className="font-body font-bold text-gray-800 text-sm mb-0.5">{s.scholarName}</h3>
                {s.scholarTitle && <p className="text-gray-400 text-xs mb-3">{s.scholarTitle}</p>}
                {s.arabicQuote && (
                  <div className="font-arabic text-base text-isl-green dir-rtl leading-[1.8] mb-3 px-2">
                    {s.arabicQuote}
                  </div>
                )}
                <p className="text-gray-600 text-xs italic leading-relaxed">"{s.recommendationText}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   9. TASBEEH + CALENDAR WIDGETS SECTION
═══════════════════════════════════════════════ */
function ToolsSection() {
  return (
    <section className="py-14 bg-white" id="tasbeeh-section">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          arabic="أدوات إسلامية"
          title="Islamic Tools"
          subtitle="Daily companions for your spiritual journey"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Tasbeeh */}
          <div className="bg-isl-cream rounded-3xl border border-isl-stone/50 overflow-hidden shadow-sm">
            <div className="bg-isl-green px-6 py-4">
              <div className="font-arabic text-isl-gold text-xl">📿 التسبيح</div>
              <div className="text-white/70 text-xs font-body mt-0.5">Digital Tasbeeh Counter</div>
            </div>
            <div className="p-6">
              <TasbeehCounter />
            </div>
          </div>

          {/* Calendar + Streak */}
          <div className="flex flex-col gap-5" id="calendar-section">
            <div className="bg-isl-cream rounded-3xl border border-isl-stone/50 overflow-hidden shadow-sm">
              <div className="bg-isl-green-dark px-6 py-4">
                <div className="font-arabic text-isl-gold text-xl">🌙 التقويم الإسلامي</div>
                <div className="text-white/70 text-xs font-body mt-0.5">Islamic Hijri Calendar</div>
              </div>
              <div className="p-6">
                <IslamicCalendarWidget />
              </div>
            </div>

            {/* Reading streak + quick links */}
            <div className="bg-isl-cream rounded-3xl border border-isl-stone/50 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="font-body font-semibold text-gray-700 text-sm">Your Activity</div>
                <ReadingStreak />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <NavLink to="/duas" className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-isl-stone hover:border-isl-gold hover:text-isl-gold text-xs text-gray-600 transition-all no-underline">
                  🤲 Duas
                </NavLink>
                <NavLink to="/adhkar" className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-isl-stone hover:border-isl-gold hover:text-isl-gold text-xs text-gray-600 transition-all no-underline">
                  🌅 Adhkar
                </NavLink>
                <NavLink to="/bookmarks" className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-isl-stone hover:border-isl-gold hover:text-isl-gold text-xs text-gray-600 transition-all no-underline">
                  <FiBookmark size={12} /> Bookmarks
                </NavLink>
                <NavLink to="/quiz" className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-isl-stone hover:border-isl-gold hover:text-isl-gold text-xs text-gray-600 transition-all no-underline">
                  📝 Quiz
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   10. HADITH COLLECTIONS (existing component wrapped)
═══════════════════════════════════════════════ */
function CollectionsSection() {
  return (
    <section className="bg-isl-cream py-14">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          arabic="اَلأَحَادِيثُ النَّبَوِيَّة"
          title="Hadith Collections"
          subtitle="Authentic narrations from the Prophet Muhammad ﷺ — browse by collection"
        />
        <HadithCollections />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CTA BANNER
═══════════════════════════════════════════════ */
function CtaBanner() {
  return (
    <section className="bg-isl-green py-14 relative overflow-hidden">
      <div className="absolute inset-0 geometric-bg opacity-20" />
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="font-arabic text-isl-gold text-3xl mb-3">اطلبوا العلم</div>
        <h2 className="text-white font-body text-2xl md:text-3xl font-bold mb-3">
          Seek Knowledge — It is Fard
        </h2>
        <p className="text-white/70 font-body text-sm max-w-lg mx-auto mb-8">
          Join thousands of Muslims learning, reflecting, and growing through the authentic words of the Prophet Muhammad ﷺ.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <NavLink
            to="/sign-up"
            className="px-6 py-3 bg-isl-gold text-isl-green font-body font-semibold rounded-xl hover:bg-isl-gold-light transition-all no-underline text-sm"
          >
            Join Our Community
          </NavLink>
          <NavLink
            to="/hadith-list"
            className="px-6 py-3 bg-transparent text-white border border-white/30 font-body font-medium rounded-xl hover:bg-white/10 transition-all no-underline text-sm"
          >
            Browse Hadiths
          </NavLink>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MAIN DASHBOARD
═══════════════════════════════════════════════ */
export default function Dashboard() {
  return (
    <>
      <SEO
        title="Home"
        description="Discover authentic Hadiths of Prophet Muhammad ﷺ. Browse the ultimate Hadith collection, take Islamic quizzes, and grow in Islamic knowledge with IlmHadith."
        keywords="hadith, Islamic knowledge, Prophet Muhammad, Sunnah, Quran, Islamic quiz, sahih hadith, duas, adhkar"
        path="/"
        schema={HOME_SCHEMA}
      />

      {/* 1. Hero — Hadith of the Day */}
      <HadithOfDay />

      {/* 2. Search */}
      <SearchSection />

      {/* 3. Islamic Tools Quick Links */}
      <IslamicToolsRow />

      {/* 4. Hadith Collections */}
      <CollectionsSection />

      {/* 5. Daily Reminder */}
      <DailyReminder />

      {/* 6. Audio Hadiths */}
      <AudioHadithsSection />

      {/* 7. Islamic Quotes Carousel */}
      <QuotesCarousel />

      {/* 8. Tasbeeh Counter + Calendar + Activity */}
      <ToolsSection />

      {/* 9. Community Announcements */}
      <AnnouncementsSection />

      {/* 10. Scholar Recommendations */}
      <ScholarSection />

      {/* CTA */}
      <CtaBanner />

      <Footer />
    </>
  );
}
