import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiMusic } from 'react-icons/fi';

const API = 'http://localhost:4040';
const getToken = () => localStorage.getItem('token');
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const defaultForm = {
  title: '',
  arabicTitle: '',
  reciterName: '',
  duration: '',
  description: '',
  isFeatured: false,
  isActive: true,
};

export default function AudioManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [audioFile, setAudioFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/audio-hadiths`);
      const data = res.data?.audioHadiths || res.data?.data || res.data || [];
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    setForm(defaultForm);
    setAudioFile(null);
    setError('');
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title || '',
      arabicTitle: item.arabicTitle || '',
      reciterName: item.reciterName || '',
      duration: item.duration || '',
      description: item.description || '',
      isFeatured: item.isFeatured || false,
      isActive: item.isActive !== undefined ? item.isActive : true,
    });
    setAudioFile(null);
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
        if (form[k] !== undefined && form[k] !== null) fd.append(k, form[k]);
      });
      if (audioFile) fd.append('audio', audioFile);

      if (editing) {
        await axios.put(`${API}/audio-hadiths/${editing._id}`, fd, {
          headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post(`${API}/audio-hadiths`, fd, {
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
    if (!window.confirm('Delete this audio hadith?')) return;
    try {
      await axios.delete(`${API}/audio-hadiths/${id}`, { headers: authHeaders() });
      fetchItems();
    } catch (e) {
      alert('Error deleting');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-arabic text-isl-gold text-xl mb-0.5">الأحاديث الصوتية</div>
          <h1 className="text-2xl font-bold text-gray-800">Audio Hadiths</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage audio recitations of hadiths</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-isl-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-isl-green/90 transition shadow"
        >
          <FiPlus size={16} /> Add Audio
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center">
            <FiMusic size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No audio hadiths yet</p>
            <p className="text-gray-400 text-sm">Click "Add Audio" to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-isl-green text-white">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">#</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Title</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Reciter</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Duration</th>
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
                      <div className="text-sm font-semibold text-gray-800">{item.title}</div>
                      {item.arabicTitle && (
                        <div className="text-xs text-gray-400 font-arabic mt-0.5">{item.arabicTitle}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.reciterName || '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.duration || '—'}</td>
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
                {editing ? 'Edit Audio Hadith' : 'Add Audio Hadith'}
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
                    placeholder="Hadith title"
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
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Reciter Name *</label>
                  <input
                    required
                    name="reciterName"
                    value={form.reciterName}
                    onChange={handleChange}
                    placeholder="Sheikh name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Duration</label>
                  <input
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g. 3:45"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Brief description..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Audio File {editing ? '(leave empty to keep existing)' : ''}
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0] || null)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-isl-green/10 file:text-isl-green"
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
