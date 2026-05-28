import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiCheck } from 'react-icons/fi';

const contactInfo = [
  {
    icon: <FiMapPin size={20} />,
    label: 'Address',
    lines: [
      'Qadri Jame Masjid Foundation',
      'Parsauni Khas, Gopalganj',
      'Bihar, India',
    ],
  },
  {
    icon: <FiPhone size={20} />,
    label: 'Phone',
    lines: ['+91 731 9977 276'],
  },
  {
    icon: <FiMail size={20} />,
    label: 'Email',
    lines: ['armanali.shaikh77@gmail.com'],
    isEmail: true,
  },
];

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required.';
    if (!form.subject.trim()) e.subject = 'Subject is required.';
    if (!form.message.trim()) e.message = 'Message is required.';
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
          <div className="font-arabic text-5xl text-isl-gold mb-3">تَوَاصَل</div>
          <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Have a question, suggestion, or just want to say salam? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Contact Info */}
          <div>
            <h2 className="text-xl font-bold text-isl-dark mb-6">Get in Touch</h2>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="bg-white rounded-2xl border border-isl-stone/40 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-10 h-10 bg-isl-green/10 text-isl-green rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-isl-green uppercase tracking-wider mb-1">{info.label}</p>
                    {info.lines.map((line, i) =>
                      info.isEmail ? (
                        <a
                          key={i}
                          href={`mailto:${line}`}
                          className="block text-sm text-isl-dark hover:text-isl-green transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={i} className="text-sm text-gray-600">{line}</p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-isl-green/5 border border-isl-green/20 rounded-2xl p-5">
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong className="text-isl-green">Response Time:</strong> We aim to respond to all enquiries within
                2–3 business days, InshaAllah. For urgent matters, please reach us by phone.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <h2 className="text-xl font-bold text-isl-dark mb-6">Send a Message</h2>

            {submitted ? (
              <div className="bg-white rounded-2xl border border-isl-stone/40 shadow-sm p-10 text-center">
                <div className="w-16 h-16 bg-isl-green/10 text-isl-green rounded-full flex items-center justify-center mx-auto mb-5">
                  <FiCheck size={30} />
                </div>
                <h3 className="text-lg font-bold text-isl-dark mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  JazakAllahu Khayran, <strong className="text-isl-green">{form.name}</strong>. We have received your
                  message and will get back to you soon.
                </p>
                <button
                  onClick={() => { setForm(initialForm); setSubmitted(false); }}
                  className="mt-5 text-isl-green text-sm underline underline-offset-2 hover:text-isl-green-dark transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-2xl border border-isl-stone/40 shadow-sm p-7 space-y-4"
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-isl-dark mb-1" htmlFor="ct-name">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="ct-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-isl-dark focus:outline-none focus:ring-2 focus:ring-isl-green/30 transition-colors ${
                      errors.name ? 'border-red-400' : 'border-isl-stone/50'
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-isl-dark mb-1" htmlFor="ct-email">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="ct-email"
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

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-isl-dark mb-1" htmlFor="ct-subject">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="ct-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-isl-dark focus:outline-none focus:ring-2 focus:ring-isl-green/30 transition-colors ${
                      errors.subject ? 'border-red-400' : 'border-isl-stone/50'
                    }`}
                  />
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-isl-dark mb-1" htmlFor="ct-message">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="ct-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm text-isl-dark focus:outline-none focus:ring-2 focus:ring-isl-green/30 transition-colors resize-none ${
                      errors.message ? 'border-red-400' : 'border-isl-stone/50'
                    }`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-isl-green text-white font-semibold py-3 rounded-xl hover:bg-isl-green-dark active:scale-95 transition-all duration-200 shadow-sm"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <div className="h-8" />
    </div>
  );
}
