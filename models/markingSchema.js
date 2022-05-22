const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const markingSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MarkingSchema = model("MarkingSchema", markingSchema);

module.exports = MarkingSchema;
