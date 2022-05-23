const mongoose = require("mongoose");

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
        enum: ['supervisor', 'coSupervisor']
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['accepted', 'rejected', 'pending']
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
