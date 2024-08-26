import connectMongo from "@/lib/mongodb";
import Product from "@/models/Product";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

async function checkAdmin(req) {
   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
   if (!token || token.role !== 'admin') {
      return NextResponse.json({ message: "Access Denied" }, { status: 403 });
   }
}

export async function GET(req) {
   await checkAdmin(req);
   try {
      await connectMongo();
      const products = await Product.find({});
      return NextResponse.json(products, { status: 200 });
   } catch (error) {
      return NextResponse.json({ message: "Failed to fetch products." }, { status: 500 });
   }
}

export async function POST(req) {
   await checkAdmin(req);
   try {
      await connectMongo();
      const productData = await req.json();
      const newProduct = new Product(productData);
      await newProduct.save();
      return NextResponse.json(newProduct, { status: 201 });
   } catch (error) {
      return NextResponse.json({ message: "Failed to create product." }, { status: 500 });
   }
}

export async function DELETE(req) {
   await checkAdmin(req);
   try {
      await connectMongo();
      const { _id } = await req.json();      
      
      await Product.findByIdAndDelete(_id);
      return NextResponse.json({ message: "Product deleted successfully." }, { status: 204 });
   } catch (error) {
      return NextResponse.json({ message: "Failed to delete product." }, { status: 500 });
   }
}


export async function PUT(req) {
   await checkAdmin(req);
   try {
      await connectMongo();
      const { id, ...updatedData } = await req.json();

      const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

      if (!updatedProduct) {
         return NextResponse.json({ message: "Product not found" }, { status: 404 });
      }
      return NextResponse.json(updatedProduct, { status: 200 });
   } catch (error) {
      return NextResponse.json({ message: "Failed to update product." }, { status: 500 });
   }
}