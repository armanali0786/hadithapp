import React, { useState } from "react";
import useHadiths from "../hooks/useHadiths";
import HadithCategory from "../components/HadithCategory";
import HadithCard from "../components/HadithCard";
import {
  HadithCardSkeleton,
  CollectionCardSkeleton,
  CategorySkeleton,
  PageLoader,
} from "../components/Skeletons";

export default function HadithCollections() {
  const [selectedItem, setSelectedItem] = useState(0);
  const { hadithTypes, hadithList, loading, filtering, error, fetchHadithsByType } = useHadiths();

  const handleSelectCategory = async (index) => {
    setSelectedItem(index);
    await fetchHadithsByType(hadithTypes[index]._id);
  };

  // Full page initial load
  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-6">
        {/* Category Sidebar Skeleton */}
        <div className="w-full md:w-52 flex-shrink-0">
          <CategorySkeleton />
        </div>
        {/* Cards Grid Skeleton */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <HadithCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-400 text-2xl">
          ✕
        </div>
        <p className="text-red-500 text-center font-body text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-isl-green text-white rounded-xl text-sm font-body hover:bg-isl-green-light transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

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
        {filtering ? (
          // Category switch skeleton — preserves sidebar, only replaces cards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <HadithCardSkeleton key={i} />
            ))}
          </div>
        ) : hadithList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="font-arabic text-isl-gold text-5xl">☪</span>
            <p className="text-gray-500 font-body text-sm">No Hadiths found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hadithList.map((hadith) => (
              <HadithCard key={hadith._id} hadith={hadith} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
