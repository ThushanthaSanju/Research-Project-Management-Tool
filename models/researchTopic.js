const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const researchTopicSchema = new Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true,
        },
        introduction: {
            type: String,
            required: true
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: 'Group',
            required: true
        },
        isAcceptedByPanel: {
            type: Boolean
        },
        panelFeedback: {
            type: String
        }
    }
);

researchTopicSchema.methods.toJSON = function () {
    const researchTopicObject = this.toObject();

    delete researchTopicObject.createdAt;
    delete researchTopicObject.updatedAt;
    delete researchTopicObject.__v;

    return researchTopicObject;
};

const ResearchTopic = model("ResearchTopic", researchTopicSchema);

module.exports = ResearchTopic;
