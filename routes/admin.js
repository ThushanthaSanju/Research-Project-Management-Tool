const { Router } = require("express");
const router = Router();

const User = require("../models/user");
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
    const user = await User.findByIdAndDelete(req.params.id)

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
