const { Router } = require('express');
const router = Router();

// middleware
const auth = require('../middleware/auth');
const studentRoute = require('../middleware/studentRoute');

// models
const ResearchTopic = require('../models/researchTopic');
const Group = require('../models/group');

// response helper
const { response, error } = require('../helpers/responseHelper');

// register research topic
router.post('/api/research-topics', auth, studentRoute, async (req, res) => {
    try {
        if (!req.user.group) {
            return response(res, false, 'FAiled', 500, "You should have a group in order to create research topic");
        }

        const researchTopic = new ResearchTopic({
            title: req.body.title,
            group: req.user.group
        });

        await researchTopic.save();

        const group = await Group.findByIdAndUpdate({ _id: req.user.group }, { researchTopic: researchTopic._id }, { new: true });

        if (!group) {
            return response(res, false, 'Failed', 404, "Group not found!");
        }

        response(res, true, 'Success', 200, "Research topic registered", { researchTopic });
    } catch (e) {
        error(res, e);
    }
});

// read all research topics
router.get('/api/research-topics', auth, async (req, res) => {
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


module.exports = router;