const {supabase} = require('./client.js');
class InvoiceItemModel {
    constructor() {
        this.table = 'invoice_items';
    }
    /**
     * Insert a new invoice line item record.
     *
     * @async
     * @function create
     * @param {{ 
     *   invoice_item_id?: number,   // optional if auto-generated
     *   invoice_id: number,         // ID of the parent invoice
     *   product: number,            // ID of the product being invoiced
     *   quantity: number,           // number of units sold
     *   unit_cost: number,          // cost per unit at time of invoicing
     *   line_total: number          // total for this line (quantity * unit_cost)
     * }} item
     * @returns {Promise<object>}     The inserted invoice_item row
     * @throws {Error}                If the insert fails, with HTTP status and message
     */
    async create(item) {
        const { data, error, status } = supabase
            .from(this.table)
            .insert([item])
            .single()
            .then(({ data, error, status }) => {
                if (error) {
                    throw new Error(`Error ${status}: ${error.message}`);
                }
                return { data, error, status };
      });
    }
    async findById(invoice_item_id) {
        const { data, error, status } = await supabase
            .from(this.table)
            .select('*')
            .eq('invoice_item_id', invoice_item_id)
            .single();
        if (error && status !== 406) {
            throw new Error(`Error ${status}: ${error.message}`);
        }
        return data;
    }
    async list({ page = 1, perPage = 100 } = {}) {
        const from = (page - 1) * perPage;
        const to   = from + perPage - 1;

        const { data, error, status } = await supabase
            .from(this.table)
            .select('*')
            .range(from, to);

        if (error && status !== 406) {
            throw new Error(`Error ${status}: ${error.message}`);
        }
        return data;
    }
    
    async update(invoice_item_id, updates) {
        const { data, error, status } = await supabase
            .from(this.table)
            .update(updates)
            .eq('invoice_item_id', invoice_item_id)
            .single();

        if (error) {
            throw new Error(`Error ${status}: ${error.message}`);
        }
        return data;
    }
    /**
     * Deletes an invoice item by its ID from the database.
     *
     * @async
     * @param {number|string} invoice_item_id - The unique identifier of the invoice item to delete.
     * @returns {Promise<Object|null>} The deleted invoice item data, or null if not found.
     * @throws {Error} If an error occurs during deletion (except for status 406).
     */
    async deleteById(invoice_item_id) {
        const { data, error, status } = await supabase
            .from(this.table)
            .delete()
            .eq('invoice_item_id', invoice_item_id)
            .single();

        if (error && status !== 406) {
            throw new Error(`Error ${status}: ${error.message}`);
        }
        return data;
    }
}