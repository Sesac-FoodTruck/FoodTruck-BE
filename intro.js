const express = require("express");
const mysql2 = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5000;

// Mysql 디비 환경설정
const dbConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "0000",
    database: "foodtruck"
};

// DB 커넥션 풀생성
const pool = mysql2.createPool(dbConfig);
console.log("풀생성")

// sql 스크립트 읽기와 입력 함수
async function executeSQLScript() {
    console.log("DB 스크립스 실행");
    try {
        const sqlScriptPath = path.join(__dirname, "./src/models/init_database.sql");
        const sqlScript = fs.readFileSync(sqlScriptPath, "utf8");
        const sqlStatements = sqlScript.split(";"); // 새미콜론으로 구문구분

        const connection = await pool.getConnection();
        try {
            for (const sqlStatement of sqlStatements) {
                if (sqlStatement.trim()) { // 빈테이블 스킵
                    await connection.query(sqlStatement);
                }
            }
        } finally {
            connection.release();
        }

        console.log("DB 스키마 테이블생성 성공");
    } catch (error) {
        // 테이블이 이미 존재하는 경우 스킵 후 메시지 출력
        if (error.code === 'ER_TABLE_EXISTS_ERROR') {
            console.log("DB 테이블이 이미 존재합니다.")
        } else {
            console.error("디비생성 실패:", error);
        }
    }
}

// express 라우터로 데이타 패치
app.get("/:table", async (req, res) => {
    console.log("DB 데이터 검색");
    const dbTable = req.params.table;

    const query = `SELECT * FROM ${dbTable}`;

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(query);
        connection.release();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Database error"});
    }
});

app.get("/", (req, res) => {
    const data = {
        title: "메인페이지",
        content: "위치 지정하면(재검색)"
    }
    res.redirect('main.html', data);
});

app.get("/main", (req, res) => {
    const data = {
        title: "메인페이지",
        content: "위치 지정하면(재검색)"
    }
    res.render('main.html', data);
});

app.get('/register', (req, res) => {
    const data = {
        title: "신규매장등록",
        content: "신규매장등록"
    }
    res.render("register", data);
});

app.get('/mypage', (req, res) => {
    const data = {
        title: "My Page",
        content: "My Page"
    }
    res.render("register", data);
});

// 위도, 경도 입력과 사전 정의된 거리를 기반으로 매장 조회하는 라우터
app.get("/calculate/:latitude/:longitude/:distance", async (req, res) => {
    const latitude = parseFloat(req.params.latitude);
    const longitude = parseFloat(req.params.longitude);

    const distance = parseFloat(req.params.distance);

    // 위도 경도 차이 계산
    const latDiff = distance / 111.32;
    const longDiff = distance / (111.32 * Math.cos(latitude * (Math.PI / 180)));

    // 위도 경도 범위 계산 (단위: Km)
    const minLat = latitude - latDiff;
    const maxLat = latitude + latDiff;
    const minLong = longitude - longDiff;
    const maxLong = longitude + longDiff;

    // 가로세로폭이 지정된 거리보다 작거나 같은 매장 데이터 조회
    const query = `
        SELECT * 
        FROM store
        WHERE
            latitude BETWEEN ? AND ?
            AND
            longitude BETWEEN ? AND ?
            LIMIT 10
    `;

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(query, [minLat, maxLat, minLong, maxLong]);
        connection.release();
        res.json(rows); // 매장 데이터 json 형태로 출력
        console.log(rows);
    } catch (error) {
        res.status(500).json({ error: "Database error"});
    }
})

// DB 초기화 후 Express 앱 실행 
async function main() {
    try {
        await executeSQLScript(); // DB 초기화 
        app.listen(port, () => {
            console.log(`서버 ${port}에서 Ready`);
        });
    } catch (error) {
        console.log("서버 시작 실패", error);
    }
}

main();