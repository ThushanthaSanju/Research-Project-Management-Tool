const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    supervisor: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    coSupervisor: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    students: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      validate: [arrayLimit, '{PATH} exceeds the limit of 4']
    },
    panel: {
      type: Schema.Types.ObjectId,
      ref: 'Panel'
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 4;
}

const Group = model("Group", groupSchema);

module.exports = Group;
