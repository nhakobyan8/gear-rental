import connectMongo from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  await connectMongo();
  try {
    const products = await Product.find({});
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: `${error}` }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(req) {
  await connectMongo();

  try {
    const body = await req.json();
    const product = await Product.create(body);

    return new Response(JSON.stringify(product), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: `${error}` }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
