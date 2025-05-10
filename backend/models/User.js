import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['creator', 'consumer'],
    required: true
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;