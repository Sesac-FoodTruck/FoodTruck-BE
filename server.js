const app = require("./app");
const { executeSQLScript } = require("./src/scripts/executeSQLScript.js");
const port = 5000;

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