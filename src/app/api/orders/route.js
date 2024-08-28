import Order from '@/models/Order';
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';

export async function GET(req) {
  await connectMongo();

  try {
    const { userId } = req.headers; // Получаем userId из заголовка запроса

    const orders = await Order.find({ userId }).populate('products.product');
    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  await connectMongo();

  try {
    const { userId, fullName, phoneNumber, products, totalAmount, startDate, endDate, paymentMethod } = await req.json();


    if (!userId || !fullName || !phoneNumber || !products || !totalAmount || !startDate || !endDate || !paymentMethod) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const newOrder = new Order({
      userId,
      fullName,
      phoneNumber,
      products,
      totalAmount,
      startDate,
      endDate,
      paymentMethod,
      status: 'paid',
    });

    const savedOrder = await newOrder.save();
    return NextResponse.json({ success: true, data: savedOrder }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
