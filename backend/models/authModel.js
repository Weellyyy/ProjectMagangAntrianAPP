const db = require('../config/db');
const bcrypt = require('bcrypt');

const authModel = {
  findByUsername: async (username) => {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await db.query(
      'SELECT id, username, role FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  create: async (username, password, role = 'admin') => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    );
    return result.insertId;
  },

  // Verifikasi password
  verifyPassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
};

module.exports = authModel;