"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const MoveServices_1 = require("../services/MoveServices");
const ResponseHander_1 = require("./ResponseHander");
const router = express_1.default.Router();
exports.router = router;
// 添加电影
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 获得添加数据对象
    const body = req.body;
    const addResult = yield MoveServices_1.MoveServices.addMove(body);
    if (addResult instanceof Array) {
        ResponseHander_1.ResponseHander.responsData({ status: 500, msg: "fail", data: addResult }, res);
    }
    else {
        ResponseHander_1.ResponseHander.responsData({ status: 200, msg: "success", data: null }, res);
    }
}));
// 根据id删除电影
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 获得id
    const id = +req.params.id;
    const deleteResult = yield MoveServices_1.MoveServices.removeMoveById(id);
    if (deleteResult) {
        ResponseHander_1.ResponseHander.responsData({ status: 200, msg: "success", data: null }, res);
    }
    else {
        ResponseHander_1.ResponseHander.responsData({ status: 500, msg: "fail", data: { msg: "删除失败" } }, res);
    }
}));
// 修改电影
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 获得id
    const id = +req.params.id;
    // 获得修改数据对象
    const body = req.body;
    const updataResult = yield MoveServices_1.MoveServices.updateMoveById(id, body);
    if (updataResult instanceof Array) {
        ResponseHander_1.ResponseHander.responsData({ status: 500, msg: "fail", data: updataResult }, res);
    }
    else {
        if (updataResult) {
            ResponseHander_1.ResponseHander.responsData({ status: 200, msg: "success", data: null }, res);
        }
        else {
            ResponseHander_1.ResponseHander.responsData({ status: 500, msg: "fail", data: { msg: "修改失败" } }, res);
        }
    }
}));
// 根据id查询电影
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 获得id
    const id = +req.params.id;
    const findResult = yield MoveServices_1.MoveServices.findById(id);
    if (findResult == null) {
        ResponseHander_1.ResponseHander.responsData({ status: 500, msg: "fail", data: { msg: "查询失败" } }, res);
    }
    else {
        ResponseHander_1.ResponseHander.responsData({ status: 200, msg: "success", data: findResult }, res);
    }
}));
// 根据条件查询
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 获得查询数据对象
    const body = req.query;
    const findResult = yield MoveServices_1.MoveServices.findByPage(body);
    if (findResult instanceof Array) {
        ResponseHander_1.ResponseHander.responsData({ status: 500, msg: "fail", data: findResult }, res);
    }
    else {
        ResponseHander_1.ResponseHander.responsData({ status: 200, msg: "success", data: findResult }, res);
    }
}));
