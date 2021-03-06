const path = require("path");
const fs = require("fs");
const { Router } = require("express");
const router = Router();
const multer = require("multer");

//middleware
const auth = require("../middleware/auth");
const adminRoute = require("../middleware/adminRoute");

// models
const User = require("../models/user");
const SubmissionType = require("../models/submissionTypes");
const MarkingSchema = require("../models/markingSchema");
const Group = require("../models/group");
const Panel = require("../models/panel");
const Document = require("../models/document");

// enum
const { USER_ROLES } = require("../enum");

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
      !file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|ppt|pptx)$/)
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

// fetch all users
router.get("/api/admin/users", auth, async (req, res) => {
  try {
    const match = {};

    if (req.query.role) {
      match.role = req.query.role;
    }

    const users = await User.find(match);

    response(res, true, "Success", 200, "Users fetched successfully", {
      users,
    });
  } catch (e) {
    error(res, e);
  }
});

// read groups
router.get("/api/admin/groups", auth, async (req, res) => {
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

// create new submission
router.post("/api/admin/submissions", auth, adminRoute, async (req, res) => {
  try {
    const submission = new SubmissionType(req.body);

    await submission.save();

    if (!submission) {
      return response(res, false, "Failed", 400, "Operation failed", {});
    }

    response(res, true, "Success", 201, "Submission type created", {
      submission,
    });
  } catch (error) {
    error(res, error);
  }
});

// fetch all submissions
router.get("/api/admin/submissions", auth, adminRoute, async (req, res) => {
  try {
    const submissions = await SubmissionType.find({});

    response(
      res,
      true,
      "Success",
      200,
      "Submission types fetched successfully",
      { submissions }
    );
  } catch (e) {
    error(res, e);
  }
});

// fetch all marking schemas
router.get("/api/admin/marking-schemas", auth, adminRoute, async (req, res) => {
  try {
    const schemas = await MarkingSchema.find();

    response(
      res,
      true,
      "Success",
      200,
      "Marking schemas fetched successfully",
      { schemas }
    );
  } catch (e) {
    error(res, e);
  }
});

// fetch specific marking schema
router.get(
  "/api/admin/marking-schemas/:id",
  auth,
  adminRoute,
  async (req, res) => {
    try {
      const { fileName } = await MarkingSchema.findOne({
        _id: req.params.id,
      }).select("fileName");

      var file = fs.createReadStream(`./public/${fileName}`);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
      file.pipe(res);
    } catch (e) {
      return error(res, e);
    }
  }
);

// create new marking schema
router.post(
  "/api/admin/marking-schemas",
  auth,
  adminRoute,
  upload.single("file"),
  async (req, res) => {
    try {
      const {
        body: { name },
        file: { filename },
      } = req;

      const markingSchema = new MarkingSchema({ name, fileName: filename });

      await markingSchema.save();

      if (!markingSchema) {
        return response(res, false, "Failed", 400, "Operation failed", {});
      }

      response(res, true, "Success", 201, "Marking schema type created", {
        markingSchema,
      });
    } catch (e) {
      return error(res, e);
    }
  }
);

// update user
router.patch("/api/admin/users", auth, adminRoute, async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await User.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });

    if (!user) {
      return response(res, false, "Not Found", 404, "User does not found", {
        _id,
      });
    }

    response(res, true, "Success", 200, "User updated successfully", { user });
  } catch (e) {
    error(res, e);
  }
});

// delete user
router.delete("/api/admin/users/:id", auth, adminRoute, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return response(res, false, "Not Found", 404, "User does not found", {
        id,
      });
    }

    response(res, true, "Success", 200, "User deleted successfully", { user });
  } catch (e) {
    error(res, e);
  }
});

// read all panels
router.get("/api/admin/panels", auth, adminRoute, async (req, res) => {
  try {
    const panels = await Panel.find();

    response(res, true, "Success", 200, "Panels fetched successfully", {
      panels,
    });
  } catch (e) {
    error(res, e);
  }
});

// create panel
router.post("/api/admin/panels", auth, adminRoute, async (req, res) => {
  try {
    const { name, members } = req.body;

    // ----------------- should be 4 --------------//
    if (members.length !== 4) {
      return response(res, false, "Failed", 404, "Should have two members!");
    }

    const isDuplicates = new Set(members).size !== members.length;

    if (isDuplicates) {
      return response(res, false, "Failed", 404, "Duplicate members found!");
    }

    const isAllStaff = members.every(async (member) => {
      const staff = await User.findOne({ _id: member });
      return staff.role === "staff";
    });

    if (!isAllStaff) {
      return response(res, false, "Failed", 404, "Members should be staff!");
    }

    const panel = new Panel({ name, members });

    await panel.save();

    response(res, true, "Success", 200, "Panel created successfully", {
      panel,
    });
  } catch (e) {
    error(res, e);
  }
});

// allocate panel to specific group
router.patch(
  "/api/admin/groups/:id/allocate-panel",
  auth,
  adminRoute,
  async (req, res) => {
    try {
      const group = await Group.findOne({ _id: req.params.id });

      if (!group) {
        return response(res, false, "Not Found", 404, "Group does not found");
      }

      const panel = await Panel.findOne({ _id: req.body.panel });

      if (!panel) {
        return response(res, false, "Not Found", 404, "Panel does not found");
      }

      group.panel = req.body.panel;

      await group.save();

      response(res, true, "Success", 200, "Panel allocated successfully", {
        group,
      });
    } catch (e) {
      error(res, e);
    }
  }
);

// read all documents
router.get("/api/admin/documents", auth, adminRoute, async (req, res) => {
  try {
    const documents = await Document.find().populate("submission_type");

    return response(
      res,
      true,
      "Success",
      200,
      "Documents fetched successfully",
      { documents }
    );
  } catch (e) {
    return error(res, e);
  }
});

// add new document
router.post(
  "/api/admin/documents",
  auth,
  adminRoute,
  upload.single("file"),
  async (req, res) => {
    try {
      const { submission_type } = req.body;
      const { filename } = req.file;

      const obj = new Document({
        file_name: filename,
        submission_type,
        created_by: USER_ROLES.ADMIN,
      });
      const document = await obj.save();

      if (!document) {
        return response(res, false, "Failed", 400, "Something went wrong", {});
      }

      response(res, true, "Success", 201, "Document uploaded", {});
    } catch (e) {
      error(res, e);
    }
  }
);

module.exports = router;
