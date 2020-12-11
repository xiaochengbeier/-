"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = require("./routers");
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./routers/cors");
const upload_1 = require("./routers/upload");
const path_1 = __importDefault(require("path"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const app = express_1.default();
// 解决history刷新问题
app.use(connect_history_api_fallback_1.default());
// 静态资源文件 /upload/1607520048150-863293dc-6-.jpg
const uploadDir = path_1.default.resolve(__dirname, "../public/upload");
const pageDir = path_1.default.resolve(__dirname, "../public/client");
app.use("/upload", express_1.default.static(uploadDir));
app.use("/", express_1.default.static(pageDir));
// 跨域处理
app.use(cors_1.default(cors_2.corsOptions));
// 解析传输数据格式是json
app.use(express_1.default.json());
// 解析传输数据格式是 application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
// 对电影数据进行增删查改操作
app.use("/api/move", routers_1.router);
// 上传文件接口
app.use("/upload", upload_1.uploadRouter);
app.listen(8888);
