const { v4: uuidv4 } = require('uuid');
const db = require('../db/db');
const DBUtil = require('../utils/dbUtils');

module.exports = class Stat {
    constructor(id, player, team, pos, att, attG, yds, avg, ydsG, td, lng, first, firstPerc, twentyPlus, fortyPlus, fum) {
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
        this.first = first;
        this.firstPerc = firstPerc;
        this.twentyPlus = twentyPlus;
        this.fortyPlus = fortyPlus;
        this.fum = fum;
    }
    static fetchAll(cb) {
        db.query('SELECT * FROM RushingYards', null, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                cb(res.rows.map((stat) => this.mapToModel(stat)));
            }
        });
    }
    static findById(id, cb) {
        const query = `SELECT * FROM RushingYards WHERE id = $1`
        db.query(query, [id], (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                cb(res.rows.map((stat) => this.mapToModel(stat)))
            }
        });
    }

    static fetchWithFilters(filters, cb) {
        const query = DBUtil.buildQuery(`SELECT * FROM RushingYards`, filters)
        console.log(query);
        db.query(query, null, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                cb(res.rows.map((stat) => this.mapToModel(stat)))
            }
        });
    }

    static fetchTeams(cb) {
        db.query('SELECT DISTINCT team FROM RushingYards ORDER BY team ASC', null, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                cb(res.rows.map((team) => { return team.team }))
            }
        });
    }

    static fetchPositions(cb) {
        db.query('SELECT DISTINCT pos FROM RushingYards ORDER BY pos ASC', null, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                cb(res.rows.map((pos) => { return pos.pos }))
            }
        });
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
            first: stat.first,
            firstPerc: stat.first_perc,
            twentyPlus: stat.twenty_plus,
            fortyPlus: stat.forty_plus,
            fum: stat.fum
        }
    }
};