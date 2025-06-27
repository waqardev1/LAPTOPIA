// models/RecommendationLog.js

import mongoose from 'mongoose';

/**
 * @typedef {Object} RecommendationLog
 * @property {mongoose.Types.ObjectId|null} userId - Linked user ID (null if guest).
 * @property {string} preferencesSource - Source of preferences: 'text', 'basic', or 'advanced'.
 * @property {Object} preferences - The user’s input/preferences for this session.
 * @property {Array<Object>} recommendedLaptops - Array of recommended laptop objects.
 * @property {Date} createdAt - Log creation time (auto-added).
 * @property {Date} updatedAt - Log update time (auto-added).
 */

/**
 * Schema for storing recommendation sessions and results.
 */
const RecommendationLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // Null for guests, ObjectId for registered users
    },
    preferencesSource: {
      type: String,
      enum: ['text', 'basic', 'advanced'],
      required: true,
    },
    preferences: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    recommendedLaptops: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
  },
  { timestamps: true }
);

// 🔍 Add index for faster queries by user
RecommendationLogSchema.index({ userId: 1 });

export default mongoose.model('RecommendationLog', RecommendationLogSchema);
