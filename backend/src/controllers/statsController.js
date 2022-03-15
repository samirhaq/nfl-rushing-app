const Stat = require('../models/Stats');

exports.getIndex = (req, res) => {
    res.send('Rushing Yards Home Route');
};

exports.getStats = async (req, res) => {
    const stats = await Stat.fetchAll();
    res.json(stats);
};

exports.getTeams = async (req, res) => {
    const teams = await Stat.fetchTeams();
    res.json(teams);
};

exports.getPositions = async (req, res) => {
    const positions = await Stat.fetchPositions();
    res.json(positions);
};

exports.getPlayer = async (req, res) => {
    const playerId = req.params.playerId;

    const player = await Stat.findById(playerId);
    res.json(player);
};

exports.getStatsFiltered = async (req, res) => {
    const stats = await Stat.fetchWithFilters(req.query);
    res.json(stats);
};