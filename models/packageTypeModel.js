const db = require('../db/database');

function addPackageType(type) {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO package_types (type)
    VALUES (?)
  `);
  return stmt.run(type);
}

function getAllPackageTypes() {
  return db.prepare('SELECT * FROM package_types').all();
}

function getPackageTypeById(id) {
  return db.prepare('SELECT * FROM package_types WHERE id = ?').get(id);
}

module.exports = {
  addPackageType,
  getAllPackageTypes,
  getPackageTypeById,
};
