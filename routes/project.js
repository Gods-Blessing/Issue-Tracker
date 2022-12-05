const express = require('express');

const router = express.Router();
const controller = require('../controllers/project');
const passport = require('passport');

router.get('/', controller.projectpage);
router.post('/addproject', controller.addproject);
router.get('/projectdetailpage/:id', controller.projectpagedetail);

router.get('/deleteproject/:id', controller.deleteproject);

router.post('/update/', passport.checkAuthentication,controller.update);










module.exports = router;