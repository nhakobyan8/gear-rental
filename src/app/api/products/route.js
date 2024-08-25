import connectMongo from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 404 });
  }
}

export async function POST(req) {

  try {
    await connectMongo();
    const body = await req.json();
    const product = await Product.create(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 400 });
  }
}

export async function DELETE() {

  try {
    await connectMongo();
    await Product.deleteMany({});
    return NextResponse.json({ message: 'All products deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}
