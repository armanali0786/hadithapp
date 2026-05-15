import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function HadithCategory({ types, selected, onSelect }) {
  return (
    <div className="md:w-1/4 mr-5">
      {types.length === 0 ? (
        <p>No Hadith types available</p>
      ) : (
        types.map((type, index) => (
          <ul key={type._id}>
            <li
              className={`text-black p-2 flex justify-between items-center rounded-sm cursor-pointer ${
                selected === index ? "bg-slate-500 text-white" : ""
              }`}
              onClick={() => onSelect(index)}
            >
              {type.hadithtype}
              <span><FaArrowRight /></span>
            </li>
          </ul>
        ))
      )}
    </div>
  );
}
