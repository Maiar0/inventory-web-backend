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

function updateInventoryQuantity(id, newQuantity) {
  // Fetch current quantity
  const row = db.prepare('SELECT quantity FROM inventory_items WHERE id = ?').get(id);
  if (!row) throw new Error(`Item with id ${id} not found`);

  const delta = newQuantity - row.quantity;
  return incrementInventoryQuantity(id, delta);
}

function incrementInventoryQuantity(id, delta) {
  const current = db.prepare('SELECT quantity FROM inventory_items WHERE id = ?').get(id);
  if (!current) throw new Error(`Item with id ${id} not found`);

  const newQuantity = current.quantity + delta;
  if (newQuantity < 0) {
    throw new Error('Quantity cannot go below zero');
  }

  const stmt = db.prepare(`
    UPDATE inventory_items SET quantity = ? WHERE id = ?
  `);
  return stmt.run(newQuantity, id);
}



module.exports = {
  addInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryQuantity,
  incrementInventoryQuantity
};
