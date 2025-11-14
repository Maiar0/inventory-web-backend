const { supabase } = require('./client.js');

class CatalogModel {
    constructor() {
        this.productsTable = 'products';
        this.stockMovementsTable = 'stock_movements';
    }

    /**
     * Get comprehensive catalog data with aggregated stock information
     * @param {{ page?: number, perPage?: number }} opts
     * @returns {Promise<object[]>}
     */
    async getCatalogData({ page = 1, perPage = 100 } = {}) {
        const from = (page - 1) * perPage;
        const to = from + perPage - 1;

        const { data, error, status } = await supabase
            .from(this.productsTable)
            .select(`
                product_id,
                sku,
                name,
                description,
                image_url,
                stock_movements!inner(
                    change_qty,
                    unit_price,
                    movement_date
                )
            `)
            .order('name', { ascending: true })
            .range(from, to);

        if (error) {
            throw new Error(`Error ${status}: ${error.message}`);
        }

        // Process the data to aggregate stock information
        return data.map(product => {
            const movements = product.stock_movements || [];
            const totalQuantity = movements.reduce((sum, movement) => sum + movement.change_qty, 0);
            
            // Find oldest stock movement
            const oldestMovement = movements.length > 0 
                ? movements.reduce((oldest, current) => 
                    new Date(current.movement_date) < new Date(oldest.movement_date) ? current : oldest
                )
                : null;

            return {
                product_id: product.product_id,
                sku: product.sku,
                name: product.name,
                description: product.description,
                image_url: product.image_url,
                quantity: totalQuantity,
                oldest_stock_price: oldestMovement ? oldestMovement.unit_price : null,
                oldest_movement_date: oldestMovement ? oldestMovement.movement_date : null
            };
        });
    }

    /**
     * Get current stock quantity for a specific product
     * @param {number} productId
     * @returns {Promise<number>}
     */
    async getCurrentStock(productId) {
        const { data, error, status } = await supabase
            .from(this.stockMovementsTable)
            .select('change_qty')
            .eq('product_id', productId);

        if (error) {
            throw new Error(`Error ${status}: ${error.message}`);
        }

        return data.reduce((sum, movement) => sum + movement.change_qty, 0);
    }

    /**
     * Get the oldest stock price for a specific product
     * @param {number} productId
     * @returns {Promise<object|null>}
     */
    async getOldestStockPrice(productId) {
        const { data, error, status } = await supabase
            .from(this.stockMovementsTable)
            .select('unit_price, movement_date')
            .eq('product_id', productId)
            .order('movement_date', { ascending: true })
            .limit(1)
            .single();

        if (error && status !== 406) {
            throw new Error(`Error ${status}: ${error.message}`);
        }

        return data;
    }

    /**
     * Get catalog data for a single product with stock information
     * @param {number} productId
     * @returns {Promise<object|null>}
     */
    async getProductCatalogData(productId) {
        const { data, error, status } = await supabase
            .from(this.productsTable)
            .select(`
                product_id,
                sku,
                name,
                description,
                image_url,
                stock_movements(
                    change_qty,
                    unit_price,
                    movement_date
                )
            `)
            .eq('product_id', productId)
            .single();

        if (error && status !== 406) {
            throw new Error(`Error ${status}: ${error.message}`);
        }

        if (!data) return null;

        const movements = data.stock_movements || [];
        const totalQuantity = movements.reduce((sum, movement) => sum + movement.change_qty, 0);
        
        const oldestMovement = movements.length > 0 
            ? movements.reduce((oldest, current) => 
                new Date(current.movement_date) < new Date(oldest.movement_date) ? current : oldest
            )
            : null;

        return {
            product_id: data.product_id,
            sku: data.sku,
            name: data.name,
            description: data.description,
            image_url: data.image_url,
            quantity: totalQuantity,
            oldest_stock_price: oldestMovement ? oldestMovement.unit_price : null,
            oldest_movement_date: oldestMovement ? oldestMovement.movement_date : null
        };
    }
}

module.exports = CatalogModel;