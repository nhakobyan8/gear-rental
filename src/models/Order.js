import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['paid', 'rented', 'returned', 'checked', 'completed'],
    default: 'paid',
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Cash', 'Post-Pay'],
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
