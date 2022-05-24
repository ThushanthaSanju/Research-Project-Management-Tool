const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const { USER_ROLES } = require("../enum");

const documentSchema = new Schema(
  {
    file_name: {
      type: String,
      required: true,
    },
    submission_type: {
      type: Schema.Types.ObjectId,
      ref: "SubmissionType",
      required: true
    },
    created_by: {
      type: String,
      enum: [USER_ROLES.ADMIN, USER_ROLES.STAFF, USER_ROLES.STUDENT],
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Document = model("Document", documentSchema);

module.exports = Document;
