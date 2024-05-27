const express = require("express");
const controller = require("./../controllers");
const router = express.Router();

router.post("/createpost", controller.postController.createpost);
router.get("/getallposts", controller.postController.getAllPost);
router.get("/getpost/:id", controller.postController.getpost);
router.put("/updatepost/:id", controller.postController.updatepost);
router.delete("/deletepost/:id", controller.postController.deletepost);

module.exports = router;
