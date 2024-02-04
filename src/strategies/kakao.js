const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const axios = require('axios');
require('dotenv').config();
const API_BASE_URL = 'http://localhost:4000';


// DB 직접 접속
const mysql = require('mysql2/promise'); // mysql2/promise 모듈 추가

const dbConfig = {
    host: "www.yummytruck.store",
    user: "truck-client",
    port: "3306",
    password: "111111",
    database: "foodtruck",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: process.env.KAKAO_CALLBACK_URL,
    callbackURL: '/auth/kakao/callback'
}, kakaoStrategyCallback));

async function kakaoStrategyCallback(accessToken, refreshToken, profile, done) {
    let dbConnection = null;

    try {
        dbConnection = await mysql.createConnection(dbConfig); // 데이터베이스 연결

        const [existingUser] = await dbConnection.query('SELECT * FROM member WHERE social_id = ?', [profile.id]);
        if (existingUser.length > 0) {
            const user = existingUser[0];
            done(null, user); // 기존 사용자인 경우 로그인 처리 후 리다이렉트
        } else {
            // 새로운 사용자 등록
            const response = await axios.post(`${API_BASE_URL}/memberRegister`, {
                nickname: profile.username,
                social_id: profile.id,
                social_code: 1, // 카카오 코드
                social_token: accessToken
            });

            if (response.status === 201) { // 회원가입 성공
                const newUser = response.data;
                done(null, newUser); // 회원가입 후 로그인 처리
            } else {
                throw new Error('회원가입 실패');
            }
        }
    } catch (error) {
        console.error('회원 등록 중 에러 발생:', error);
        done(error);
    } finally {
        if (dbConnection) {
            await dbConnection.end();
        }
    }
}

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log('deserializeUser user : ', users)
    done(null, user);
})

module.exports = (app) => {
    app.get('/auth/kakao', passport.authenticate('kakao'));
    app.get('/auth/kakao/callback', passport.authenticate('kakao', {
        failureRedirect: '/',
    }), (req, res) => {
        res.cookie('userId', req.user.id, { httpOnly: true });

        const redirectUrl = req.cookies.originalUrl || '/';
        console.log('redirectUrl : ', redirectUrl)
        res.redirect(redirectUrl);
    });
};
