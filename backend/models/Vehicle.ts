import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  img: { type: String },
  gallery: [{ type: String }],
  localTariff: { type: Map, of: String },
  outstationTariff: {
    perDayRental: String,
    ac: String,
    nonAc: String,
    minKms: String,
    batta: String
  }
}, { timestamps: true });

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
