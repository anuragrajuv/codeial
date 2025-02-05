const express = require('express');
const router = express.Router();
const friendshipController = require('../controllers/friendship_controller');
const passport = require('passport');

router.post('/toggle',passport.checkAuthentication,friendshipController.toggleFriendship);

module.exports = router;