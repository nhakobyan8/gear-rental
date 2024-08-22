import connectMongo from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
   await connectMongo();
   const { id } = params;

   try {
      const product = await Product.findById(id);
      if (!product) {
         return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(product, { status: 200 });
   } catch (error) {
      return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
   }
}

export async function PUT(req, { params }) {
   await connectMongo();
   const { id } = params;

   try {
      const updatedData = await req.json();
      const product = await Product.findByIdAndUpdate(id, updatedData, {
         new: true,
         runValidators: true,
      });
      if (!product) {
         return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(product, { status: 200 });
   } catch (error) {
      return NextResponse.json({ message: `Error: ${error.message}` }, { status: 400 });
   }
}

export async function DELETE(req, { params }) {
   await connectMongo();
   const { id } = params;

   try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
         return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ message: `Error: ${error.message}` }, { status: 400 });
   }
}