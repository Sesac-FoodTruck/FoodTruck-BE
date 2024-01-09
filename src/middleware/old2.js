const mysql2 = require("mysql2/promise");
const dbConfig = require("../config/dbConfig");

// 데이터베이스 연결 풀 생성
const pool = mysql2.createPool(dbConfig);

// 각 요청에 데이터베이스 연결 제공하는 미들웨어 함수
async function getConnection(req, res, next) {
    try {
        // 데이터베이스 연결 풀에서 연결을 가져옵니다.
        req.connection = await pool.getConnection();

        // 다음 미들웨어로 이동
        next();
    } catch (error) {
        // 데이터베이스 연결에 실패한 경우, 에러 메시지를 반환합니다.
        console.error("데이터베이스 접속 에러:", error);
        res.status(500).json({ error: "데이터베이스 접속 에러" });
    }
}

// getConnection 함수를 모듈로 내보냅니다.
module.exports = pool;
