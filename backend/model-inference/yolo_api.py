from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import shutil
import os

CLASS_LABELS = [
    "Alienware alpha or Alienware steam machine",
    "XPS 27 7760",
    "Alienware 13 R3",
    "Dell Alienware m16 R1",
    "Alienware m17 R4",
    "Alienware x17 R2",
    "Chromebook 11 3180",
    "Dell G15 5510",
    "ASUS ROG Strix SCAR 17 (2023)",
    "ROG Zephyrus G16 (2024) GU605",
    "Dell XPS 13 9370",
    "Dell XPS 14 9440",
    "Dell XPS 15 9500",
    "Dell XPS 16 9640",
    "XPS 17 9730",
    "Dell Alienware m16 R2",
    "Alienware x14 R2"
]

MODEL_PATH = "best.pt"
model = YOLO(MODEL_PATH)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or restrict to your frontend if you wish
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict_image(image: UploadFile = File(...)):
    temp_path = f"temp_{image.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    results = model(temp_path, imgsz=224)
    os.remove(temp_path)
    pred = int(results[0].probs.top1)
    pred_label = CLASS_LABELS[pred]
    return {
        "label": pred_label,
        "label_idx": pred
    }
