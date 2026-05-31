import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = '/api/diary';
export interface Diary {
  _id?: string; 
  title: string;
  content: string;
}
export const fetchDiaries = createAsyncThunk('diary/fetch', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});
export const addDiary = createAsyncThunk('diary/add', async (data: Diary) => {
  const response = await axios.post(API_URL, data);
  return response.data;
});
export const deleteDiary = createAsyncThunk('/diary/delete', async (id: string) => {
  await axios.delete(`/api/diary?id=${id}`);
  return id;
});
const diarySlice = createSlice({
  name: 'diary',
  initialState: [] as Diary[],
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchDiaries.fulfilled, (state, action) =>{
        return action.payload;
      })
      
      .addCase(addDiary.fulfilled, (state, action) => { 
        state.push(action.payload); 
      })
      
      .addCase(deleteDiary.fulfilled, (state, action) => { 
        return state.filter((d:Diary) => d._id !== action.payload); 
      });
  },
});

export default diarySlice.reducer;
