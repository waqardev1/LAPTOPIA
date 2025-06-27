// models/SavedLaptop.js

import mongoose from "mongoose";

/**
 * @typedef {Object} SavedLaptop
 * @property {mongoose.Types.ObjectId} userId - The user who saved this laptop.
 * @property {Object} laptop - The laptop object/data.
 * @property {Object} preferences - Preferences used at the time of saving.
 * @property {string} preferencesSource - 'basic', 'advanced', or 'text'.
 * @property {Date} savedAt - When the laptop was saved.
 */

/**
 * Schema for user-saved laptops and context.
 */
const SavedLaptopSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    laptop: { type: mongoose.Schema.Types.Mixed, required: true },
    preferences: { type: mongoose.Schema.Types.Mixed, required: true },
    preferencesSource: { type: String, enum: ['basic', 'advanced', 'text'], default: 'basic' }
  },
  { timestamps: { createdAt: 'savedAt' } }
);

// Optional: To prevent duplicate saves per user (uncomment one as fits your data):
// SavedLaptopSchema.index({ userId: 1, 'laptop.id': 1 }, { unique: true });
// or, if you don’t have .id in each laptop, you could use 'laptop.name'

// Export the model
export default mongoose.model("SavedLaptop", SavedLaptopSchema);
