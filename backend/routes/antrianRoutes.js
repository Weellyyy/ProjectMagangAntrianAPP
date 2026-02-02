const express = require('express');
const router = express.Router();
const antrianController = require('../controllers/antrianController');
const { authenticateToken, requireAdmin } = require('../middleware/permissionMiddleware');

router.post('/', antrianController.create);

router.get('/', authenticateToken, requireAdmin, antrianController.getAll);
router.get('/statistics', authenticateToken, requireAdmin, antrianController.getStatistics);
router.get('/:id', authenticateToken, requireAdmin, antrianController.getById);
router.put('/:id/status', authenticateToken, requireAdmin, antrianController.updateStatus);
router.delete('/:id', authenticateToken, requireAdmin, antrianController.delete);

module.exports = router;