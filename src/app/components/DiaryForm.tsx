"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDiary } from '../features/diary/diarySlice';
import { AppDispatch } from '../store'; 

export const DiaryForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    // Backend mein POST request jayegi
    dispatch(addDiary({ title, content }));
    setTitle('');
    setContent('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm border border-indigo-100">
      <h3 className="text-xl font-semibold mb-5 text-indigo-900 text-center">Create New Entry</h3>
      <input 
        className="w-full p-4 mb-4 border border-indigo-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-300"
        placeholder="Enter title..." 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea 
        className="w-full p-4 mb-6 border border-indigo-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-300"
        placeholder="What's on your mind?..." 
        rows={4}
        value={content} 
        onChange={(e) => setContent(e.target.value)}
      />
      <button 
        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition"
        onClick={handleSave}
      >
        Save Entry
      </button>
    </div>
  );
};