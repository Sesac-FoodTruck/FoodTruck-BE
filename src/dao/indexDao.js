// this script : indexDao.js
// 데이터베이스에 접근

// const { pool } = require('../database/database.js');
const { pool } = require('../middleware/database.js');

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
            const selectStoreQuery = "SELECT s.storeno AS storeno, s.storename AS storename, (SELECT COUNT(*) FROM `like` WHERE storeno = s.storeno) AS `like`, (SELECT COUNT(*) FROM `report` WHERE storeno = s.storeno) AS `report`, s.location AS location, (SELECT categoryname FROM `foodcategory` WHERE categoryid=s.categoryid) AS `category`, s.contact AS contact, s.account AS account, s.storeweek AS businessDays, s.storetime AS businessTime, (SELECT JSON_ARRAYAGG(JSON_OBJECT('name', iteminformation, 'price', itemprice)) FROM `item` WHERE storeno=s.storeno) AS `menu`, (SELECT JSON_ARRAYAGG(JSON_OBJECT('name', m.nickname, 'rating', r.rating, 'comment', r.storecontent)) FROM review r JOIN member m on r.id=m.id WHERE r.storeno=s.storeno ORDER BY m.nickname) AS `review`, s.photos AS photo FROM `store` s WHERE s.storeno = ?;";
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
            // ID, 날짜, 가게명, 메뉴, 가격, 수량
            const selectPurchaseQuery = "SELECT id, DATE_FORMAT(date, '%Y-%m-%d') as date, (SELECT storename FROM store WHERE storeno=p.storeno) AS storename, iteminformation, itemquantity, itempricesum FROM purchase p where id = ? ORDER BY date ASC;";
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
// 매장페이지 : 리뷰 
exports.insertReview = async function (id, storeno, storecontent, storerate) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 쿼리문
            const insertTodoQuery = "insert into review (id, storeno, storecontent, rating, reviewtime) values (?, ?, ?, ?, NOW());";
            const insertTodoParams = [id, storeno, storecontent, storerate];

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
// 매장페이지 : 신고
exports.insertReport = async function (id, storeno) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 중복 체크 
            const readRepeatReportQuery = "SELECT COUNT(*) AS `repeatReportCount` FROM report WHERE id=? and storeno=?;";
            const insertReportParams = [id, storeno];
            const [repeatReportCountRows] = await connection.query(readRepeatReportQuery, insertReportParams);
            if (repeatReportCountRows[0].repeatReportCount >= 1) {
                return "repeat";
            }

            // 신고 등록
            // const updateReportQuery = "UPDATE store SET reportNo = reportNo + 1 WHERE storeno = ?;";
            const insertReportQuery = "INSERT into report (id, storeno) values (?,?);";
            const [rows] = await connection.query(insertReportQuery, insertReportParams);
            // return rows;

            // 신고 등록 : 실패일때
            if (!rows) {
                return rows;
            }

            // 신고 등록 : 성공일때
            // - 신고 횟수 조회
            const readStoreReportCountQuery = "SELECT COUNT(*) AS storeReportCount FROM report WHERE storeno = ?;";
            const [storeReportCountRows] = await connection.query(readStoreReportCountQuery, storeno);
            // - 신고 횟수 5회 → 삭제
            if (storeReportCountRows[0].storeReportCount >= 5) {
                // 삭제 : store 테이블 
                const deleteStoreQuery = "DELETE FROM store WHERE storeno = ?;";
                await connection.query(deleteStoreQuery, storeno);
                // 삭제 : report 테이블 
                const deleteReportQuery = "DELETE FROM report WHERE storeno = ?;";
                await connection.query(deleteReportQuery, storeno);
            }

            return storeReportCountRows[0].storeReportCount; // 횟수 리턴

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

        try {
            // 중복 체크
            const readRepeatGoodQuery = "SELECT COUNT(*) AS `repeatGoodCount` FROM `like` WHERE id=? and storeno=?;";
            const insertReportParams = [id, storeno];
            const [repeatGoodCountRows] = await connection.query(readRepeatGoodQuery, insertReportParams);
            if (repeatGoodCountRows[0].repeatGoodCount >= 1) {
                return "repeat";
            }

            // 좋아요 등록
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
// 가계부 등록
exports.insertPurchase = async function (id, date, iteminformation) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 중복 체크 
            const readRepeatPurchaseQuery = "SELECT COUNT(*) AS `repeatPurchaseCount` FROM purchase WHERE id=? and date=? and iteminformation=?;";
            const readRepeatPurchaseParams = [id, date, iteminformation];
            const [repeatPurchaseCountRows] = await connection.query(readRepeatPurchaseQuery, readRepeatPurchaseParams);
            if (repeatPurchaseCountRows[0].repeatPurchaseCount >= 1) {
                return "repeat";
            }

            // 가계부 등록 
            // const insertPurchaseQuery = "INSERT INTO \`purchase\` (date, storeno, itemid, iteminformation, itempricesum, id) SELECT CURDATE(), item.storeno, item.itemid, item.iteminformation, item.itemprice, ? FROM \`item\` WHERE item.iteminformation = ?;";
            const insertPurchaseQuery = "INSERT INTO \`purchase\` (date, storeno, itemid, iteminformation, itempricesum, id) SELECT ?, item.storeno, item.itemid, item.iteminformation, item.itemprice, ? FROM \`item\` WHERE item.iteminformation = ?;";
            const insertPurchaseParams = [date, id, iteminformation];

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

// --- PATCH ---
// 가계부 수정 
exports.modifyQuantity = async function (id, date, iteminformation, factor) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            const modifyQuantityQuery = "UPDATE purchase AS main JOIN purchase AS sub ON main.transactionid = sub.transactionid SET main.itemquantity = GREATEST(main.itemquantity + ?, 1) WHERE sub.id = ? AND sub.date = ? AND sub.iteminformation = ?;";
            const modifyQuantityParams = [factor, id, date, iteminformation];
            const [modifyQuantityRows] = await connection.query(modifyQuantityQuery, modifyQuantityParams);

            const readQuantityQuery = "SELECT iteminformation, itemquantity FROM purchase WHERE id = ? AND date = ? AND iteminformation = ?;"
            const readQuantityParams = [id, date, iteminformation];
            const [readQuantityRows] = await connection.query(readQuantityQuery, readQuantityParams);

            const menuName = readQuantityRows[0].iteminformation;
            const menuQuantity = readQuantityRows[0].itemquantity;

            return { modifyQuantityRows, menuName, menuQuantity };

        } catch (err) {
            console.error(`# modifyQuantity Query error # \n ${err}`);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# modifyQuantity DB error # \n ${err}`);
        return false;
    }
}

// --- DELETE ---
// 가계부 삭제 
exports.deletePurchase = async function (id, date, iteminformation) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            const deletePurchaseQuery = "DELETE main FROM purchase AS main JOIN purchase AS sub ON main.transactionid = sub.transactionid WHERE sub.id = ? AND sub.date = ? AND sub.iteminformation = ?;"
            const deletePurchaseParams = [id, date, iteminformation];
            const [deletePurchaseRow] = await connection.query(deletePurchaseQuery, deletePurchaseParams);
            const affectedRows = deletePurchaseRow.affectedRows;
            // console.log("affectedRows", affectedRows);
            return { deletePurchaseRow, affectedRows };

        } catch (err) {
            console.error(`# deletePurchase Query error # \n ${err} `);
            return false;
        } finally {
            connection.release(); // DB 연결 해제
        }

    } catch (err) {
        console.error(`# deletePurchase DB error # \n ${err} `);
        return false;
    }
}