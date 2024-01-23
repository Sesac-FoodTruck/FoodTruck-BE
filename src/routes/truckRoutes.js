const express = require('express');
const axios = require('axios');
const router = express.Router();
const getConnection = require('../middleware/database'); // getConnection 미들웨어를 임포트
const fs = require('fs'); // 파일 시스템 모듈 추가
const multer = require('multer');
const upload = multer({ dest: '/images/stores/' });

// Register basic info of the store
// 매장 등록
router.post('/storeRegister', upload.single('photos'), getConnection, async (req, res) => {
    console.log('입력:', req.body);
    const { storename, storetime, categoryid, storeweek, contact, account, latitude, longitude, confirmed, memberid } = req.body;
    const photos = req.file ? req.file.path : '';

    try {
        const insertQuery = 'INSERT INTO store (storename, storetime, categoryid, storeweek, photos, contact, account, latitude, longitude, confirmed, memberid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await req.dbConnection.query(insertQuery, [storename, storetime, categoryid, storeweek, photos, contact, account, latitude, longitude, confirmed, memberid]);
        res.status(201).json({ message: "매장 등록 성공" });
    } catch (error) {
        console.error("매장 등록 실패:", error);
        res.status(500).json({ error: "매장 등록 실패" });
    }
});


// 매장 정보 업데이트
router.put('/storeUpdate/:storeno', upload.single('photos'), getConnection, async (req, res) => {
    const storeno = req.params.storeno;
    const { storename, storetime, categoryid, storeweek, contact, account, latitude, longitude, confirmed, memberid } = req.body;
    const photos = req.file ? req.file.path : '';

    try {
        const updateQuery = 'UPDATE store SET storename = ?, storetime = ?, categoryid = ?, storeweek = ?, photos = ?, contact = ?, account = ?, latitude = ?, longitude = ?, confirmed = ?, memberid = ? WHERE storeno = ?';
        await req.dbConnection.query(updateQuery, [storename, storetime, categoryid, storeweek, photos, contact, account, latitude, longitude, confirmed, memberid, storeno]);
        res.status(200).json({ message: "매장 정보 업데이트 성공" });
    } catch (error) {
        console.error("매장 정보 업데이트 실패:", error);
        res.status(500).json({ error: "매장 정보 업데이트 실패" });
    }
});


// 메뉴 아이템 등록
router.post('/itemRegister', upload.single('itemimgurl'), getConnection, async (req, res) => {
    const { itemname, iteminformation, itemprice, storeno } = req.body;
    const itemimgurl = req.file ? req.file.path : '';

    try {
        const insertQuery = 'INSERT INTO item (itemname, itemimgurl, iteminformation, itemprice, storeno) VALUES (?, ?, ?, ?, ?)';
        await req.dbConnection.query(insertQuery, [itemname, itemimgurl, iteminformation, itemprice, storeno]);
        res.status(201).json({ message: "메뉴 아이템 등록 성공" });
    } catch (error) {
        console.error("메뉴 아이템 등록 실패:", error);
        res.status(500).json({ error: "메뉴 아이템 등록 실패" });
    }
});

// 메뉴 아이템 업데이트
router.put('/itemUpdate/:iditem', upload.single('itemimgurl'), getConnection, async (req, res) => {
    const iditem = req.params.iditem;
    const { itemname, iteminformation, itemprice, storeno } = req.body;
    const itemimgurl = req.file ? req.file.path : '';

    try {
        const updateQuery = 'UPDATE item SET itemname = ?, itemimgurl = ?, iteminformation = ?, itemprice = ?, storeno = ? WHERE iditem = ?';
        await req.dbConnection.query(updateQuery, [itemname, itemimgurl, iteminformation, itemprice, storeno, iditem]);
        res.status(200).json({ message: "메뉴 아이템 업데이트 성공" });
    } catch (error) {
        console.error("메뉴 아이템 업데이트 실패:", error);
        res.status(500).json({ error: "메뉴 아이템 업데이트 실패" });
    }
});

// 매장 인증 정보 등록
router.post('/storeConfirm/:storeno', getConnection, async (req, res) => {
    const storeno = req.params.storeno;
    const { confirmed } = req.body;

    try {
        const confirmQuery = 'UPDATE store SET confirmed = ? WHERE storeno = ?';
        await req.dbConnection.query(confirmQuery, [confirmed, storeno]);
        res.status(200).json({ message: "매장 인증 정보 등록 성공" });
    } catch (error) {
        console.error("매장 인증 정보 등록 실패:", error);
        res.status(500).json({ error: "매장 인증 정보 등록 실패" });
    }
});

// 매장 인증 정보 업데이트
router.put('/storeConfirmUpdate/:storeno', getConnection, async (req, res) => {
    const storeno = req.params.storeno;
    const { confirmed } = req.body;

    try {
        const updateQuery = 'UPDATE store SET confirmed = ? WHERE storeno = ?';
        await req.dbConnection.query(updateQuery, [confirmed, storeno]);
        res.status(200).json({ message: "매장 인증 정보 업데이트 성공" });
    } catch (error) {
        console.error("매장 인증 정보 업데이트 실패:", error);
        res.status(500).json({ error: "매장 인증 정보 업데이트 실패" });
    }
});





module.exports = router;