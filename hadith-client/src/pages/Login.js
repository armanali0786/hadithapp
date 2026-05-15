import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(() => navigate('/'));
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
            <h2 className="text-white font-bold text-2xl font-body">Welcome Back</h2>
            <p className="text-white/60 text-sm font-body mt-1">Sign in to your account</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmitLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5 font-body">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-isl-green focus:ring-2 focus:ring-isl-green/20 text-gray-800 text-sm font-body transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5 font-body">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-isl-green focus:ring-2 focus:ring-isl-green/20 text-gray-800 text-sm font-body transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-isl-green text-white font-semibold font-body rounded-xl hover:bg-isl-green-light transition-colors duration-200 text-sm mt-2"
              >
                Log In
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 font-body mt-5">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-isl-green font-semibold hover:text-isl-gold transition-colors duration-200">
                Sign up
              </Link>
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-body">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                </svg>
                Apple
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-body text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
