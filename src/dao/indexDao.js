// this script : indexDao.js
// 데이터베이스에 접근

const { pool } = require('../database/database.js');

// --- GET ---
// 매장페이지 : 댓글
exports.readReview = async function (storeno) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문
            const selectReviewQuery = "SELECT * FROM review WHERE storeno = ?;";
            const selectReviewParams = [storeno];

            const [rows] = await connection.query(selectReviewQuery, selectReviewParams);
            return rows; // 출력값

        } catch (err) {
            console.error(`# selectReview Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# selectReview DB error # \n ${err}`);
        return false;
    }
}
// 매장페이지 : 별점
exports.readRate = async function (storeno) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문
            const selectRateQuery = "SELECT * FROM rate WHERE storeno = ?;";
            const selectRateParams = [storeno];

            const [rows] = await connection.query(selectRateQuery, selectRateParams);
            return rows; // 출력값

        } catch (err) {
            console.error(`# selectRate Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# selectRate DB error # \n ${err}`);
        return false;
    }
}
// 매장페이지 : 상세정보
exports.readStore = async function (storeno) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문
            const selectStoreQuery = "SELECT s.storeno AS storeno, s.storename AS storename, count(l.storeno) AS `like`, avg(r.storerate) AS `averageRating`, s.storetime AS storetime, s.categoryid AS categoryid, s.storeweek AS storeweek, s.photos AS photos, s.contact AS contact, s.account AS account, s.latitude AS latitude, s.longitude AS longitude, s.location AS location, s.confirmed AS confirmed, s.id AS id FROM `store` s join `like` l on s.storeno = l.storeno join `rate` r on s.storeno = r.storeno where s.storeno = ?;";
            const selectStoreParams = [storeno];

            const [rows] = await connection.query(selectStoreQuery, selectStoreParams);
            return rows; // 출력값

        } catch (err) {
            console.error(`# selectStore Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# selectStore DB error # \n ${err}`);
        return false;
    }
}
// 가계부
exports.readPurchase = async function (id) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문
            const selectPurchaseQuery = "SELECT * FROM purchase where id = ?;";
            const selectPurchaseParams = [id];

            const [rows] = await connection.query(selectPurchaseQuery, selectPurchaseParams);
            return rows; // 출력값

        } catch (err) {
            console.error(`# selectPurchase Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# selectPurchase DB error # \n ${err}`);
        return false;
    }
}

// --- POST ---
// 매장페이지 : 댓글 
exports.insertReview = async function (id, storeno, storecontent) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문
            const insertTodoQuery = "insert into review (id, storeno, storecontent, reviewtime) values (?, ?, ?, NOW());";
            const insertTodoParams = [id, storeno, storecontent];

            const [rows] = await connection.query(insertTodoQuery, insertTodoParams);
            return rows;

        } catch (err) {
            console.error(`# insertReview Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# insertReview DB error # \n ${err}`);
        return false;
    }
}
// 매장페이지 : 별점
exports.insertRate = async function (id, storeno, storerate) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문
            const insertRateQuery = "insert into rate (id, storeno, storerate) values (?, ?, ?);";
            const insertRateParams = [id, storeno, storerate];

            const [rows] = await connection.query(insertRateQuery, insertRateParams);
            return rows;

        } catch (err) {
            console.error(`# insertRate Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# insertRate DB error # \n ${err}`);
        return false;
    }
}
// 매장페이지 : 신고
exports.insertReport = async function (id, storeno) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문
            // const updateReportQuery = "UPDATE store SET reportNo = reportNo + 1 WHERE storeno = ?;";
            const insertReportQuery = "INSERT into report (id, storeno) values (?,?);";
            const insertReportParams = [id, storeno];

            const [rows] = await connection.query(insertReportQuery, insertReportParams);
            return rows;

        } catch (err) {
            console.error(`# insertReport Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# insertReport DB error # \n ${err}`);
        return false;
    }
}
// 매장페이지 : 좋아요
exports.insertGood = async function (id, storeno) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        console.log(`여기`);
        try {
            // 쿼리문
            const insertGoodQuery = "INSERT into `like` (id, storeno) values (?,?);";
            const insertGoodParams = [id, storeno];

            const [rows] = await connection.query(insertGoodQuery, insertGoodParams);
            return rows;

        } catch (err) {
            console.error(`# insertGood Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# insertGood DB error # \n ${err}`);
        return false;
    }
}
// 마이페이지 : 즐겨찾기
exports.insertFavorite = async function (id, storeno) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);
        try {
            // 쿼리문
            const insertFavoriteQuery = "INSERT into `favorite` (id, storeno) values (?,?);";
            const insertFavoriteParams = [id, storeno];

            const [rows] = await connection.query(insertFavoriteQuery, insertFavoriteParams);
            return rows;

        } catch (err) {
            console.error(`# insertFavorite Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# insertFavorite DB error # \n ${err}`);
        return false;
    }
}
// 가계부 등록
exports.insertPurchase = async function (id, iteminformation) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문                                                                   
            // const insertPurchaseQuery = "INSERT INTO `purchase` (date, storeno, itemid, iteminformation, itemprice, id) SELECT CURDATE(), item.storeno, item.itemid, item.iteminformation, item.itemprice, ? FROM `item` WHERE item.iteminformation = ?;";

            const insertPurchaseQuery = "INSERT INTO \`purchase\` (date, storeno, itemid, iteminformation, itemprice, id) SELECT CURDATE(), item.storeno, item.itemid, item.iteminformation, item.itemprice, ? FROM \`item\` WHERE item.iteminformation = ?;";
            const insertPurchaseParams = [id, iteminformation];

            const [rows] = await connection.query(insertPurchaseQuery, insertPurchaseParams);
            return rows;

        } catch (err) {
            console.error(`# insertPurchase Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# insertPurchase DB error # \n ${err}`);
        return false;
    }
}