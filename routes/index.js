const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')

router.get("/",homeController.home);
router.get("/home",homeController.actionName);


console.log("router loaded");
module.exports = router;