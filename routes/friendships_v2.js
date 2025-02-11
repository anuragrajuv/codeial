const express = require('express');
const router = express.Router();
const friendshipController = require('../controllers/friendship_controller_v2');
const passport = require('passport');


router.post('/add',passport.checkAuthentication,friendshipController.toggleFriendship);
router.post('/remove',passport.checkAuthentication,friendshipController.toggleFriendship);


module.exports = router;