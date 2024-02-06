const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getConnection } = require('../middleware/database');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'public/images/stores/' });

router.post('/storeRegister', upload.single('photos'), getConnection, async (req, res) => {
    const { storename, storetime, categoryid, storeweek, contact, account, payment, latitude, longitude, confirmed, id, location, reportcount } = req.body.data;
    const photos = req.file ? 'images/stores/' + req.file.filename : '';

    try {
        const insertQuery = 'INSERT INTO store (storename, storetime, categoryid, storeweek, photos, contact, account, payment, latitude, longitude, location, confirmed, id, reportcount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await req.dbConnection.query(insertQuery, [storename, storetime, categoryid, storeweek, photos, contact, account, payment, latitude, longitude, location, confirmed, id, reportcount]);

        // 새로 생성된 storeno 가져오기
        const newStoreNo = result.insertId;

        // 쿠키에 storeNo 저장
        res.cookie('storeNo', newStoreNo, { httpOnly: true });

        res.status(201).json({ message: "매장 등록 성공", storeNo: newStoreNo });
    } catch (error) {
        console.error("매장 등록 실패:", error);
        res.status(500).json({ error: "매장 등록 실패" });
    }
});

router.put('/storeUpdate', upload.single('photos'), getConnection, async (req, res) => {
    const storeno = req.query.storeno;
    console.log("Received store number:", storeno);
    console.log("Received body:", req.body.data);

    // Destructure all required fields from req.body.data
    const { storename, storetime, categoryid, storeweek, contact, account, payment, latitude, longitude, confirmed, id, reportcount } = req.body.data;
    const photos = req.file ? req.file.path : '';

    try {
        const updateQuery = 'UPDATE store SET storename = ?, storetime = ?, categoryid = ?, storeweek = ?, photos = ?, contact = ?, account = ?, payment = ?, latitude = ?, longitude = ?, confirmed = ?, id = ?, reportcount = ? WHERE storeno = ?';
        await req.dbConnection.query(updateQuery, [storename, storetime, categoryid, storeweek, photos, contact, account, payment, latitude, longitude, confirmed, id, reportcount, storeno]);
        res.status(200).json({ message: "매장 정보 업데이트 성공" });
    } catch (error) {
        console.error("매장 정보 업데이트 실패:", error);
        res.status(500).json({ error: "매장 정보 업데이트 실패" });
    }
});


router.post('/itemRegister', upload.single('itemimgurl'), getConnection, async (req, res) => {
    const { itemname, iteminformation, itemprice, storeno } = req.body.data;
    const itemimgurl = req.file ? 'images/items/' + req.file.filename : ''; // 이미지 파일 경로 수정

    try {
        const insertQuery = 'INSERT INTO item (itemname, itemimgurl, iteminformation, itemprice, storeno) VALUES (?, ?, ?, ?, ?)';
        await req.dbConnection.query(insertQuery, [itemname, itemimgurl, iteminformation, itemprice, storeno]);
        res.status(201).json({ message: "메뉴 아이템 등록 성공" });
    } catch (error) {
        console.error("메뉴 아이템 등록 실패:", error);
        res.status(500).json({ error: "메뉴 아이템 등록 실패" });
    }
});

router.put('/itemUpdate', upload.single('itemimgurl'), getConnection, async (req, res) => {
    const itemid = req.query.itemid;
    const { itemname, iteminformation, itemprice, storeno } = req.body.data;
    const itemimgurl = req.file ? 'images/items/' + req.file.filename : ''; // 이미지 파일 경로 수정

    try {
        // 데이터베이스 쿼리 실행
        const updateQuery = 'UPDATE item SET itemname = ?, itemimgurl = ?, iteminformation = ?, itemprice = ?, storeno = ? WHERE itemid = ?';
        await req.dbConnection.query(updateQuery, [itemname, itemimgurl, iteminformation, itemprice, storeno, itemid]);
        res.status(200).json({ message: "메뉴 아이템 업데이트 성공" });
    } catch (error) {
        console.error("메뉴 아이템 업데이트 실패:", error);
        res.status(500).json({ error: "메뉴 아이템 업데이트 실패" });
    }
});

// 매장 인증 정보 업데이트 (PUT)
router.put('/storeConfirmUpdate', getConnection, async (req, res) => {
    const storeno = req.body.data.storeno; // URL에서 쿼리 스트링 대신 바디에서 storeno를 받음
    const { confirmed } = req.body.data;

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