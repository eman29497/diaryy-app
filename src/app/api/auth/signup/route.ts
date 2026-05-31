import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Diary from '../../../models/Diary'; 

export async function POST(req: Request) {
  try {

    const { name, email, password } = await req.json();

    
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }


    const newUser = await Diary.create({ name, email, password });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    
    console.error("Signup Error:", error);
    return NextResponse.json(
      { message: "Signup failed", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}