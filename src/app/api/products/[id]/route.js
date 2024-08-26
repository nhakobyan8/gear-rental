import connectMongo from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

async function connectToDatabase() {
   try {
      await connectMongo();
   } catch (error) {
      return NextResponse.json({ message: `Database connection error: ${error.message}` }, { status: 500 });
   }
}

function handleErrorResponse(error, message = 'Error') {
   return NextResponse.json({ message: `${message}: ${error.message}` }, { status: 500 });
}

export async function GET(req, { params }) {
   const { id } = params;

   try {
      await connectToDatabase();
      const product = await Product.findById(id);
      if (!product) {
         return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(product, { status: 200 });
   } catch (error) {
      return handleErrorResponse(error, 'Failed to fetch product');
   }
}