const express = require('express');
const router = express.Router();
const post = require('../controllers/postController');

router.post('/', post.handlePost)

module.exports = router;