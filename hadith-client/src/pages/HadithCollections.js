import React, { useState } from "react";
import useHadiths from "../hooks/useHadiths";
import HadithCategory from "../components/HadithCategory";
import HadithCard from "../components/HadithCard";

export default function HadithCollections() {
  const [selectedItem, setSelectedItem] = useState(0);
  const { hadithTypes, hadithList, loading, error, fetchHadithsByType } = useHadiths();

  const handleSelectCategory = async (index) => {
    setSelectedItem(index);
    await fetchHadithsByType(hadithTypes[index]._id);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <HadithCategory types={hadithTypes} selected={selectedItem} onSelect={handleSelectCategory} />

      <div className="md:w-3/4 ml-10">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {hadithList.map((hadith) => (
              <HadithCard key={hadith._id} hadith={hadith} onClick={() => {}} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
