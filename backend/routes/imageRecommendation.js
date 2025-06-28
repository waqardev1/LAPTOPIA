import express from "express";
import multer from "multer";
import Laptop from "../models/Laptop.js"; // <-- adjust if your model path is different

// --- ADD THESE IMPORTS ---
import fetch from "node-fetch";
import fs from "fs";
import FormData from "form-data";
// -------------------------

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const CLASS_KEYWORDS = {
  "c0": ["alpha", "steam", "alienware"],
  "c1": ["xps 27", "7760"],
  "c2": ["alienware 13 r3", "gaming"],
  "c3": ["alienware m16 r1", "gaming"],
  "c4": ["alienware m17 r4", "gaming"],
  "c5": ["alienware x17 r2", "gaming"],
  "c6": ["chromebook 11 3180", "chromebook", "student"],
  "c7": ["g15 5510", "gaming"],
  "c8": ["rog strix scar 17", "asus", "2023"],
  "c9": ["zephyrus g16", "rog", "2024"],
  "c10": ["xps 13 9370", "ultrabook"],
  "c11": ["xps 14 9440", "business"],
  "c12": ["xps 15 9500", "creator"],
  "c13": ["xps 16 9640", "premium"],
  "c14": ["xps 17 9730", "large", "performance"],
  "c15": ["alienware m16 r2", "gaming"],
  "c16": ["alienware x14 r2", "slim", "gaming"],
};

router.post('/', upload.single('image'), async (req, res) => {
  const filePath = req.file.path;
  let predictedClass = null;

  try {
    // ---- (1) Call the YOLO Python API ----
    const form = new FormData();
    form.append('image', fs.createReadStream(filePath), req.file.originalname);

    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      body: form,
      headers: form.getHeaders(),
    });
    const result = await response.json();

    // Expecting result.label as predicted class (like "c15")
    predictedClass = result.label;
    if (!predictedClass) throw new Error("No label returned from classifier");

    // ---- (2) Map class to keywords ----
    const keywords = CLASS_KEYWORDS[predictedClass] || [];
    if (!keywords.length) {
      return res.json({ laptops: [] });
    }

    // ---- (3) Query laptops using $or on name/specs fields ----
    const regexQueries = keywords.map(keyword => ({
      name: { $regex: keyword, $options: "i" }
    }));

    let laptops = await Laptop.find({ $or: regexQueries }).limit(12);

    // ---- (4) Return found laptops or fallback ----
    if (!laptops.length) {
      return res.json({
        laptops: [
          {
            name: "HP Spectre x360",
            specs: "i7-1355U, 16GB RAM, 512GB SSD, 13.5\" Touch",
            price: "Rs 289,000",
            image: "/images/laptops/hp-spectre.jpg",
            storeLink: "#",
            reason: "Visually similar to your uploaded image",
          },
          {
            name: "Dell XPS 13",
            specs: "i5-1235U, 8GB RAM, 512GB SSD, 13.3\" FHD",
            price: "Rs 244,000",
            image: "/images/laptops/dell-xps13.jpg",
            storeLink: "#",
            reason: "Best match from our AI analysis",
          }
        ]
      });
    }

    res.json({
      laptops: laptops.map(lap => ({
        name: lap.name,
        specs: lap.specs,
        price: lap.price,
        image: lap.image,
        storeLink: lap.storeLink,
        reason: `Recommended for "${predictedClass}" image class`,
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process image", details: err.message });
  } finally {
    // --- (5) Always cleanup the uploaded image ---
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
});

export default router;
