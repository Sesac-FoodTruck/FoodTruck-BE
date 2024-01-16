const express = require('express');
const router = express.Router();

router.get("/main", (req, res) => {
    res.render('main.html', { title: "첫 페이지", content: "1.지도 + 2.신규등록 3.nav"});
})

module.exports = router;