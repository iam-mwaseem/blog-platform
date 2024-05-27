const express = require("express");
const busboyUpload = require("./../middleware/busboy.middleware");
const multer = require("./../middleware/multer.middleware");
const controller = require("./../controllers");
const router = express.Router();

router.get("/getallusers", controller.userController.getAllUsers);
router.post("/upload", busboyUpload, controller.userController.uploadFile);
router.get("/getuser/:id", controller.userController.getUser);
router.patch("/editprofile/:id", controller.userController.editProfile);

module.exports = router;
