// models/userModel.js

const db = require('../db/database');

function getAllUsers() {
  const stmt = db.prepare('SELECT * FROM users');
  return stmt.all();
}

function addUser(name, email) {
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  return stmt.run(name, email);
}

module.exports = { getAllUsers, addUser };
