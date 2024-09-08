import Order from '@/models/Order';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { getToken } from 'next-auth/jwt';

export async function GET(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'user') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = token.sub;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    await connectMongo();
    const orders = await Order.find({ userId }).populate('products.product');
    return NextResponse.json({ data: orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req) {
  await connectMongo();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== 'user') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = token.sub;

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  try {
    const { fullName, phoneNumber, products, totalAmount, startDate, endDate, paymentMethod } = await req.json();

    if (!fullName || !phoneNumber || !products || !totalAmount || !startDate || !endDate || !paymentMethod) {
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


    const updatePromises = products.map(async (item) => {
      const product = await Product.findById(item.product._id);
      if (product) {
        product.availableQuantity -= item.quantity;
        await product.save();
      }
    });

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true, data: savedOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

