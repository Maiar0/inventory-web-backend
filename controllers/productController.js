const LogSession = require('../utils/logging/LogSession');
const ApiResponse = require('../utils/ApiResponse');  
const ApiError = require('../utils/ApiError');
const ProductService = require('../service/ProductService');

exports.createProduct = async (req, res) => {
    const userId = req.user.uuid;
    const log = new LogSession(userId);
    try {
        const product = req.body;
        const productService = new ProductService(log);
        const createdProduct = await productService.create(product);
        log.addEvent('createProduct', 'Product created successfully', { userId, product: createdProduct });
        return res.json(ApiResponse.success(createdProduct));
    } catch (error) {
        console.error('Error creating product:', error);
        log.addEvent('createProduct', 'Error creating product', { error: error.message });
        res.status(500).json(ApiResponse.error(new ApiError('Internal Server Error', 500)));
    } finally {
        log.writeToFile();
    }
}
exports.getProductById = async (req, res) => {
    const userId = req.user.uuid;
    const productId = req.params.id;
    const log = new LogSession(userId);
    try {
        const productService = new ProductService(log);
        const product = await productService.getById(productId);
        if (!product) {
            throw new ApiError('Product not found', 404);
        }
        log.addEvent('getProductById', 'Product fetched successfully', { userId, productId });
        return res.json(ApiResponse.success(product));
    } catch (error) {
        console.error('Error fetching product:', error);
        log.addEvent('getProductById', 'Error fetching product', { error: error.message });
        res.status(error.status || 500).json(ApiResponse.error(error));
    } finally {
        log.writeToFile();
    }
}
exports.getProducts = async(req, res) => {
    const userId = req.user.uuid;
    const log = new LogSession(userId);
    try {
        const productService = new ProductService(log);
        const products = await productService.getAll();
        log.addEvent('getProducts', 'Fetched all products successfully', { userId });
        return res.json(ApiResponse.success(products));
    } catch (error) {
        console.error('Error fetching products:', error);
        log.addEvent('getProducts', 'Error fetching products', { error: error.message });
        res.status(500).json(ApiResponse.error(new ApiError('Internal Server Error', 500)));
    } finally {
        log.writeToFile();
    }
}