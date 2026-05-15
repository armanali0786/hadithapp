import React from "react";

export default function HadithCategory({ types, selected, onSelect }) {
  return (
    <div className="bg-isl-green rounded-2xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-5 py-4 bg-isl-green-light border-b border-white/10">
        <h3 className="text-isl-gold font-bold text-sm tracking-widest text-center font-body">
          ✦ Collections ✦
        </h3>
      </div>

      {types.length === 0 ? (
        <p className="p-4 text-white/50 text-sm font-body">No collections available</p>
      ) : (
        <ul>
          {types.map((type, index) => (
            <li
              key={type._id}
              onClick={() => onSelect(index)}
              className={`flex items-center justify-between px-5 py-3.5 cursor-pointer transition-all duration-200 border-l-4 text-sm font-body ${
                selected === index
                  ? 'border-l-isl-gold bg-white/10 text-isl-gold font-semibold'
                  : 'border-l-transparent text-white/80 hover:bg-white/10 hover:text-white hover:border-l-white/30'
              }`}
            >
              <span>{type.hadithtype}</span>
              <span className="text-xl leading-none opacity-60">›</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
