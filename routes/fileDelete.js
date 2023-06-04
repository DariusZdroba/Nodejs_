const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.delete('/', fileController.deleteFile);

module.exports = router;