const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/callback', async (req, res) => {
    try {
        const code = req.query.code;
        console.log(code);

        // 토큰 발급받기
        const authToken = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            {},
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                params: {
                    grant_type: 'authorization_code',
                    client_id: '6f058c86db21168b8e6606ff565b4574', // Replace with your Kakao client ID
                    code,
                    redirect_uri: 'https://www.yummytruck.shop/auth/kakao/callback',
                },
            }
        );

        // 사용자 정보 가져오기
        const user = await axios({
            method: 'GET',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                Authorization: `Bearer ${authToken.data.access_token}`,
            },
        });

        const profile = user.data.kakao_account.profile;
        const id = user.data.id;
        const nickname = profile.nickname;
        console.log(id, nickname);
        kakaoStrategyCallback(id, nickname, done)

        const answer = { id: id, nickname: nickname };
        res.json(answer);
    } catch (error) {
        console.error('에러 발생:', error.message);
        console.error('에러 발생:', error.response.data);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// kakao.js 에서 가져와서 추가한 코드
// 기존 코드
async function kakaoStrategyCallback(id, username) {
    let dbConnection = null;

    try {
        const dbConnection = await mysql.createConnection(dbConfig); // 데이터베이스 연결

        const [existingUser] = await dbConnection.query('SELECT * FROM member WHERE social_id = ?', [id]);
        if (existingUser.length > 0) {
            const user = existingUser[0];
        } else {
            // 새로운 사용자 등록
            await axios.post('https://www.yummytruck.store/memberRegister', {
                nickname: username,
                social_id: id,
                social_code: 1, // 카카오 코드
                social_token: ''
            });
        }
    } catch (error) {
        done(error);
    } finally {
        if (dbConnection && dbConnection.end) {
            await dbConnection.end(); // 데이터베이스 연결 종료
        }
    }
}


module.exports = router;  