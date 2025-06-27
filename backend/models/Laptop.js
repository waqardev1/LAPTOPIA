import mongoose from 'mongoose';

const LaptopSchema = new mongoose.Schema({
  name: String,
  specs: String,
  price: String,
  image: String,
  storeLink: String,
  reason: String,

  // Optional but still supported
  savedBy: String,

  // 🆕 Added Fields
  preferencesSource: {
    type: String,
    enum: ['text', 'basic', 'advanced'],
    required: true,
  },
  preferences: {
    type: mongoose.Schema.Types.Mixed, // Accepts object (flexible schema)
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Laptop = mongoose.model('Laptop', LaptopSchema);
export default Laptop;
