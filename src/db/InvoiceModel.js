const {supabase} = require('./client.js');
class InvoiceModel {
    constructor() {
        this.table = 'invoices';
    }
    create(invoice) {
        return supabase
            .from(this.table)
            .insert([invoice])
            .single()
            .then(({data, error, status}) => {
                if (error) {
                    throw new Error(`Error ${status}: ${error.message}`);
                }
                return data;
            });
    }
}