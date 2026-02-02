const db = require('../config/db');

const antrianModel = {
  create: async (data) => {
    const { id_pelanggan, nama, no_telp, kategori_keluhan, detail_keluhan } = data;
    
    const [lastAntrian] = await db.query(
      `SELECT MAX(no_antrian) as last_no 
       FROM pengunjung 
       WHERE DATE(created_at) = CURDATE()`
    );
    
    const no_antrian = (lastAntrian[0]?.last_no || 0) + 1;
    
    const [result] = await db.query(
      `INSERT INTO pengunjung 
       (id_pelanggan, no_antrian, nama, no_telp, kategori_keluhan, detail_keluhan, status, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, 'menunggu', NOW())`,
      [id_pelanggan || null, no_antrian, nama, no_telp, kategori_keluhan, detail_keluhan]
    );
    
    return {
      id_pengunjung: result.insertId,
      no_antrian,
      ...data
    };
  },

  getAll: async (filters = {}) => {
    let query = `
      SELECT 
        id_pengunjung,
        id_pelanggan,
        no_antrian,
        nama,
        no_telp,
        kategori_keluhan,
        detail_keluhan,
        status,
        created_at
      FROM pengunjung
      WHERE 1=1
    `;
    const params = [];

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.date) {
      query += ' AND DATE(created_at) = ?';
      params.push(filters.date);
    } else {
      query += ' AND DATE(created_at) = CURDATE()';
    }

    query += ' ORDER BY no_antrian ASC';

    const [rows] = await db.query(query, params);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      'SELECT * FROM pengunjung WHERE id_pengunjung = ?',
      [id]
    );
    return rows[0];
  },

  updateStatus: async (id, status) => {
    const validStatus = ['menunggu', 'dilayani', 'selesai'];
    if (!validStatus.includes(status)) {
      throw new Error('Status tidak valid');
    }

    const [result] = await db.query(
      'UPDATE pengunjung SET status = ? WHERE id_pengunjung = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.query(
      'DELETE FROM pengunjung WHERE id_pengunjung = ?',
      [id]
    );
    return result.affectedRows > 0;
  },

  // Dapatkan statistik
  getStatistics: async (startDate, endDate) => {
    let dateFilter = '';
    const params = [];

    if (startDate && endDate) {
      dateFilter = 'DATE(created_at) BETWEEN ? AND ?';
      params.push(startDate, endDate);
    } else {
      dateFilter = 'DATE(created_at) = CURDATE()';
    }
    
    // Hitung total
    const [totalResult] = await db.query(
      `SELECT COUNT(*) as total FROM pengunjung WHERE ${dateFilter}`,
      params
    );

    // Hitung per status
    const [menungguResult] = await db.query(
      `SELECT COUNT(*) as count FROM pengunjung WHERE ${dateFilter} AND status = 'menunggu'`,
      [...params]
    );

    const [dilayaniResult] = await db.query(
      `SELECT COUNT(*) as count FROM pengunjung WHERE ${dateFilter} AND status = 'dilayani'`,
      [...params]
    );

    const [selesaiResult] = await db.query(
      `SELECT COUNT(*) as count FROM pengunjung WHERE ${dateFilter} AND status = 'selesai'`,
      [...params]
    );

    return {
      total: totalResult[0].total,
      menunggu: menungguResult[0].count,
      sedang_dilayani: dilayaniResult[0].count,
      selesai: selesaiResult[0].count
    };
  }
};

module.exports = antrianModel;