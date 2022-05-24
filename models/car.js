const mongoose = require("mongoose");
const carSchema = new mongoose.Schema(
  {
    manufacturer: {
      type: String,
      trim: true,
      required: true,
    },
    condition: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: [String],
      default: ["Available"],
      enum: ["Available", "Sold"],
    },
    amount: {
      type: String,
      trim: true,
      required: true,
    },
    carmodel: {
      type: String,
      trim: true,
      required: true,
    },
    bodytype: {
      type: String,
      trim: true,
      required: true,
    },
    imgurl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Car", carSchema);
