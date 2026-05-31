import mongoose from 'mongoose';

const diarySchema = new mongoose.Schema({
  title: String,
  content: String,
});

export default mongoose.models.Diary || mongoose.model('Diary', diarySchema);