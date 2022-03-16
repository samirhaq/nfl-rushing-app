module.exports = class DBUtil {
    static buildQuery(query, params) {
        let queryArgs = [];
        const paramsList = Object.entries(params)
        if (paramsList.length > 0) {
            for (const [key, value] of paramsList) {
                if (value.constructor === Array) {
                    value.forEach((arrayVal => {
                        queryArgs.push(`${key} ${arrayVal}`);
                    }));
                } else {
                    queryArgs.push(`${key} ${value}`);
                }
            }
            query += ` WHERE ${queryArgs.join(" AND ")}`;
        }
        return query
    }
}