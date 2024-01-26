const express = require('express');
const router = express.Router();

// 회원 ID를 기준으로 옵션(like, review, report, rate, favorite 데이터 조회)
// 옵션은 &option={옵션1}&option={옵션2}.... 형식
router.get('/memberapi', async (req, res) => {
    const id = req.query.member;
    const options = Array.isArray(req.query.option) ? req.query.option : [req.query.option];

    try {
        const buildQuery = (tableName) => {
            // Use backticks for table names to avoid issues with reserved keywords
            return `SELECT * FROM \`${tableName}\` WHERE id = ?`;
        };

        let results = {};

        for (let opt of options) {
            let query;
            switch (opt) {
                case 'like':
                    query = buildQuery('like'); // Enclosed in backticks
                    break;
                case 'favorite':
                    query = buildQuery('favorite');
                    break;
                case 'review':
                    query = buildQuery('review');
                    break;
                case 'report':
                    query = buildQuery('report');
                    break;
                default:
                    continue;
            }

            console.log(`Executing query: ${query} with id: ${id}`);
            const [rows] = await req.dbConnection.query(query, [id]);
            console.log(`Query results: `, rows);

            if (rows.length > 0) {
                results[opt] = rows.map(row => {
                    let tableRow = {};
                    for (let [key, value] of Object.entries(row)) {
                        tableRow[key] = value;
                    }
                    return tableRow;
                });
            }
        }

        if (Object.keys(results).length === 0) {
            return res.status(404).json({ error: "No data" });
        }

        res.json(results);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
