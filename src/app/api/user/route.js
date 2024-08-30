import connectMongo from '@/lib/mongodb';
import User from '@/models/User';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(req) {
   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

   if (!token || token.role !== 'user') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   const id = token.sub;

   if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
   }

   try {
      await connectMongo();
      const user = await User.findById(id);

      if (!user) {
         return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(user, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}

export async function PUT(req) {
   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

   if (!token || token.role !== 'user') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   const id = token.sub;

   if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
   }

   try {
      const { username } = await req.json(); // Получаем только username

      if (!username) {
         return NextResponse.json({ error: 'Username is required' }, { status: 400 });
      }

      await connectMongo();
      const user = await User.findByIdAndUpdate(id, { username }, { new: true }); // Обновляем только username

      if (!user) {
         return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(user, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}

