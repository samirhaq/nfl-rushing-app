module.exports = class DBUtil {

    /**
     *
     * Builds a SELECT query to grab stats with certain conditional statements.
     *
     * @param query - The base query
     * @param params - The filters to be parsed into a query
     * @return
     *   The built query.
     */
    static buildQuery(query, params) {
        let queryArgs = [];
        const paramsList = Object.entries(params)
        if (paramsList.length > 0) {
            for (const [key, value] of paramsList) {
                // If same param has multiple values
                if (value.constructor === Array) {
                    value.forEach((arrayVal => {
                        queryArgs.push(`${key} ${arrayVal}`);
                    }));
                } else {
                    queryArgs.push(`${key} ${value}`);
                }
            }
            // Join all conditional statements with "AND"
            query += ` WHERE ${queryArgs.join(" AND ")}`;
        }
        return query
    }
}