const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const axios = require('axios');
require('dotenv').config();

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
        const dbConnection = await mysql.createConnection(dbConfig); // 데이터베이스 연결

        const [existingUser] = await dbConnection.query('SELECT * FROM member WHERE social_id = ?', [profile.id]);
        if (existingUser.length > 0) {
            const user = existingUser[0];
            done(null, user);
        } else {
            // 새로운 사용자 등록
            const newUser = await axios.post('/memberRegister', {
                nickname: profile.username,
                social_id: profile.id,
                social_code: 1, // 카카오 코드
                social_token: accessToken
            });
            done(null, newUser.data);
        }
    } catch (error) {
        done(error);
    } finally {
        if (dbConnection && dbConnection.end) {
            await dbConnection.end(); // 데이터베이스 연결 종료
        }
    }
}

passport.serializeUser((user,done)=>{
    done(null, user);
});

passport.deserializeUser((user, done)=>{
    console.log('deserializeUser user : ', users)
    done(null,user);
})

// module.exports = (app) => {
//     app.get('/auth/kakao', passport.authenticate('kakao'));
//     app.get('/auth/kakao/callback', passport.authenticate('kakao', {
//         failureRedirect: '/', // 로그인 실패시 리다이렉트
//     }), (req, res) => {
//         console.log('전달 ID: ',req.user.id);
//         res.redirect(`/member?id=${req.user.id}`); // 성공 시 대시보드로 리다이렉트
//     });
// };

module.exports = (app) => {
    app.get('/auth/kakao', passport.authenticate('kakao'));

    app.get('/auth/kakao/callback', passport.authenticate('kakao', {
        failureRedirect: '/',
    }), (req, res) => {
        res.cookie('userId', req.user.id, { httpOnly: true });

        const redirectUrl = req.cookies.originalUrl || '/';
        res.redirect(redirectUrl);
    });
};
