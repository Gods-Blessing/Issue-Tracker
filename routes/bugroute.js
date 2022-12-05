const express = require('express');

const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/bugs');


router.post('/createbug',controller.addbug);

router.get('/bugpage/:id', passport.checkAuthentication,controller.bugpage);







module.exports = router;