"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHander = void 0;
class ResponseHander {
    /**
     * 响应指定格式的数据
     * @param data 相应的数据对象
     * @param response  response对象
     */
    static responsData(data, response) {
        response.send(data);
    }
}
exports.ResponseHander = ResponseHander;
