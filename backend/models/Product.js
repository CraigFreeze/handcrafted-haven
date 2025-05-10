import mongoose from 'mongoose';

const CATEGORIES = ['Electronics', 'Books', 'Clothing', 'Home', 'Toys', 'Beauty', 'Sports'];

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  postDate: {
    type: Date,
    default: Date.now
  },
  imageURI: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: CATEGORIES,
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;