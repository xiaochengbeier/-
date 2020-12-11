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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveServices = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const Moves_1 = require("../entities/Moves");
const Search_1 = require("../entities/Search");
class MoveServices {
    /**
     * 添加move对象到数据库
     * @param move  添加的数据对象
     */
    static addMove(move) {
        return __awaiter(this, void 0, void 0, function* () {
            // 将添加的数据转换成move对象
            const moveObj = Moves_1.Move.transformPlainObjToClas(Moves_1.Move, move);
            // 校验数据是否齐全
            const validateResult = yield moveObj.validateThis();
            // 如果验证没有通过则返回错误信息
            if (validateResult.length) {
                return validateResult;
            }
            // 如果校验通过则返回添加成功返回的move对象
            const addResult = yield db_1.MoveModel.create(moveObj);
            return Moves_1.Move.transformPlainObjToClas(Moves_1.Move, addResult.toJSON());
        });
    }
    /**
     * 根据id删除数据
     * @param id 数据的id
     */
    static removeMoveById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield db_1.MoveModel.destroy({
                where: {
                    id
                }
            });
            if (deleteResult === 0) {
                return false;
            }
            return true;
        });
    }
    /**
     * 根据id修改数据
     * @param id  数据id
     * @param move 需要修改的数据
     */
    static updateMoveById(id, move) {
        return __awaiter(this, void 0, void 0, function* () {
            //  将传入的数据对象转换成move对象
            const moveObj = Moves_1.Move.transformPlainObjToClas(Moves_1.Move, move);
            // 校验数据准确性由于是修改不必校验每个字段仅仅校验存在的字段即可
            const validateResult = yield moveObj.validateThis(true);
            if (validateResult.length) {
                return validateResult;
            }
            const updateResult = yield db_1.MoveModel.update(Object.assign({}, moveObj), {
                where: {
                    id
                }
            });
            return updateResult[0] === 0 ? false : true;
        });
    }
    /**
     * 根据id查询数据
     * @param id 查询数据id
     */
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findResult = yield db_1.MoveModel.findByPk(id);
            if (findResult === null) {
                return null;
            }
            return Moves_1.Move.transformPlainObjToClas(Moves_1.Move, findResult.toJSON());
        });
    }
    static findByPage(search) {
        return __awaiter(this, void 0, void 0, function* () {
            //    首先将search转换成Search类型
            const searchObj = Search_1.Search.transformPlainObjToClas(Search_1.Search, search);
            //   校验search
            const validataResult = yield searchObj.validateThis();
            if (validataResult.length) {
                return validataResult;
            }
            const { count, rows } = yield db_1.MoveModel.findAndCountAll({
                where: {
                    name: {
                        [sequelize_1.Op.like]: `%${searchObj.key}%`
                    }
                },
                limit: searchObj.size,
                offset: (searchObj.page - 1) * searchObj.size
            });
            const arr = [];
            if (rows.length) {
                rows.forEach(item => {
                    const move = Moves_1.Move.transformPlainObjToClas(Moves_1.Move, item.toJSON());
                    arr.push(move);
                });
            }
            return {
                count,
                data: arr
            };
        });
    }
}
exports.MoveServices = MoveServices;
