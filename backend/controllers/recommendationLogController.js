// controllers/recommendationLogController.js
import RecommendationLog from "../models/RecommendationLog.js";

export const autoLogRecommendation = async (req, res) => {
  try {
    const { userId, preferencesSource, preferences, recommendedLaptops } = req.body;
    if (!preferencesSource || !preferences || !recommendedLaptops)
      return res.status(400).json({ error: "Missing required fields" });

    const log = new RecommendationLog({
      userId: userId || "guest",
      preferencesSource,
      preferences,
      recommendedLaptops,
    });
    await log.save();

    res.status(201).json({ message: "Recommendation log saved", log });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
