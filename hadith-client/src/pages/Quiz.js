import React, { useState } from 'react';

const Poll = ({ poll, handleVote }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [voted, setVoted] = useState(false);

  const handleOptionClick = (optionId) => {
    if (!voted) {
      if (poll.optionsType === 'single') {
        setSelectedOptions([optionId]);
      } else {
        const index = selectedOptions.indexOf(optionId);
        if (index === -1) {
          setSelectedOptions([...selectedOptions, optionId]);
        } else {
          const updatedOptions = [...selectedOptions];
          updatedOptions.splice(index, 1);
          setSelectedOptions(updatedOptions);
        }
      }
    }
  };

  const isOptionSelected = (optionId) => {
    return selectedOptions.includes(optionId);
  };

  return (
    <div className="poll pb-2 col-6 rounded-lg shadow-lg bg-gray-100 transition ease-in-out delay-150 bg-grey-500 hover:-translate-y-1 hover:scale-101 hover:bg-slate-200 duration-300">
      <div className='pt-5'>
          <h4 className='text-lg font-bold mb-4'>{poll.id}. {poll.question}</h4>
          {poll.options.map(option => (
          <li key={option.id} className="flex items-center mb-2" >
            {poll.optionsType === 'single' ? (
              <input
                type="radio"
                id={option.id}
                name={`option_${poll.id}`}
                checked={isOptionSelected(option.id)}
                onChange={() => handleOptionClick(option.id)}
                className="w-4 h-4 cursor-pointer ml-10"
              />
            ) : (
              <input
                type="checkbox"
                id={option.id}
                checked={isOptionSelected(option.id)}
                onChange={() => handleOptionClick(option.id)}
                style={{cursor:"pointer"}}
              />
            )}
            <label className="text-lg text-gray-800 cursor-pointer ml-2">{option.text}</label>
          </li>
        ))}
      </div>

     {/* <h4>{poll.id}. {poll.question}</h4>
      <ul>
        {poll.options.map(option => (
          <li key={option.id} >
            {poll.optionsType === 'single' ? (
              <input
                type="radio"
                id={option.id}
                name={`option_${poll.id}`}
                checked={isOptionSelected(option.id)}
                onChange={() => handleOptionClick(option.id)}
                style={{cursor:"pointer"}}
              />
            ) : (
              <input
                type="checkbox"
                id={option.id}
                checked={isOptionSelected(option.id)}
                onChange={() => handleOptionClick(option.id)}
                style={{cursor:"pointer"}}
              />
            )}
            <label className='text-sm pl-2 text-gray-700'>{option.text}</label>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Poll;
