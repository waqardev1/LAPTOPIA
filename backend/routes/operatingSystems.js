import express from "express";
import OperatingSystem from "../models/OperatingSystem.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const oses = await OperatingSystem.find();
    res.json(oses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch operating systems" });
  }
});

export default router;
