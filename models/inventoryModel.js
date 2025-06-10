const db = require('../db/database');

function addInventoryItem({ id, item_name, description, quantity, price, image_url, package_type_id, package_count }) {
  const stmt = db.prepare(`
    INSERT INTO inventory_items (
      id, item_name, description, quantity, price, image_url, package_type_id, package_count
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(
    id,
    item_name,
    description,
    quantity,
    price,
    image_url,
    package_type_id,
    package_count
  );
}

function getAllInventoryItems() {
  return db.prepare('SELECT * FROM inventory_items').all();
}

function getInventoryItemById(id) {
  return db.prepare('SELECT * FROM inventory_items WHERE id = ?').get(id);
}

module.exports = {
  addInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
};
