import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiImage, FiList, FiBookOpen, FiHelpCircle } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const API = 'http://localhost:4040';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    sliders: 0, collections: 0, hadiths: 0, questions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [s, c, h, q] = await Promise.all([
          axios.get(`${API}/slider`),
          axios.get(`${API}/hadith-type`),
          axios.get(`${API}/hadith-list`),
          axios.get(`${API}/questions`),
        ]);
        setStats({
          sliders: s.data?.data?.sliders?.length || 0,
          collections: c.data?.hadithType?.length || 0,
          hadiths: h.data?.data?.hadithlist?.length || 0,
          questions: q.data?.data?.questions?.length || 0,
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
          {[
            { to: '/admin/slider', label: 'Manage Slider', icon: FiImage },
            { to: '/admin/collections', label: 'Manage Collections', icon: FiList },
            { to: '/admin/hadiths', label: 'Manage Hadiths', icon: FiBookOpen },
            { to: '/admin/quiz', label: 'Manage Quiz', icon: FiHelpCircle },
          ].map(({ to, label, icon: Icon }) => (
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
