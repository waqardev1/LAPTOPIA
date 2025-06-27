// routes/recommendations.js
import express from 'express';
import RecommendationLog from '../models/RecommendationLog.js';
import mongoose from 'mongoose';

const router = express.Router();

/**
 * @route   POST /api/recommendations/auto-log
 * @desc    Automatically log a recommendation event
 * @body    { userId, preferencesSource, preferences, recommendedLaptops }
 */
router.post('/auto-log', async (req, res) => {
  try {
    let { userId = null, preferencesSource, preferences, recommendedLaptops } = req.body;

    // Validate presence of all required fields
    if (!preferencesSource)
      return res.status(400).json({ error: 'Missing required field: preferencesSource' });
    if (!preferences)
      return res.status(400).json({ error: 'Missing required field: preferences' });
    if (!recommendedLaptops)
      return res.status(400).json({ error: 'Missing required field: recommendedLaptops' });

    // If userId is a string but looks like ObjectId, convert
    if (userId && typeof userId === "string" && mongoose.isValidObjectId(userId)) {
      userId = new mongoose.Types.ObjectId(userId);
    }
    // For guests: keep as null

    const log = await RecommendationLog.create({
      userId,
      preferencesSource,
      preferences,
      recommendedLaptops,
    });

    res.status(201).json({ message: 'Recommendation log saved successfully', log });
  } catch (error) {
    console.error('Auto-save error:', error);
    res.status(500).json({ error: 'Failed to save recommendation log' });
  }
});

/**
 * @route   GET /api/recommendations/user/:userId
 * @desc    Get all recommendation logs for a user (for dashboard/analytics)
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }
    const logs = await RecommendationLog.find({ userId }).sort({ createdAt: -1 });
    res.json({ logs });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

export default router;
