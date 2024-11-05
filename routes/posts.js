const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts_controller");
const passport = require("passport");

// router.get('/',postsController.posts);
router.post("/create",passport.checkAuthentication,postsController.create);
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);

// console.log("posts controller loaded");

module.exports = router;