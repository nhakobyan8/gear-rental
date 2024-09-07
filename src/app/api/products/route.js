import connectMongo from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");


    const productQuery = Product.find({});
    if (limit) {
      productQuery.limit(Number(limit));
    }

    const products = await productQuery.sort({ createdAt: -1 });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 404 });
  }
}
