import mongoose from "mongoose";
const monitorSchema = new mongoose.Schema({
  name: String,
  price: Number,
  screen_size: Number,
  resolution: [Number],      // e.g. [2560, 1440]
  refresh_rate: Number,
  response_time: Number,
  panel_type: String,
  aspect_ratio: String
});
export default mongoose.model("Monitor", monitorSchema);
