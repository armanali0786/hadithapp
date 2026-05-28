import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload, FiSearch } from 'react-icons/fi';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';

const emptyForm = {
  HadithTitle: '', HadithName: '', HadithDescription: '', hadithTypeId: '', image: null,
};

export default function HadithManagement() {
  const [hadiths, setHadiths] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const [h, c] = await Promise.all([
        axios.get(`${API}/hadith-list`),
        axios.get(`${API}/hadith-type`),
      ]);
      setHadiths(h.data?.data?.hadithlist || []);
      setCollections(c.data?.hadithType || []);
    } catch {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setImagePreview(null);
    setEditId(null);
    setError('');
    setShowModal(true);
  };

  const openEdit = (h) => {
    setForm({
      HadithTitle: h.HadithTitle || '',
      HadithName: h.HadithName || '',
      HadithDescription: h.HadithDescription || '',
      hadithTypeId: h.hadithTypeId?._id || h.hadithTypeId || '',
      image: null,
    });
    setImagePreview(h.HadithImage ? `${API}/uploads/${h.HadithImage}` : null);
    setEditId(h._id);
    setError('');
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((f) => ({ ...f, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const data = new FormData();
      data.append('HadithTitle', form.HadithTitle);
      data.append('HadithName', form.HadithName);
      data.append('HadithDescription', form.HadithDescription);
      data.append('hadithTypeId', form.hadithTypeId);
      if (form.image) data.append('HadithImage', form.image);

      if (editId) {
        await axios.put(`${API}/hadith-list/${editId}`, data);
      } else {
        await axios.post(`${API}/hadith-list`, data);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/hadith-list/${id}`);
      setDeleteId(null);
      fetchData();
    } catch {
      setError('Delete failed');
    }
  };

  const getCollectionName = (id) => {
    const c = collections.find((x) => x._id === (id?._id || id));
    return c?.hadithtype || '—';
  };

  const filtered = hadiths.filter((h) => {
    const matchSearch = !search ||
      h.HadithTitle?.toLowerCase().includes(search.toLowerCase()) ||
      h.HadithName?.toLowerCase().includes(search.toLowerCase());
    const matchType = !filterType || (h.hadithTypeId?._id || h.hadithTypeId) === filterType;
    return matchSearch && matchType;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hadith List</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage hadith articles — create, edit, and delete entries</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-isl-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-isl-green/90 transition shadow"
        >
          <FiPlus size={16} /> Add Hadith
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or name..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green bg-white"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green min-w-[180px]"
        >
          <option value="">All Collections</option>
          {collections.map((c) => (
            <option key={c._id} value={c._id}>{c.hadithtype}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-3">📖</div>
            <p className="text-gray-500 font-medium">{hadiths.length === 0 ? 'No hadiths yet' : 'No results found'}</p>
            <p className="text-gray-400 text-sm">
              {hadiths.length === 0 ? 'Click "Add Hadith" to get started.' : 'Try adjusting your search or filter.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Image</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Title</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 hidden lg:table-cell">Name</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 hidden md:table-cell">Collection</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 hidden xl:table-cell">Description</th>
                  <th className="text-center px-4 py-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((h) => (
                  <tr key={h._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {h.HadithImage ? (
                        <img
                          src={`${API}/uploads/${h.HadithImage}`}
                          alt={h.HadithTitle}
                          className="w-16 h-10 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">
                          No img
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800 max-w-[200px] truncate">{h.HadithTitle}</td>
                    <td className="px-6 py-4 text-gray-500 max-w-[140px] truncate hidden lg:table-cell">{h.HadithName || '—'}</td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="bg-isl-green/10 text-isl-green text-xs font-semibold px-2.5 py-1 rounded-lg">
                        {getCollectionName(h.hadithTypeId)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs max-w-[220px] truncate hidden xl:table-cell">
                      {h.HadithDescription?.replace(/<[^>]*>/g, '').slice(0, 80)}...
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(h)}
                          className="p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(h._id)}
                          className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
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
        {filtered.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
            Showing {filtered.length} of {hadiths.length} hadiths
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-bold text-gray-800 text-lg">
                {editId ? 'Edit Hadith' : 'Add New Hadith'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hadith Image</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-4 cursor-pointer hover:border-isl-green hover:bg-isl-green/5 transition">
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-44 object-cover rounded-lg" />
                  ) : (
                    <div className="text-center py-4">
                      <FiUpload className="mx-auto text-gray-400 mb-2" size={24} />
                      <p className="text-sm text-gray-500">Click to upload image</p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG, AVIF</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => { setImagePreview(null); setForm((f) => ({ ...f, image: null })); }}
                    className="mt-2 text-xs text-red-500 hover:text-red-700"
                  >
                    Remove image
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Hadith Title *</label>
                  <input
                    required
                    value={form.HadithTitle}
                    onChange={(e) => setForm({ ...form, HadithTitle: e.target.value })}
                    placeholder="Article title..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Hadith Name</label>
                  <input
                    value={form.HadithName}
                    onChange={(e) => setForm({ ...form, HadithName: e.target.value })}
                    placeholder="Short identifier name..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Collection *</label>
                <select
                  required
                  value={form.hadithTypeId}
                  onChange={(e) => setForm({ ...form, hadithTypeId: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green bg-white"
                >
                  <option value="">Select a collection...</option>
                  {collections.map((c) => (
                    <option key={c._id} value={c._id}>{c.hadithtype}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
                <textarea
                  required
                  rows={5}
                  value={form.HadithDescription}
                  onChange={(e) => setForm({ ...form, HadithDescription: e.target.value })}
                  placeholder="Full hadith content and description..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green resize-none"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3 pt-2">
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
                  {saving ? 'Saving...' : editId ? 'Update Hadith' : 'Create Hadith'}
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
            <h3 className="font-bold text-gray-800 text-lg mb-1">Delete Hadith?</h3>
            <p className="text-gray-500 text-sm mb-5">This will permanently remove this hadith article.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
