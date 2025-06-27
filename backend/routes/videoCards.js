import express from "express";
import VideoCard from "../models/VideoCard.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const videoCards = await VideoCard.find();
    res.json(videoCards);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video cards", err });
  }
});

export default router;
