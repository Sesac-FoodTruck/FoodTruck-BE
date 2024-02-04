const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const nunjucks = require('nunjucks');
const cors = require('cors');
const compression = require('compression');
const { indexRouter } = require('./src/router/indexRouter.js');
const { getConnection } = require('./src/middleware/database.js');

const app = express();
const port = 4000;

// express-session 설정
app.use(session({
    secret: 'foodtruck1234', // 여기에 안전한 비밀 키를 설정해주세요.
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(cookieParser());

// 소셜로그인을 위한 설정
require('dotenv').config();
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const LocalStrategy = require('passport-kakao').Strategy;

// 라우트 모듈 임포트
const frontRoutes = require('./src/routes/frontRoutes'); // 프론트 입력 테스트용 
const registerRoutes = require('./src/routes/registerRoutes');
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
    origin: ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:5000', 'http://aws.amazon.com'],
    credentials: true,
}));

// express.json() 미들웨어
app.use(express.json());

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, '/src/views'), {
    express: app,
    autoescape: true,
    watch: true,
    noCache: true
});

app.use(getConnection);
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

//passport 초기화
app.use(passport.initialize());
app.use(passport.session());


//각 전략파일을 추가로 더 불러오기

require(path.join(__dirname, 'src/strategies', 'kakao'))(app);

//사용자 정보와 세션 연결 (로그인 정보를 세션에 저장)
passport.serializeUser((user,done)=>{
    done(null, user.id)
    console('세션정보:',user.id);
})

//user-id를 기반으로, 사용자 객체를 다시 가져오기 위한 함수 
passport.deserializeUser(async (id, done) => {
    try {
        const dbConnection = await getConnection();
        const [user] = await dbConnection.query('SELECT * FROM member WHERE id = ?', [id]);
        done(null, user[0]);
    } catch (error) {
        done(error);
    }
});


// 카카오 로그인 라우트 설정
app.get('/auth/kakao', passport.authenticate('kakao'));

// 카카오 로그인 콜백 라우트
app.get('/auth/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/', // 로그인 실패시 리다이렉트할 경로
}), (req, res) => {
    // 성공적인 인증 후 처리
    res.redirect(`/member?id=${req.user.id}`); // 예: 맴버id로 전달
});


// favicon.ico 요청 무시
app.get('/favicon.ico', (req, res) => res.status(204));

// 라우터 분리
indexRouter(app);

app.listen(port, () => {
    console.log(`접속 : ${port}`)
})

module.exports = app;