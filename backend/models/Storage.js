import mongoose from "mongoose";
const storageSchema = new mongoose.Schema({
  name: String,
  price: Number,
  capacity: Number,
  price_per_gb: Number,
  type: mongoose.Schema.Types.Mixed,
  cache: Number,
  form_factor: mongoose.Schema.Types.Mixed,
  interface: String
});
export default mongoose.model("Storage", storageSchema);
