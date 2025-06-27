import mongoose from "mongoose";
const videoCardSchema = new mongoose.Schema({
  name: String,
  price: Number,
  chip: String,
  memory: Number,
  core_clock: Number,
  boost_clock: Number,
  color: String,
  length: Number,
  tdp: Number,
  interface: String
});
export default mongoose.model("VideoCard", videoCardSchema);
