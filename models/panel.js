const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const panelSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
        },
        members: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'User'
            }],
            validate: [arrayLimit, '{PATH} exceeds the limit of 4']
        }
    },
    {
        timestamps: true,
    }
);

function arrayLimit(val) {
    return val.length <= 4;
}

const Panel = model("Panel", panelSchema);

module.exports = Panel;
