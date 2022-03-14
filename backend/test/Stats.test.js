const Stat = require('../src/models/Stats');
const db = require('../src/db/db');

jest.mock('../src/db/db');

describe('Stats model tests', () => {
    it('fetchAll', async () => {
        
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

        db.query.mockReturnValue(mockData);

        return await Stat.fetchAll(data => {
            expect(data).toStrictEqual(mockData)
        })
    });

    it('fetchAllWithFilters', async () => {
        
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

        db.query.mockReturnValue(mockData);

        return await Stat.fetchWithFilters(data => {
            expect(data).toStrictEqual(mockData)
        })
    });
    
    it('findById', async () => {
        
        const mockData =
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
            };

        db.query.mockReturnValue(mockData);

        return await Stat.findById(1, (data) => {
            expect(data).toStrictEqual(mockData)
        })
    });

    it('fetchTeams', async () => {
        
        const mockData = ["ARI", "ATL", "BAL"];

        db.query.mockReturnValue(mockData);

        return await Stat.fetchTeams(data => {
            expect(data).toStrictEqual(mockData)
        })
    });

    it('fetchPositions', async () => {
        
        const mockData = ["QB", "RB", "WR"];

        db.query.mockReturnValue(mockData);

        return await Stat.fetchPositions(data => {
            expect(data).toStrictEqual(mockData)
        })
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
