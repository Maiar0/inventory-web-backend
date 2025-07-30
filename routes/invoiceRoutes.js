const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const verifySupabaseToken = require('../middleware/auth'); // Uncomment if you want to use the token verification middleware

router.post('/create', verifySupabaseToken, invoiceController.createInvoice);
router.get('/invoices', verifySupabaseToken, invoiceController.getInvoices);
router.get('/search/:id', verifySupabaseToken, invoiceController.getInvoiceById);
module.exports = router; 