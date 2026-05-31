import mongoose from 'mongoose';

const DiarySchema = new mongoose.Schema({
  title: String,
  content: String,
}, { timestamps: true });

export default mongoose.models.Diary || mongoose.model('Diary', DiarySchema);