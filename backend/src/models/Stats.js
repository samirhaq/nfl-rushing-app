const db = require('../db/db');
const DBUtil = require('../utils/dbUtils');

module.exports = class Stat {
    constructor(id, player, team, pos, att, attG, yds, avg, ydsG, td, lng, isTd, first, firstPerc, twentyPlus, fortyPlus, fum) {
        this.id = id;
        this.player = player;
        this.team = team;
        this.pos = pos;
        this.att = att;
        this.attG = attG;
        this.yds = yds;
        this.avg = avg;
        this.ydsG = ydsG;
        this.td = td;
        this.lng = lng;
        this.isTd = isTd;
        this.first = first;
        this.firstPerc = firstPerc;
        this.twentyPlus = twentyPlus;
        this.fortyPlus = fortyPlus;
        this.fum = fum;
    }
    static async fetchAll() {
        try {
            const res = await db.query('SELECT * FROM RushingYards', null);
            return res.rows.map((stat) => this.mapToModel(stat));
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async findById(id) {
        const query = `SELECT * FROM RushingYards WHERE id = $1`
        try {
            const res = await db.query(query, [id]);
            return res.rows.map((stat) => this.mapToModel(stat));
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async fetchWithFilters(filters) {
        const query = DBUtil.buildQuery(`SELECT * FROM RushingYards`, filters)
        try {
            const res = await db.query(query, null);
            return res.rows.map((stat) => this.mapToModel(stat));
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async fetchTeams() {
        try {
            const res = await db.query('SELECT DISTINCT team FROM RushingYards ORDER BY team ASC', null);
            return res.rows.map((team) => { return team.team });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static async fetchPositions() {
        try {
            const res = await db.query('SELECT DISTINCT pos FROM RushingYards ORDER BY pos ASC', null);
            return res.rows.map((pos) => { return pos.pos });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static mapToModel(stat) {
        return {
            id: stat.id,
            player: stat.player,
            team: stat.team,
            pos: stat.pos,
            att: stat.att,
            attG: stat.att_g,
            yds: stat.yds,
            avg: stat.avg,
            ydsG: stat.yds_g,
            td: stat.td,
            lng: stat.lng,
            isTd: stat.is_td,
            first: stat.first,
            firstPerc: stat.first_perc,
            twentyPlus: stat.twenty_plus,
            fortyPlus: stat.forty_plus,
            fum: stat.fum
        }
    }
};