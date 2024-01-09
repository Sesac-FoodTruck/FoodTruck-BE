const express = require('express');
const router = express.Router();

// 회원 ID를 기준으로 review 조회
router.get('/member/:id/review', async (req, res) => {
    try {
        const memberId = req.params.id;
        const query = 'SELECT * FROM review WHERE id = ?';
        const [reviews] = await req.connection.query(query, [memberId]);
        console.log(reviews);
        res.json(reviews);
    } catch (error) {
        console.error("Database error in review:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// 회원 ID를 기준으로 report 조회
router.get('/member/:id/report', async (req, res) => {
    try {
        const memberId = req.params.id;
        const query = 'SELECT * FROM report WHERE id = ?';
        const [reports] = await req.connection.query(query, [memberId]);
        console.log(reports);
        res.json(reports);
    } catch (error) {
        console.error("Database error in report:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// 회원 ID를 기준으로 rate 조회
router.get('/member/:id/rate', async (req, res) => {
    try {
        const memberId = req.params.id;
        const query = 'SELECT * FROM rate WHERE id = ?';
        const [rates] = await req.connection.query(query, [memberId]);
        console.log(rates);
        res.json(rates);
    } catch (error) {
        console.error("Database error in rate:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// 회원 ID를 기준으로 like 조회
router.get('/member/:id/like', async (req, res) => {
    try {
        const memberId = req.params.id;
        const query = 'SELECT * FROM `like` WHERE id = ?';
        const [likes] = await req.connection.query(query, [memberId]);
        console.log(likes);
        res.json(likes);
    } catch (error) {
        console.error("Database error in like:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// 회원 ID를 기준으로 favorite 조회
router.get('/member/:id/favorite', async (req, res) => {
    try {
        const memberId = req.params.id;
        const query = 'SELECT * FROM favorite WHERE id = ?';
        const [favorites] = await req.connection.query(query, [memberId]);
        console.log(favorites);
        res.json(favorites);
    } catch (error) {
        console.error("Database error in favorite:", error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
