const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController')

router.put('/:id', fileController.putFile)

module.exports = router;