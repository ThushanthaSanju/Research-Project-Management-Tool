const { Router } = require('express');
const router = Router();

// middleware
const auth = require('../middleware/auth');
const adminRoute = require('../middleware/adminRoute');
const studentRoute = require('../middleware/studentRoute');
const staffRoute = require('../middleware/staffRoute');

// models
const Group = require('../models/group');
const User = require('../models/user');

// helpers
const { response, error } = require('../helpers/responseHelper');
const Panel = require('../models/panel');

// create group
router.post("/api/users/students/groups", auth, studentRoute, async (req, res) => {
    try {
        // check logged in user has joined to a group
        if (req.user.group) {
            return response(res, false, "Failed", 500, "You already have a group!");
        }

        const { students } = req.body;

        if (students.length !== 3) {
            return response(res, false, "Failed", 500, "Should be 3 students!");
        }

        for (const user of students) {
            const student = await User.findOne({ _id: user });

            // if student not found
            if (!student) {
                return response(res, false, "Failed", 404, "Student not found!");
            }

            // if student already allocated to a group
            if (student.group) {
                return response(res, false, "Failed", 500, `${student.email} already joined to a group!`);
            }

            // if logged in student's id included in req.body
            if (student._id.toString() === req.user.id) {
                return response(res, false, "Failed", 500, `cannot include logged in student's id!`);
            }
        }

        const group = new Group(req.body);
        await group.save();

        // update group id for each student
        [...students, req.user.id].forEach(async (student) => {
            await User.findOneAndUpdate({ _id: student }, { group: group._id }, { new: true });
        });

        response(res, true, "Success", 201, "Group creation successful", { group });
    } catch (e) {
        error(res, e);
    }
});

// read groups
router.get("/api/users/students/groups", auth, adminRoute, async (req, res) => {
    try {
        const match = {};

        if (req.query.name) {
            match.name = req.query.name;
        }

        const groups = await Group.find(match).populate("students");

        response(res, true, "Success", 200, "Groups fetched successfully", {
            groups,
        });
    } catch (e) {
        error(res, e);
    }
});

// read group name
router.get('/api/users/students/groups/:id', auth, async (req, res) => {
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

// read group assign for particular supervisor
router.get('/api/staff/groups', auth, async (req, res) => {
    const { _id } = req.user;
    try {
        const groups = await Group.find({ supervisor: _id });

        response(res, true, 'Success', 200, "Groups fetched", { groups });
    } catch (e) {
        error(res, e);
    }
});

module.exports = router;