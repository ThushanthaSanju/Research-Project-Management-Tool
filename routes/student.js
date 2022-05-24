const { Router } = require("express");
const router = Router();
const multer = require("multer");

// middleware
const auth = require("../middleware/auth");
const studentRoute = require("../middleware/studentRoute");

// models
const Group = require("../models/group");
const User = require("../models/user");
const SubmissionTypes = require("../models/submissionTypes");
const Document = require("../models/document");

// enum
const { USER_ROLES } = require('../enum')

// response helper
const { response, error } = require("../helpers/responseHelper");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./public");
    },
    filename(req, file, cb) {
      const fileName = `${new Date().getTime()}_${file.originalname}`;
      cb(null, fileName);
    },
  }),
  fileFilter(req, file, cb) {
    if (
      !file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|ppt)$/)
    ) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

// read templates
router.get("/api/students/templates", auth, studentRoute, async (req, res) => {
  try {
    const templates = await Document.find({ created_by: USER_ROLES.ADMIN }).populate('submission_type');

    response(res, true, "Success", 200, "Templated fetched successfully", { templates });
  } catch (e) {
    return error(res, e);
  }
})

router.get("/api/students/submissions", auth, async (req, res) => {
  try {
    const submissions = await SubmissionTypes.find({});

    return response(
      res,
      true,
      "Success",
      200,
      "Submissions fetched successfully",
      { submissions }
    );
  } catch (e) {
    error(res, e);
  }
});

// read specific student
router.get("/api/students/:id", auth, async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id });

    if (student) {
      return response(res, false, "Failed", 404, "Student not found!");
    }

    response(res, true, "Success", 200, "Students fetched successfully", {
      student,
    });
  } catch (e) {
    return error(res, e);
  }
});

router.get("/api/students/profile/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .populate({
        path: "group",
        populate: "supervisor coSupervisor researchTopic",
      })
      .exec();

    if (!user) {
      return response(res, false, "Failed", 404, "Student fetched failed!");
    }

    response(res, true, "Success", 200, "Student fetched successfully", {
      user,
    });
  } catch (e) {
    error(res, e);
  }
});

// create group
router.post("/api/students/groups", auth, studentRoute, async (req, res) => {
  try {
    const { students } = req.body;

    const group = new Group(req.body);

    await group.save();

    if (!group) {
      return response(res, false, "Failed", 400, "Group creation failed!");
    }

    students.forEach(async (student) => {
      await User.findOneAndUpdate(
        { _id: student },
        { group: group._id },
        { new: true }
      );
    });

    response(res, true, "Success", 201, "Group creation successful", { group });
  } catch (e) {
    error(res, e);
  }
});

// document submission
router.post(
  "/api/students/submissions",
  upload.single("file"),
  async (req, res) => {
    try {
      const { group_id, type_id } = req.body;

      const obj = new Document({
        file_name: req.file.filename,
        submission_type: type_id,
        created_by: USER_ROLES.STUDENT
      });

      const document = await obj.save();

      if (!document) {
        response(res, false, "Failed", 400, "Operation failed", { });
      }

      const group = await Group.updateOne(
        { _id: group_id },
        { $push: { submissions: document } }
      );

      response(res, true, "Success", 201, "Document uploaded successful", { document });

    } catch (e) {
      error(res, e);
    }
  }
);

module.exports = router;
