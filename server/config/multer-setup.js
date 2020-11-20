const multer = require("multer")

exports.multerUpload = multer({
    storage: multer.diskStorage({})
})