import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiSearch,
  FiMapPin, FiStar, FiUpload,
} from 'react-icons/fi';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';

const TYPE_LABELS = { mosque: 'Mosque', madrasa: 'Madrasa', foundation: 'Foundation' };
const TYPE_COLORS = {
  mosque: 'bg-green-100 text-green-700',
  madrasa: 'bg-blue-100 text-blue-700',
  foundation: 'bg-purple-100 text-purple-700',
};

const emptyForm = {
  name: '',
  type: 'mosque',
  description: '',
  location: '',
  upiId: '',
  accountHolder: '',
  accountNumber: '',
  ifscCode: '',
  bankName: '',
  isActive: true,
  featured: false,
  qrImage: null,
};

export default function OrganizationManagement() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const fileRef = useRef();

  const fetchOrgs = async () => {
    try {
      const res = await axios.get(`${API}/organizations`);
      setOrgs(res.data?.data?.organizations || []);
    } catch {
      setError('Failed to load organizations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrgs(); }, []);

  const openCreate = () => {
    setForm({ ...emptyForm });
    setPreviewUrl(null);
    setEditId(null);
    setError('');
    setShowModal(true);
  };

  const openEdit = (org) => {
    setForm({
      name: org.name,
      type: org.type,
      description: org.description || '',
      location: org.location || '',
      upiId: org.upiId || '',
      accountHolder: org.accountHolder || '',
      accountNumber: org.accountNumber || '',
      ifscCode: org.ifscCode || '',
      bankName: org.bankName || '',
      isActive: org.isActive,
      featured: org.featured,
      qrImage: null,
    });
    setPreviewUrl(org.qrImage ? `${API}/uploads/${org.qrImage}` : null);
    setEditId(org._id);
    setError('');
    setShowModal(true);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, qrImage: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Organization name is required'); return; }
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'qrImage' && v) fd.append('qrImage', v);
        else if (k !== 'qrImage') fd.append(k, v);
      });
      if (editId) {
        await axios.put(`${API}/organizations/${editId}`, fd);
      } else {
        await axios.post(`${API}/organizations`, fd);
      }
      setShowModal(false);
      fetchOrgs();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/organizations/${id}`);
      setDeleteId(null);
      fetchOrgs();
    } catch {
      setError('Delete failed');
    }
  };

  const filtered = orgs.filter((o) => {
    const matchType = filterType === 'all' || o.type === filterType;
    const matchSearch = !search || o.name?.toLowerCase().includes(search.toLowerCase()) || o.location?.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const field = (label, key, placeholder, type = 'text') => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
      />
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sadaqah Organizations</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage mosques, madarsas, and foundations listed for donations</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-isl-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-isl-green/90 transition shadow"
        >
          <FiPlus size={16} /> Add Organization
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or location..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green bg-white"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'mosque', 'madrasa', 'foundation'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition ${
                filterType === t
                  ? 'bg-isl-green text-white shadow'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-isl-green/40'
              }`}
            >
              {t === 'all' ? 'All' : TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
      )}

      {/* Organization cards */}
      {loading ? (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <div className="text-5xl mb-3">🕌</div>
          <p className="text-gray-500 font-medium">{orgs.length === 0 ? 'No organizations yet' : 'No results found'}</p>
          <p className="text-gray-400 text-sm">
            {orgs.length === 0 ? 'Click "Add Organization" to list your first mosque, madrasa, or foundation.' : 'Try a different filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((org) => (
            <div
              key={org._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow relative"
            >
              {org.featured && (
                <span className="absolute top-3 right-3 flex items-center gap-1 text-xs text-isl-gold font-semibold">
                  <FiStar size={12} className="fill-isl-gold" /> Featured
                </span>
              )}
              <div className="flex items-start gap-3 mb-3">
                {org.qrImage ? (
                  <img
                    src={`${API}/uploads/${org.qrImage}`}
                    alt="QR"
                    className="w-12 h-12 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-isl-green/10 flex items-center justify-center flex-shrink-0 text-xl">
                    {org.type === 'mosque' ? '🕌' : org.type === 'madrasa' ? '📚' : '🤲'}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{org.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLORS[org.type]}`}>
                    {TYPE_LABELS[org.type]}
                  </span>
                </div>
              </div>

              {org.location && (
                <p className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                  <FiMapPin size={11} /> {org.location}
                </p>
              )}
              {org.description && (
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{org.description}</p>
              )}

              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  org.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {org.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(org)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <FiEdit2 size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteId(org._id)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="mt-3 text-xs text-gray-400 text-center">
          {filtered.length} of {orgs.length} organizations
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-lg">
                {editId ? 'Edit Organization' : 'Add Organization'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto flex-1">

                {/* Name + Type row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    {field('Organization Name *', 'name', 'e.g. Al-Noor Masjid...')}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type *</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green bg-white"
                    >
                      <option value="mosque">Mosque</option>
                      <option value="madrasa">Madrasa</option>
                      <option value="foundation">Foundation</option>
                    </select>
                  </div>
                </div>

                {field('Location', 'location', 'e.g. Mumbai, Maharashtra')}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief about this organization..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green resize-none"
                  />
                </div>

                {/* Payment details */}
                <div className="border-t border-dashed border-gray-200 pt-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Payment Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {field('UPI ID', 'upiId', 'e.g. masjid@upi')}
                    {field('Account Holder', 'accountHolder', 'Full name on account')}
                    {field('Account Number', 'accountNumber', 'Bank account number')}
                    {field('IFSC Code', 'ifscCode', 'e.g. SBIN0001234')}
                    {field('Bank Name', 'bankName', 'e.g. State Bank of India')}
                  </div>
                </div>

                {/* QR Code Upload */}
                <div className="border-t border-dashed border-gray-200 pt-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">QR Code Image</p>
                  <div className="flex items-center gap-4">
                    {previewUrl ? (
                      <div className="relative">
                        <img src={previewUrl} alt="QR Preview" className="w-24 h-24 rounded-xl object-cover border-2 border-isl-green/30" />
                        <button
                          type="button"
                          onClick={() => { setPreviewUrl(null); setForm((p) => ({ ...p, qrImage: null })); }}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                        >
                          <FiX size={10} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileRef.current?.click()}
                        className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-isl-green/40 hover:text-isl-green transition"
                      >
                        <FiUpload size={20} />
                        <span className="text-xs mt-1">Upload QR</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="text-sm text-isl-green font-medium hover:underline flex items-center gap-1.5"
                      >
                        <FiUpload size={14} /> {previewUrl ? 'Change QR image' : 'Upload QR code'}
                      </button>
                      <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, WEBP. Shown in donation modal.</p>
                      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                    </div>
                  </div>
                </div>

                {/* Flags */}
                <div className="flex gap-6 border-t border-dashed border-gray-200 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                      className="w-4 h-4 accent-isl-green"
                    />
                    <span className="text-sm text-gray-700 font-medium">Active (visible on donation page)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="w-4 h-4 accent-isl-gold"
                    />
                    <span className="text-sm text-gray-700 font-medium">Featured (shown first)</span>
                  </label>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-gray-100 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 bg-isl-green text-white rounded-xl text-sm font-semibold hover:bg-isl-green/90 transition disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editId ? 'Update' : 'Add Organization'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="font-bold text-gray-800 text-lg mb-1">Remove Organization?</h3>
            <p className="text-gray-500 text-sm mb-5">This organization will be removed from the donation page.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
