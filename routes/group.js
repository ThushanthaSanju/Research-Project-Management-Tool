const { Router } = require('express');
const router = Router();

const auth = require('../middleware/auth');
const studentRoute = require('../middleware/studentRoute');

const Group = require('../models/group');
const { response, error } = require('../helpers/responseHelper');
const User = require('../models/user');

// create group
router.post("/api/students/groups", auth, studentRoute, async (req, res) => {
    try {
        // check logged in user has joined to a group
        if (req.user.group) {
            return response(res, false, "Failed", 500, "You already have a group!");
        }

        const { students } = req.body;

        // check student exist or not
        students.forEach(async (user) => {
            const student = await User.findOne({ _id: user });

            // if student not found
            if (!student) {
                return response(res, false, "Failed", 404, "Student not found!");
            }

            // if student already allocated to a group
            if (student.group) {
                return response(res, false, "Failed", 500, `${student.email} already joined to a group!`);
            }
        });

        const group = new Group(req.body);
        await group.save();

        students.forEach(async (student) => {
            await User.findOneAndUpdate({ _id: student }, { group: group._id }, { new: true });
        });

        response(res, true, "Success", 201, "Group creation successful", { group });
    } catch (e) {
        error(res, e);
    }
});

// read group name
router.get('/api/groups/:id', auth, async (req, res) => {
    try {
        const group = await Group.findOne({ _id: req.params.id });

        if (!group) {
            return response(res, false, 'Failed', 404, "Group not found!");
        }
        response(res, true, 'Success', 200, "Group name fetched", { name: group.name });
    } catch (e) {
        error(res, e);
    }
});

module.exports = router;