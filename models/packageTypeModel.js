const db = require('../db/database');

function addPackageType(type) {
  const stmt = db.prepare('INSERT INTO package_types (type) VALUES (?)');
  return stmt.run( type);//TODO:: Not correct we will allow autoincrememt integer here
}

function getAllPackageTypes() {
  return db.prepare('SELECT * FROM package_types').all();
}

module.exports = { addPackageType, getAllPackageTypes };
