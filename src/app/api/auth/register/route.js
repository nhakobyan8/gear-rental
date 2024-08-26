import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

let confirmationCodes = {}; // Временное хранилище для кодов подтверждения

// Функция отправки кода подтверждения на email
const sendConfirmationCode = async (email) => {
  const confirmationCode = generateConfirmationCode();
  confirmationCodes[email] = confirmationCode; // Сохраняем код во временном хранилище

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SUPERADMIN_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SUPERADMIN_EMAIL,
    to: email,
    subject: "Email Confirmation",
    text: `Your confirmation code is: ${confirmationCode}`,
  });

  return NextResponse.json({ message: "Confirmation code sent to your email." }, { status: 200 });
};

// Генерация случайного кода подтверждения
const generateConfirmationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Подтверждение кода и создание пользователя
export async function POST(req) {
  const { email, username, password, confirmationCode } = await req.json();

  if (confirmationCode) {
    return await confirmCodeAndCreateUser(email, username, password, confirmationCode);
  } else {
    return await sendConfirmationCode(email);
  }
}

// Функция проверки кода и создания пользователя
const confirmCodeAndCreateUser = async (email, username, password, confirmationCode) => {
  const storedCode = confirmationCodes[email];

  if (!storedCode) {
    return NextResponse.json({ message: "No confirmation code found for this email." }, { status: 404 });
  }

  if (storedCode !== confirmationCode) {
    return NextResponse.json({ message: "Invalid confirmation code." }, { status: 400 });
  }

  try {
    await connectMongo();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    delete confirmationCodes[email]; // Удаляем код из временного хранилища после успешной регистрации

    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Failed to create user." }, { status: 500 });
  }
};
