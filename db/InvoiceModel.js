const {supabase} = require('./client.js');
class InvoiceModel {
    constructor() {
        this.table = 'invoices';
    }
    /**
     * Insert a new invoice record.
     *
     * @async
     * @function create
     * @param {{ 
     *   invoice_id?: number,         // optional if auto-generated
     *   supplier_id: string,         // UUID of the supplier
     *   supplier_invoice_id?: string, // external ID from the supplier
     *   invoice_date: string|Date,   // invoice date
     *   shipping_method: string,     // e.g. 'ground', 'air'
     *   shipping_cost: number,       // cost of shipping
     *   tax_rate: number,            // tax rate applied (e.g. 0.07 for 7%)
     *   tax_amount: number,          // computed tax amount
     *   invoice_total: number       // total invoice amount (incl. tax & shipping)
     * }} invoice
     * @returns {Promise<object>}       The inserted invoice row
     * @throws {Error}                  If the insert fails, with HTTP status and message
     */
    async create(invoice) {
        const { data, error, status } = await supabase
            .from(this.table)
            .insert([invoice])
            .single()
            .select();
        if (error) {
            throw new Error(`Error ${status}: ${error.message}`);
        }
        console.log('Invoice created with ID:', data, error, status);
        return data;
    }
    /**
     * Retrieves a single invoice record by its invoice_id.
     *
     * @async
     * @param {number|string} invoice_id - The unique identifier of the invoice to retrieve.
     * @returns {Promise<Object|null>} The invoice data if found, or null if not found.
     * @throws {Error} If an error occurs during the database query (except for status 406).
     */
    async findById(invoice_id) {
        const { data, error, status } = await supabase
            .from(this.table)
            .select('*')
            .eq('invoice_id', invoice_id)
            .single();
        if (error && status !== 406) {
            throw new Error(`Error ${status}: ${error.message}`);
        }
        return data;
    }
    async update(invoice_id, updates) {
        const { data, error, status } = await supabase
            .from(this.table)
            .update(updates)
            .eq('invoice_id', invoice_id)
            .single();
        if (error && status !== 406) {
            throw new Error(`Error ${status}: ${error.message}`);
        }
        return data;
    }
    /**
     * Retrieves a paginated list of records from the database table.
     *
     * @async
     * @param {Object} [options={}] - Pagination options.
     * @param {number} [options.page=1] - The page number to retrieve.
     * @param {number} [options.perPage=100] - The number of records per page.
     * @returns {Promise<Array<Object>>} The list of records for the specified page.
     * @throws {Error} If a database error occurs (except for status 406).
     */
    async list({ page = 1, perPage = 100 } = {}) {
        const from = (page - 1) * perPage;
        const to = from + perPage - 1;
        const { data, error, status } = await supabase
            .from(this.table)
            .select('*')
            .range(from, to);
        if (error && status !== 406) {
            throw new Error(`Error ${status}: ${error.message}`);
        }
        return data;
    }
    async deleteById(invoice_id) {
        const { data, error, status } = await supabase
            .from(this.table)
            .delete()
            .eq('invoice_id', invoice_id)
            .single();
        if (error && status !== 406) {
            throw new Error(`Error ${status}: ${error.message}`);
        }
        return data;
    }
}
module.exports = InvoiceModel;