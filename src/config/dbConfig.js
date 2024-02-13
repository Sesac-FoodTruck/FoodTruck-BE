// this script : dbConfig.js
// Mysql 디비 환경설정
require('dotenv').config({ path:'./.env' });

// const dbConfig = {
//     host: "localhost",
//     port: process.env.DB_PORT,
//     user: process.env.local_user,
//     password: process.env.local_password,
//     database: process.env.local_database
// };

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

module.exports = { dbConfig };