import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";

const isPasswordValid = (password) => {
   const passwordRequirements = /^(?=.*\d)[A-Za-z\d]{8,}$/;
   return passwordRequirements.test(password);
};

export async function PUT(req) {
   try {
      await connectMongo();

      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token || !token.email) {
         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const { currentPassword, newPassword } = await req.json();

      if (!currentPassword || !newPassword) {
         return NextResponse.json({ message: "Both current and new passwords are required" }, { status: 400 });
      }

      const user = await User.findOne({ email: token.email });
      if (!user) {
         return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
         return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 });
      }

      if (currentPassword === newPassword) {
         return NextResponse.json({ message: "New password must be different from the current password." }, { status: 400 });
      }

      if (!isPasswordValid(newPassword)) {
         return NextResponse.json({
            message: "New password must be at least 8 characters long and include at least one number.",
         }, { status: 400 });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();

      return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
   } catch (error) {
      console.error("Error updating password:", error);
      return NextResponse.json({ message: `Server error: ${error.message}` }, { status: 500 });
   }
}
