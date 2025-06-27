import mongoose from "mongoose";

const motherboardSchema = new mongoose.Schema({
  name: String,
  price: Number,
  socket: String,
  form_factor: String,
  max_memory: Number,
  memory_slots: Number,
  color: String
});
export default mongoose.model("Motherboard", motherboardSchema);
