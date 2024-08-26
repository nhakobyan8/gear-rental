// import connectMongo from "@/lib/mongodb";
// import Contract from "@/models/Contract";
// import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

async function checkAdmin(req) {
   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
   if (!token || token.role !== 'admin') {
      return NextResponse.json({ message: "Access Denied" }, { status: 403 });
   }
}

// export async function POST(req) {
//    await checkAdmin(req);
//    try {
//       await connectMongo();
//       const contractData = await req.json();
//       const newContract = new Contract(contractData);
//       await newContract.save();
//       return NextResponse.json(newContract, { status: 201 });
//    } catch (error) {
//       return NextResponse.json({ message: "Failed to create contract." }, { status: 500 });
//    }
// }

// export async function GET(req) {
//    await checkAdmin(req);
//    try {
//       await connectMongo();
//       const contracts = await Contract.find({});
//       return NextResponse.json(contracts, { status: 200 });
//    } catch (error) {
//       return NextResponse.json({ message: "Failed to fetch contracts." }, { status: 500 });
//    }
// }

export async function POST(req) {
   await checkAdmin(req);
   try {
      await connectMongo();
      return NextResponse.json({message: "hello"}, { status: 201 });
   } catch (error) {
      return NextResponse.json({ message: "Failed to create contract." }, { status: 500 });
   }
}