import connectMongo from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// Функция подключения к базе данных
async function connectToDatabase() {
   try {
      await connectMongo();
   } catch (error) {
      return NextResponse.json({ message: `Database connection error: ${error.message}` }, { status: 500 });
   }
}

// Функция обработки ошибок
function handleErrorResponse(error, message = 'Error') {
   return NextResponse.json({ message: `${message}: ${error.message}` }, { status: 500 });
}

// Получение продукта по ID
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

// Обновление продукта по ID
export async function PUT(req, { params }) {
   const { id } = params;

   try {
      await connectToDatabase();
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
      return handleErrorResponse(error, 'Failed to update product');
   }
}

// Удаление продукта по ID
export async function DELETE(req, { params }) {
   const { id } = params;

   try {
      await connectToDatabase();
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
         return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
   } catch (error) {
      return handleErrorResponse(error, 'Failed to delete product');
   }
}