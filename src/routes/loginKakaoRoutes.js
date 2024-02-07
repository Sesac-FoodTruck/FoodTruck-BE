const express = require('express');
const axios = require('axios');
const mysql = require('mysql2/promise'); // mysql 라이브러리 추가
const { v4: uuidv4 } = require('uuid'); // uuid 라이브러리 추가

const router = express.Router();

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

router.get('/auth/kakao/callback', async (req, res) => {
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
                    client_id: '6f058c86db21168b8e6606ff565b4574',
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
        const existingMember = await checkMember(id, nickname);

        // UUID 생성 또는 가져오기
        const userId = existingMember ? existingMember.id : uuidv4();

        // 새로운 멤버 등록이면 UUID로 저장
        if (!existingMember) {
            const newMember = {
                nickname: nickname,
                social_id: id,
                social_code: 1, // 카카오 코드 (예: 카카오는 1로 지정)
                social_token: authToken.data.access_token,
                id: userId, // UUID
            };

            // 데이터베이스에 연결하여 회원 등록
            const dbConnection = await mysql.createConnection(dbConfig);
            const insertQuery = 'INSERT INTO member (id, nickname, social_id, social_code, social_token) VALUES (?, ?, ?, ?, ?)';
            console.log(insertQuery)
            await dbConnection.query(insertQuery, [newMember.id, newMember.nickname, newMember.social_id, newMember.social_code, newMember.social_token]);
            await dbConnection.end(); // 데이터베이스 연결 종료
        }



        // UUID와 social_id를 헤더에 추가하여 전달
        res.setHeader('X-UserId', userId);
        res.setHeader('X-SocialId', id);

        const answer = { id: userId, nickname: nickname };
        res.json(answer);
    } catch (error) {
        console.error('에러 발생:', error.message);
        console.error('에러 발생:', error.response.data);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 기존 코드에서 가져온 함수로 멤버 확인 또는 등록
async function checkMember(socialId, nickname) {
    let dbConnection = null;

    try {
        const dbConnection = await mysql.createConnection(dbConfig); // 데이터베이스 연결

        const [existingUser] = await dbConnection.query('SELECT * FROM member WHERE social_id = ?', [socialId]);
        if (existingUser.length > 0) {
            const user = existingUser[0];
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error('에러 발생:', error.message);
        return null;
    } finally {
        if (dbConnection && dbConnection.end) {
            await dbConnection.end(); // 데이터베이스 연결 종료
        }
    }
}

module.exports = router;