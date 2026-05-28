import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    q: 'What is IlmHadith?',
    a: 'IlmHadith is a digital Islamic knowledge platform built by the Qadri Jame Masjid Foundation, Parsauni Khas, Gopalganj, Bihar, India. It provides authenticated Hadiths, Duas & Adhkar, Islamic quizzes, quotes, and more — all in one place for the benefit of the Ummah.',
  },
  {
    q: 'Are the hadiths authentic?',
    a: 'Yes. Every hadith on IlmHadith is sourced from well-known, recognised collections (such as Sahih Bukhari, Sahih Muslim, Abu Dawood, Tirmidhi, etc.) and is graded by authenticity. The grade and source are displayed alongside each hadith.',
  },
  {
    q: 'How do I bookmark a hadith?',
    a: 'You must be logged in to bookmark hadiths. Once logged in, click the bookmark icon (🔖) on any hadith card or detail page. Bookmarked hadiths are saved to your account and accessible from the "Bookmarks" section in your profile.',
  },
  {
    q: 'How does the quiz work?',
    a: 'The Islamic Knowledge Quiz presents a series of multiple-choice questions based on Hadiths, Fiqh, Seerah, and general Islamic knowledge. After answering, you receive a score along with explanations. Quizzes are updated regularly with new questions.',
  },
  {
    q: 'Can I donate?',
    a: 'Yes, Alhamdulillah! We accept donations to support the continued development of IlmHadith and the activities of the Qadri Jame Masjid Foundation. Visit the Sadaqah / Donation page from the navigation menu to contribute.',
  },
  {
    q: 'How do I create an account?',
    a: 'Click the "Sign Up" button in the top navigation bar. You can register with your email address and a password, or sign in quickly using your Google account (Google OAuth). Account creation is free.',
  },
  {
    q: 'What are Duas & Adhkar?',
    a: 'Duas are supplications — personal prayers you make to Allah. Adhkar (plural of Dhikr) are specific remembrances of Allah recommended by the Prophet ﷺ for various times of day, situations, and activities. IlmHadith provides morning and evening Adhkar with Arabic text, transliteration, and translation.',
  },
  {
    q: 'How do I contact support?',
    a: 'You can reach us via the Contact Us page. Fill in the contact form or email us directly at armanali.shaikh77@gmail.com. We aim to respond within 2–3 business days, InshaAllah.',
  },
  {
    q: 'Is the app free to use?',
    a: 'Yes, IlmHadith is completely free to use. All Hadiths, Duas, Adhkar, quizzes, and content are freely accessible. We rely on voluntary donations and the support of the community to keep the platform running.',
  },
  {
    q: 'How are scholars verified?',
    a: 'Scholars featured on IlmHadith are reviewed by the foundation team for their credentials, affiliation with recognised Islamic institutions, and the authenticity of their published works. If you would like to recommend a scholar, please use the Contact page.',
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-isl-stone/40 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-isl-green/5 transition-colors duration-150 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-isl-dark text-sm pr-4">{item.q}</span>
        {isOpen ? (
          <FiChevronUp className="text-isl-green shrink-0" size={18} />
        ) : (
          <FiChevronDown className="text-gray-400 shrink-0" size={18} />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-2 bg-white border-t border-isl-stone/30">
          <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = faqs.filter((f) => {
    const term = search.toLowerCase();
    return f.q.toLowerCase().includes(term) || f.a.toLowerCase().includes(term);
  });

  function toggle(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <div className="min-h-screen bg-isl-cream font-body">
      {/* Hero */}
      <div className="bg-isl-green geometric-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-isl-green-dark/60 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="font-arabic text-5xl text-isl-gold mb-3">مُسَاعَدَة</div>
          <h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Find answers to common questions about IlmHadith.
          </p>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-4 py-14">
        {/* Search */}
        <div className="relative mb-8">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpenIndex(null); }}
            placeholder="Search frequently asked questions..."
            className="w-full border border-isl-stone/50 rounded-xl pl-11 pr-4 py-3 text-sm text-isl-dark bg-white focus:outline-none focus:ring-2 focus:ring-isl-green/30 transition-colors shadow-sm"
          />
        </div>

        {/* FAQ List */}
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((item, i) => (
              <FaqItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">No results found for "<strong>{search}</strong>".</p>
            <button
              onClick={() => setSearch('')}
              className="mt-3 text-isl-green text-sm underline underline-offset-2 hover:text-isl-green-dark transition-colors"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Still need help */}
        <div className="mt-12 bg-isl-green/5 border border-isl-green/20 rounded-2xl p-7 text-center">
          <h3 className="font-bold text-isl-dark mb-2">Still need help?</h3>
          <p className="text-gray-500 text-sm mb-4">
            Can't find what you're looking for? Drop us a message and we'll get back to you, InshaAllah.
          </p>
          <a
            href="/contact"
            className="inline-block bg-isl-green text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-isl-green-dark active:scale-95 transition-all duration-200 shadow-sm"
          >
            Contact Us
          </a>
        </div>
      </section>

      <div className="h-8" />
    </div>
  );
}
