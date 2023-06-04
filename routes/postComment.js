const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/',commentController.handleComment);

module.exports = router;