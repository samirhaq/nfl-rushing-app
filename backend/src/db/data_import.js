const db = require('./db');
const path = require('path');
const data = require(path.join(`${__dirname}/data/rushing.json`));

var query = `INSERT INTO RushingYards (id, player, team, pos, att, att_g, yds, avg, yds_g, td, lng, is_td, first, first_perc, twenty_plus, forty_plus, fum) VALUES `;
var id = 1
for (const entry of data) {
    query += "("
    query += id + ", "
    query += "\'" + entry["Player"].replace("'", "\'\'") + "\', "
    query += "\'" + entry["Team"] + "\', "
    query += "\'" + entry["Pos"] + "\', "
    query += entry["Att"] + ", "
    query += entry["Att/G"] + ", "
    query += parseInt(entry["Yds"]) + ", "
    query += entry["Avg"] + ", "
    query += entry["Yds/G"] + ", "
    query += entry["TD"] + ", "
    query += (typeof entry["Lng"] === "string" && entry["Lng"].slice(-1) === 'T' ? parseInt(entry["Lng"]) : parseInt(entry["Lng"])) + ","
    query += (typeof entry["Lng"] === "string" && entry["Lng"].slice(-1) === 'T' ? true : false) +  ","
    query += entry["1st"] + ", "
    query += entry["1st%"] + ", "
    query += entry["20+"] + ", "
    query += entry["40+"] + ", "
    query += entry["FUM"]
    query += "),"
    id += 1
}

query = query.substring(0, query.length - 1);

db.connect((err, client, done) => {
    if (err) throw err;
    try {
        // For each line we run the insert query with the row providing the column values
        client.query(query, null, (err, res) => {
            if (err) {
                // We can just console.log any errors
                console.log(err.stack);
            } else {
                console.log('Data inserted');
            }
        });
    } finally {
        done();
    }
});


