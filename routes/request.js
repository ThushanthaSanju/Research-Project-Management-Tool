const { Router } = require('express');
const router = Router();

// middleware
const auth = require('../middleware/auth');
const staffRoute = require('../middleware/staffRoute');
const studentRoute = require('../middleware/studentRoute');

// models
const Request = require('../models/request');
const ResearchTopic = require('../models/researchTopic');
const Group = require('../models/group');
const User = require('../models/user');
// helpers
const { response, error } = require('../helpers/responseHelper');
const { REQUEST_STATUS_TYPES: { PENDING, ACCEPTED, REJECTED } } = require('../enum');


// create request
router.post('/api/requests/staff', auth, studentRoute, async (req, res) => {
    try {

        const loggedInUser = await req.user.populate('group');
        const group = loggedInUser.group._id.toString();
        const researchTopic = loggedInUser.group.researchTopic.toString();

        const staffMember = req.body.staffMember;
        const researchRole = req.body.researchRole;

        // validations
        const isValidResearchTopic = await ResearchTopic.findOne({ _id: researchTopic });
        const isValidStaffMember = await User.findOne({ _id: staffMember, role: 'staff' });

        if (!isValidResearchTopic) {
            return response(res, false, 'Failed', 404, "Research topic not found!");
        }

        if (!isValidStaffMember) {
            return response(res, false, 'Failed', 404, "Staff member not found!");
        }

        // const allExistRequests = await Request.find({ group, $or: [{ status: 'PENDING' }, { status: 'ACCEPTED' }] });

        const request = new Request({
            researchTopic,
            group,
            staffMember,
            researchRole
        });

        await request.save();

        response(res, true, 'Success', 200, "Request created", { request });
    } catch (e) {
        error(res, e);
    }
});

// read requests for logged in user
router.get('/api/requests/me', auth, staffRoute, async (req, res) => {

    const match = {};

    if (req.query.researchRole) {
        match.researchRole = req.query.researchRole;
    }

    if (req.query.status) {
        match.status = req.query.status;
    }

    try {
        const requests = await Request.find({ staffMember: req.user.id, ...match }).populate({
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

        response(res, true, 'Success', 200, "Research topics fetched successfully", { requests });
    } catch (e) {
        error(res, e);
    }
});

// read request status
router.post('/api/requests/groups/status', auth, async (req, res) => {

    try {
        const requests = await Request.find({ 'group': req.user.group.toString() });

        response(res, true, 'Success', 200, "Requests related to your group", { requests });
    } catch (e) {
        error(res, e);
    }
});

// update request status
router.patch('/api/requests/:id/groups/status', auth, staffRoute, async (req, res) => {
    try {
        const request = await Request.findOne({ _id: req.params.id }).populate('researchTopic');

        if (!request) {
            return response(res, false, 'Failed', 404, "Request not found!");
        }

        // authorize member only can update the request status
        if (request.staffMember.toString() !== req.user.id) {
            return response(res, false, 'Failed', 401, "Unauthorized access!");
        }

        const { status } = req.body;

        // anyone cannot change the status to 'pending'
        if (status === PENDING) {
            return response(res, false, 'Failed', 400, "Invalid status!");
        }

        // staff member cannot update status twice
        if (request.status !== PENDING) {
            return response(res, false, 'Failed', 400, `Request already ${request.status}`);
        }

        // if accepted then update the group with specific supervisor/co-supervisor
        if (status === ACCEPTED) {
            const group = await Group.findOneAndUpdate(
                { _id: request.researchTopic.group },
                { [request.researchRole]: req.user.id }, { new: true }
            );

            if (!group) {
                return response(res, false, 'Failed', 404, "Group not found!");
            }
        }

        // if rejected then remove the request
        if (status === REJECTED) {
            await Request.findOneAndRemove({ id: request._id });
            return response(res, false, 'Success', 400, "Request deleted!");
        }

        request.status = status;
        await request.save();

        response(res, true, 'Success', 200, "Request updated", { request });
    } catch (e) {
        error(res, e);
    }
});


module.exports = router;