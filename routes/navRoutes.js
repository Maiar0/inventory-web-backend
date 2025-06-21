const express = require('express');
const router = express.Router();
const navController = require('../controllers/navController');
const verifySupabaseToken = require('../middleware/auth'); // Uncomment if you want to use the token verification middleware
router.get('/home',/*verifySupabaseToken,*/ navController.getHome);

module.exports = router; 