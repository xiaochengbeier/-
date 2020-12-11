import { Response } from "express";
interface ResponseData{
    status:200|404|500,
    msg:string,
    data:object
}
export class ResponseHander{
    /**
     * 响应指定格式的数据
     * @param data 相应的数据对象
     * @param response  response对象
     */
    static responsData(data:ResponseData,response:Response){
       response.send(data);
    }
}