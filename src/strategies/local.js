const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;
const axios = require('axios');
require('dotenv').config();
const db = require('../db'); // 데이터베이스 연결 모듈을 가져옵니다.

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// const users = require('../users') // 사용자 계정 정보가 있는 파일


const LocalStrategyCallback = (username, password, done)=>{
    console.log('로컬 인증 진행',username,password);

    const user = users.find((u)=> u.username === username && u.password === password);

    if(!user){
        console.log('로그인 실패')

        return done(null, false,{
            message: 'id/pw가 잘못 되었습니다.'
        })
    }
    console.log('사용자 발견:',user)
    return done(null, user,{message: '로그인에 성공했습니다.'})
};

passport.use(new LocalStrategy(LocalStrategyCallback))

module.exports = (app)=>{
    app.post('/login',
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/',
        successFlash: true,
        failureFlash: true,
    }));
}