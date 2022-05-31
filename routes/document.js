const { Router } = require("express");
const router = Router();

//middleware
const auth = require("../middleware/auth");
const adminRoute = require("../middleware/adminRoute");
const studentRoute = require("../middleware/studentRoute");
const staffRoute = require("../middleware/staffRoute");

// models
const Document = require("../models/document");
const SubmissionType = require("../models/submissionTypes");
const Group = require("../models/group");
const Panel = require("../models/panel");

// enum
const { USER_ROLES: { ADMIN, STUDENT } } = require("../enum");

// helpers
const { response, error } = require("../helpers/responseHelper");
const upload = require("../helpers/upload");

// create new document
router.post("/api/documents", auth, adminRoute, upload.single("file"), async (req, res) => {
    try {
        const { submission_type } = req.body;
        const { filename } = req.file;

        const document = new Document({ file_name: filename, submission_type, created_by: ADMIN });
        await document.save();

        response(res, true, "Success", 201, "Document uploaded");
    } catch (e) {
        error(res, e);
    }
}
);

// document submission
router.post("/api/users/students/groups/submissions", auth, studentRoute, upload.single("file"), async (req, res) => {
    try {
        const { submission_type } = req.body;

        const submissionType = await SubmissionType.findOne({ _id: submission_type });

        if (!submissionType) {
            return response(res, false, "Not found", 404, "Submission type not found!");
        }

        const document = new Document({
            file_name: req.file.filename,
            submission_type: submissionType._id,
            created_by: STUDENT
        });

        await document.save();

        const group = await Group.findOneAndUpdate({ _id: req.user.group }, { $push: { submissions: document } });

        if (!group) {
            return response(res, false, "Not found", 404, "Group not found!");
        }

        response(res, true, "Success", 201, "Document uploaded successful", { document });
    } catch (e) {
        error(res, e);
    }
}
);

// read all documents
router.get("/api/documents", auth, adminRoute, async (req, res) => {
    try {
        const documents = await Document.find().populate("submission_type");

        return response(res, true, "Success", 200, "Documents fetched successfully", { documents });
    } catch (e) {
        return error(res, e);
    }
});

// read templates
router.get("/api/documents/templates", auth, async (req, res) => {
    try {
        const templates = await Document.find({ created_by: ADMIN }).populate('submission_type');

        response(res, true, "Success", 200, "Templated fetched successfully", { templates });
    } catch (e) {
        return error(res, e);
    }
});

// read groups for evaluate
router.get('/api/documents/groups/my-panel', auth, staffRoute, async (req, res) => {
    try {
        const panel = await Panel.findOne({ members: { $in: [req.user.id] } });

        if (!panel) {
            return response(res, false, "Failed", 404, `You do not have a panel yet!`);
        }

        const groups = await Group.find({ panel: panel }).populate('submissions researchTopic');

        response(res, true, 'Success', 200, "Groups fetched successfully", { groups });
    } catch (e) {
        error(res, e);
    }
});


module.exports = router;
