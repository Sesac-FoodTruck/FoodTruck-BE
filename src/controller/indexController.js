// this script : indexController.js
const indexDao = require('../dao/indexDao.js');

// --- GET ---
// - 매장페이지 : 댓글
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
// - 매장페이지 : 별점
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
// - 매장페이지 : 상세정보
exports.readStore = async function (req, res) {
    // const { storeno } = req.query.storeno;
    const { storeno } = req.params;
    console.log

    let readStoreRow = await indexDao.readStore(storeno);

    if (!readStoreRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    return res.send({
        result: readStoreRow, // 결과물 배열
        isSuccess: true,
        code: 200,
        message: "매장 상세정보 조회 성공",
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
        result: readPurchaseRow, // 결과물 배열
        isSuccess: true,
        code: 200,
        message: "매장 상세정보 조회 성공",
    });
};

// --- POST ---
// 매장페이지 : 댓글 
exports.insertReview = async function (req, res) {
    const { id, storeno, storecontent } = req.body;
    // console.log(userIdx, contents, type);

    // [ 예외 처리 ] 
    // 입력값 누락
    if (!id || !storeno || !storecontent) {
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
            message: "50글자 이하로"
        });
    }

    const insertReviewRow = await indexDao.insertReview(id, storeno, storecontent);

    if (!insertReviewRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "리뷰 생성 성공",
    });
};
// 매장페이지 : 별점
exports.insertRate = async function (req, res) {
    // console.log('여기');
    // console.log(req.body);
    const { id, storeno, storerate } = req.body;

    // [ 예외 처리 ] 
    // 입력값 누락
    if (!id || !storeno || !storerate) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "입력값 누락"
        });
    }

    // contents : 50글자 초과 불가
    // if (storecontent.length > 50) {
    //     return res.send({
    //         isSuccess: false,
    //         code: 400,
    //         message: "50글자 이하로"
    //     });
    // }

    const insertRateRow = await indexDao.insertRate(id, storeno, storerate);

    if (!insertRateRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "별점 생성 성공",
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

    if (!insertReportRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "신고 등록 성공",
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

    if (!insertGoodRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

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
    const { id, iteminformation } = req.body;

    // [ 예외 처리 ] 
    // 입력값 누락
    if (!id || !iteminformation) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "입력값 누락"
        });
    }

    const insertPurchaseRow = await indexDao.insertPurchase(id, iteminformation);

    if (!insertPurchaseRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청실패. 관리자에게 문의",
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "가계부 등록 성공",
    });
};