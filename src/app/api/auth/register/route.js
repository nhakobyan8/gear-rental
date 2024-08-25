import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
   try {
      await connectMongo();
      
      const { username, email, password } = await req.json();

      if (!username || !email || !password) {
         return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
      }

      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
         return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({ username, email, password: hashedPassword });

      return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
   } catch (error) {
      return NextResponse.json({ message: `Server error: ${error.message}` }, { status: 500 });
   }
}
