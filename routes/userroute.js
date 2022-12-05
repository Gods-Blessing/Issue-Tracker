const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const passport = require('passport');




router.post('/createsession',  passport.authenticate('local', {
    failureRedirect: '/signin',
}),controller.creatession);

router.post('/createuser', controller.createuser);











module.exports = router;