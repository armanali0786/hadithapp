import React, { useState } from 'react';
import { FiHeart, FiUsers, FiBook, FiCheck } from 'react-icons/fi';

const reasons = [
  {
    icon: <FiHeart size={26} />,
    title: 'Earn Sadaqah Jariyah',
    text: 'Every Hadith you help publish, every quiz you write — the reward flows to you continuously, even after you are gone. This is knowledge that benefits the Ummah.',
  },
  {
    icon: <FiUsers size={26} />,
    title: 'Serve the Community',
    text: 'Join a dedicated team working sincerely for the sake of Allah. Your skills, however small, can make a real difference for Muslims across the world.',
  },
  {
    icon: <FiBook size={26} />,
    title: 'Learn & Grow',
    text: 'Volunteering deepens your own Islamic knowledge. Working closely with scholars and authentic sources is one of the best ways to grow spiritually and intellectually.',
  },
];

const areas = [
  'Content Writing',
  'Arabic Translation',
  'Web Development',
  'Social Media',
  'Graphic Design',
  'Community Outreach',
];

const skillOptions = [...areas, 'Other'];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  skill: '',
  message: '',
};

export default function VolunteerPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required.';
    if (!form.skill) e.skill = 'Please select an area.';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-isl-cream font-body">
      {/* Hero */}
      <div className="bg-isl-green geometric-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-isl-green-dark/60 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="font-arabic text-5xl text-isl-gold mb-3">تَطَوَّعْ</div>
          <h1 className="text-3xl font-bold text-white mb-2">Volunteer for the Ummah</h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Give your time and talents to spread authentic Islamic knowledge. Every effort counts.
          </p>
        </div>
      </div>

      {/* Why Volunteer */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <span className="inline-block bg-isl-green/10 text-isl-green text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-full mb-3">
            Why Volunteer?
          </span>
          <h2 className="text-2xl font-bold text-isl-dark">The Rewards Are Eternal</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="bg-white rounded-2xl border border-isl-stone/40 shadow-sm p-7 hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-12 h-12 bg-isl-green/10 text-isl-green rounded-full flex items-center justify-center mb-4">
                {r.icon}
              </div>
              <h3 className="font-bold text-isl-dark text-base mb-2">{r.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Areas We Need Help */}
      <section className="bg-isl-green/5 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-isl-green/10 text-isl-green text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-full mb-3">
              Open Roles
            </span>
            <h2 className="text-2xl font-bold text-isl-dark">Areas We Need Help</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
              Whether you are a writer, developer, designer, or just passionate — there is a place for you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {areas.map((area) => (
              <div
                key={area}
                className="bg-white rounded-xl border border-isl-stone/40 shadow-sm px-5 py-4 flex items-center gap-3 hover:border-isl-green/40 transition-colors duration-200"
              >
                <FiCheck className="text-isl-green shrink-0" size={18} />
                <span className="text-isl-dark font-medium text-sm">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section className="max-w-2xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <span className="inline-block bg-isl-green/10 text-isl-green text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-full mb-3">
            Join Us
          </span>
          <h2 className="text-2xl font-bold text-isl-dark">Volunteer Sign-Up</h2>
          <p className="text-gray-500 text-sm mt-2">Fill in the form below and we will be in touch, InshaAllah.</p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl border border-isl-stone/40 shadow-sm p-10 text-center">
            <div className="w-16 h-16 bg-isl-green/10 text-isl-green rounded-full flex items-center justify-center mx-auto mb-5">
              <FiCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-isl-dark mb-2">JazakAllahu Khayran!</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
              Thank you for volunteering, <strong className="text-isl-green">{form.name}</strong>. We have received
              your application and will reach out to you soon. May Allah reward your intention.
            </p>
            <button
              onClick={() => { setForm(initialForm); setSubmitted(false); }}
              className="mt-6 text-isl-green text-sm underline underline-offset-2 hover:text-isl-green-dark transition-colors"
            >
              Submit another application
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-2xl border border-isl-stone/40 shadow-sm p-8 space-y-5"
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-isl-dark mb-1" htmlFor="vol-name">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="vol-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm text-isl-dark focus:outline-none focus:ring-2 focus:ring-isl-green/30 transition-colors ${
                  errors.name ? 'border-red-400' : 'border-isl-stone/50'
                }`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-isl-dark mb-1" htmlFor="vol-email">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                id="vol-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm text-isl-dark focus:outline-none focus:ring-2 focus:ring-isl-green/30 transition-colors ${
                  errors.email ? 'border-red-400' : 'border-isl-stone/50'
                }`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-isl-dark mb-1" htmlFor="vol-phone">
                Phone Number
              </label>
              <input
                id="vol-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 00000 00000"
                className="w-full border border-isl-stone/50 rounded-xl px-4 py-2.5 text-sm text-isl-dark focus:outline-none focus:ring-2 focus:ring-isl-green/30 transition-colors"
              />
            </div>

            {/* Skill / Area */}
            <div>
              <label className="block text-sm font-medium text-isl-dark mb-1" htmlFor="vol-skill">
                Area of Interest <span className="text-red-400">*</span>
              </label>
              <select
                id="vol-skill"
                name="skill"
                value={form.skill}
                onChange={handleChange}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm text-isl-dark bg-white focus:outline-none focus:ring-2 focus:ring-isl-green/30 transition-colors ${
                  errors.skill ? 'border-red-400' : 'border-isl-stone/50'
                }`}
              >
                <option value="">Select a skill / area</option>
                {skillOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.skill && <p className="text-red-400 text-xs mt-1">{errors.skill}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-isl-dark mb-1" htmlFor="vol-message">
                Tell Us About Yourself
              </label>
              <textarea
                id="vol-message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Brief introduction, relevant experience, or why you want to volunteer..."
                className="w-full border border-isl-stone/50 rounded-xl px-4 py-2.5 text-sm text-isl-dark focus:outline-none focus:ring-2 focus:ring-isl-green/30 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-isl-green text-white font-semibold py-3 rounded-xl hover:bg-isl-green-dark active:scale-95 transition-all duration-200 shadow-sm"
            >
              Submit Application
            </button>
          </form>
        )}
      </section>

      <div className="h-8" />
    </div>
  );
}
