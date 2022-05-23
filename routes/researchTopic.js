const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');

const ResearchTopic = require('../models/researchTopic');
const { response, error } = require('../helpers/responseHelper');

// register research topic
router.post('/api/research-topics', auth, async (req, res) => {
    try {
        const researchTopic = new ResearchTopic(req.body);

        await researchTopic.save();

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