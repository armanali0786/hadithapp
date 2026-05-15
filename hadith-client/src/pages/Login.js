import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      if (user.isAdmin) navigate('/admin');
      else navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-isl-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-isl-gold/20">

          {/* Header */}
          <div className="bg-isl-green px-8 pt-10 pb-8 text-center">
            <div className="w-16 h-16 rounded-full bg-isl-gold/20 border-2 border-isl-gold flex items-center justify-center mx-auto mb-4">
              <span className="text-isl-gold font-arabic text-2xl">☪</span>
            </div>
            <h1 className="text-white font-bold text-2xl font-body">Welcome Back</h1>
            <p className="text-gray-300 text-sm font-body mt-1">Sign in to your IlmHadith account</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-body">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5 font-body">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-isl-green focus:ring-2 focus:ring-isl-green/20 text-gray-800 text-sm font-body transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5 font-body">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 focus:outline-none focus:border-isl-green focus:ring-2 focus:ring-isl-green/20 text-gray-800 text-sm font-body transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-isl-green"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-isl-green !text-white font-semibold font-body rounded-xl hover:bg-isl-green-light transition-colors duration-200 text-sm mt-2 disabled:opacity-60"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 font-body mt-5">
              Don't have an account?{' '}
              <Link to="/sign-up" className="!text-isl-green font-semibold hover:!text-isl-gold transition-colors duration-200 no-underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
