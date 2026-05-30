import { NextResponse } from 'next/server';
const mongoose = require('mongoose');

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI!);
    }

  

    return NextResponse.json({ message: "Signup successful!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Signup failed", error }, { status: 500 });
  }
}