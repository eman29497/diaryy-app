import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Diary from './../../models/Diary'; // Apna model import check kar lein

// GET: Diary ki list fetch karne ke liye
export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }
    const diaries = await Diary.find({});
    return NextResponse.json(diaries, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to fetch", error: error.message }, { status: 500 });
  }
}

// POST: Nayi entry add karne ke liye
export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }
    const newEntry = await Diary.create(data);
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to add", error: error.message }, { status: 500 });
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
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to delete", error: error.message }, { status: 500 });
  }
}