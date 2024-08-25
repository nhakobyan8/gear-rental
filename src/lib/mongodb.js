// src/lib/mongodb.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/models/User';  // Подключите модель пользователя

const connectMongo = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = process.env.SUPERADMIN_EMAIL;
    const username = process.env.SUPERADMIN_USERNAME;
    const password = process.env.SUPERADMIN_PASSWORD;

    const existingAdmin = await User.findOne({ email });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        username,
        email,
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Super admin created successfully!');
    } else {
      console.log('Super admin already exists.');
    }

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectMongo;
