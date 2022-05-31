const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const { USER_ROLES: { ADMIN, STAFF, STUDENT } } = require("../enum");

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
      enum: [ADMIN, STAFF, STUDENT],
      required: true
    },
  }
);

documentSchema.methods.toJSON = function () {
  const documentObject = this.toObject();

  delete documentObject.createdAt;
  delete documentObject.updatedAt;
  delete documentObject.__v;

  return documentObject;
};

const Document = model("Document", documentSchema);

module.exports = Document;
