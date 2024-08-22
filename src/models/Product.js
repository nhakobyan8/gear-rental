import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
   name: String,
   description: String,
   price: Number,
   imageUrl: String,
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
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
