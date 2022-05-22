const { Router } = require("express");
const router = Router();

const User = require("../models/user");
const SubmissionType = require("../models/submissionTypes");
const { response, error } = require("../src/helpers/responseHelper");

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

    return response(res, true, "Success", 200, "Submission types fetched successfully", {
      submissions,
    });
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

    return response(res, true, "Success", 201, "Submission type created", {submission});
  } catch (error) {
    return error(res, error);
  }
});

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
