import React, { useState, useEffect } from 'react';
import { FiCalendar } from 'react-icons/fi';

export default function IslamicCalendarWidget() {
  const [hijriEn, setHijriEn]     = useState('');
  const [hijriAr, setHijriAr]     = useState('');
  const [gregorian, setGregorian] = useState('');

  useEffect(() => {
    try {
      setHijriEn(new Intl.DateTimeFormat('en-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()));
      setHijriAr(new Intl.DateTimeFormat('ar-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()));
      setGregorian(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    } catch (e) {}
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-isl-stone/50 p-6 text-center">
      <div className="text-xs text-isl-gold uppercase tracking-widest mb-3 font-body flex items-center justify-center gap-2">
        <FiCalendar size={12} /> Islamic Calendar
      </div>
      <div className="font-arabic text-2xl text-isl-green mb-1 dir-rtl">{hijriAr}</div>
      <div className="text-base font-semibold text-gray-700 font-body mb-1">{hijriEn}</div>
      <div className="text-xs text-gray-400 font-body">{gregorian}</div>
    </div>
  );
}
