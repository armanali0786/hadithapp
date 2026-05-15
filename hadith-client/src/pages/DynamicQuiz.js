import React, { useState } from 'react';
import Poll from './Poll';
import Button from '../components/Button';
import pollDatas from '../data/polldb';

const DynamicQuiz = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [voted, setVoted] = useState(false);
  const [errors, setErrors] = useState({}); // NEW
  const [score, setScore] = useState({ correct: 0, wrong: 0 });

  // Handle selection
  const handleOptionSelect = (pollId, optionId, type) => {
    setSelectedOptions(prev => {
      const prevSelected = prev[pollId] || [];

      if (type === "single") {
        return { ...prev, [pollId]: [optionId] };
      }

      const updated = prevSelected.includes(optionId)
        ? prevSelected.filter(x => x !== optionId)
        : [...prevSelected, optionId];

      return { ...prev, [pollId]: updated };
    });

    // Clear error for that poll when user selects
    setErrors(prev => ({ ...prev, [pollId]: false }));
  };

  // Handle vote + evaluation
  const handleVote = () => {
    let newErrors = {};
    let allAnswered = true;

    // ❗ Check if any poll is unanswered
    pollDatas.forEach(poll => {
      if (!selectedOptions[poll.id] || selectedOptions[poll.id].length === 0) {
        newErrors[poll.id] = true;
        allAnswered = false;
      }
    });

    // ❗ If any missing answers → stop submit
    if (!allAnswered) {
      setErrors(newErrors);
      return;
    }

    // If all answered → proceed
    let correctCount = 0;
    let wrongCount = 0;

    pollDatas.forEach(poll => {
      const userSelected = selectedOptions[poll.id] || [];
      const correctAnswers = Object.keys(poll.results).filter(
        key => poll.results[key] === 1
      );

      if (poll.optionsType === "single") {
        if (userSelected[0] === correctAnswers[0]) correctCount++;
        else wrongCount++;
      } else {
        const userCorrect = userSelected.filter(id => correctAnswers.includes(id)).length;
        const userWrong = userSelected.filter(id => !correctAnswers.includes(id)).length;

        correctCount += userCorrect;
        wrongCount += userWrong;
      }
    });

    setScore({ correct: correctCount, wrong: wrongCount });
    setVoted(true);
  };

  return (
    <div className="bg-light m-10 p-10 row" style={{ minHeight: "100vh" }}>
      {pollDatas.map(poll => (
        <div key={poll.id} className="mb-4 col-12">
          <Poll
            poll={poll}
            voted={voted}
            selectedOptions={selectedOptions[poll.id] || []}
            onSelect={handleOptionSelect}
          />

          {/* ❗ Error display for missing selection */}
          {errors[poll.id] && (
            <p className="text-red-600 text-sm font-semibold mt-1">
              * Please select at least one option
            </p>
          )}
        </div>
      ))}

      {!voted && (
        <div className="ml-5 mb-5">
          <Button text="Submit" className="btn-primary text-xs" onClick={handleVote} />
        </div>
      )}

      {/* Score Display */}
      {voted && (
        <div className="mt-5 p-3 bg-gray-100 rounded shadow col-12">
          <h3 className="text-lg font-bold text-gray-700">Your Results:</h3>
          <p className="text-green-600 font-semibold">✔ Correct: {score.correct}</p>
          <p className="text-red-600 font-semibold">✘ Wrong: {score.wrong}</p>
        </div>
      )}
    </div>
  );
};

export default DynamicQuiz;
