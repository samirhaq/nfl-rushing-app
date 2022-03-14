module.exports = class DBUtil {
    static buildQuery(query, params) {
        const paramsList = Object.entries(params)
        if (paramsList.length > 0) {
            query += ' WHERE '
            var paramsCount = 1
            for (const [key, value] of paramsList) {
                query += `${key} ${value}`
                if (paramsCount != paramsList.length) {
                    query += ' AND '
                }
                paramsCount += 1
            }
        }
        return query
    }
}