const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');
const verifySupabaseToken = require('../middleware/auth');

router.get('/all', verifySupabaseToken, catalogController.getCatalog);

module.exports = router;