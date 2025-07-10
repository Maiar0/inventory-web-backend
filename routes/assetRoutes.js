const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const verifySupabaseToken = require('../middleware/auth'); 

router.post('/upload', verifySupabaseToken, assetController.uploadAsset);
router.get('/assets', verifySupabaseToken, assetController.getAssets);

module.exports = router; 