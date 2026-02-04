const antrianModel = require('../models/antrianModel');

const antrianController = {
  create: async (req, res) => {
    try {
      const { id_pelanggan, nama, no_telp, kategori_keluhan, detail_keluhan } = req.body;

      if (!no_telp || !kategori_keluhan) {
        return res.status(400).json({
          success: false,
          message: 'Nomor telepon dan kategori keluhan harus diisi'
        });
      }

      const validCategories = ['Keluhan Jaringan', 'Deaktivasi', 'Billing', 'Lainnya'];
      if (!validCategories.includes(kategori_keluhan)) {
        return res.status(400).json({
          success: false,
          message: 'Kategori keluhan tidak valid'
        });
      }

      if (!/^\d+$/.test(no_telp)) {
        return res.status(400).json({
          success: false,
          message: 'Nomor telepon harus berupa angka'
        });
      }

      const antrian = await antrianModel.create({
        id_pelanggan,
        nama,
        no_telp,
        kategori_keluhan,
        detail_keluhan
      });

      res.status(201).json({
        success: true,
        message: 'Antrian berhasil dibuat',
        data: antrian
      });
    } catch (error) {
      console.error('Create antrian error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat membuat antrian'
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const { status, date } = req.query;
      const filters = {};

      if (status) filters.status = status;
      if (date) filters.date = date;

      const antrian = await antrianModel.getAll(filters);

      res.json({
        success: true,
        data: antrian
      });
    } catch (error) {
      console.error('Get all antrian error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil data antrian'
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const antrian = await antrianModel.getById(id);

      if (!antrian) {
        return res.status(404).json({
          success: false,
          message: 'Antrian tidak ditemukan'
        });
      }

      res.json({
        success: true,
        data: antrian
      });
    } catch (error) {
      console.error('Get antrian by id error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil data antrian'
      });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      console.log('Update status request:', { id, status });

      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status harus diisi'
        });
      }

      const updated = await antrianModel.updateStatus(id, status);
      console.log('Update result:', updated);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Antrian tidak ditemukan'
        });
      }

      res.json({
        success: true,
        message: 'Status antrian berhasil diupdate'
      });
    } catch (error) {
      console.error('Update status error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Terjadi kesalahan saat mengupdate status'
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await antrianModel.delete(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Antrian tidak ditemukan'
        });
      }

      res.json({
        success: true,
        message: 'Antrian berhasil dihapus'
      });
    } catch (error) {
      console.error('Delete antrian error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat menghapus antrian'
      });
    }
  },

  getStatistics: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      console.log('Fetching statistics with params:', { startDate, endDate });
      
      const statistics = await antrianModel.getStatistics(startDate, endDate);
      console.log('Statistics result:', statistics);

      res.json({
        success: true,
        data: statistics
      });
    } catch (error) {
      console.error('Get statistics error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil statistik',
        error: error.message
      });
    }
  }
};

module.exports = antrianController;