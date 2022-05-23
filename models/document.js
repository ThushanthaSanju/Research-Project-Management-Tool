const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const documentSchema = new Schema(
  {
    file_name: {
      type: String,
      required: true,
    },
    submission_type: {
      type: Schema.Types.ObjectId,
      ref: 'SubmissionType'
    },
  },
  {
    timestamps: true,
  }
);

const Document = model("Document", documentSchema);

module.exports = Document;
