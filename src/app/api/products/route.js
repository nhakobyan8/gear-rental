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