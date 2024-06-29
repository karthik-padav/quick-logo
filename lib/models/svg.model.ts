import mongoose from "mongoose";

const svgSchema = new mongoose.Schema({
  svg_id: { type: String, required: true },
  svg: { type: String, required: true },
  source: { type: String },
  filename: { type: String, required: true },
});

const Svg = mongoose.models.Svg || mongoose.model("Svg", svgSchema);

export default Svg;
