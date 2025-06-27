import mongoose from "mongoose";
const caseSchema = new mongoose.Schema({
  name: String,
  price: Number,
  type: String,
  color: String,
  psu: String,
  side_panel: String,
  external_525_bays: Number,
  internal_35_bays: Number
});
export default mongoose.model("Case", caseSchema);
