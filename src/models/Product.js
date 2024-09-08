import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
   name: { type: String, required: true },
   description: { type: String, required: true },
   price: { type: Number, required: true },
   imageUrl: { type: String, required: true },
   category: String,
   brand: String,
   features: [String],
   specifications: {
      weight: String,
      dimensions: String,
      brand: String,
      model: String,
   },
   reviews: [
      {
         user: String,
         rating: Number,
         comment: String,
      },
   ],
   totalQuantity: { type: Number, required: true, min: 0 },
   availableQuantity: { type: Number, required: true, min: 0 },
}, {
   timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
