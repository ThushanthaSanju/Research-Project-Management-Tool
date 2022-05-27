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
  }
);

markingSchema.methods.toJSON = function () {
  const markingSchemaObject = this.toObject();

  delete markingSchemaObject.createdAt;
  delete markingSchemaObject.updatedAt;
  delete markingSchemaObject.__v;

  return markingSchemaObject;
};

const MarkingSchema = model("MarkingSchema", markingSchema);

module.exports = MarkingSchema;
