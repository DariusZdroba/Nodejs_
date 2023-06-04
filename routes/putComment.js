const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.put('/:id', commentController.putComment)

module.exports = router;