const express = require('express');
const router = express.Router();

router.get("/purchase", (req, res) => {
    res.render('purchase.html', { title: "가계부", content: "나의 소비기록"});
});

module.exports = router;