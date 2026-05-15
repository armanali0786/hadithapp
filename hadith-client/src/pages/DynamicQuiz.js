import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  FaTrophy, FaExclamationTriangle, FaRedo,
} from 'react-icons/fa';
import { FiArrowRight, FiCheckCircle, FiXCircle, FiLayers, FiUsers } from 'react-icons/fi';

const API = 'http://localhost:4040';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const medal = (rank) => {
  if (rank === 1) return { icon: '🥇', color: 'text-yellow-500' };
  if (rank === 2) return { icon: '🥈', color: 'text-gray-400' };
  if (rank === 3) return { icon: '🥉', color: 'text-amber-600' };
  return { icon: `#${rank}`, color: 'text-gray-500' };
};

// ─── Leaderboard ──────────────────────────────────────────────────────────────

function Leaderboard({ setId }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = setId
      ? `${API}/quiz-results/leaderboard?setId=${setId}`
      : `${API}/quiz-results/leaderboard`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => setEntries(d?.data?.leaderboard || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [setId]);

  if (loading) return null;

  if (entries.length === 0)
    return (
      <div className="bg-white rounded-2xl border border-isl-gold/20 p-5 text-center text-gray-400 text-sm">
        <FiUsers className="mx-auto mb-2 text-2xl" />
        No scores recorded yet — be the first!
      </div>
    );

  return (
    <div className="bg-white rounded-2xl border border-isl-gold/20 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 bg-gradient-to-r from-isl-green to-isl-green/80">
        <FaTrophy className="text-isl-gold text-xl" />
        <h3 className="text-white font-bold text-sm tracking-wide uppercase">
          {setId ? 'Set Leaderboard' : 'Overall Leaderboard'} — Top 10
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {entries.map((e, i) => {
          const m = medal(i + 1);
          return (
            <div
              key={e._id}
              className={`flex items-center gap-3 px-5 py-3 ${i === 0 ? 'bg-yellow-50/60' : ''}`}
            >
              <span className={`text-lg w-8 text-center font-bold flex-shrink-0 ${m.color}`}>
                {m.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{e.userName}</p>
                <p className="text-xs text-gray-400">{e.attempts} attempt{e.attempts !== 1 ? 's' : ''}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-base font-bold ${
                  e.bestPercentage >= 80 ? 'text-green-600'
                  : e.bestPercentage >= 50 ? 'text-yellow-600'
                  : 'text-red-500'
                }`}>{e.bestPercentage}%</p>
                <p className="text-xs text-gray-400">best</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Set selector ─────────────────────────────────────────────────────────────

function SetSelector({ onSelect }) {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/quiz-sets`)
      .then((r) => r.json())
      .then((d) => {
        const active = (d?.data?.sets || []).filter((s) => s.isActive);
        setSets(active);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-white rounded-2xl animate-pulse border border-gray-100" />
        ))}
      </div>
    );

  if (sets.length === 0)
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
        <div className="text-5xl mb-3">📭</div>
        <p className="text-gray-600 font-medium">No quiz sets available yet</p>
        <p className="text-gray-400 text-sm mt-1">Check back later or ask your admin to create a set.</p>
      </div>
    );

  return (
    <div className="space-y-3">
      {sets.map((set) => (
        <button
          key={set._id}
          onClick={() => onSelect(set)}
          className="w-full text-left bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-isl-green/40 hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <FiLayers size={16} className="text-isl-green flex-shrink-0" />
                <h3 className="font-semibold text-gray-800 group-hover:text-isl-green transition-colors">
                  {set.title}
                </h3>
              </div>
              {set.description && (
                <p className="text-gray-500 text-sm line-clamp-1">{set.description}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {set.questions?.length || 0} question{set.questions?.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-isl-green/10 flex items-center justify-center group-hover:bg-isl-green group-hover:text-white text-isl-green transition-all duration-200">
              <FiArrowRight size={16} />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Quiz runner ──────────────────────────────────────────────────────────────

function QuizRunner({ set, onBack, onFinish }) {
  const { user, getToken } = useAuth();
  const [selected, setSelected] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const questions = set.questions || [];

  const handleSelect = (qId, choiceText, type) => {
    if (submitted) return;
    setSelected((prev) => {
      if (type === 'single') return { ...prev, [qId]: [choiceText] };
      const cur = prev[qId] || [];
      return {
        ...prev,
        [qId]: cur.includes(choiceText)
          ? cur.filter((c) => c !== choiceText)
          : [...cur, choiceText],
      };
    });
    setErrors((prev) => ({ ...prev, [qId]: false }));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    let allAnswered = true;
    questions.forEach((q) => {
      if (!selected[q._id] || selected[q._id].length === 0) {
        newErrors[q._id] = true;
        allAnswered = false;
      }
    });
    if (!allAnswered) { setErrors(newErrors); return; }

    let correct = 0;
    questions.forEach((q) => {
      const picks = selected[q._id] || [];
      if (picks.length === 1 && picks[0] === q.correctAnswer) correct++;
    });

    const total = questions.length;
    const pct = Math.round((correct / total) * 100);
    setResult({ score: correct, total, pct });
    setSubmitted(true);

    if (user) {
      try {
        await fetch(`${API}/quiz-results`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            setId: set._id,
            setTitle: set.title,
            score: correct,
            totalQuestions: total,
          }),
        });
      } catch {}
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-isl-gold/20">
      {/* Set header bar */}
      <div className="bg-isl-green px-6 md:px-10 py-5 flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white text-sm underline underline-offset-2 transition"
        >
          ← Sets
        </button>
        <div className="h-4 w-px bg-white/20" />
        <div className="flex-1 min-w-0">
          <p className="text-isl-gold text-xs font-semibold uppercase tracking-widest">Quiz</p>
          <h2 className="text-white font-bold text-base leading-tight truncate">{set.title}</h2>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-white/60 text-xs">Questions</p>
          <p className="text-white font-bold">{questions.length}</p>
        </div>
      </div>

      {/* Questions */}
      <div className="p-6 md:p-10 space-y-10">
        {questions.map((q, qi) => (
          <div key={q._id}>
            <div className="flex items-start gap-3 mb-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-isl-green text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {qi + 1}
              </span>
              <p className="text-gray-800 font-medium text-base leading-relaxed">{q.question}</p>
            </div>

            <div className="ml-10 space-y-2">
              {(q.choices || []).map((c) => {
                const picked = (selected[q._id] || []).includes(c.text);
                const correct = c.text === q.correctAnswer;
                let cls = 'flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-sm text-left transition-all duration-150 ';
                if (!submitted) {
                  cls += picked
                    ? 'border-isl-green bg-isl-green/10 text-isl-green font-medium'
                    : 'border-gray-200 hover:border-isl-green/40 hover:bg-isl-green/5 text-gray-700 cursor-pointer';
                } else {
                  if (correct) cls += 'border-green-400 bg-green-50 text-green-800 font-medium';
                  else if (picked) cls += 'border-red-300 bg-red-50 text-red-700';
                  else cls += 'border-gray-200 text-gray-500';
                }
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => handleSelect(q._id, c.text, q.type)}
                    disabled={submitted}
                    className={cls}
                  >
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      submitted && correct ? 'border-green-500 bg-green-500'
                      : submitted && picked ? 'border-red-400 bg-red-400'
                      : picked ? 'border-isl-green bg-isl-green'
                      : 'border-gray-300'
                    }`}>
                      {submitted && correct && <FiCheckCircle className="text-white" size={12} />}
                      {submitted && picked && !correct && <FiXCircle className="text-white" size={12} />}
                      {!submitted && picked && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    <span>{c.text}</span>
                  </button>
                );
              })}
            </div>

            {errors[q._id] && (
              <p className="ml-10 mt-2 flex items-center gap-2 text-red-500 text-xs font-medium bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                <FaExclamationTriangle size={11} /> Please select an answer
              </p>
            )}

            {qi < questions.length - 1 && (
              <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-isl-cream border-t border-isl-gold/30 px-6 md:px-10 py-8 flex justify-center">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-12 py-3.5 bg-isl-gold text-isl-green font-semibold font-body rounded-xl text-base hover:bg-isl-gold-light hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <FaTrophy /> Submit Quiz
          </button>
        ) : (
          <div className="w-full max-w-md text-center">
            <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 mb-4">
                <FaTrophy className="text-3xl text-isl-gold" />
              </div>
              <h3 className="text-2xl font-bold text-isl-green mb-1 font-body">
                {result.pct >= 80 ? 'Excellent!' : result.pct >= 50 ? 'Good Job!' : 'Keep Practicing!'}
              </h3>
              <p className="text-gray-400 text-sm mb-6 font-body">
                {user ? 'Your score has been recorded on the leaderboard.' : 'Login to save your score to the leaderboard.'}
              </p>
              <div className="flex justify-center gap-8 p-6 bg-gray-50 rounded-xl mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-1">{result.score}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-bold font-body">Correct</div>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500 mb-1">{result.total - result.score}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-bold font-body">Wrong</div>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-1 ${
                    result.pct >= 80 ? 'text-isl-green'
                    : result.pct >= 50 ? 'text-yellow-500'
                    : 'text-red-500'
                  }`}>{result.pct}%</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-bold font-body">Score</div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onBack}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                >
                  ← Back to Sets
                </button>
                <button
                  onClick={() => onFinish(set._id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-isl-green text-white rounded-xl text-sm font-semibold hover:bg-isl-green/90 transition"
                >
                  <FaRedo size={12} /> Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const DynamicQuiz = () => {
  const [activeSet, setActiveSet] = useState(null);
  const [leaderboardSetId, setLeaderboardSetId] = useState(null);
  const [quizKey, setQuizKey] = useState(0);

  const handleSelectSet = (set) => {
    setActiveSet(set);
    setLeaderboardSetId(set._id);
  };

  const handleBack = () => {
    setActiveSet(null);
    setLeaderboardSetId(null);
  };

  const handleRetry = useCallback((setId) => {
    setQuizKey((k) => k + 1);
  }, []);

  return (
    <div className="bg-isl-cream min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="block font-arabic text-isl-gold text-2xl mb-1">اِخْتِبَارُ الْمَعْرِفَة</span>
          <h2 className="font-body text-2xl md:text-3xl font-bold text-isl-green">Test Your Knowledge</h2>
          <div className="flex items-center justify-center gap-3 mt-3 mb-3">
            <div className="h-px bg-isl-gold/40 w-16"></div>
            <span className="text-isl-gold text-xs">✦</span>
            <div className="h-px bg-isl-gold/40 w-16"></div>
          </div>
          <p className="text-gray-500 text-sm font-body">
            Select a quiz set — your best score will appear on the leaderboard
          </p>
        </div>

        {/* Leaderboard */}
        <div className="mb-8">
          <Leaderboard setId={leaderboardSetId} />
        </div>

        {/* Content: set selector or active quiz */}
        {activeSet ? (
          <QuizRunner
            key={`${activeSet._id}-${quizKey}`}
            set={activeSet}
            onBack={handleBack}
            onFinish={handleRetry}
          />
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiLayers className="text-isl-green" size={18} />
              <h3 className="font-bold text-gray-700 text-lg">Available Quiz Sets</h3>
            </div>
            <SetSelector onSelect={handleSelectSet} />
          </div>
        )}

      </div>
    </div>
  );
};

export default DynamicQuiz;
