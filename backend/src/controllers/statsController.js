const Stat = require('../models/Stats');

exports.getIndex = (req, res) => {
    res.send('Rushing Yards Home Route');
};

exports.getStats = (req, res) => {
    Stat.fetchAll((stats) => {
        res.json(stats);
    });
};

exports.getTeams = (req, res) => {
    Stat.fetchTeams((teams) => {
        res.json(teams);
    });
};

exports.getPositions = (req, res) => {
    Stat.fetchPositions((positions) => {
        res.json(positions);
    });
};

exports.getPlayer = (req, res) => {
    const playerId = req.params.playerId;

    Stat.findById(playerId, (player) => {
        res.json(player);
    });
};

exports.getStatsFiltered = (req, res) => {
    Stat.fetchWithFilters(req.query, (stats) => {
        res.json(stats);
    });
};