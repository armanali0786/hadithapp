import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSearch, FiCheck } from 'react-icons/fi';

const API = 'http://localhost:4040';

const emptyChoice = { id: Date.now(), text: '' };

const emptyForm = {
  question: '',
  type: 'single',
  correctAnswer: '',
  choices: [
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
    { id: 4, text: '' },
  ],
};

export default function QuizManagement() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${API}/questions`);
      setQuestions(res.data?.data?.questions || []);
    } catch {
      setError('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuestions(); }, []);

  const openCreate = () => {
    setForm({ ...emptyForm, choices: emptyForm.choices.map((c) => ({ ...c })) });
    setEditId(null);
    setError('');
    setShowModal(true);
  };

  const openEdit = (q) => {
    setForm({
      question: q.question,
      type: q.type || 'single',
      correctAnswer: q.correctAnswer,
      choices: q.choices?.length ? q.choices.map((c) => ({ id: c.id, text: c.text })) : emptyForm.choices,
    });
    setEditId(q._id);
    setError('');
    setShowModal(true);
  };

  const updateChoice = (idx, text) => {
    const choices = [...form.choices];
    choices[idx] = { ...choices[idx], text };
    setForm({ ...form, choices });
  };

  const addChoice = () => {
    setForm({
      ...form,
      choices: [...form.choices, { id: Date.now(), text: '' }],
    });
  };

  const removeChoice = (idx) => {
    const choices = form.choices.filter((_, i) => i !== idx);
    setForm({ ...form, choices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.choices.some((c) => !c.text.trim())) {
      setError('All answer choices must have text');
      return;
    }
    if (!form.correctAnswer.trim()) {
      setError('Correct answer is required');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        question: form.question,
        type: form.type,
        correctAnswer: form.correctAnswer,
        choices: form.choices.map((c, i) => ({ id: i + 1, text: c.text })),
      };
      if (editId) {
        await axios.patch(`${API}/questions/${editId}`, payload);
      } else {
        await axios.post(`${API}/questions`, payload);
      }
      setShowModal(false);
      fetchQuestions();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/questions/${id}`);
      setDeleteId(null);
      fetchQuestions();
    } catch {
      setError('Delete failed');
    }
  };

  const filtered = questions.filter(
    (q) => !search || q.question?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quiz Questions</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage questions displayed in the Hadith Quiz</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-isl-green text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-isl-green/90 transition shadow"
        >
          <FiPlus size={16} /> Add Question
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green bg-white"
        />
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
      )}

      {/* Questions list */}
      <div className="space-y-3">
        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="text-5xl mb-3">❓</div>
            <p className="text-gray-500 font-medium">{questions.length === 0 ? 'No questions yet' : 'No results found'}</p>
            <p className="text-gray-400 text-sm">
              {questions.length === 0 ? 'Click "Add Question" to create your first quiz question.' : 'Try a different search.'}
            </p>
          </div>
        ) : (
          filtered.map((q, i) => (
            <div
              key={q._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">Q{i + 1}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                      q.type === 'multiple' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {q.type === 'multiple' ? 'Multiple Choice' : 'Single Choice'}
                    </span>
                  </div>
                  <p className="text-gray-800 font-medium text-sm leading-relaxed mb-3">{q.question}</p>

                  {/* Choices */}
                  {q.choices?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {q.choices.map((c) => {
                        const isCorrect = c.text === q.correctAnswer || String(c.id) === q.correctAnswer;
                        return (
                          <div
                            key={c.id}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${
                              isCorrect
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-gray-50 text-gray-600'
                            }`}
                          >
                            {isCorrect && <FiCheck size={11} className="flex-shrink-0" />}
                            <span>{c.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-3 text-xs text-gray-400">
                    Correct answer: <span className="text-green-600 font-medium">{q.correctAnswer}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(q)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <FiEdit2 size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteId(q._id)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {filtered.length > 0 && (
        <div className="mt-3 text-xs text-gray-400 text-center">
          {filtered.length} of {questions.length} questions
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-bold text-gray-800 text-lg">
                {editId ? 'Edit Question' : 'Add New Question'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Question *</label>
                <textarea
                  required
                  rows={3}
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  placeholder="Enter the question text..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Question Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green bg-white"
                >
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                </select>
              </div>

              {/* Choices */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Answer Choices *</label>
                  <button
                    type="button"
                    onClick={addChoice}
                    className="text-xs text-isl-green font-medium hover:underline flex items-center gap-1"
                  >
                    <FiPlus size={12} /> Add Choice
                  </button>
                </div>
                <div className="space-y-2">
                  {form.choices.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-mono w-5 text-center">{idx + 1}.</span>
                      <input
                        value={c.text}
                        onChange={(e) => updateChoice(idx, e.target.value)}
                        placeholder={`Choice ${idx + 1}...`}
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                      />
                      {form.choices.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeChoice(idx)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition"
                        >
                          <FiX size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Correct Answer *</label>
                <input
                  required
                  value={form.correctAnswer}
                  onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
                  placeholder="Must match exact text of the correct choice..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isl-green/30 focus:border-isl-green"
                />
                <p className="mt-1 text-xs text-gray-400">Enter the exact text of the correct choice</p>
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
                  {saving ? 'Saving...' : editId ? 'Update Question' : 'Create Question'}
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
            <h3 className="font-bold text-gray-800 text-lg mb-1">Delete Question?</h3>
            <p className="text-gray-500 text-sm mb-5">This question will be permanently removed from the quiz.</p>
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
