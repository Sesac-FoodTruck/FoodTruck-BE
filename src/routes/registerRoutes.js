const express = require('express');
const router = express.Router();

router.get("/register", (req, res) => {
    res.render('register.html');
});

// 실제 등록과 상관없는 QR 테스트 페이지용 코드(에러 수정 못함)
router.post('/register', async (req, res) => {
    const { name, latitude, longitude, additionalInfo } = req.body;

    try {
        const connection = await pool.getConnection();
        const query = `INSERT INTO store (name, latitude, longitude, additionalInfo) VALUES (?, ?, ?, ?)`;
        await connection.query(query, [name, latitude, longitude, additionalInfo]);
        connection.release();

        res.redirect('/');
    } catch (error) {
        console.log('매장 등록 오류', error);
        res.status(500).send('Database error');
    }
});

module.exports = router;