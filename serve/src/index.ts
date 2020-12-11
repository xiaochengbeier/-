import express, { urlencoded } from "express"
import { router } from "./routers";
import cors from "cors"
import { corsOptions } from "./routers/cors";
import { uploadRouter } from "./routers/upload";
import path from "path";
import history from "connect-history-api-fallback"
const app =  express();
// 解决history刷新问题
app.use(history());
// 静态资源文件 /upload/1607520048150-863293dc-6-.jpg
const  uploadDir = path.resolve(__dirname,"../public/upload");
const  pageDir = path.resolve(__dirname,"../public/client");
app.use("/upload",express.static(uploadDir));
app.use("/",express.static(pageDir));

// 跨域处理
app.use(cors(corsOptions));
// 解析传输数据格式是json
app.use(express.json());
// 解析传输数据格式是 application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
// 对电影数据进行增删查改操作
app.use("/api/move",router);
// 上传文件接口
app.use("/upload",uploadRouter);
app.listen(8888);
