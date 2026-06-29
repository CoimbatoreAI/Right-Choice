import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  days: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String }
}, { timestamps: true });

export const Package = mongoose.model("Package", packageSchema);
