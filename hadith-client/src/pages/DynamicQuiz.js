import React, { useState } from 'react';
import Poll from './Poll';
import pollDatas from '../data/polldb';
import { FaTrophy, FaExclamationTriangle } from 'react-icons/fa';

const DynamicQuiz = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [voted, setVoted] = useState(false);
  const [errors, setErrors] = useState({});
  const [score, setScore] = useState({ correct: 0, wrong: 0 });

  const handleOptionSelect = (pollId, optionId, type) => {
    setSelectedOptions(prev => {
      const prevSelected = prev[pollId] || [];
      if (type === "single") return { ...prev, [pollId]: [optionId] };
      const updated = prevSelected.includes(optionId)
        ? prevSelected.filter(x => x !== optionId)
        : [...prevSelected, optionId];
      return { ...prev, [pollId]: updated };
    });
    setErrors(prev => ({ ...prev, [pollId]: false }));
  };

  const handleVote = () => {
    let newErrors = {};
    let allAnswered = true;
    pollDatas.forEach(poll => {
      if (!selectedOptions[poll.id] || selectedOptions[poll.id].length === 0) {
        newErrors[poll.id] = true;
        allAnswered = false;
      }
    });
    if (!allAnswered) { setErrors(newErrors); return; }

    let correctCount = 0, wrongCount = 0;
    pollDatas.forEach(poll => {
      const userSelected = selectedOptions[poll.id] || [];
      const correctAnswers = Object.keys(poll.results).filter(key => poll.results[key] === 1);
      if (poll.optionsType === "single") {
        if (userSelected[0] === correctAnswers[0]) correctCount++;
        else wrongCount++;
      } else {
        correctCount += userSelected.filter(id => correctAnswers.includes(id)).length;
        wrongCount += userSelected.filter(id => !correctAnswers.includes(id)).length;
      }
    });
    setScore({ correct: correctCount, wrong: wrongCount });
    setVoted(true);
  };

  return (
    <div className="bg-isl-cream min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="block font-arabic text-isl-gold text-2xl mb-1">اِخْتِبَارُ الْمَعْرِفَة</span>
          <h2 className="font-body text-2xl md:text-3xl font-bold text-isl-green">Test Your Knowledge</h2>
          <div className="flex items-center justify-center gap-3 mt-3 mb-3">
            <div className="h-px bg-isl-gold/40 w-16"></div>
            <span className="text-isl-gold text-xs">✦</span>
            <div className="h-px bg-isl-gold/40 w-16"></div>
          </div>
          <p className="text-gray-500 text-sm font-body">
            Assess your understanding of the Sunnah and enrich your faith
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-isl-gold/20">
          <div className="p-6 md:p-12 space-y-12">
            {pollDatas.map(poll => (
              <div key={poll.id} className="relative">
                <Poll
                  poll={poll}
                  voted={voted}
                  selectedOptions={selectedOptions[poll.id] || []}
                  onSelect={handleOptionSelect}
                />
                {errors[poll.id] && (
                  <p className="flex items-center gap-2 text-red-500 text-sm font-semibold mt-3 bg-red-50 p-2 rounded-lg border border-red-200 font-body">
                    <FaExclamationTriangle /> Please select at least one option
                  </p>
                )}
                {poll.id !== pollDatas[pollDatas.length - 1].id && (
                  <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-isl-cream border-t border-isl-gold/30 p-8 md:p-12 flex justify-center">
            {!voted ? (
              <button
                onClick={handleVote}
                className="flex items-center gap-2 px-12 py-3.5 bg-isl-gold text-isl-green font-semibold font-body rounded-xl text-base hover:bg-isl-gold-light hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <FaTrophy /> Submit Quiz
              </button>
            ) : (
              <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-green-100 w-full max-w-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 mb-4">
                  <FaTrophy className="text-3xl text-isl-gold" />
                </div>
                <h3 className="text-2xl font-bold text-isl-green mb-2 font-body">Quiz Completed!</h3>
                <p className="text-gray-500 text-sm mb-6 font-body">Here is how you scored on the test</p>
                <div className="flex justify-center gap-12 p-6 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-1">{score.correct}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-bold font-body">Correct</div>
                  </div>
                  <div className="w-px bg-gray-200" />
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-500 mb-1">{score.wrong}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-bold font-body">Incorrect</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicQuiz;
