const path = require('path');
const Database = require('better-sqlite3');

class UserDatabase {
  constructor() {
    const dbPath = path.join(__dirname, '../databases/users.db');
    this.db = new Database(dbPath);

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        uuid TEXT PRIMARY KEY,
        role TEXT NOT NULL CHECK (role IN ('root','admin','user'))
      );
    `);

    this.db.prepare(`
      INSERT OR IGNORE INTO users (uuid, role)
      VALUES ('53192e68-ef7e-4a09-9ad6-c8e222e58085', 'root');
    `).run();
  }

  addUser(uuid, role) {
    const stmt = this.db.prepare(`
      INSERT INTO users (uuid, role)
      VALUES (?, ?)
    `);
    return stmt.run(uuid, role);
  }

  getUser(uuid) {
    const stmt = this.db.prepare(`
      SELECT uuid, role FROM users WHERE uuid = ?
    `);
    console.log(`Fetching user with UUID: ${uuid}`);
    return stmt.get(uuid);
  }

  listUsers() {
    return this.db.prepare(`
      SELECT uuid, role FROM users
    `).all();
  }

  hasRole(uuid, role) {
    const row = this.db.prepare(`
      SELECT role FROM users WHERE uuid = ?
    `).get(uuid);

    if (!row) return false;
    if (row.role === 'root') return true;
    return row.role === role;
  }

  close() {
    this.db.close();
  }
}

module.exports = UserDatabase
