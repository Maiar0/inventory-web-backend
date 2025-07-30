const LogSession = require('../utils/logging/LogSession');
const ApiResponse = require('../utils/ApiResponse');  
const ApiError = require('../utils/ApiError');
const InvoiceService = require('../service/InvoiceService');

exports.createInvoice = async (req, res) => {
    const userId = req.user.uuid;
    const log = new LogSession(userId);
    try {
        const invoice = req.body.invoice;
        const invoiceItems = req.body.invoiceItems;
        const invoiceService = new InvoiceService(log);
        console.log('Creating invoice for user:', userId, 'with data:', invoice, invoiceItems);
        const createInvoice = await invoiceService.create(userId, invoice, invoiceItems);
        log.addEvent('createInvoice', 'Invoice created successfully', { userId, invoice: createInvoice });
        return res.json(ApiResponse.success({invoice_id: createInvoice.invoice.invoice_id}));
    } catch (error) {
        console.error('Error creating invoice:', error);
        log.addEvent('createInvoice', 'Error creating invoice', { error: error.message });
        res.status(500).json(ApiResponse.error(new ApiError('Internal Server Error', 500)));
    } finally {
        log.writeToFile();
    }
}

exports.getInvoiceById = async (req, res) => {
    const userId = req.user.uuid;
    const invoiceId = req.params.id;
    const log = new LogSession(userId);
    try {
        const invoiceService = new InvoiceService(log);
        const invoice = await invoiceService.getById(invoiceId);
        if (!invoice) {
            throw new ApiError('Invoice not found', 404);
        }
        log.addEvent('getInvoiceById', 'Invoice fetched successfully', { userId, invoiceId });
        return res.json(ApiResponse.success(invoice));
    } catch (error) {
        console.error('Error fetching invoice:', error);
        log.addEvent('getInvoiceById', 'Error fetching invoice', { error: error.message });
        res.status(error.status || 500).json(ApiResponse.error(error));
    } finally {
        log.writeToFile();
    }
}

exports.getInvoices = async (req, res) => {
    const userId = req.user.uuid;
    const log = new LogSession(userId);
    try {
        const invoiceService = new InvoiceService(log);
        const invoices = await invoiceService.getAll();
        log.addEvent('getInvoices', 'Fetched all invoices successfully', { userId });
        return res.json(ApiResponse.success(invoices));
    } catch (error) {
        console.error('Error fetching invoices:', error);
        log.addEvent('getInvoices', 'Error fetching invoices', { error: error.message });
        res.status(500).json(ApiResponse.error(new ApiError('Internal Server Error', 500)));
    } finally {
        log.writeToFile();
    }
}
