import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiMessageSquare } from 'react-icons/fi';

const API = 'http://localhost:4040';
const getToken = () => localStorage.getItem('token');
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const categoryColors = {
  general: 'bg-gray-100 text-gray-600',
  morning: 'bg-yellow-100 text-yellow-700',
  evening: 'bg-indigo-100 text-indigo-700',
  friday: 'bg-green-100 text-green-700',
  ramadan: 'bg-emerald-100 text-emerald-700',
};

const defaultForm = {
  arabicText: '',
  translationText: '',
  author: '',
  authorTitle: '',
  category: 'general',
  isFeatured: false,
  isActive: true,
};

export default function QuoteManagement() {
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
      const res = await axios.get(`${API}/islamic-quotes`);
      const data = res.data?.quotes || res.data?.data || res.data || [];
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
      arabicText: item.arabicText || '',
      translationText: item.translationText || '',
      author: item.author || '',
      authorTitle: item.authorTitle || '',
      category: item.category || 'general',
      isFeatured: item.isFeatured || false,
      isActive: item.isActive !== undefined ? item.isActive : true,
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const headers = { headers: authHeaders() };
      if (editing) {
        await axios.put(`${API}/islamic-quotes/${editing._id}`, form, headers);
      } else {
        await axios.post(`${API}/islamic-quotes`, form, headers);
      }
      setShowModal(false);
      fetchItems();
    } catch (e) {
      setError(e.response?.data?.message || 'Error saving');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this quote?')) return;
    try {
      await axios.delete(`${API}/islamic-quotes/${id}`, { headers: authHeaders() });
      fetchItems();
    } catch (e) {
      alert('Error deleting');
    }
  };

  const truncate = (text, len = 40) =>
    text && text.length > len ? text.substring(0, len) + '...' : text || '—';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-arabic text-isl-gold text-xl mb-0.5">الاقتباسات الإسلامية</div>
          <h1 className="text-2xl font-bold text-gray-800">Islamic Quotes</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage inspirational Islamic quotes</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-isl-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-isl-green/90 transition shadow"
        >
          <FiPlus size={16} /> Add Quote
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center">
            <FiMessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No quotes yet</p>
            <p className="text-gray-400 text-sm">Click "Add Quote" to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-isl-green text-white">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">#</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Arabic Text</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Author</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Featured</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Active</th>
                  <th className="text-center px-4 py-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item, i) => (
                  <tr key={item._id} className={`hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                    <td className="px-6 py-4 text-sm text-gray-400 font-mono">{i + 1}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-arabic text-gray-800 text-right" dir="rtl">
                        {truncate(item.arabicText, 40)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-800">{item.author || '—'}</div>
                      {item.authorTitle && (
                        <div className="text-xs text-gray-400">{item.authorTitle}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${categoryColors[item.category] || categoryColors.general}`}>
                        {item.category || 'general'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${item.isFeatured ? 'bg-isl-gold/20 text-yellow-700' : 'bg-gray-100 text-gray-400'}`}>
                        {item.isFeatured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
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
                {editing ? 'Edit Quote' : 'Add Islamic Quote'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Translation *</label>
                <textarea
                  required
                  name="translationText"
                  value={form.translationText}
                  onChange={handleChange}
                  rows={3}
                  placeholder="English translation..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Author *</label>
                  <input
                    required
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Author name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Author Title</label>
                  <input
                    name="authorTitle"
                    value={form.authorTitle}
                    onChange={handleChange}
                    placeholder="e.g. Islamic Scholar"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                >
                  <option value="general">General</option>
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                  <option value="friday">Friday</option>
                  <option value="ramadan">Ramadan</option>
                </select>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={form.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded accent-isl-green"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
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
