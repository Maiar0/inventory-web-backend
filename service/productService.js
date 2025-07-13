const ProductModel = require('../db/ProductModel');

class ProductService {
    constructor(log) {
        this.log = log;
        this.db = new ProductModel();
    }
    create(product) {
        this.log.addEvent(`Creating product: ${product.name}`);
        return this.db.create(product);
    }
    update(product_id, updates) {
        this.log.addEvent(`Updating product ${product_id}`);
        return this.db.update(product_id, updates);
    }
    delete(product_id) {
        this.log.addEvent(`Deleting product ${product_id}`);
        return this.db.deleteById(product_id);
    }
    getById(product_id) {
        this.log.addEvent(`Fetching product by ID: ${product_id}`);
        return this.db.findById(product_id);
    }
    getAll({ page, perPage } = {}) {
        this.log.addEvent(`Fetching all products with pagination: page=${page}, perPage=${perPage}`);
        return this.db.list({ page, perPage });
    }
}
module.exports = ProductService;