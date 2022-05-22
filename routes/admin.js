const path = require("path");
const fs = require("fs");
const { Router } = require("express");
const router = Router();
const multer = require("multer");

const User = require("../models/user");
const SubmissionType = require("../models/submissionTypes");
const MarkingSchema = require("../models/markingSchema");
const { response, error } = require("../src/helpers/responseHelper");

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
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

router.get("/api/admin/users", async (req, res) => {
  const { role } = req.query;
  try {
    let users;

    if (role) {
      users = await User.find({ role });
    } else {
      users = await User.find();
    }

    return response(res, true, "Success", 200, "Users fetched successfully", {
      users,
    });
  } catch (e) {
    return error(res, e);
  }
});

router.get("/api/admin/submissions", async (req, res) => {
  try {
    const submissions = await SubmissionType.find();

    return response(
      res,
      true,
      "Success",
      200,
      "Submission types fetched successfully",
      {
        submissions,
      }
    );
  } catch (e) {
    return error(res, e);
  }
});

router.get("/api/admin/marking-schemas", async (req, res) => {
  try {
    const schemas = await MarkingSchema.find();

    return response(
      res,
      true,
      "Success",
      200,
      "Marking schemas fetched successfully",
      {
        schemas,
      }
    );
  } catch (e) {
    return error(res, e);
  }
});

router.get("/api/admin/marking-schemas/:id", async (req, res) => {
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
});

router.post("/api/admin/submissions", async (req, res) => {
  try {
    const obj = new SubmissionType({ ...req.body });
    const submission = await obj.save();

    if (!submission) {
      return response(res, false, "Failed", 400, "Operation failed", {});
    }

    return response(res, true, "Success", 201, "Submission type created", {
      submission,
    });
  } catch (error) {
    return error(res, error);
  }
});

router.post(
  "/api/admin/marking-schemas",
  upload.single('file'),
  async (req, res) => {
    try {
      const obj = new MarkingSchema({
        name: req.body.name,
        fileName: req.file.filename,
      });
      const markingSchema = await obj.save();

      if (!markingSchema) {
        return response(res, false, "Failed", 400, "Operation failed", {});
      }

      return response(
        res,
        true,
        "Success",
        201,
        "Marking schema type created",
        {
          markingSchema,
        }
      );
    } catch (e) {
      return error(res, e);
    }
  }
);

router.patch("/api/admin/users", async (req, res) => {
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

    return response(res, true, "Success", 200, "User updated successfully", {
      user,
    });
  } catch (e) {
    return error(res, e);
  }
});

router.delete("/api/admin/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return response(res, false, "Not Found", 404, "User does not found", {
        id,
      });
    }

    return response(res, true, "Success", 200, "User deleted successfully", {
      user,
    });
  } catch (e) {
    return error(res, e);
  }
});

module.exports = router;
