import React, { useState, useEffect } from 'react';

function calcStreak() {
  const today = new Date().toDateString();
  const raw   = localStorage.getItem('ilm-streak');
  const data  = raw ? JSON.parse(raw) : { streak: 0, lastVisit: null };
  if (data.lastVisit === today) return data.streak;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const newStreak = data.lastVisit === yesterday ? data.streak + 1 : 1;
  localStorage.setItem('ilm-streak', JSON.stringify({ streak: newStreak, lastVisit: today }));
  return newStreak;
}

export default function ReadingStreak() {
  const [streak, setStreak] = useState(0);
  useEffect(() => { setStreak(calcStreak()); }, []);
  if (!streak) return null;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-sm font-body text-amber-700">
      🔥 <strong>{streak}</strong> day{streak !== 1 ? 's' : ''}
    </span>
  );
}
