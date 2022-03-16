-- Drop our table if it exists already
DROP TABLE IF EXISTS RushingYards;

-- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS RushingYards
(
    id INT PRIMARY KEY,
    player VARCHAR (100),
    team VARCHAR (3),
    pos VARCHAR (2),
    att INT,
    att_g DECIMAL,
    yds INT,
    avg DECIMAL,
    yds_g DECIMAL,
    td INT,
    lng INT,
    is_td BOOLEAN,
    first INT,
    first_perc DECIMAL,
    twenty_plus INT,
    forty_plus INT,
    fum INT
);

-- Changes the owner of the table to postgres which is the default when installing postgres
ALTER TABLE RushingYards
    OWNER to qenjffkg;