const Stat = require('../src/models/Stats');
const db = require('../src/db/db');

describe('Stats model tests', () => {
    it('fetchAll', async () => {
        
        const mockDBData = [
            {
                "id": 1,
                "player": "Joe Banyard",
                "team": "JAX",
                "pos": "RB",
                "att": 2,
                "att_g": "2",
                "yds": 7,
                "avg": "3.5",
                "yds_g": "7",
                "td": 0,
                "lng": "7",
                "first": 0,
                "first_perc": "0",
                "twenty_plus": 0,
                "forty_plus": 0,
                "fum": 0
            },
            {
                "id": 2,
                "player": "Shaun Hill",
                "team": "MIN",
                "pos": "QB",
                "att": 5,
                "att_g": "1.7",
                "yds": 5,
                "avg": "1",
                "yds_g": "1.7",
                "td": 0,
                "lng": "9",
                "first": 0,
                "first_perc": "0",
                "twenty_plus": 0,
                "forty_plus": 0,
                "fum": 0
            }
        ];

        const mockData = [
            {
                "id": 1,
                "player": "Joe Banyard",
                "team": "JAX",
                "pos": "RB",
                "att": 2,
                "attG": "2",
                "yds": 7,
                "avg": "3.5",
                "ydsG": "7",
                "td": 0,
                "lng": "7",
                "first": 0,
                "firstPerc": "0",
                "twentyPlus": 0,
                "fortyPlus": 0,
                "fum": 0
            },
            {
                "id": 2,
                "player": "Shaun Hill",
                "team": "MIN",
                "pos": "QB",
                "att": 5,
                "attG": "1.7",
                "yds": 5,
                "avg": "1",
                "ydsG": "1.7",
                "td": 0,
                "lng": "9",
                "first": 0,
                "firstPerc": "0",
                "twentyPlus": 0,
                "fortyPlus": 0,
                "fum": 0
            }
        ];

        db.query = jest.fn();
        db.query.mockResolvedValue({rows: mockDBData});

        const data = await Stat.fetchAll();

        expect(data).toStrictEqual(mockData)
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it('fetchAll - Error', async () => {

        db.query = jest.fn();
        db.query.mockRejectedValue(new Error("DB failed"));

        const data = await Stat.fetchAll();

        expect(data).toStrictEqual()
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it('fetchWithFilters', async () => {

        const mockDBData = [
            {
                "id": 1,
                "player": "Joe Banyard",
                "team": "JAX",
                "pos": "RB",
                "att": 2,
                "att_g": "2",
                "yds": 7,
                "avg": "3.5",
                "yds_g": "7",
                "td": 0,
                "lng": "7",
                "first": 0,
                "first_perc": "0",
                "twenty_plus": 0,
                "forty_plus": 0,
                "fum": 0
            },
            {
                "id": 18,
                "player": "Denard Robinson",
                "team": "JAX",
                "pos": "RB",
                "att": 41,
                "att_g": "3.2",
                "yds": 144,
                "avg": "3.5",
                "yds_g": "11.1",
                "td": 0,
                "lng": "9",
                "first": 4,
                "first_perc": "9.8",
                "twenty_plus": 0,
                "forty_plus": 0,
                "fum": 0
            }
        ];
        
        const mockData = [
            {
                "id": 1,
                "player": "Joe Banyard",
                "team": "JAX",
                "pos": "RB",
                "att": 2,
                "attG": "2",
                "yds": 7,
                "avg": "3.5",
                "ydsG": "7",
                "td": 0,
                "lng": "7",
                "first": 0,
                "firstPerc": "0",
                "twentyPlus": 0,
                "fortyPlus": 0,
                "fum": 0
            },
            {
                "id": 18,
                "player": "Denard Robinson",
                "team": "JAX",
                "pos": "RB",
                "att": 41,
                "attG": "3.2",
                "yds": 144,
                "avg": "3.5",
                "ydsG": "11.1",
                "td": 0,
                "lng": "9",
                "first": 4,
                "firstPerc": "9.8",
                "twentyPlus": 0,
                "fortyPlus": 0,
                "fum": 0
            }
        ];

        db.query = jest.fn();
        db.query.mockResolvedValue({rows: mockDBData});

        const data = await Stat.fetchWithFilters({team: "='JAX'"});

        expect(data).toStrictEqual(mockData);
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it('fetchWithFilters - Error', async () => {

        db.query = jest.fn();
        db.query.mockRejectedValue(new Error("DB failed"));

        const data = await Stat.fetchWithFilters({team: "='JAX'"});

        expect(data).toStrictEqual()
        expect(db.query).toHaveBeenCalledTimes(1);
    });
    
    it('findById', async () => {

        const mockDBData =
            [{
                "id": 1,
                "player": "Joe Banyard",
                "team": "JAX",
                "pos": "RB",
                "att": 2,
                "att_g": "2",
                "yds": 7,
                "avg": "3.5",
                "yds_g": "7",
                "td": 0,
                "lng": "7",
                "first": 0,
                "first_perc": "0",
                "twenty_plus": 0,
                "forty_plus": 0,
                "fum": 0
            }];
        
        const mockData =
            [{
                "id": 1,
                "player": "Joe Banyard",
                "team": "JAX",
                "pos": "RB",
                "att": 2,
                "attG": "2",
                "yds": 7,
                "avg": "3.5",
                "ydsG": "7",
                "td": 0,
                "lng": "7",
                "first": 0,
                "firstPerc": "0",
                "twentyPlus": 0,
                "fortyPlus": 0,
                "fum": 0
            }];

        db.query = jest.fn();
        db.query.mockResolvedValue({rows: mockDBData});

        const data = await Stat.findById(1);
        expect(data).toStrictEqual(mockData);
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it('findById - Error', async () => {

        db.query = jest.fn();
        db.query.mockRejectedValue(new Error("DB failed"));

        const data = await Stat.findById(3);

        expect(data).toStrictEqual()
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it('fetchTeams', async () => {

        const mockDBData = [{"team": "ARI"}, {"team":"ATL"}, {"team":"BAL"}];
        
        const mockData = ["ARI", "ATL", "BAL"];

        db.query = jest.fn();
        db.query.mockResolvedValue({rows: mockDBData});

        const data = await Stat.fetchTeams();
        expect(data).toStrictEqual(mockData);
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it('fetchTeams - Error', async () => {

        db.query = jest.fn();
        db.query.mockRejectedValue(new Error("DB failed"));

        const data = await Stat.fetchTeams();

        expect(data).toStrictEqual()
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it('fetchPositions', async () => {

        const mockData = ["QB", "RB", "WR"];
        
        const mockDBData = [{"pos":"QB"}, {"pos":"RB"},{"pos": "WR"}];

        db.query = jest.fn();
        db.query.mockResolvedValue({rows: mockDBData});

        const data = await Stat.fetchPositions();
        expect(data).toStrictEqual(mockData);
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it('fetchPositions - Error', async () => {

        db.query = jest.fn();
        db.query.mockRejectedValue(new Error("DB failed"));

        const data = await Stat.fetchPositions();

        expect(data).toStrictEqual()
        expect(db.query).toHaveBeenCalledTimes(1);
    });

    it('mapToModel', async () => {
        
        const mockData = {
            "id": 1,
            "player": "Joe Banyard",
            "team": "JAX",
            "pos": "RB",
            "att": 2,
            "attG": "2",
            "yds": 7,
            "avg": "3.5",
            "ydsG": "7",
            "td": 0,
            "lng": "7",
            "first": 0,
            "firstPerc": "0",
            "twentyPlus": 0,
            "fortyPlus": 0,
            "fum": 0
        };

        const data = {
            "id": 1,
            "player": "Joe Banyard",
            "team": "JAX",
            "pos": "RB",
            "att": 2,
            "att_g": "2",
            "yds": 7,
            "avg": "3.5",
            "yds_g": "7",
            "td": 0,
            "lng": "7",
            "first": 0,
            "first_perc": "0",
            "twenty_plus": 0,
            "forty_plus": 0,
            "fum": 0
        };
        
        expect(Stat.mapToModel(data)).toStrictEqual(mockData)
    });

    it('create Stat model', async () => {
        
        const mockData = {
            "id": 1,
            "player": "Joe Banyard",
            "team": "JAX",
            "pos": "RB",
            "att": 2,
            "attG": "2",
            "yds": 7,
            "avg": "3.5",
            "ydsG": "7",
            "td": 0,
            "lng": "7",
            "first": 0,
            "firstPerc": "0",
            "twentyPlus": 0,
            "fortyPlus": 0,
            "fum": 0
        };

        const statModel = new Stat(1, "Joe Banyard", "JAX", "RB", 2, "2", 7, "3.5", "7", 0, "7", 0, "0", 0, 0, 0);
        
        expect(statModel).toEqual(mockData)
    });

})
