const mongoose = require("mongoose");

const { REQUEST_STATUS_TYPES: { ACCEPTED, PENDING, REJECTED }, RESEARCH_ROLES: { CO_SUPERVISOR, SUPERVISOR } } = require("../enum");

const { Schema, model } = mongoose;

const requestSchema = new Schema({
    researchTopic: {
        type: Schema.Types.ObjectId,
        ref: 'ResearchTopic'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    staffMember: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    researchRole: {
        type: String,
        enum: [SUPERVISOR, CO_SUPERVISOR]
    },
    status: {
        type: String,
        default: PENDING,
        enum: [ACCEPTED, PENDING, REJECTED]
    }
}
);

requestSchema.methods.toJSON = function () {
    const requestObject = this.toObject();

    delete requestObject.createdAt;
    delete requestObject.updatedAt;
    delete requestObject.__v;

    return requestObject;
};

const Request = model("Request", requestSchema);

module.exports = Request;
