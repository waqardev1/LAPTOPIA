import express from "express";
import CpuCooler from "../models/CpuCooler.js"; // Make a model for this

const router = express.Router();

// GET /api/cpu-coolers — get all CPU coolers
router.get("/", async (req, res) => {
  try {
    const coolers = await CpuCooler.find();
    res.json(coolers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch CPU coolers", err });
  }
});

export default router;
