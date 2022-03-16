const Stat = require('../models/Stats');

/**
 *
 * Gets the home route.
 *
 * @param req - The request
 * @param res - The result
 * @return
 *   A simple message.
 */
exports.getIndex = (req, res) => {
    res.send('Rushing Yards Home Route');
};

/**
 *
 * Gets all Stats.
 *
 * @param req - The request
 * @param res - The result
 * @return
 *   Array of Stat models or an error.
 */
exports.getStats = async (req, res) => {
    try {
        const stats = await Stat.fetchAll();
        res.json(stats);
    } catch (err) {
        console.log(err.stack);
    }
};

/**
 *
 * Gets all teams.
 *
 * @param req - The request
 * @param res - The result
 * @return
 *   Array of strings or an error.
 */
exports.getTeams = async (req, res) => {
    try {
        const teams = await Stat.fetchTeams();
        res.json(teams);
    } catch (err) {
        console.log(err.stack);
    }
};

/**
 *
 * Gets all positions.
 *
 * @param req - The request
 * @param res - The result
 * @return
 *   Array of strigns or an error.
 */
exports.getPositions = async (req, res) => {
    try {
        const positions = await Stat.fetchPositions();
        res.json(positions);
    } catch (err) {
        console.log(err.stack);
    }
};

/**
 *
 * Gets a single player's stats by ID.
 *
 * @param req - The request
 * @param res - The result
 * @return
 *   Single Stat model or error.
 */
exports.getPlayer = async (req, res) => {
    const playerId = req.params.playerId;

    try {
        const player = await Stat.findById(playerId);
        res.json(player);
    } catch (err) {
        console.log(err.stack);
    }
};

/**
 *
 * Gets all Stats that meet the criteria.
 *
 * @param req - The request
 * @param res - The result
 * @return
 *   Array of Stat models or an error.
 */
exports.getStatsFiltered = async (req, res) => {
    try {
        const stats = await Stat.fetchWithFilters(req.query);
        res.json(stats);
    } catch (err) {
        console.log(err.stack);
    }
};