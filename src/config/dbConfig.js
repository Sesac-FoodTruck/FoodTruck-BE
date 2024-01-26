// this script : dbConfig.js
// Mysql 디비 환경설정

// git push할때 localhost로 바꾸기 

// const dbConfig = {
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "0000",
//     database: "foodtruck"
// };

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

module.exports = { dbConfig };