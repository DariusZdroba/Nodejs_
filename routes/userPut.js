const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.put('/:id', usersController.putUser)

module.exports = router;