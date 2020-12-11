"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.Move = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
require("reflect-metadata");
class Move {
    /**
     * 对当前对象字段校验返回一个 包含错误信息的数组
     * @param isSkipNull 是否跳过空属性
     */
    validateThis(isSkipNull = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = yield class_validator_1.validate(this, { skipMissingProperties: isSkipNull });
            const arr = [];
            error.forEach(item => {
                arr.push({
                    property: item.property,
                    constraints: item.constraints
                });
            });
            return arr;
        });
    }
    /**
     * 将一个平面对象转换成指定类型的对象
     * @param clazz 构造函数
     * @param obj   平面对象
     */
    static transformPlainObjToClas(clazz, obj) {
        if (obj instanceof clazz) {
            return obj;
        }
        return class_transformer_1.plainToClass(clazz, obj);
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: "电影名字不能为空" }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Move.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "电影类型不能为空" }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Move.prototype, "types", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "上映地区不能为空" }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Move.prototype, "areas", void 0);
__decorate([
    class_validator_1.IsNumber({ allowInfinity: false, allowNaN: false }, { message: "电影时长必须是数字" }),
    class_validator_1.Min(10, { message: "电影时长最小十分钟" }),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], Move.prototype, "timeLog", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "是否热映不能为空" }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Move.prototype, "isHot", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "是否是经典不能为空" }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Move.prototype, "isClassic", void 0);
__decorate([
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Move.prototype, "description", void 0);
__decorate([
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Move.prototype, "poster", void 0);
exports.Move = Move;
