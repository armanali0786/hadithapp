import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiSearch, FiLayers,
  FiCheckSquare, FiSquare, FiChevronDown, FiChevronUp,
} from 'react-icons/fi';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4040';

const emptyForm = {
  title: '',
  description: '',
  isActive: true,
  questions: [],
};

export default function QuizSetManagement() {
  const [sets, setSets] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [qSearch, setQSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');
  const [expandedSet, setExpandedSet] = useState(null);

  const fetchSets = async () => {
    try {
      const res = await axios.get(`${API}/quiz-sets`);
      setSets(res.data?.data?.sets || []);
    } catch {
      setError('Failed to load quiz sets');
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${API}/questions`);
      setAllQuestions(res.data?.data?.questions || []);
    } catch {}
  };

  useEffect(() => {
    fetchSets();
    fetchQuestions();
  }, []);

  const openCreate = () => {
    setForm({ ...emptyForm, questions: [] });
    setEditId(null);
    setQSearch('');
    setError('');
    setShowModal(true);
  };

  const openEdit = (set) => {
    setForm({
      title: set.title,
      description: set.description || '',
      isActive: set.isActive,
      questions: (set.questions || []).map((q) => q._id || q),
    });
    setEditId(set._id);
    setQSearch('');
    setError('');
    setShowModal(true);
  };

  const toggleQuestion = (id) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.includes(id)
        ? prev.questions.filter((q) => q !== id)
        : [...prev.questions, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Title is required'); return; }
    if (form.questions.length === 0) { setError('Select at least one question'); return; }
    setSaving(true);
    setError('');
    try {
      const payload = {
        title: form.title,
        description: form.description,
        isActive: form.isActive,
        questions: form.questions,
      };
      if (editId) {
        await axios.put(`${API}/quiz-sets/${editId}`, payload);
      } else {
        await axios.post(`${API}/quiz-sets`, payload);
      }
      setShowModal(false);
      fetchSets();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/quiz-sets/${id}`);
      setDeleteId(null);
      fetchSets();
    } catch {
      setError('Delete failed');
    }
  };

  const filtered = sets.filter(
    (s) => !search || s.title?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredQuestions = allQuestions.filter(
    (q) => !qSearch || q.question?.toLowerCase().includes(qSearch.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quiz Sets</h1>
          <p className="text-gray-500 text-sm mt-0.5">Group questions into sets for the quiz</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-isl-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-isl-green/90 transition shadow"
        >
          <FiPlus size={16} /> New Set
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search sets..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green bg-white"
        />
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
      )}

      {/* Sets list */}
      <div className="space-y-3">
        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="text-5xl mb-3">📚</div>
            <p className="text-gray-500 font-medium">{sets.length === 0 ? 'No quiz sets yet' : 'No results found'}</p>
            <p className="text-gray-400 text-sm">
              {sets.length === 0 ? 'Click "New Set" to create your first quiz set.' : 'Try a different search.'}
            </p>
          </div>
        ) : (
          filtered.map((set) => (
            <div
              key={set._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-4 p-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <FiLayers size={15} className="text-isl-green flex-shrink-0" />
                    <span className="font-semibold text-gray-800 truncate">{set.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      set.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {set.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {set.description && (
                    <p className="text-gray-500 text-xs mb-1.5 line-clamp-1">{set.description}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    {set.questions?.length || 0} question{set.questions?.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => setExpandedSet(expandedSet === set._id ? null : set._id)}
                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition"
                    title="View questions"
                  >
                    {expandedSet === set._id ? <FiChevronUp size={15} /> : <FiChevronDown size={15} />}
                  </button>
                  <button
                    onClick={() => openEdit(set)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <FiEdit2 size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteId(set._id)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Expanded questions list */}
              {expandedSet === set._id && set.questions?.length > 0 && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Questions in this set</p>
                  <div className="space-y-2">
                    {set.questions.map((q, i) => (
                      <div key={q._id || i} className="flex items-start gap-2">
                        <span className="text-xs text-gray-400 font-mono mt-0.5 w-5 flex-shrink-0">{i + 1}.</span>
                        <p className="text-sm text-gray-700 leading-relaxed">{q.question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {filtered.length > 0 && (
        <div className="mt-3 text-xs text-gray-400 text-center">
          {filtered.length} of {sets.length} sets
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 text-lg">
                {editId ? 'Edit Quiz Set' : 'Create New Quiz Set'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Set Title *</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Ramadan Hadith Set, Week 1 Quiz..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Short description about this set..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green resize-none"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                  <select
                    value={form.isActive ? 'true' : 'false'}
                    onChange={(e) => setForm({ ...form, isActive: e.target.value === 'true' })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green bg-white"
                  >
                    <option value="true">Active (visible to users)</option>
                    <option value="false">Inactive (hidden)</option>
                  </select>
                </div>

                {/* Question selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Select Questions *{' '}
                      <span className="text-isl-green font-bold">{form.questions.length}</span> selected
                    </label>
                    {form.questions.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, questions: [] })}
                        className="text-xs text-red-400 hover:text-red-600"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Question search */}
                  <div className="relative mb-2">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                    <input
                      value={qSearch}
                      onChange={(e) => setQSearch(e.target.value)}
                      placeholder="Filter questions..."
                      className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green bg-gray-50"
                    />
                  </div>

                  <div className="border border-gray-200 rounded-xl max-h-52 overflow-y-auto divide-y divide-gray-100">
                    {filteredQuestions.length === 0 ? (
                      <p className="text-gray-400 text-sm text-center py-6">
                        {allQuestions.length === 0 ? 'No questions available. Add questions first.' : 'No matching questions.'}
                      </p>
                    ) : (
                      filteredQuestions.map((q) => {
                        const selected = form.questions.includes(q._id);
                        return (
                          <button
                            type="button"
                            key={q._id}
                            onClick={() => toggleQuestion(q._id)}
                            className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${
                              selected ? 'bg-isl-green/5' : 'hover:bg-gray-50'
                            }`}
                          >
                            <span className={`mt-0.5 flex-shrink-0 ${selected ? 'text-isl-green' : 'text-gray-300'}`}>
                              {selected ? <FiCheckSquare size={16} /> : <FiSquare size={16} />}
                            </span>
                            <span className="text-sm text-gray-700 leading-relaxed">{q.question}</span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>

              {/* Modal footer */}
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
                  {saving ? 'Saving...' : editId ? 'Update Set' : 'Create Set'}
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
            <h3 className="font-bold text-gray-800 text-lg mb-1">Delete Quiz Set?</h3>
            <p className="text-gray-500 text-sm mb-5">This set will be permanently removed. Questions themselves will not be deleted.</p>
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
