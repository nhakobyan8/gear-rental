import User from '@/models/User';
import connectMongo from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {
   await connectMongo();

   try {
      const users = await User.find({});
      return NextResponse.json({ success: true, data: users }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
   }
}

export async function PUT(req) {
   await connectMongo();

   try {
      const { id, username, email, password, role } = await req.json();
      if (!id) {
         return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
      }

      const updatedUser = await User.findByIdAndUpdate(
         id,
         { username, email, password, role },
         { new: true, runValidators: true }
      );

      if (!updatedUser) {
         return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
   }
}

export async function DELETE(req) {
   await connectMongo();

   try {
      const { id } = await req.json();

      if (!id) {
         return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
      }

      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
         return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: 'User deleted successfully' }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
   }
}
