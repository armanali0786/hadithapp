import React, { useState, useEffect } from 'react';
import { FiBookmark } from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';

export default function BookmarkButton({ hadithId, className = '' }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ilm-bookmarks') || '[]');
    setBookmarked(saved.includes(hadithId));
  }, [hadithId]);

  const toggle = (e) => {
    e.stopPropagation();
    const saved    = JSON.parse(localStorage.getItem('ilm-bookmarks') || '[]');
    const newSaved = bookmarked
      ? saved.filter(id => id !== hadithId)
      : [...saved, hadithId];
    localStorage.setItem('ilm-bookmarks', JSON.stringify(newSaved));
    setBookmarked(!bookmarked);
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
        bookmarked
          ? 'bg-isl-gold/10 text-isl-gold border border-isl-gold/40 hover:bg-isl-gold/20'
          : 'bg-gray-50 text-gray-500 border border-gray-200 hover:border-isl-gold hover:text-isl-gold'
      } ${className}`}
    >
      {bookmarked ? <FaBookmark size={13} /> : <FiBookmark size={13} />}
      <span>{bookmarked ? 'Saved' : 'Bookmark'}</span>
    </button>
  );
}
