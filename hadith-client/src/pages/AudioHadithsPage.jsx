import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiPlay, FiPause, FiClock, FiUser, FiMusic } from 'react-icons/fi';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-isl-stone/40 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-1/3 mb-4" />
      <div className="h-3 bg-gray-100 rounded w-full mb-2" />
      <div className="h-3 bg-gray-100 rounded w-4/5 mb-4" />
      <div className="h-10 bg-gray-100 rounded-xl w-full" />
    </div>
  );
}

function AudioCard({ item }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');

  const audioSrc = item.audioUrl
    ? item.audioUrl.startsWith('http') ? item.audioUrl : `${API}/${item.audioUrl}`
    : null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    const el = audioRef.current;
    if (!el) return;
    const pct = el.duration ? (el.currentTime / el.duration) * 100 : 0;
    setProgress(pct);
    const m = Math.floor(el.currentTime / 60);
    const s = Math.floor(el.currentTime % 60).toString().padStart(2, '0');
    setCurrentTime(`${m}:${s}`);
  };

  const onEnded = () => setPlaying(false);

  const seek = (e) => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    el.currentTime = pct * el.duration;
  };

  return (
    <div className="bg-white rounded-2xl border-l-4 border-isl-gold shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {audioSrc && (
        <audio ref={audioRef} src={audioSrc} onTimeUpdate={onTimeUpdate} onEnded={onEnded} />
      )}
      <div className="p-6">
        {item.isFeatured && (
          <span className="inline-block mb-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-isl-gold/20 text-yellow-700 border border-isl-gold/30">
            Featured
          </span>
        )}

        {item.arabicTitle && (
          <p className="font-arabic text-xl text-gray-700 text-right dir-rtl mb-2 leading-relaxed">
            {item.arabicTitle}
          </p>
        )}

        <h3 className="text-base font-bold text-gray-800 mb-1">{item.title}</h3>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          {item.reciterName && (
            <span className="flex items-center gap-1">
              <FiUser size={11} /> {item.reciterName}
            </span>
          )}
          {item.duration && (
            <span className="flex items-center gap-1">
              <FiClock size={11} /> {item.duration}
            </span>
          )}
        </div>

        {item.description && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.description}</p>
        )}

        {audioSrc ? (
          <div className="mt-2">
            <div
              className="w-full h-2 bg-gray-100 rounded-full cursor-pointer mb-2 overflow-hidden"
              onClick={seek}
            >
              <div
                className="h-full bg-isl-green rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-isl-green text-white text-sm font-semibold hover:bg-isl-green/90 transition"
              >
                {playing ? <FiPause size={14} /> : <FiPlay size={14} />}
                {playing ? 'Pause' : 'Play'}
              </button>
              <span className="text-xs text-gray-400 font-mono">{currentTime}</span>
            </div>
          </div>
        ) : (
          <div className="mt-2 text-xs text-gray-400 italic">Audio not available</div>
        )}
      </div>
    </div>
  );
}

export default function AudioHadithsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get(`${API}/audio-hadiths?active=true`)
      .then(res => {
        const data = res.data?.data?.audioHadiths || res.data?.audioHadiths || [];
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setError('Failed to load audio hadiths. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'featured' ? items.filter(i => i.isFeatured) : items;

  return (
    <div className="min-h-screen bg-isl-cream font-body">
      {/* Hero */}
      <div className="bg-isl-green geometric-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-isl-green-dark/60 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="font-arabic text-5xl text-isl-gold mb-3">الأحاديث الصوتية</div>
          <h1 className="text-3xl font-bold text-white mb-2">Audio Hadiths</h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Listen to authentic hadiths recited by renowned scholars
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
                {f === 'all' ? 'All' : 'Featured'}
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
            <FiMusic size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No audio hadiths available yet.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((item, i) => <AudioCard key={item._id || i} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
}
