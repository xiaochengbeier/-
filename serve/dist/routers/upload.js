"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const ResponseHander_1 = require("./ResponseHander");
const pictureExten = [".jpg", ".jpeg", ".png", ".gif"];
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        //  确定上传我呢间存放文件夹
        const uploadDir = path_1.default.resolve(__dirname, "../../public/upload");
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileName = path_1.default.extname(file.originalname);
        cb(null, Date.now() + "-" + uuid_1.v4().slice(0, 10) + '-' + fileName);
    }
});
function fileFilter(req, file, cb) {
    // 获得文件扩展名
    const fileName = path_1.default.extname(file.originalname).toLocaleLowerCase();
    if (pictureExten.includes(fileName)) {
        cb(null, true);
    }
    else {
        cb(new multer_1.default.MulterError('LIMIT_FIELD_COUNT', '文件只支持 .jpg ,  .jpeg , .png, .gif) 格式'));
    }
}
const upload = multer_1.default({
    storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter
}).single("upload");
const uploadRouter = express_1.default.Router();
exports.uploadRouter = uploadRouter;
uploadRouter.post("/", (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            ResponseHander_1.ResponseHander.responsData({ status: 500, msg: "fail", data: { mes: err.field } }, res);
            return;
        }
        else if (err) {
            throw new Error(err.message);
        }
        // 将文件路径返回
        const pathFile = `/upload/${req.file.filename}`;
        ResponseHander_1.ResponseHander.responsData({ status: 200, msg: "success", data: { msg: pathFile } }, res);
    });
});
