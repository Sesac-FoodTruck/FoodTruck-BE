const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); // uuid 라이브러리 추가

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
                    client_id: 'YOUR_CLIENT_ID', // Replace with your Kakao client ID
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

        // 여기서 social_id와 nickname을 가지고 member 테이블에 등록 또는 확인하는 로직 추가
        const existingMember = await checkMember(id);

        const answer = { id: id, nickname: nickname };
        res.json(answer);
    } catch (error) {
        console.error('에러 발생:', error.message);
        console.error('에러 발생:', error.response.data);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 기존 코드에서 가져온 함수로 멤버 확인 또는 등록
async function checkMember(socialId) {
    let dbConnection = null;

    try {
        const dbConnection = await mysql.createConnection(dbConfig); // 데이터베이스 연결

        const [existingUser] = await dbConnection.query('SELECT * FROM member WHERE social_id = ?', [socialId]);
        if (existingUser.length > 0) {
            const user = existingUser[0];
            return user;
        } else {
            // 새로운 멤버 등록
            const newMember = {
                nickname: nickname, // 사용자의 닉네임
                social_id: socialId, // 사용자의 social_id (카카오 ID)
                social_code: 1, // 카카오 코드 (예: 카카오는 1로 지정)
                social_token: authToken.data.access_token, // 사용자의 토큰 정보
            };

            // 새로운 멤버 등록 요청
            const response = await axios.post('https://www.yummytruck.shop/memberRegister', newMember);

            return response.data;
        }
    } catch (error) {
        console.error('에러 발생:', error.message);
    } finally {
        if (dbConnection && dbConnection.end) {
            await dbConnection.end(); // 데이터베이스 연결 종료
        }
    }
}

module.exports = router;