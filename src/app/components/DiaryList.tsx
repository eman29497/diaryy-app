"use client";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDiaries, deleteDiary } from '../features/diary/diarySlice';
import { AppDispatch, RootState } from '../store';

export const DiaryList = () => {
  const diaries = useSelector((state: RootState) => state.diary);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    
    dispatch(fetchDiaries());
  }, [dispatch]);

  return (
    <div className="max-w-md mx-auto mt-8 space-y-4">
      {diaries.map((diary) => (
        <div key={diary._id} className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-50 flex justify-between items-start">
          <div className="mr-4">
            <h3 className="text-lg font-semibold text-indigo-900">{diary.title}</h3>
            <p className="text-slate-600 text-sm">{diary.content}</p>
          </div>
          <button 
            onClick={() => dispatch(deleteDiary(diary._id!))} 
            className="text-red-400 hover:text-red-600 transition-colors font-bold text-sm shrink-0"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};