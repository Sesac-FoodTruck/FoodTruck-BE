const express = require('express');
const router = express.Router();

router.get('/mypage', (req, res) => {
    res.render('mypage.html', { title: "마이 페이지", content: "내 정보 페이지"});
})

module.exports = router;