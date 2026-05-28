import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo/ilmhadith.png';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      if (!user.isAdmin) {
        setError('Access denied. Admin privileges required.');
        return;
      }
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-isl-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-isl-gold/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative">
        <div className="bg-[#1e2d1f] rounded-3xl shadow-2xl overflow-hidden border border-isl-gold/20">

          {/* Header */}
          <div className="px-8 pt-10 pb-8 text-center border-b border-white/10">
            <div className="w-16 h-16 rounded-full bg-isl-gold/10 border-2 border-isl-gold flex items-center justify-center mx-auto mb-4 overflow-hidden">
              <img src={logoImg} alt="IlmHadith" className="w-full h-full object-contain p-2" />
            </div>
            <h1 className="text-white font-bold text-2xl font-body">Admin Panel</h1>
            <p className="text-gray-400 text-sm font-body mt-1">IlmHadith — Content Management</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-900/30 border border-red-500/30 text-red-400 text-sm font-body">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5 font-body">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@ilmhadith.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-isl-gold/50 focus:ring-2 focus:ring-isl-gold/10 text-sm font-body transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5 font-body">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="Enter admin password"
                    required
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-isl-gold/50 focus:ring-2 focus:ring-isl-gold/10 text-sm font-body transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-isl-gold"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-isl-gold text-isl-green font-bold font-body rounded-xl hover:bg-isl-gold-light transition-colors duration-200 text-sm mt-2 disabled:opacity-60"
              >
                {loading ? 'Authenticating...' : 'Access Admin Panel'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
