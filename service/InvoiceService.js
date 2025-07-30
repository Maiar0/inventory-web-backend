const InvoiceItemModel = require('../db/InvoiceItemsModel');
const InvoiceModel = require('../db/InvoiceModel');
class InvoiceService{
    constructor(log) {
        this.log = log;
        this.dbInvoice = new InvoiceModel();
        this.dbItems = new InvoiceItemModel();
    }

    async create(userId, invoice, invoiceItems) {
        this.log.addEvent(`Creating invoice for user: ${invoice.user_id}`);
        const created_by = userId; // Assuming userid is the creator of the invoice

        const invoiceResult = await this.dbInvoice.create({...invoice, created_by});
        console.log('Invoice created with ID:', invoiceResult);
        const invoice_id = invoiceResult.invoice_id;

        const itemPromises = invoiceItems.map(item => {
            this.log.addEvent(`Creating invoice item for invoice: ${invoice_id}, product: ${item.product}`);
            return this.dbItems.create({ ...item, invoice_id });
        });

        const itemResults = await Promise.all(itemPromises);

        return {
            invoice: invoiceResult,
            items: itemResults
        };
    }

    getById(invoice_id) {
        this.log.addEvent(`Fetching invoice by ID: ${invoice_id}`);
        return this.dbInvoice.findById(invoice_id);
    }
    getAll({ page, perPage } = {}) {
        this.log.addEvent(`Fetching all invoices with pagination: page=${page}, perPage=${perPage}`);
        return this.dbInvoice.list({ page, perPage });
    }
}
module.exports = InvoiceService;