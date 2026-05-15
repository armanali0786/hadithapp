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
    <div className="flex flex-col md:flex-row gap-6">
      {/* Category Sidebar */}
      <div className="w-full md:w-52 flex-shrink-0">
        <HadithCategory
          types={hadithTypes}
          selected={selectedItem}
          onSelect={handleSelectCategory}
        />
      </div>

      {/* Cards Grid */}
      <div className="flex-1 min-w-0">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-isl-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-5 font-body">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hadithList.map((hadith) => (
              <HadithCard key={hadith._id} hadith={hadith} onClick={() => {}} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
