const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const getConnection = require('./middleware/database');

const app = express();

// 라우트 모듈 임포트
const mainRoutes = require('./routes/mainRoutes');
const registerRoutes = require('./routes/registerRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const mypageRoutes = require('./routes/mypageRoutes');
const memberRoutes = require('./routes/memberRoutes');
const memberApiRoutes = require('./routes/memberApiRoutes');
const calculateRoutes = require('./routes/calculateRoutes'); // 새로 생성된 라우트 모듈

app.use(express.static('public'));

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    autoescape: true,
    watch: true,
    noCache: true
});

app.use(getConnection);

app.use(mainRoutes);
app.use(registerRoutes);
app.use(purchaseRoutes);
app.use(mypageRoutes);
app.use(memberRoutes);
app.use(memberApiRoutes);
app.use('/calculate', calculateRoutes); // 매장 조회 라우트 모듈 사용

module.exports = app;