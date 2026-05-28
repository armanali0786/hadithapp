import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FiImage, FiList, FiBookOpen, FiHelpCircle,
  FiMusic, FiBell, FiMessageSquare, FiUser,
  FiHeart, FiLayers, FiStar, FiRepeat, FiTag
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    sliders: 0, collections: 0, hadiths: 0, questions: 0,
    audioHadiths: 0, announcements: 0, quotes: 0, scholars: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [s, c, h, q, a, ann, qt, sch] = await Promise.allSettled([
          axios.get(`${API}/slider`),
          axios.get(`${API}/hadith-type`),
          axios.get(`${API}/hadith-list`),
          axios.get(`${API}/questions`),
          axios.get(`${API}/audio-hadiths`),
          axios.get(`${API}/announcements`),
          axios.get(`${API}/islamic-quotes`),
          axios.get(`${API}/scholars`),
        ]);
        setStats({
          sliders: s.status === 'fulfilled' ? (s.value.data?.data?.sliders?.length || 0) : 0,
          collections: c.status === 'fulfilled' ? (c.value.data?.hadithType?.length || 0) : 0,
          hadiths: h.status === 'fulfilled' ? (h.value.data?.data?.hadithlist?.length || 0) : 0,
          questions: q.status === 'fulfilled' ? (q.value.data?.data?.questions?.length || 0) : 0,
          audioHadiths: a.status === 'fulfilled'
            ? (a.value.data?.audioHadiths?.length ?? a.value.data?.length ?? 0)
            : 0,
          announcements: ann.status === 'fulfilled'
            ? (ann.value.data?.announcements?.length ?? ann.value.data?.length ?? 0)
            : 0,
          quotes: qt.status === 'fulfilled'
            ? (qt.value.data?.quotes?.length ?? qt.value.data?.length ?? 0)
            : 0,
          scholars: sch.status === 'fulfilled'
            ? (sch.value.data?.scholars?.length ?? sch.value.data?.length ?? 0)
            : 0,
        });
      } catch (err) {
        console.error('Stats fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Slider Slides', value: stats.sliders, icon: FiImage, color: 'bg-blue-500', to: '/admin/slider' },
    { label: 'Collections', value: stats.collections, icon: FiList, color: 'bg-isl-green', to: '/admin/collections' },
    { label: 'Hadith Articles', value: stats.hadiths, icon: FiBookOpen, color: 'bg-isl-gold', to: '/admin/hadiths' },
    { label: 'Quiz Questions', value: stats.questions, icon: FiHelpCircle, color: 'bg-purple-500', to: '/admin/quiz' },
    { label: 'Audio Hadiths', value: stats.audioHadiths, icon: FiMusic, color: 'bg-teal-500', to: '/admin/audio' },
    { label: 'Announcements', value: stats.announcements, icon: FiBell, color: 'bg-orange-500', to: '/admin/announcements' },
    { label: 'Quotes', value: stats.quotes, icon: FiMessageSquare, color: 'bg-indigo-500', to: '/admin/quotes' },
    { label: 'Scholars', value: stats.scholars, icon: FiUser, color: 'bg-pink-500', to: '/admin/scholars' },
  ];

  const quickActions = [
    { to: '/admin/slider', label: 'Manage Slider', icon: FiImage },
    { to: '/admin/collections', label: 'Manage Collections', icon: FiList },
    { to: '/admin/hadiths', label: 'Manage Hadiths', icon: FiBookOpen },
    { to: '/admin/quiz', label: 'Manage Quiz', icon: FiHelpCircle },
    { to: '/admin/audio', label: 'Audio Hadiths', icon: FiMusic },
    { to: '/admin/announcements', label: 'Announcements', icon: FiBell },
    { to: '/admin/quotes', label: 'Islamic Quotes', icon: FiMessageSquare },
    { to: '/admin/scholars', label: 'Scholars', icon: FiUser },
    { to: '/admin/duas-admin', label: 'Dua Collection', icon: FiStar },
    { to: '/admin/adhkar-admin', label: 'Adhkar', icon: FiRepeat },
    { to: '/admin/organizations', label: 'Sadaqah Orgs', icon: FiHeart },
    { to: '/admin/tags', label: 'Topic Tags', icon: FiTag },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="font-arabic text-isl-gold text-2xl mb-1">لوحة التحكم</div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all content displayed on the Hadith platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {cards.map(({ label, value, icon: Icon, color, to }) => (
          <NavLink
            key={label}
            to={to}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
              <Icon size={22} />
            </div>
            <div>
              {loading ? (
                <div className="h-7 w-12 bg-gray-200 rounded animate-pulse mb-1" />
              ) : (
                <div className="text-3xl font-bold text-gray-800">{value}</div>
              )}
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          </NavLink>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-bold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-isl-green hover:text-isl-green hover:bg-isl-green/5 transition-all duration-200"
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
