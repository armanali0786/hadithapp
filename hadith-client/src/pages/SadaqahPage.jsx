import React, { useState, useEffect } from 'react';
import { FiMapPin, FiStar, FiCopy, FiCheck, FiX } from 'react-icons/fi';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';

const TYPE_LABELS = { mosque: 'Mosque', madrasa: 'Madrasa', foundation: 'Foundation' };
const TYPE_COLORS = {
  mosque: 'bg-green-100 text-green-700',
  madrasa: 'bg-blue-100 text-blue-700',
  foundation: 'bg-purple-100 text-purple-700',
};
const TYPE_ICONS = { mosque: '🕌', madrasa: '📚', foundation: '🤲' };

// ─── Copy helper ─────────────────────────────────────────────────────────────

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      onClick={copy}
      className="ml-2 flex-shrink-0 text-gray-400 hover:text-isl-green transition"
      title="Copy"
    >
      {copied ? <FiCheck size={13} className="text-green-500" /> : <FiCopy size={13} />}
    </button>
  );
}

// ─── Payment Modal ────────────────────────────────────────────────────────────

function PaymentModal({ org, onClose }) {
  if (!org) return null;

  const rows = [
    org.accountHolder && ['Account Holder', org.accountHolder],
    org.bankName && ['Bank', org.bankName],
    org.accountNumber && ['Account Number', org.accountNumber],
    org.ifscCode && ['IFSC Code', org.ifscCode],
    org.upiId && ['UPI ID', org.upiId],
  ].filter(Boolean);

  const hasPaymentDetails = rows.length > 0;
  const hasQr = !!org.qrImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 flex items-center justify-center transition"
        >
          <FiX size={16} />
        </button>

        {/* Header */}
        <div className="bg-isl-green px-7 pt-8 pb-6 rounded-t-3xl">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">{TYPE_ICONS[org.type]}</span>
            <div>
              <p className="text-isl-gold text-xs font-semibold uppercase tracking-widest">{TYPE_LABELS[org.type]}</p>
              <h2 className="text-white font-bold text-xl leading-tight">{org.name}</h2>
            </div>
          </div>
          {org.location && (
            <p className="flex items-center gap-1.5 text-white/60 text-xs mt-2">
              <FiMapPin size={11} /> {org.location}
            </p>
          )}
          {org.description && (
            <p className="text-white/70 text-sm mt-3 leading-relaxed">{org.description}</p>
          )}
        </div>

        <div className="p-7 space-y-6">

          {/* QR Code */}
          {hasQr && (
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center justify-center gap-2">
                <span className="h-px flex-1 bg-gray-200" />
                Scan & Pay via UPI
                <span className="h-px flex-1 bg-gray-200" />
              </p>
              <div className="inline-block p-3 bg-amber-50 border-4 border-isl-gold rounded-2xl shadow-inner">
                <img
                  src={`${API}/uploads/${org.qrImage}`}
                  alt="QR Code"
                  className="w-48 h-48 object-contain rounded-xl"
                />
              </div>
              {org.upiId && (
                <p className="mt-3 text-sm text-gray-600">
                  UPI:{' '}
                  <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold">
                    {org.upiId}
                  </span>
                </p>
              )}
              <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                📸 Please send a screenshot after payment to confirm.
              </p>
            </div>
          )}

          {/* Bank / UPI Details */}
          {hasPaymentDetails && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="h-px flex-1 bg-gray-200" />
                {hasQr ? 'Or Pay via Bank Transfer' : 'Payment Details'}
                <span className="h-px flex-1 bg-gray-200" />
              </p>
              <div className="bg-gray-50 rounded-2xl divide-y divide-gray-200 overflow-hidden">
                {rows.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between px-4 py-3">
                    <span className="text-xs text-gray-500 font-medium">{label}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-sm font-semibold text-gray-800">{value}</span>
                      <CopyButton value={value} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!hasQr && !hasPaymentDetails && (
            <p className="text-center text-gray-400 text-sm py-4">
              Payment details not yet added. Please contact the organization directly.
            </p>
          )}

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 pt-2">
            May Allah accept your Sadaqah and reward you abundantly. آمين
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Org Card ─────────────────────────────────────────────────────────────────

function OrgCard({ org, onDonate }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Featured badge */}
      {org.featured && (
        <div className="bg-isl-gold/10 border-b border-isl-gold/20 px-4 py-1.5 flex items-center gap-1.5">
          <FiStar size={12} className="text-isl-gold fill-isl-gold" />
          <span className="text-xs font-semibold text-isl-gold">Featured</span>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          {org.qrImage ? (
            <img
              src={`${API}/uploads/${org.qrImage}`}
              alt={org.name}
              className="w-14 h-14 rounded-xl object-cover border border-gray-200 flex-shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-isl-green/10 flex items-center justify-center text-2xl flex-shrink-0">
              {TYPE_ICONS[org.type]}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLORS[org.type]}`}>
              {TYPE_LABELS[org.type]}
            </span>
            <h3 className="font-bold text-gray-800 text-sm mt-1 leading-snug">{org.name}</h3>
          </div>
        </div>

        {org.location && (
          <p className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
            <FiMapPin size={11} /> {org.location}
          </p>
        )}

        {org.description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1 mb-4">
            {org.description}
          </p>
        )}

        {/* Payment method badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {org.upiId && (
            <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">UPI</span>
          )}
          {org.qrImage && (
            <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium">QR Code</span>
          )}
          {org.accountNumber && (
            <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium">Bank Transfer</span>
          )}
        </div>

        <button
          onClick={() => onDonate(org)}
          className="w-full py-2.5 bg-isl-gold text-isl-green font-bold text-sm rounded-xl hover:bg-isl-gold-light transition-colors duration-200 shadow-sm"
        >
          Donate Now
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const SadaqahPage = () => {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [selectedOrg, setSelectedOrg] = useState(null);

  useEffect(() => {
    fetch(`${API}/organizations`)
      .then((r) => r.json())
      .then((d) => {
        const active = (d?.data?.organizations || []).filter((o) => o.isActive);
        setOrgs(active);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filterType === 'all' ? orgs : orgs.filter((o) => o.type === filterType);

  const counts = {
    all: orgs.length,
    mosque: orgs.filter((o) => o.type === 'mosque').length,
    madrasa: orgs.filter((o) => o.type === 'madrasa').length,
    foundation: orgs.filter((o) => o.type === 'foundation').length,
  };

  return (
    <div className="bg-isl-cream min-h-screen font-body">

      {/* ── Hero ── */}
      <div className="bg-isl-green text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-isl-gold/10 translate-y-1/2 -translate-x-1/3" />
        <div className="relative max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="font-arabic text-isl-gold text-4xl mb-2">صَدَقَة</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Give Sadaqah</h1>
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-px bg-isl-gold/40 w-16" />
            <span className="text-isl-gold text-sm">✦</span>
            <div className="h-px bg-isl-gold/40 w-16" />
          </div>
          <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-6">
            Support mosques, madarsas, and foundations around you. Choose an organization below and pay via QR, UPI, or bank transfer — every rupee counts.
          </p>
          <blockquote className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 max-w-2xl mx-auto text-sm italic text-white/80 leading-relaxed">
            "Those who spend their wealth by night and by day, secretly and publicly, will have their reward with their Lord." — Qur'an 2:274
          </blockquote>
        </div>
      </div>

      {/* ── Org Listing ── */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { key: 'all', label: 'All Organizations' },
            { key: 'mosque', label: `Mosque` },
            { key: 'madrasa', label: `Madrasa` },
            { key: 'foundation', label: `Foundation` },
          ].map(({ key, label }) => (
            counts[key] > 0 && (
              <button
                key={key}
                onClick={() => setFilterType(key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  filterType === key
                    ? 'bg-isl-green text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-isl-green/40 hover:text-isl-green'
                }`}
              >
                {key !== 'all' && <span>{TYPE_ICONS[key]}</span>}
                {label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  filterType === key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>{counts[key]}</span>
              </button>
            )
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white rounded-2xl animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🕌</div>
            <p className="text-gray-600 font-semibold text-lg">No organizations listed yet</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon — more organizations will be added.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((org) => (
              <OrgCard key={org._id} org={org} onDonate={setSelectedOrg} />
            ))}
          </div>
        )}

      </div>

      {/* ── Footer strip ── */}
      <div className="bg-isl-dark text-center py-8 px-4">
        <div className="font-arabic text-isl-gold text-xl mb-1">جَزَاكَ اللَّهُ خَيْرًا</div>
        <p className="text-white/60 text-xs">May Allah reward you with goodness</p>
      </div>

      {/* Payment Modal */}
      {selectedOrg && (
        <PaymentModal org={selectedOrg} onClose={() => setSelectedOrg(null)} />
      )}
    </div>
  );
};

export default SadaqahPage;
