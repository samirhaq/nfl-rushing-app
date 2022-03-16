const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Home route
router.get('/', statsController.getIndex);

// List all player's stats that meet the params
router.get('/stats', statsController.getStatsFiltered);

// List all teams
router.get('/teams', statsController.getTeams);

// List all positions
router.get('/positions', statsController.getPositions);

// Get player's stats by ID
router.get('/stats/:playerId', statsController.getPlayer);

module.exports = router;