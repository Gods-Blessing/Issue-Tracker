const express = require('express');

const router = express.Router();
const controller = require('../controllers/comments');

router.post('/createcomment', controller.createcomment);

router.get('/delete/:id', controller.delete);








module.exports = router;