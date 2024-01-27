const express = require('express');
const router = express.Router();

router.get("/main", (req, res) => {
    res.render('main.html', { title: "첫 페이지", content: "1.지도 + 2.신규등록 3.nav"});
});

router.get("/updateMember", (req, res) => {
    res.render('updateMember.html');
});

router.get("/deleteMember", (req, res) => {
    res.render('deleteMember.html');
});

router.get('/mypage', (req, res) => {
    res.render('mypage.html', { title: "마이 페이지", content: "내 정보 페이지"});
});

router.get("/registerMember", (req, res) => {
    res.render('registerMember.html');
});

router.get("/purchase", (req, res) => {
    res.render('purchase.html', { title: "가계부", content: "나의 소비기록"});
});

router.get("/registerMember", (req, res) => {
    res.render('registerMember.html');
});

router.get("/registerFavorite", (req, res) => {
    res.render('registerFavorite.html');
});

router.get("/updateFavorite", (req, res) => {
    res.render('updateFavorite.html');
});

router.get("/registerTruck", (req, res) => {
    res.render('registerTruck.html');
});

router.get("/updateTruck", (req, res) => {
    res.render('updateTruck.html');
});

router.get("/registerItem", (req, res) => {
    res.render('registerItem.html');
});

router.get("/updateItem", (req, res) => {
    res.render('updateItem.html');
});

// router.get("/registerTruckComfirm", (req, res) => {
//     res.render('registerTruckComfirm.html');
// });

router.get("/updateTruckComfirm", (req, res) => {
    res.render('updateTruckComfirm.html');
});


module.exports = router;