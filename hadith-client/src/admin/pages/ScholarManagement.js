import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUser } from 'react-icons/fi';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';
const getToken = () => localStorage.getItem('token');
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const defaultForm = {
  scholarName: '',
  scholarTitle: '',
  recommendationText: '',
  arabicQuote: '',
  isFeatured: false,
  isActive: true,
  order: 0,
};

export default function ScholarManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/scholars`);
      const data = res.data?.scholars || res.data?.data || res.data || [];
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    setForm(defaultForm);
    setImageFile(null);
    setError('');
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      scholarName: item.scholarName || '',
      scholarTitle: item.scholarTitle || '',
      recommendationText: item.recommendationText || '',
      arabicQuote: item.arabicQuote || '',
      isFeatured: item.isFeatured || false,
      isActive: item.isActive !== undefined ? item.isActive : true,
      order: item.order || 0,
    });
    setImageFile(null);
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
      const fd = new FormData();
      Object.keys(form).forEach(k => {
        if (form[k] !== undefined && form[k] !== null && form[k] !== '') fd.append(k, form[k]);
      });
      if (imageFile) fd.append('scholarImage', imageFile);

      if (editing) {
        await axios.put(`${API}/scholars/${editing._id}`, fd, {
          headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post(`${API}/scholars`, fd, {
          headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' },
        });
      }
      setShowModal(false);
      fetchItems();
    } catch (e) {
      setError(e.response?.data?.message || 'Error saving');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this scholar?')) return;
    try {
      await axios.delete(`${API}/scholars/${id}`, { headers: authHeaders() });
      fetchItems();
    } catch (e) {
      alert('Error deleting');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-arabic text-isl-gold text-xl mb-0.5">العلماء</div>
          <h1 className="text-2xl font-bold text-gray-800">Scholars</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage scholar recommendations and endorsements</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-isl-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-isl-green/90 transition shadow"
        >
          <FiPlus size={16} /> Add Scholar
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center">
            <FiUser size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No scholars yet</p>
            <p className="text-gray-400 text-sm">Click "Add Scholar" to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-isl-green text-white">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">#</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Scholar</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Title</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Featured</th>
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
                      <div className="flex items-center gap-3">
                        {item.scholarImage ? (
                          <img
                            src={item.scholarImage}
                            alt={item.scholarName}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-isl-green/10 flex items-center justify-center flex-shrink-0">
                            <FiUser size={14} className="text-isl-green" />
                          </div>
                        )}
                        <span className="text-sm font-semibold text-gray-800">{item.scholarName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.scholarTitle || '—'}</td>
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
                {editing ? 'Edit Scholar' : 'Add Scholar'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Scholar Name *</label>
                  <input
                    required
                    name="scholarName"
                    value={form.scholarName}
                    onChange={handleChange}
                    placeholder="Sheikh / Dr. ..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Scholar Title</label>
                  <input
                    name="scholarTitle"
                    value={form.scholarTitle}
                    onChange={handleChange}
                    placeholder="e.g. Islamic Scholar, Egypt"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Recommendation Text *</label>
                <textarea
                  required
                  name="recommendationText"
                  value={form.recommendationText}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Scholar's recommendation..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Arabic Quote (optional)</label>
                <textarea
                  name="arabicQuote"
                  value={form.arabicQuote}
                  onChange={handleChange}
                  dir="rtl"
                  rows={3}
                  placeholder="اقتباس عربي..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green font-arabic resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Scholar Image {editing ? '(leave empty to keep existing)' : '(optional)'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0] || null)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-isl-green/10 file:text-isl-green"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Order</label>
                <input
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={handleChange}
                  min={0}
                  className="w-28 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                />
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
