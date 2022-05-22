const { Router } = require("express");
const router = Router();

const User = require("../models/user");
const { response, error } = require("../src/helpers/responseHelper");

router.get("/api/admin/users", async (req, res) => {
  try {
    const users = await User.find();

    response(res, true, "Success", 200, "Users fetched successfully", {
      users,
    });
  } catch (e) {
    error(res, e);
  }
});

module.exports = router;
