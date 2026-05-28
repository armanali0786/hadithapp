import React from 'react';
import { FiBook, FiShield, FiUsers, FiHeart } from 'react-icons/fi';

const stats = [
  { label: '500+ Hadiths', sub: 'Authenticated & categorised' },
  { label: '100+ Quiz Questions', sub: 'Test your knowledge' },
  { label: '10+ Categories', sub: 'Broad Islamic topics' },
  { label: '1 Foundation', sub: 'Qadri Jame Masjid' },
];

const values = [
  {
    icon: <FiBook size={28} />,
    title: 'Knowledge',
    text: 'We believe every Muslim deserves access to accurate, well-sourced Islamic knowledge in a format that is easy to understand and share.',
  },
  {
    icon: <FiShield size={28} />,
    title: 'Authenticity',
    text: 'Every hadith on IlmHadith is graded and attributed to its primary source. We prioritise scholarly integrity above all else.',
  },
  {
    icon: <FiUsers size={28} />,
    title: 'Community',
    text: 'Built for the Ummah, by volunteers from the Ummah. We welcome contributions from scholars, students, and believers worldwide.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-isl-cream font-body">
      {/* Hero */}
      <div className="bg-isl-green geometric-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-isl-green-dark/60 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="font-arabic text-5xl text-isl-gold mb-3">عَن</div>
          <h1 className="text-3xl font-bold text-white mb-2">About IlmHadith</h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            A digital platform dedicated to spreading authentic Hadith knowledge for the Ummah.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <span className="inline-block bg-isl-green/10 text-isl-green text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-full mb-3">
            Our Mission
          </span>
          <h2 className="text-2xl font-bold text-isl-dark mb-4">
            Spreading Authentic Hadith Knowledge for the Ummah
          </h2>
        </div>
        <div className="bg-white rounded-2xl border border-isl-stone/40 shadow-sm p-8 text-gray-600 leading-relaxed space-y-4">
          <p>
            IlmHadith is a project of the <strong className="text-isl-green">Qadri Jame Masjid Foundation</strong>,
            located in Parsauni Khas, Gopalganj, Bihar, India. Founded with the sincere intention of making authentic
            Islamic scholarship accessible to every Muslim — regardless of their background or location — the Foundation
            has long served the local community through education, worship, and community welfare.
          </p>
          <p>
            This digital platform is an extension of that noble mission. By bringing verified Hadiths, Islamic quizzes,
            Duas &amp; Adhkar, and scholarly resources online, we hope to empower Muslims everywhere to deepen their
            understanding of the Sunnah and live by it with confidence and joy.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <FiHeart className="text-isl-gold shrink-0" size={20} />
            <span className="text-sm text-isl-green font-medium italic">
              "Convey from me, even if it is one verse." — Sahih Bukhari
            </span>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-isl-green/5 py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-isl-green/10 text-isl-green text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-full mb-3">
              What We Stand For
            </span>
            <h2 className="text-2xl font-bold text-isl-dark">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl border border-isl-stone/40 shadow-sm p-7 text-center hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-14 h-14 bg-isl-green/10 text-isl-green rounded-full flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-isl-dark text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <span className="inline-block bg-isl-green/10 text-isl-green text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-full mb-3">
            Our Story
          </span>
          <h2 className="text-2xl font-bold text-isl-dark mb-4">How IlmHadith Came to Be</h2>
        </div>
        <div className="bg-white rounded-2xl border border-isl-stone/40 shadow-sm p-8 text-gray-600 leading-relaxed space-y-4">
          <p>
            The journey of IlmHadith began with a simple observation: millions of Muslims around the world are eager to
            learn about their Deen, yet high-quality, easily searchable Islamic resources in digital form remain scarce
            and fragmented.
          </p>
          <p>
            Inspired by the teachings of the Qadri Jame Masjid Foundation and driven by a small team of passionate
            volunteers, we set out to build a platform that could serve as a trusted companion for every Muslim's
            daily spiritual life — whether they want to read a hadith, recite a morning adhkar, challenge themselves
            with a quiz, or simply find a beautiful Islamic quote to share.
          </p>
          <p>
            Today, IlmHadith continues to grow thanks to the generous contributions of scholars, translators,
            developers, and community members. Every feature added and every piece of content published is an act of
            Sadaqah Jariyah — a continuous charity that we pray Allah accepts from all involved.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-isl-green geometric-bg relative overflow-hidden py-14">
        <div className="absolute inset-0 bg-gradient-to-br from-isl-green-dark/50 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white">Our Reach</h2>
            <p className="text-white/60 text-sm mt-1">Growing every day with the help of the community</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
              >
                <div className="text-isl-gold font-bold text-xl mb-1">{s.label}</div>
                <div className="text-white/70 text-xs">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-10" />
    </div>
  );
}
