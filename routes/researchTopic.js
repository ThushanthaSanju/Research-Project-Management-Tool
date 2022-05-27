const { Router } = require('express');
const router = Router();

// middleware
const auth = require('../middleware/auth');
const studentRoute = require('../middleware/studentRoute');

// models
const ResearchTopic = require('../models/researchTopic');
const Group = require('../models/group');

// helpers
const { response, error } = require('../helpers/responseHelper');
const adminRoute = require('../middleware/adminRoute');

// register research topic
router.post('/api/research-topics/groups', auth, studentRoute, async (req, res) => {
    try {
        const loggedInUser = await req.user.populate('group');

        // if logged in student does not have a group
        if (!loggedInUser.group) {
            return response(res, false, 'Failed', 500, "You should have a group in order to create a topic");
        }

        // if logged in student already registered with a topic
        if (loggedInUser.group.researchTopic) {
            return response(res, false, 'Failed', 500, "You already registered a topic!");
        }

        const researchTopic = new ResearchTopic({
            title: req.body.title,
            introduction: req.body.introduction,
            group: req.user.group._id
        });

        await researchTopic.save();

        // update group with created research topic
        const group = await Group.findByIdAndUpdate({ _id: req.user.group._id.toString() }, { researchTopic: researchTopic._id }, { new: true });

        if (!group) {
            return response(res, false, 'Failed', 404, "Group not found!");
        }

        response(res, true, 'Success', 200, "Research topic registered", { researchTopic });
    } catch (e) {
        error(res, e);
    }
});

// read all research topics
router.get('/api/research-topics', auth, adminRoute, async (req, res) => {
    try {
        const researchTopics = await ResearchTopic.find({});

        response(res, true, 'Success', 200, "Research topics fetched successfully", { researchTopics });
    } catch (e) {
        error(res, e);
    }
});

// read specific research topics
router.get('/api/research-topics/:id', auth, async (req, res) => {
    try {
        const researchTopic = await ResearchTopic.findOne({ _id: req.params.id });

        if (!researchTopic) {
            return response(res, false, 'Failed', 404, "Research topics not found!");
        }

        response(res, true, 'Success', 200, "Research topics fetched successfully", { researchTopic });
    } catch (e) {
        error(res, e);
    }
});

// update research topic
router.patch('/api/research-topics/:id', auth, async (req, res) => {
    try {
        const { title, introduction } = req.body;

        const researchTopic = await ResearchTopic.findByIdAndUpdate({ _id: req.params.id }, { title, introduction });
        researchTopic.isAcceptedByPanel = undefined;
        await researchTopic.save();

        if (!researchTopic) {
            return response(res, false, 'Failed', 404, "Research topics not found!");
        }

        response(res, true, 'Success', 200, "Research topics updated", { researchTopic });
    } catch (e) {
        error(res, e);
    }
});

// evaluate research topic
router.patch('/api/research-topics/:id/panels', auth, async (req, res) => {
    try {
        const { isAcceptedByPanel, panelFeedback } = req.body;

        const researchTopic = await ResearchTopic.findByIdAndUpdate({ _id: req.params.id }, { isAcceptedByPanel, panelFeedback });

        if (!researchTopic) {
            return response(res, false, 'Failed', 404, "Research topics not found!");
        }

        response(res, true, 'Success', 200, "Research topics updated", { researchTopic });
    } catch (e) {
        error(res, e);
    }
});


module.exports = router;