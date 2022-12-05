const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

const controller = require('../controllers/userinterface');


router.use('/user', require('./userroute'));
router.use('/bug', require('./bugroute'));
router.use('/comment', require('./comment'));
router.use('/project', passport.checkAuthentication,require('./project'));

router.get('/', controller.userinterface);
router.get('/signin',controller.signin);
router.get('/home', passport.checkAuthentication,controller.home);

router.get('/signout', controller.signout)












module.exports = router;