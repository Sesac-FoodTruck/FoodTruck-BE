// this script : indexRouter.js
const indexController = require('../controller/indexController.js');

exports.indexRouter = function (app) {
    // --- GET ---
    // - 매장페이지 : 댓글x
    // app.get("/truck/review/:storeno", indexController.readReview) // read : query, path 
    // - 매장페이지 : 별점x
    // app.get("/truck/rate/:storeno", indexController.readRate) // read : query, path
    // - 매장페이지 : 상세정보
    // app.get(`/truck/detail`, indexController.readStore) // read : query, path 
    app.get("/truck/detail/:truckId", indexController.readStore) // read : query, path 
    // - 가계부
    app.get("/account/:id", indexController.readPurchase) // read : query, path

    // --- POST --- 
    // - 리뷰
    app.post("/truck/review", indexController.insertReview) // create: body
    // - 별점 x
    // app.post("/truck/rate", indexController.insertRate) // create: body
    // - 신고
    app.post("/truck/complain", indexController.insertReport) // create: body
    // - 좋아요
    app.post("/truck/good", indexController.insertGood) // create: body
    // - 즐겨찾기
    app.post("/mypage/favorite", indexController.insertFavorite) // create: body
    // - 가계부 등록
    app.post("/account/menu", indexController.insertPurchase) // create: body

    // --- PATCH --- 
    // - 가계부 수정
    // app.put(`/account?date=${date}&menu=${menuName}&method=${method}`, indexController.changeQuantity) // update : body
    app.patch("/account/menu/modify", indexController.modifyQuantity) // create: body

    // --- DELETE --- 
    // - 가계부 삭제
    app.delete(`/account/delete`, indexController.deletePurchase) // delete : query, path

    // --- 임시 --- 
    // - 가계부 등록
    // app.post("/store", indexController.createPurchase) // create: body
    // - 매장 등록
    // app.post("/store", indexController.createStore) // create: body 
    // - 매장 조회
    // app.get("/stores/:storeIdx", indexController.readStore) // read : query, path 
    // - 매장 수정
    // app.patch("/store", indexController.updateStore) // update : body
    // - 매장 삭제
    // app.delete("/users/:userIdx/store/:storeIdx", indexController.deleteStore) // delete : query, path : 토큰처리로 URI 간결하게
}