const express = require("express");
const router = express.Router();

const commentsController = require("../controllers/comments_controller");
const Passport = require("passport");

// router.get('/',commentsController.comments);
router.post("/create",Passport.checkAuthentication,commentsController.create);


// console.log("posts controller loaded");

module.exports = router;