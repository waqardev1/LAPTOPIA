import express from "express";
import Case from "../models/Case.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cases = await Case.find();
    res.json(cases); // returns an array
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cases", err });
  }
});

export default router;
