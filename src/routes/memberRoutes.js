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
router.delete('/memberDelete', getConnection, async (req, res) => {
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

router.put('/memberUpdate', upload.single('profileimg'), getConnection, async (req, res) => {
    const id = req.query.id; // id를 URL 쿼리에서 가져옵니다.
    let { nickname, social_id, social_code, social_token } = req.body; // 'profileimg'는 req.file에서 가져올 것입니다.

    // id가 제공되지 않았을 경우의 에러 처리
    if (!id) {
        return res.status(400).json({ error: "No member ID provided" });
    }

    let updateQuery = 'UPDATE member SET';
    let queryParams = [];
    let queryFields = [];

    // 각 필드에 대한 업데이트 로직
    if (nickname) {
        queryFields.push(' nickname = ?');
        queryParams.push(nickname);
    }
    if (social_id) {
        queryFields.push(' social_id = ?');
        queryParams.push(social_id);
    }
    if (social_code) {
        queryFields.push(' social_code = ?');
        queryParams.push(social_code);
    }
    if (social_token) {
        queryFields.push(' social_token = ?');
        queryParams.push(social_token);
    }

    // 파일이 업로드된 경우, 이미지 경로 업데이트
    if (req.file) {
        const profileimg = req.file.path;
        queryFields.push(' profileimg = ?');
        queryParams.push(profileimg);
    }

    // 업데이트할 데이터가 없는 경우 처리
    if (queryFields.length === 0) {
        return res.status(400).json({ error: "No data provided for update" });
    }

    updateQuery += queryFields.join(',');
    updateQuery += ' WHERE id = ?';
    queryParams.push(id);

    try {
        await req.dbConnection.query(updateQuery, queryParams);
        res.status(200).json({ message: "Member information updated successfully" });
    } catch (error) {
        console.error("Error updating member information:", error);
        res.status(500).json({ error: "Error updating member information", details: error.message });
    }
});

// Favorite 정보 등록
router.post('/favoriteRegister', getConnection, async (req, res) => {
    const { id, favoriteLatitude, favoriteLongitude, location_code } = req.body;

    try {
        const insertQuery = 'INSERT INTO favorite (id, favoriteLatitude, favoriteLongitude, location_code) VALUES (?, ?, ?, ?)';
        await req.dbConnection.query(insertQuery, [id, favoriteLatitude, favoriteLongitude, location_code]);
        res.status(201).json({ message: "Favorite 등록 성공" });
    } catch (error) {
        console.error("Favorite 등록 실패:", error);
        res.status(500).json({ error: "Favorite 등록 실패", details: error.message });
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