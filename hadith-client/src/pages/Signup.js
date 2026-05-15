import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => e.preventDefault();

  return (
    <div className="min-h-screen bg-isl-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-isl-gold/20">

          {/* Header */}
          <div className="bg-isl-green px-8 pt-10 pb-8 text-center">
            <div className="w-16 h-16 rounded-full bg-isl-gold/20 border-2 border-isl-gold flex items-center justify-center mx-auto mb-4">
              <span className="text-isl-gold font-arabic text-2xl">☪</span>
            </div>
            <h2 className="text-white font-bold text-2xl font-body">Create Account</h2>
            <p className="text-white/60 text-sm font-body mt-1">Join the Hadith Hub community</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5 font-body">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-isl-green focus:ring-2 focus:ring-isl-green/20 text-gray-800 text-sm font-body transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5 font-body">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-isl-green focus:ring-2 focus:ring-isl-green/20 text-gray-800 text-sm font-body transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5 font-body">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-isl-green focus:ring-2 focus:ring-isl-green/20 text-gray-800 text-sm font-body transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5 font-body">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-isl-green focus:ring-2 focus:ring-isl-green/20 text-gray-800 text-sm font-body transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5 font-body">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-isl-green focus:ring-2 focus:ring-isl-green/20 text-gray-800 text-sm font-body transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-isl-green text-white font-semibold font-body rounded-xl hover:bg-isl-green-light transition-colors duration-200 text-sm mt-2"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 font-body mt-5">
              Already have an account?{' '}
              <Link to="/login" className="text-isl-green font-semibold hover:text-isl-gold transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
