const { Router } = require("express");
const router = Router();
const multer = require("multer");

//middleware
const auth = require("../middleware/auth");
const adminRoute = require("../middleware/adminRoute");

// models
const SubmissionType = require("../models/submissionTypes");

// helpers
const { response, error } = require("../helpers/responseHelper");

// create new submission
router.post("/api/submissions", auth, adminRoute, async (req, res) => {
    try {
        const submission = new SubmissionType(req.body);

        await submission.save();

        response(res, true, "Success", 201, "Submission type created", { submission });
    } catch (error) {
        error(res, error);
    }
});

// read all submissions
router.get("/api/submissions", auth, async (req, res) => {
    try {
        const submissions = await SubmissionType.find({});

        response(res, true, "Success", 200, "Submission types fetched successfully", { submissions });
    } catch (e) {
        error(res, e);
    }
});

module.exports = router;
