const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController')

router.delete('/', commentController.deleteComment)

module.exports = router;