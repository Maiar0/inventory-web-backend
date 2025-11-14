const ProductModel = require('../db/ProductModel');
const StockMovementModel = require('../db/StockMovementModel');

class CatalogService {
    constructor(log) {
        this.log = log;
        this.productDb = new ProductModel();
        this.stockMovementDb = new StockMovementModel();
    }

    async getAll({page, perPage} = {}) {
        this.log.addEvent(`Fetching all products with pagination: page=${page}, perPage=${perPage}`);
        return await this.productDb.list({ page, perPage });
    }
}   
module.exports = CatalogService