import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Diary from './../../models/Diary'; 
export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }
    const diaries = await Diary.find({});
    return NextResponse.json(diaries);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching" }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }
    const data = await req.json();
    const newDiary = await Diary.create(data);
    return NextResponse.json(newDiary, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }
    
    await Diary.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}