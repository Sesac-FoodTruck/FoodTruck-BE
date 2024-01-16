const express = require('express');
const router = express.Router();
const getConnection = require('../middleware/database'); // getConnection 미들웨어를 임포트
const fs = require('fs'); // 파일 시스템 모듈 추가

router.get('/member', getConnection, async (req, res) => {
    const memberId = req.query.id;

    try {
        if (!memberId) {
            return res.status(404).json({ error: "No data" });
        }

        const query = 'SELECT * FROM member WHERE id = ?';
        const [rows] = await req.connection.query(query, [memberId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Member not found" });
        }

        // 이미지 데이터를 파일로 저장
        const profileImg = rows[0].profileimg;
        if (profileImg) {
            const imgPath = `public/images/members/${memberId}.jpg`; // 이미지 경로 수정
            fs.writeFileSync(imgPath, profileImg);
            rows[0].profileimg = imgPath;
        }

        console.log(rows[0]);

        res.json(rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;