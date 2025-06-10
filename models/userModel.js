const db = require('../db/database');
const { v4: uuidv4 } = require('uuid');

function addUser({ name, email, password_hash, role = 'user' }) {
  const stmt = db.prepare(`
    INSERT INTO users (id, name, email, password_hash, role)
    VALUES (?, ?, ?, ?, ?)
  `);
  return stmt.run(uuidv4(), name, email, password_hash, role);
}

function getUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

function getAllUsers() {
  return db.prepare('SELECT * FROM users').all();
}

function updateLastLogin(id) {
  const stmt = db.prepare(`
    UPDATE users SET last_login = datetime('now') WHERE id = ?
  `);
  return stmt.run(id);
}

module.exports = {
  addUser,
  getUserByEmail,
  getAllUsers,
  updateLastLogin,
};
