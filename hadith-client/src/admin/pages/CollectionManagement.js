import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';

export default function CollectionManagement() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [typeName, setTypeName] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  const fetchCollections = async () => {
    try {
      const res = await axios.get(`${API}/hadith-type`);
      setCollections(res.data?.hadithType || []);
    } catch {
      setError('Failed to load collections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCollections(); }, []);

  const openCreate = () => {
    setTypeName('');
    setEditItem(null);
    setError('');
    setShowModal(true);
  };

  const openEdit = (item) => {
    setTypeName(item.hadithtype);
    setEditItem(item);
    setError('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editItem) {
        await axios.put(`${API}/hadith-type/${editItem._id}`, { hadithtype: typeName });
      } else {
        await axios.post(`${API}/hadith-type`, { hadithtype: typeName });
      }
      setShowModal(false);
      fetchCollections();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/hadith-type/${id}`);
      setDeleteId(null);
      fetchCollections();
    } catch {
      setError('Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Collections</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage hadith categories shown in the Ultimate Collection filter</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-isl-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-isl-green/90 transition shadow"
        >
          <FiPlus size={16} /> Add Collection
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : collections.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-3">📚</div>
            <p className="text-gray-500 font-medium">No collections yet</p>
            <p className="text-gray-400 text-sm">Click "Add Collection" to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">#</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600">Collection Name</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-600 hidden sm:table-cell">Created</th>
                  <th className="text-center px-4 py-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {collections.map((c, i) => (
                  <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">{i + 1}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-isl-green/10 text-isl-green font-semibold px-3 py-1 rounded-lg text-sm">
                        {c.hadithtype}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs hidden sm:table-cell">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(c)}
                          className="p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(c._id)}
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
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-lg">
                {editItem ? 'Edit Collection' : 'Add New Collection'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Collection Name *</label>
                <input
                  required
                  value={typeName}
                  onChange={(e) => setTypeName(e.target.value)}
                  placeholder="e.g. Sahih Bukhari, Sahih Muslim..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex gap-3 pt-1">
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
                  {saving ? 'Saving...' : editItem ? 'Update' : 'Create'}
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
            <h3 className="font-bold text-gray-800 text-lg mb-1">Delete Collection?</h3>
            <p className="text-gray-500 text-sm mb-5">All hadiths in this collection will lose their category association.</p>
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
