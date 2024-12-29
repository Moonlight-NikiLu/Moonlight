const express = require("express");
const app = express();

// 提供靜態文件
app.use(express.static("public"));

// 啟動服務器
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});


