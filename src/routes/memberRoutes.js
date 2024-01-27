const express = require('express');
const router = express.Router();
const { getConnection } = require('../middleware/database.js'); // getConnection 미들웨어를 임포트
const fs = require('fs'); // 파일 시스템 모듈 추가
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const upload = multer({ dest: '/images/members/' });

router.get('/member', getConnection, async (req, res) => {
    const memberId = req.query.id;

    try {
        if (!memberId) {
            return res.status(404).json({ error: "No data" });
        }

        const query = 'SELECT * FROM member WHERE id = ?';
        const [rows] = await req.dbConnection.query(query, [memberId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Member not found" });
        }

        // 이미지 데이터를 파일로 저장
        const profileImg = rows[0].profileimg;
        if (profileImg) {
            const imgPath = `/images/members/${memberId}.jpg`; // 이미지 경로 수정
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

// 공통 에러 처리 함수
const handleDatabaseError = (error, res) => {
    console.error("DB 처리 에러:", error);
    res.status(500).json({ error: "DB 처리 failed" });
};

// 사용자 등록
router.post('/memberRegister', upload.single('profileimg'), getConnection, async (req, res) => {
    const id = uuidv4();
    const { nickname, social_id, social_code, social_token } = req.body;
    const profileimg = req.file ? req.file.path : '';

    try {
        const insertQuery = 'INSERT INTO member (id, nickname, profileimg, social_id, social_code, social_token) VALUES (?, ?, ?, ?, ?, ?)';
        await req.dbConnection.query(insertQuery, [id, nickname, profileimg, social_id, social_code, social_token]);
        res.status(201).json({ message: "사용자 등록 성공", id: id });
    } catch (error) {
        handleDatabaseError(error, res);
    }
});

// ID를 기준으로 멤버 삭제
router.delete('/member', getConnection, async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ error: "사용자ID 공백" });
    }

    try {
        const deleteQuery = 'DELETE FROM member WHERE id = ?';
        await req.dbConnection.query(deleteQuery, [id]); // id 변수 사용
        res.status(200).json({ message: "사용자정보 삭제 성공" });
    } catch (error) {
        handleDatabaseError(error, res);
    }
});

// ID를 기준으로 멤버 정보 업데이트
router.put('/member', getConnection, async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ error: "사용자ID 공백" });
    }

    const { nickname, profileimg, social_id, social_code, social_token } = req.body;

    try {
        const updateQuery = 'UPDATE member SET nickname = ?, profileimg = ?, social_id = ?, social_code = ?, social_token = ? WHERE id = ?';
        await req.dbConnection.query(updateQuery, [nickname, profileimg, social_id, social_code, social_token, id]);
        res.status(200).json({ message: "사용자정보 업데이트 성공" });
    } catch (error) {
        handleDatabaseError(error, res);
    }
});

// Favorite 등록 (using GET request with query parameters)
router.get('/favoriteRegister', getConnection, async (req, res) => {
    const { id, favoriteLatitude, favoriteLongitude, location_code } = req.query;

    try {
        const insertQuery = 'INSERT INTO favorite (id, favoriteLatitude, favoriteLongitude, location_code) VALUES (?, ?, ?, ?)';
        await req.dbConnection.query(insertQuery, [id, favoriteLatitude, favoriteLongitude, location_code]);
        res.status(201).json({ message: "Favorite 등록 성공" });
    } catch (error) {
        console.error("Favorite 등록 실패:", error);
        res.status(500).json({ error: "Favorite 등록 실패" });
    }
});

// Favorite 정보 업데이트
router.put('/favoriteUpdate', getConnection, async (req, res) => {
    const { favoriteno, id, favoriteLatitude, favoriteLongitude, location_code } = req.query;

    try {
        const updateQuery = 'UPDATE favorite SET id = ?, favoriteLatitude = ?, favoriteLongitude = ?, location_code = ? WHERE favoriteno = ?';
        await req.dbConnection.query(updateQuery, [id, favoriteLatitude, favoriteLongitude, location_code, favoriteno]);
        res.status(200).json({ message: "Favorite 업데이트 성공" });
    } catch (error) {
        console.error("Favorite 업데이트 실패:", error);
        res.status(500).json({ error: "Favorite 업데이트 실패", details: error.message });
    }
});


module.exports = router;