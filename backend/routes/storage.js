import express from "express";
import Storage from "../models/Storage.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const storage = await Storage.find();
    res.json(storage);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch storage devices", err });
  }
});

export default router;
