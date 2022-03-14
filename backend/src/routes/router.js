const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/', statsController.getIndex);

router.get('/stats', statsController.getStatsFiltered);

router.get('/teams', statsController.getTeams);

router.get('/positions', statsController.getPositions);

router.get('/stats/:playerId', statsController.getPlayer);

module.exports = router;