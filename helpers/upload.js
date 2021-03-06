const multer = require("multer");

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

module.exports = upload;