import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// POST /api/image-recommendation
router.post('/', upload.single('image'), async (req, res) => {
  // Later: Process the image. For now, return dummy recommendations.
  res.json({
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
});

export default router;
