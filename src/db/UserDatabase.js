const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
//Shortcuts some basic authorization
class UserDatabase {
    constructor(dbFilePath) {
        this.dbFilePath = dbFilePath;
        this.db = null;
    }

    // Open the database connection
    async connect() {
        this.db = await open({
            filename: this.dbFilePath,
            driver: sqlite3.Database
        });
    }

    // Initialize schema and seed the root user
    async initSchema() {
        // Create the users table
        await this.db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                uuid TEXT PRIMARY KEY,
                role TEXT NOT NULL CHECK (role IN ('root','admin','user'))
            );
        `);

        // Insert the initial root user, ignoring if already present
        await this.db.run(`
            INSERT OR IGNORE INTO users (uuid, role)
            VALUES ('53192e68-ef7e-4a09-9ad6-c8e222e58085', 'root');
        `);
    }

    // Add a new user
    async addUser(uuid, role) {
        return this.db.run(`
            INSERT INTO users (uuid, role)
            VALUES (?, ?);
        `, [uuid, role]);
    }

    // Retrieve a user by UUID
    async getUser(uuid) {
        return this.db.get(`
            SELECT uuid, role
            FROM users
            WHERE uuid = ?;
        `, [uuid]);
    }

    // List all users
    async listUsers() {
        return this.db.all(`
            SELECT uuid, role
            FROM users;
        `);
    }

    // Close the database connection
    async close() {
        await this.db.close();
    }

    /**
     * Check if a user has the given role (with 'root' as a super-role).
     * @param {string} uuid  - The user's UUID.
     * @param {string} role  - The role to verify ('root', 'admin', 'user').
     * @returns {Promise<boolean>}
     */
    async hasRole(uuid, role) {
        const row = await this.db.get(`
            SELECT role
              FROM users
             WHERE uuid = ?;
        `, [uuid]);

        if (!row) {
            // No such user
            return false;
        }

        if (row.role === 'root') {
            // 'root' has all permissions
            return true;
        }

        // Otherwise, only match exact role
        return row.role === role;
    }
}

module.exports = UserDatabase;
