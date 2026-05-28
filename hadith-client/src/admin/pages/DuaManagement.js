import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiStar } from 'react-icons/fi';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';
const getToken = () => localStorage.getItem('token');
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const categoryColors = {
  morning: 'bg-yellow-100 text-yellow-700',
  evening: 'bg-indigo-100 text-indigo-700',
  'after-prayer': 'bg-green-100 text-green-700',
  general: 'bg-gray-100 text-gray-600',
  travel: 'bg-blue-100 text-blue-700',
  eating: 'bg-orange-100 text-orange-700',
  sleeping: 'bg-purple-100 text-purple-700',
  other: 'bg-pink-100 text-pink-700',
};

const defaultForm = {
  title: '',
  arabicTitle: '',
  arabicText: '',
  transliteration: '',
  translations: { english: '', urdu: '' },
  reference: '',
  category: 'general',
  isActive: true,
  order: 0,
};

export default function DuaManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/duas`);
      const data = res.data?.duas || res.data?.data || res.data || [];
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    setForm(defaultForm);
    setError('');
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title || '',
      arabicTitle: item.arabicTitle || '',
      arabicText: item.arabicText || '',
      transliteration: item.transliteration || '',
      translations: {
        english: item.translations?.english || '',
        urdu: item.translations?.urdu || '',
      },
      reference: item.reference || '',
      category: item.category || 'general',
      isActive: item.isActive !== undefined ? item.isActive : true,
      order: item.order || 0,
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleTranslationChange = (lang, value) => {
    setForm(f => ({ ...f, translations: { ...f.translations, [lang]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const headers = { headers: authHeaders() };
      if (editing) {
        await axios.put(`${API}/duas/${editing._id}`, form, headers);
      } else {
        await axios.post(`${API}/duas`, form, headers);
      }
      setShowModal(false);
      fetchItems();
    } catch (e) {
      setError(e.response?.data?.message || 'Error saving');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this dua?')) return;
    try {
      await axios.delete(`${API}/duas/${id}`, { headers: authHeaders() });
      fetchItems();
    } catch (e) {
      alert('Error deleting');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-arabic text-isl-gold text-xl mb-0.5">مجموعة الأدعية</div>
          <h1 className="text-2xl font-bold text-gray-800">Dua Collection</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage Islamic duas and supplications</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-isl-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-isl-green/90 transition shadow"
        >
          <FiPlus size={16} /> Add Dua
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center">
            <FiStar size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No duas yet</p>
            <p className="text-gray-400 text-sm">Click "Add Dua" to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-isl-green text-white">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">#</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Title</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Active</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Order</th>
                  <th className="text-center px-4 py-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item, i) => (
                  <tr key={item._id} className={`hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                    <td className="px-6 py-4 text-sm text-gray-400 font-mono">{i + 1}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-800">{item.title}</div>
                      {item.arabicTitle && (
                        <div className="text-xs text-gray-400 font-arabic mt-0.5">{item.arabicTitle}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${categoryColors[item.category] || categoryColors.general}`}>
                        {item.category || 'general'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.order ?? '—'}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-2 rounded-lg text-isl-gold hover:bg-yellow-50 transition"
                          title="Edit"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                          title="Delete"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-lg">
                {editing ? 'Edit Dua' : 'Add Dua'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title *</label>
                  <input
                    required
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Dua title"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Arabic Title</label>
                  <input
                    name="arabicTitle"
                    value={form.arabicTitle}
                    onChange={handleChange}
                    dir="rtl"
                    placeholder="العنوان بالعربية"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green font-arabic"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Arabic Text *</label>
                <textarea
                  required
                  name="arabicText"
                  value={form.arabicText}
                  onChange={handleChange}
                  dir="rtl"
                  rows={3}
                  placeholder="النص العربي..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green font-arabic resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Transliteration</label>
                <textarea
                  name="transliteration"
                  value={form.transliteration}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Transliteration..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">English Translation</label>
                <textarea
                  value={form.translations.english}
                  onChange={(e) => handleTranslationChange('english', e.target.value)}
                  rows={2}
                  placeholder="English translation..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Urdu Translation</label>
                <textarea
                  value={form.translations.urdu}
                  onChange={(e) => handleTranslationChange('urdu', e.target.value)}
                  dir="rtl"
                  rows={2}
                  placeholder="اردو ترجمہ..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Reference</label>
                  <input
                    name="reference"
                    value={form.reference}
                    onChange={handleChange}
                    placeholder="e.g. Bukhari 6406"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                  >
                    <option value="morning">Morning</option>
                    <option value="evening">Evening</option>
                    <option value="after-prayer">After Prayer</option>
                    <option value="general">General</option>
                    <option value="travel">Travel</option>
                    <option value="eating">Eating</option>
                    <option value="sleeping">Sleeping</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Order</label>
                  <input
                    type="number"
                    name="order"
                    value={form.order}
                    onChange={handleChange}
                    min={0}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    className="w-4 h-4 rounded accent-isl-green"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>

              {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-isl-green text-white rounded-lg text-sm font-semibold hover:bg-isl-green/90 disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
