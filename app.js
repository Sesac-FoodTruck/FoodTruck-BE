// this script : app.js
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const cors = require('cors');
const serveFavicon = require('serve-favicon');
const compression = require('compression');
const { indexRouter } = require('./src/router/indexRouter.js');
const { getConnection } = require('./src/middleware/database.js');
const app = express();
const port = 5000;

// 라우트 모듈 임포트
const frontRoutes = require('./src/routes/frontRoutes'); // 프론트 입력 테스트용 
<<<<<<< HEAD
const registerRoutes = require('./src/routes/registerRoutes'); 
=======
const registerRoutes = require('./src/routes/registerRoutes');
>>>>>>> 437fab1fad591f1def7ebe0a538a8e0fc06ec451
const memberRoutes = require('./src/routes/memberRoutes');  // 맴버 정보 api 엔드포인트
const memberApiRoutes = require('./src/routes/memberApiRoutes');  // 맴버의 like, report(신고), review, rate, favorite 리스트
const calculateRoutes = require('./src/routes/calculateRoutes');  // 위도+경도+거리 로 매장리스트+거리 제공 api
const truckRoutes = require('./src/routes/truckRoutes')  // 푸드트럭 등록/갱신
// Static
app.use(express.static('public'));
app.use(express.static('front'));
app.use('/public', express.static(path.join(__dirname, './public')));
// cors : 보안수준 낮게
app.use(cors({
    // origin: "http://localhost:3000",
    origin: ['localhost:3000', 'localhost:5000', 'http://aws.amazon.com'],
    credentials: true,
}));

<<<<<<< HEAD
// expres.json() 미들웨어
=======
// express.json() 미들웨어
>>>>>>> 437fab1fad591f1def7ebe0a538a8e0fc06ec451
app.use(express.json());

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, '/src/views'), {
    express: app,
    autoescape: true,
    watch: true,
    noCache: true
});

<<<<<<< HEAD
app.use(getConnection);
=======
// app.use(getConnection);
>>>>>>> 437fab1fad591f1def7ebe0a538a8e0fc06ec451
app.use(frontRoutes);
app.use(registerRoutes);
app.use(memberRoutes); // 맴버 기본정보
app.use(memberApiRoutes); // 맴버 활동 활동
app.use(calculateRoutes); // 거리별 트럭(매장) 조회 라우트 모듈 사용
app.use(truckRoutes); // 트럭(매장) 등록 및 업데이트 및 갱신

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