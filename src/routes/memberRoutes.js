const express = require('express');
const router = express.Router();
const getConnection = require('../middleware/database'); // getConnection 미들웨어를 임포트

router.get('/member/:id', getConnection, async (req, res) => {
    const memberId = req.params.id;

    try {
        const query = 'SELECT * FROM member WHERE id = ?';
        const [rows] = await req.connection.query(query, [memberId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Member not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;