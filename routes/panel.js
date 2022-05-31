const { Router } = require("express");
const router = Router();

//middleware
const auth = require("../middleware/auth");
const adminRoute = require("../middleware/adminRoute");

// models
const User = require("../models/user");
const Group = require("../models/group");
const Panel = require("../models/panel");

// helpers
const { response, error } = require("../helpers/responseHelper");

// create panel
router.post("/api/users/staff/panels", auth, adminRoute, async (req, res) => {
    try {
        const { name, members } = req.body;

        if (members.length !== 4) {
            return response(res, false, "Failed", 404, "Should have four members for a panel!");
        }

        const isDuplicates = new Set(members).size !== members.length;

        if (isDuplicates) {
            return response(res, false, "Failed", 404, "Duplicate members found!");
        }

        for (const member of members) {
            const staff = await User.findOne({ _id: member });

            if (!staff) {
                return response(res, false, "Not found", 404, "Staff member not found", { member });
            }
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

        response(res, true, "Success", 200, "Panel created successfully", { panel });
    } catch (e) {
        error(res, e);
    }
});

// read all panels
router.get("/api/users/staff/panels", auth, adminRoute, async (req, res) => {
    try {
        const panels = await Panel.find();

        response(res, true, "Success", 200, "Panels fetched successfully", { panels });
    } catch (e) {
        error(res, e);
    }
});

// allocate panel to a specific group
router.patch("/api/users/students/groups/:id/allocate-panel", auth, adminRoute, async (req, res) => {
    try {
        const group = await Group.findOne({ _id: req.params.id });

        if (!group) {
            return response(res, false, "Not Found", 404, "Group not found");
        }

        const panel = await Panel.findOne({ _id: req.body.panel });

        if (!panel) {
            return response(res, false, "Not Found", 404, "Panel not found");
        }

        group.panel = req.body.panel;

        await group.save();

        response(res, true, "Success", 200, "Panel allocated successfully", { group });
    } catch (e) {
        error(res, e);
    }
}
);

module.exports = router;
