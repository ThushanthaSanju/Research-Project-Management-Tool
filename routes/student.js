const { Router } = require("express");
const router = Router();

// middleware
const auth = require("../middleware/auth");
const studentRoute = require("../middleware/studentRoute");

// models
const Group = require("../models/groups");
const User = require("../models/user");

// response helper
const { response, error } = require("../helpers/responseHelper");

// read groups
router.get('/api/students/groups', auth, async (req, res) => {
  try {
    const match = {};

    if (req.query.name) {
      match.name = req.query.name;
    }
    const groups = await Group.find(match).populate('students');

    response(res, true, "Success", 200, "Groups fetched successfully", groups);
  } catch (e) {
    error(res, e);
  }
});

// read specific student
router.get("/api/students/:id", auth, async (req, res) => {
  try {
    const students = await User.find({ role: "student", _id: { $ne: req.params.id } });

    return response(res, true, "Success", 200, "Students fetched successful", {
      students,
    });
  } catch (e) {
    return error(res, e);
  }
});

router.get("/api/students/profile/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).populate("group");

    if (!user) {
      return response(res, false, "Failed", 404, "Student fetched failed!");
    }

    response(res, true, "Success", 200, "Student fetched successfully", { user });
  } catch (e) {
    error(res, e);
  }
});

// create group
router.post("/api/students/groups", auth, studentRoute, async (req, res) => {
  try {
    const group = new Group(req.body);

    await group.save();

    await User.findOneAndUpdate({ _id: req.body.students[0] }, { group: group._id }, { new: true });

    if (!group) {
      return response(res, false, "Failed", 400, "Group creation failed!");
    }

    response(res, true, "Success", 201, "Group creation successful", { group });
  } catch (e) {
    error(res, e);
  }
});

module.exports = router;
