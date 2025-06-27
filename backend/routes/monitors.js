import express from "express";
import Monitor from "../models/Monitor.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const monitors = await Monitor.find();
    res.json(monitors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch monitors" });
  }
});

export default router;
