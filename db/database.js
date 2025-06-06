// db/database.js

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'app.db');
const db = new Database(dbPath);

// Table creation (runs once per startup)
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id              TEXT    PRIMARY KEY,       -- UUID string
    name            TEXT    NOT NULL,
    email           TEXT    UNIQUE NOT NULL,
    password_hash   TEXT    NOT NULL,
    role            TEXT    NOT NULL DEFAULT 'user',
    created_at      TEXT    DEFAULT (datetime('now')),
    last_login      TEXT    DEFAULT (datetime('now'))
);
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS inventory_items (
    id              TEXT        PRIMARY KEY,                    
    item_name       TEXT        NOT NULL,
    description     TEXT        NOT NULL,
    quantity        INTEGER     NOT NULL DEFAULT 0,
    price           REAL        NOT NULL,
    image_url       TEXT,                                       -- Optional image path
    package_type_id INTEGER,                                    
    package_count   INTEGER,                                    -- units per package
    created_at      TEXT        DEFAULT (datetime('now')),
    FOREIGN KEY (package_type_id) REFERENCES package_types(id)
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS package_types (
    id              INTEGER     PRIMARY KEY AUTOINCREMENT,                    
    type            TEXT        NOT NULL UNIQUE,
    created_at      TEXT        DEFAULT (datetime('now'))
  )
`).run();

module.exports = db;
