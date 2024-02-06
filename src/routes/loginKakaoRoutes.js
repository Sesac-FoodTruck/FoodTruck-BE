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

        const answer = { id: id, nickname: nickname };
        res.json(answer);
    } catch (error) {
        console.error('에러 발생:', error.message);
        console.error('에러 발생:', error.response.data);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;  