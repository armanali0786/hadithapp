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
    if (isCorrect(optionId)) return <FaCheckCircle className="text-green-500 ml-auto text-xl" />;
    if (isUserSelected(optionId) && !isCorrect(optionId)) return <FaTimesCircle className="text-red-500 ml-auto text-xl" />;
    return null;
  };

  const getOptionStyle = (optionId) => {
    let baseStyle = "flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 font-['Jost'] mb-3 ";
    
    if (voted) {
      if (isCorrect(optionId)) {
        baseStyle += "bg-green-50 border-green-500 text-green-900 shadow-sm";
      } else if (isUserSelected(optionId)) {
        baseStyle += "bg-red-50 border-red-400 text-red-900";
      } else {
        baseStyle += "bg-gray-50 border-gray-200 text-gray-500 opacity-70";
      }
    } else {
      if (isUserSelected(optionId)) {
        baseStyle += "bg-[rgba(201,162,39,0.05)] border-[#c9a227] shadow-md transform scale-[1.01]";
      } else {
        baseStyle += "bg-white border-gray-200 hover:border-[#c9a227]/50 hover:bg-gray-50 text-gray-700 hover:shadow-sm";
      }
    }
    return baseStyle;
  };

  return (
    <div className="mb-2">
      <h4 className="text-xl font-bold text-[#0d4a2e] mb-5 font-['Jost'] leading-relaxed">
        <span className="text-[#c9a227] mr-2 font-black">{poll.id}.</span> 
        {poll.question}
      </h4>

      <div className="space-y-3 flex flex-col">
        {poll.options.map(opt => (
          <label key={opt.id} className={getOptionStyle(opt.id)}>
            <div className="flex items-center justify-center w-6 h-6 mr-4">
              {poll.optionsType === "single" ? (
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isUserSelected(opt.id) ? 'border-[#c9a227]' : 'border-gray-300'}`}>
                  {isUserSelected(opt.id) && <div className="w-2.5 h-2.5 rounded-full bg-[#c9a227]" />}
                </div>
              ) : (
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isUserSelected(opt.id) ? 'border-[#c9a227] bg-[#c9a227]' : 'border-gray-300 bg-white'}`}>
                  {isUserSelected(opt.id) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
              )}
            </div>
            
            {/* Hidden actual inputs for accessibility but visually replaced above */}
            <input
              type={poll.optionsType === "single" ? "radio" : "checkbox"}
              className="hidden"
              disabled={voted}
              checked={isUserSelected(opt.id)}
              onChange={() => onSelect(poll.id, opt.id, poll.optionsType)}
            />

            <span className="text-base font-medium flex-1">{opt.text}</span>

            {getIcon(opt.id)}
          </label>
        ))}
      </div>
    </div>
  );
};
export default Poll;
