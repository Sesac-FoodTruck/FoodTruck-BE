// this script : indexController.js
const indexDao = require('../dao/indexDao.js');

// --- GET ---
// - 트럭페이지 : 댓글
exports.readReview = async function (req, res) {
    const { storeno } = req.params;

    let readReviewRow = await indexDao.readReview(storeno);

    if (!readReviewRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    return res.send({
        result: readReviewRow, // 결과물 배열
        isSuccess: true,
        code: 200,
        message: "댓글 조회 성공",
    });
};
// - 트럭페이지 : 별점
exports.readRate = async function (req, res) {
    const { storeno } = req.params;

    let readRateRow = await indexDao.readRate(storeno);

    if (!readRateRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    return res.send({
        result: readRateRow, // 결과물 배열
        isSuccess: true,
        code: 200,
        message: "별점 조회 성공",
    });
};
// - 트럭페이지 : 상세정보
exports.readStore = async function (req, res) {
    // const { truckId } = req.query.storeno;
    const { truckId } = req.params;

    let readStoreRow = await indexDao.readStore(truckId);

    if (!readStoreRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    return res.send({
        truckData: readStoreRow, // 결과물 배열
        // isSuccess: true,
        // code: 200,
        // message: "매장 상세정보 조회 성공",
    });
};
// - 가계부
exports.readPurchase = async function (req, res) {
    // const { storeno } = req.query.storeno;
    const { id } = req.params;
    console.log

    let readPurchaseRow = await indexDao.readPurchase(id);

    if (!readPurchaseRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    return res.send({
        purchase: readPurchaseRow, // 결과물 배열
        isSuccess: true,
        code: 200,
        message: "매장 상세정보 조회 성공",
    });
};

// --- POST ---
// 매장페이지 : 리뷰 
exports.insertReview = async function (req, res) {
    const { id, storeno, storecontent, storerate } = req.body;
    // console.log(userIdx, contents, type);

    // [ 예외 처리 ] 
    // 입력값 누락
    if (!id || !storeno || !storecontent || !storerate) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "입력값 누락"
        });
    }

    // contents : 50글자 초과 불가
    if (storecontent.length > 50) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "댓글 50글자 이하로"
        });
    }

    const insertReviewRow = await indexDao.insertReview(id, storeno, storecontent, storerate);

    if (!insertReviewRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "리뷰 생성 실패. 관리자에게 문의",
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "리뷰 생성 성공",
    });
};

// 매장페이지 : 신고 
exports.insertReport = async function (req, res) {
    const { id, storeno } = req.body;

    // [ 예외 처리 ] 
    // 입력값 누락
    if (!id || !storeno) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "입력값 누락"
        });
    }

    const insertReportRow = await indexDao.insertReport(id, storeno);

    // 실패
    if (!insertReportRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    // 중복
    if (insertReportRow == 'repeat') {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "신고 중복입니다",
        });
    }

    // 성공
    let reportMsg = `신고 등록 성공 : ${insertReportRow}회`;
    if (insertReportRow >= 5) {
        reportMsg += `. 트럭 삭제 성공`;
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: reportMsg,
    });
};
// 매장페이지 : 좋아요
exports.insertGood = async function (req, res) {
    const { id, storeno } = req.body;

    // [ 예외 처리 ] 
    // 입력값 누락
    if (!id || !storeno) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "입력값 누락"
        });
    }

    const insertGoodRow = await indexDao.insertGood(id, storeno);

    // 실패
    if (!insertGoodRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    // 중복
    if (insertGoodRow == 'repeat') {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "좋아요 중복입니다",
        });
    }

    // 성공
    return res.send({
        isSuccess: true,
        code: 200,
        message: "좋아요 등록 성공",
    });
};
// 즐겨찾기
exports.insertFavorite = async function (req, res) {
    const { id, storeno } = req.body;

    // [ 예외 처리 ] 
    // 입력값 누락
    if (!id || !storeno) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "입력값 누락"
        });
    }

    const insertFavoriteRow = await indexDao.insertFavorite(id, storeno);

    if (!insertFavoriteRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "즐겨찾기 등록 성공",
    });
};
// 가계부 등록
exports.insertPurchase = async function (req, res) {
    const { id, date, iteminformation } = req.body;

    // [ 예외 처리 ] 
    // 입력값 누락
    if (!id || !iteminformation) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "입력값 누락"
        });
    }

    const insertPurchaseRow = await indexDao.insertPurchase(id, date, iteminformation);

    // 실패
    if (!insertPurchaseRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    // 중복
    if (insertPurchaseRow == 'repeat') {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "가계부 메뉴 중복입니다",
        });
    }

    // 성공
    return res.send({
        isSuccess: true,
        code: 200,
        message: "가계부 등록 성공",
    });
};

// --- PATCH ---
// 가계부 갯수 수정
exports.modifyQuantity = async function (req, res) {
    const { id, date, iteminformation, factor } = req.body;

    // [ 예외 처리 ] 
    // 입력값 누락
    if (!id || !date || !iteminformation || !factor) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "입력값 누락"
        });
    }

    const { modifyQuantityRows, menuName, menuQuantity } = await indexDao.modifyQuantity(id, date, iteminformation, factor);

    // 갯수 수정 - 실패 
    if (!modifyQuantityRows) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    const method = factor == 1 ? '+1' : '-1';

    // 갯수 수정 - 성공
    return res.send({
        isSuccess: true,
        code: 200,
        message: `가계부 | ${menuName} | 갯수 ${method} : ${menuQuantity}개`,
    });
};

// --- DELETE ---
// 가계부 삭제 
exports.deletePurchase = async function (req, res) {
    // const { id, date, menu } = req.query;
    const id = req.query.id;
    const date = req.query.date;
    const iteminformation = req.query.menu;

    // console.log("삭제정보", id, date, iteminformation);

    let { deletePurchaseRow, affectedRows } = await indexDao.deletePurchase(id, date, iteminformation);

    // 실패 
    if (!deletePurchaseRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    // 삭제할 행 없음 
    if (affectedRows === 0) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "삭제할 대상이 없습니다",
        });
    }

    // 성공
    return res.send({
        result: deletePurchaseRow, // 결과물 배열
        isSuccess: true,
        code: 200,
        message: "가계부 메뉴 삭제 성공",
    });
};