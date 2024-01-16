// this script : app.js
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const cors = require('cors');
const serveFavicon = require('serve-favicon');
const compression = require('compression');
const { indexRouter } = require('./src/router/indexRouter.js');
const getConnection = require('./src/middleware/database');
const app = express();
const port = 3000;

// 라우트 모듈 임포트
const mainRoutes = require('./src/routes/mainRoutes');
const registerRoutes = require('./src/routes/registerRoutes');
const purchaseRoutes = require('./src/routes/purchaseRoutes');
const mypageRoutes = require('./src/routes/mypageRoutes');
const memberRoutes = require('./src/routes/memberRoutes');
// - 맴버의 like, report(신고), review, rate, favorite 리스트
const memberApiRoutes = require('./src/routes/memberApiRoutes');
// - 위도+경도+거리 로 매장리스트+거리 제공 api
const calculateRoutes = require('./src/routes/calculateRoutes');

// Static
app.use(express.static('public'));
app.use(express.static('front'));

// cors : 보안수준 낮게
app.use(cors({
    // origin: "http://localhost:3000",
    origin: ['localhost:3000', 'localhost:5000', 'http://aws.amazon.com'],
    credentials: true,
}));

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, '/src/views'), {
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
app.use(calculateRoutes); // 매장 조회 라우트 모듈 사용

// body json 파싱
app.use(express.json());
// HTTP 요청 압축
app.use(compression());

// favicon.ico 요청 무시
app.get('/favicon.ico', (req, res) => res.status(204));

// 라우터 분리
indexRouter(app);

app.listen(port, () => {
    console.log(`접속 : ${port}`)
})

module.exports = app;