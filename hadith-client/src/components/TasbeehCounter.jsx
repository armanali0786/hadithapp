import React, { useState } from 'react';

const PHRASES = [
  { arabic: 'سُبْحَانَ اللَّهِ', transliteration: 'SubhanAllah', target: 33, color: 'from-isl-green to-isl-green-light' },
  { arabic: 'الْحَمْدُ لِلَّهِ',   transliteration: 'Alhamdulillah', target: 33, color: 'from-isl-green-light to-emerald-600' },
  { arabic: 'اللَّهُ أَكْبَرُ',    transliteration: 'Allahu Akbar',  target: 34, color: 'from-isl-gold-dark to-isl-gold' },
];

export default function TasbeehCounter() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [count, setCount]         = useState(0);
  const [total, setTotal]         = useState(0);
  const [done, setDone]           = useState(false);

  const current = PHRASES[phraseIdx];
  const radius  = 54;
  const circ    = 2 * Math.PI * radius;
  const progress = done ? circ : circ - (count / current.target) * circ;

  const handleTap = () => {
    if (done) return;
    const next = count + 1;
    setTotal(t => t + 1);
    if (next >= current.target) {
      if (phraseIdx < PHRASES.length - 1) {
        setPhraseIdx(i => i + 1);
        setCount(0);
      } else {
        setCount(next);
        setDone(true);
      }
    } else {
      setCount(next);
    }
  };

  const handleReset = () => {
    setPhraseIdx(0);
    setCount(0);
    setTotal(0);
    setDone(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8 font-body">
      {/* Phase indicators */}
      <div className="flex gap-2">
        {PHRASES.map((p, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              i === phraseIdx && !done
                ? 'bg-isl-green text-white shadow-md scale-105'
                : i < phraseIdx || done
                ? 'bg-isl-gold/20 text-isl-gold-dark line-through'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {i < phraseIdx || (done && i <= phraseIdx) ? '✓' : `${i + 1}.`} {p.transliteration}
          </div>
        ))}
      </div>

      {/* Circle button with SVG progress ring */}
      <button
        onClick={handleTap}
        disabled={done}
        className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all active:scale-95 select-none ${
          done ? 'cursor-default' : 'cursor-pointer hover:shadow-isl-green/30'
        }`}
        style={{ background: 'linear-gradient(135deg, #0d4a2e, #2d6a4f)' }}
        aria-label="Tap to count"
      >
        {/* SVG ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
          <circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke="#c9a227"
            strokeWidth="6"
            strokeDasharray={circ}
            strokeDashoffset={progress}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>

        {done ? (
          <div className="text-center z-10 px-3">
            <div className="text-isl-gold text-2xl mb-1">✓</div>
            <div className="text-white text-xs font-semibold leading-tight">Masha'Allah</div>
            <div className="text-isl-gold text-xs">Complete!</div>
          </div>
        ) : (
          <div className="text-center z-10">
            <div className="text-isl-gold font-arabic text-3xl leading-none mb-1">{current.arabic}</div>
            <div className="text-white text-3xl font-bold leading-none">{count}</div>
            <div className="text-white/60 text-xs mt-1">/ {current.target}</div>
          </div>
        )}
      </button>

      {/* Current phrase label */}
      {!done && (
        <div className="text-center">
          <div className="font-arabic text-4xl text-isl-green dir-rtl mb-1">{current.arabic}</div>
          <div className="text-gray-500 text-sm italic">{current.transliteration}</div>
        </div>
      )}

      {done && (
        <div className="text-center">
          <div className="text-isl-green font-semibold text-xl">مَاشَاءَ اللَّه</div>
          <div className="text-gray-500 text-sm mt-1">Masha'Allah — Tasbih Complete!</div>
        </div>
      )}

      {/* Total count */}
      <div className="flex items-center gap-2 px-5 py-2 bg-isl-cream rounded-full border border-isl-stone">
        <span className="text-gray-500 text-sm">Total:</span>
        <span className="text-isl-green font-bold text-base">{total}</span>
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="px-6 py-2 text-sm font-medium text-isl-green border border-isl-green/40 rounded-lg hover:bg-isl-green hover:text-white transition-all duration-200"
      >
        Reset
      </button>
    </div>
  );
}
