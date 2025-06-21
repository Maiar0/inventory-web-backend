const ProductModel = require('../models/productModel');

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
}