// models/inventoryModel.js

const db = require('../db/database');

function getAllItems() {
  const stmt = db.prepare('SELECT * FROM inventory');
  return stmt.all();
}

function addItem(item_name, quantity = 0) {
  const stmt = db.prepare('INSERT INTO inventory (item_name, quantity) VALUES (?, ?)');
  return stmt.run(item_name, quantity);
}

module.exports = { getAllItems, addItem };
