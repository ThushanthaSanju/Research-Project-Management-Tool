const fs = require("fs");
const { Router } = require("express");
const router = Router();
const multer = require("multer");

//middleware
const auth = require("../middleware/auth");
const adminRoute = require("../middleware/adminRoute");

// models
const MarkingSchema = require("../models/markingSchema");

// helpers
const { response, error } = require("../helpers/responseHelper");
const upload = require("../helpers/upload");


// create new marking schema
router.post("/api/marking-schemas", auth, adminRoute, upload.single("file"), async (req, res) => {
    try {
        const { body: { name }, file: { filename } } = req;

        const markingSchema = new MarkingSchema({ name, fileName: filename });

        await markingSchema.save();

        response(res, true, "Success", 201, "Marking schema type created", { markingSchema });
    } catch (e) {
        error(res, e);
    }
}
);

// read all marking schemas
router.get("/api/marking-schemas", auth, adminRoute, async (req, res) => {
    try {
        const schemas = await MarkingSchema.find();

        response(res, true, "Success", 200, "Marking schemas fetched successfully", { schemas });
    } catch (e) {
        error(res, e);
    }
});

// read specific marking schema
router.get("/api/marking-schemas/:id", auth, adminRoute, async (req, res) => {
    try {
        const { fileName } = await MarkingSchema.findOne({ _id: req.params.id }).select("fileName");

        var file = fs.createReadStream(`./public/${fileName}`);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
        file.pipe(res);
    } catch (e) {
        return error(res, e);
    }
}
);

module.exports = router;
