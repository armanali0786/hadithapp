// Poll.jsx
import React from 'react';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Poll = ({ poll, selectedOptions, onSelect, voted }) => {
  const correctAnswers = Object.keys(poll.results).filter(
    key => poll.results[key] === 1
  );

  const isCorrect = (optionId) => correctAnswers.includes(optionId);
  const isUserSelected = (optionId) => selectedOptions.includes(optionId);

  const getIcon = (optionId) => {
    if (!voted) return null;

    if (isCorrect(optionId))
      return <FaCheckCircle className="text-green-600 ml-2" />;

    if (isUserSelected(optionId) && !isCorrect(optionId))
      return <FaTimesCircle className="text-red-600 ml-2" />;

    return null;
  };

  return (
    <div className="poll pb-4 col-6">
      <h4>{poll.id}. {poll.question}</h4>

      {poll.options.map(opt => (
        <li key={opt.id} className="flex items-center">
          {poll.optionsType === "single" ? (
            <input
              type="radio"
              disabled={voted}
              checked={isUserSelected(opt.id)}
              onChange={() => onSelect(poll.id, opt.id, poll.optionsType)}
            />
          ) : (
            <input
              type="checkbox"
              disabled={voted}
              checked={isUserSelected(opt.id)}
              onChange={() => onSelect(poll.id, opt.id, poll.optionsType)}
            />
          )}

          <label className="pl-2 text-sm">{opt.text}</label>

          {/* Show icons */}
          {getIcon(opt.id)}
        </li>
      ))}
    </div>
  );
};

export default Poll;
