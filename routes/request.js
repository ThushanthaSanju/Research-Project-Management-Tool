const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');

const Request = require('../models/request');
const ResearchTopic = require('../models/researchTopic');
const Group = require('../models/group');
const User = require('../models/user');

const { response, error } = require('../helpers/responseHelper');
const staffRoute = require('../middleware/staffRoute');
const studentRoute = require('../middleware/studentRoute');

// create request
router.post('/api/requests', auth, studentRoute, async (req, res) => {
    try {
        const { researchTopic, staffMember } = req.body;

        // validations
        const isValidResearchTopic = await ResearchTopic.findOne({ _id: researchTopic });
        const isValidStaffMember = await User.findOne({ _id: staffMember, role: 'staff' });

        if (!isValidResearchTopic) {
            return response(res, false, 'Failed', 404, "Research topic not found!");
        }

        if (!isValidStaffMember) {
            return response(res, false, 'Failed', 404, "Staff member not found!");
        }

        // count requests for current research topic
        const countExistRequests = await Request.find({ researchTopic, status: 'accepted' }).count();

        // if the count is 2 
        if (countExistRequests === 2) {
            return response(res, false, 'Failed', 500, `Already created two requests for '${isValidResearchTopic.title}'`);
        }

        const isExistRequest = await Request.findOne({ researchTopic, staffMember });

        if (isExistRequest) {
            return response(res, false, 'Failed', 500, "Request already created!");
        }

        const request = new Request({ ...req.body, group: req.user.group.toString() });

        await request.save();

        response(res, true, 'Success', 200, "Request created", { request });
    } catch (e) {
        error(res, e);
    }
});

// read requests for logged in user
router.get('/api/requests', auth, staffRoute, async (req, res) => {

    const match = {};

    if (req.query.researchRole) {
        match.researchRole = req.query.researchRole;
    }

    if (req.query.status) {
        match.status = req.query.status;
    }

    try {
        const array = await Request.find({ staffMember: req.user.id, ...match }).populate({
            path: 'researchTopic',
            model: 'ResearchTopic',
            populate: {
                path: 'group',
                model: 'Group',
                populate: {
                    path: 'students',
                    model: 'User'
                }
            }
        }).exec();

        const requests = [];

        array.forEach((request) => {
            requests.push({
                '_id': request._id,
                title: request.researchTopic.title,
                groupName: request.researchTopic.group.name,
                researchRole: request.researchRole,
                status: request.status
            });
        });

        response(res, true, 'Success', 200, "Research topics fetched successfully", { requests });
    } catch (e) {
        error(res, e);
    }
});

// read request status
router.post('/api/requests/status', auth, async (req, res) => {

    try {
        const requests = await Request.find({ 'group': req.user.group.toString() });

        response(res, true, 'Success', 200, "Requests related to your group", { requests });
    } catch (e) {
        error(res, e);
    }
});

// update request status
router.patch('/api/requests/:id/status', auth, staffRoute, async (req, res) => {
    try {
        const request = await Request.findOne({ _id: req.params.id }).populate('researchTopic').exec();

        if (!request) {
            return response(res, false, 'Failed', 404, "Request not found!");
        }

        if (request.staffMember.toString() !== req.user.id) {
            return response(res, false, 'Failed', 401, "you do not have permission to do this task!");
        }

        const { status } = req.body;

        if (status === 'pending') {
            return response(res, false, 'Failed', 400, "Invalid status!");
        }

        if (request.status !== 'pending') {
            return response(res, false, 'Failed', 400, `Request already ${request.status}`);
        }

        if (status === 'accepted') {
            const group = await Group.findOneAndUpdate({ _id: request.researchTopic.group }, { [request.researchRole]: req.user.id }, { new: true });

            if (!group) {
                return response(res, false, 'Failed', 404, "Group not found!");
            }
        }

        if (status === 'rejected') {
            await Request.findOneAndRemove({ id: request._id });
            return response(res, false, 'Success', 400, "Request deleted");
        }

        request.status = status;
        await request.save();

        response(res, true, 'Success', 200, "Request updated", { request });
    } catch (e) {
        error(res, e);
    }
});


module.exports = router;