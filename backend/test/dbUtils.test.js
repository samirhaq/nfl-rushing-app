
const DBUtil = require('../src/utils/dbUtils');

describe('DB utilities tests', () => {
    test('buildQuery - No params', async () => {
        const query = "SELECT * FROM test";
        expect(DBUtil.buildQuery(query, {})).toStrictEqual("SELECT * FROM test");
    })

    it('buildQuery - One param', async () => {
        const query = "SELECT * FROM test";
        expect(DBUtil.buildQuery(query, {"testParam": "= 'testValue'"})).toStrictEqual("SELECT * FROM test WHERE testParam = 'testValue'");
    })

    it('buildQuery - Multiple params', async () => {
        const query = "SELECT * FROM test";
        expect(DBUtil.buildQuery(query, {
            "testParam1": "= 'testValue1'",
            "testParam2":"< 3"
        })).toStrictEqual("SELECT * FROM test WHERE testParam1 = 'testValue1' AND testParam2 < 3");
    })
})
