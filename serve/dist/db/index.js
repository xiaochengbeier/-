"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveModel = void 0;
const connection_1 = require("./connection");
// 同步模型到数据库
connection_1.sequelize.sync({ alter: true });
var MoveModel_1 = require("./MoveModel");
Object.defineProperty(exports, "MoveModel", { enumerable: true, get: function () { return MoveModel_1.MoveModel; } });
