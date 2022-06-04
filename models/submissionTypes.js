const mongoose = require("mongoose");
const { SUBMISSION_TYPES } = require("../enum");

const { Schema, model } = mongoose;

const submissionSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    enum: [
      SUBMISSION_TYPES.INITIAL,
      SUBMISSION_TYPES.PROPOSAL,
      SUBMISSION_TYPES.PROGRESS_REVIEW_ONE,
      SUBMISSION_TYPES.PROGRESS_REVIEW_TWO,
      SUBMISSION_TYPES.FINAL,
    ],
    required: true,
  },
});

submissionSchema.methods.toJSON = function () {
  const submissionObject = this.toObject();

  delete submissionObject.createdAt;
  delete submissionObject.updatedAt;
  delete submissionObject.__v;

  return submissionObject;
};

const SubmissionType = model("SubmissionType", submissionSchema);

module.exports = SubmissionType;
