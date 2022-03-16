const Stat = require('../models/Stats');

exports.getIndex = (req, res) => {
    res.send('Rushing Yards Home Route');
};

exports.getStats = async (req, res) => {
    try {
        const stats = await Stat.fetchAll();
        res.json(stats);
    } catch (err) {
        console.log(err.stack);
    }
};

exports.getTeams = async (req, res) => {
    try {
        const teams = await Stat.fetchTeams();
        res.json(teams);
    } catch (err) {
        console.log(err.stack);
    }
};

exports.getPositions = async (req, res) => {
    try {
        const positions = await Stat.fetchPositions();
        res.json(positions);
    } catch (err) {
        console.log(err.stack);
    }
};

exports.getPlayer = async (req, res) => {
    const playerId = req.params.playerId;

    try {
        const player = await Stat.findById(playerId);
        res.json(player);
    } catch (err) {
        console.log(err.stack);
    }
};

exports.getStatsFiltered = async (req, res) => {
    try {
        const stats = await Stat.fetchWithFilters(req.query);
        res.json(stats);
    } catch (err) {
        console.log(err.stack);
    }
};