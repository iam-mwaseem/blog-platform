const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const multerUpload = multer({
  storage: storage,
  //   limits: { fileSize: 50000 },
  //   limits: { fileSize: 25000, fields: 1, files: 1 },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    }
  },
}).fields([{ name: "avatar" }, { name: "coverphoto" }]);

module.exports = multerUpload;
