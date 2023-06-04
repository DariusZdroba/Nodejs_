const express = require('express');
const router = express.Router();
const post = require('../controllers/postController');
const multer = require('multer');
const upload = multer();
router.post('/',upload.single('image') ,post.handlePost)

module.exports = router;