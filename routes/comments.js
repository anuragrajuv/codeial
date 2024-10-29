const express = require("express");
const router = express.Router();

const commentsController = require("../controllers/comments_controller");
const passport = require("passport");

// router.get('/',commentsController.comments);
router.post("/create",passport.checkAuthentication,commentsController.create);
router.get("/destroy/:id",passport.checkAuthentication,commentsController.destroy)

// console.log("posts controller loaded");

module.exports = router;