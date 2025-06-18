import ProductModel from './db/ProductModel.js'

const db = new ProductModel();
const productId = 25;
/*const created = await db.create({
    product_id: productId,
    sku: 'gecko5698',
    name: 'gecko',
    description: 'a tiny gecko',
    image_url: '/images/gecko.jpg',
    unit_cost: 0,
    unit_price: 0
});*/
//const find = await db.findById(productId);
//const update = db.update(productId, {name: 'new Gecko'});
const del = db.deleteById(productId);