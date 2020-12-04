import { plainToClass, Type } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import {IsNotEmpty, IsNumber, Min, validate} from "class-validator";

import "reflect-metadata"

import { ValidateError } from "./Types";
export class Move{
    @IsNotEmpty({message:"电影名字不能为空"})
    @Type(()=>String)
    public name:string;

    @IsNotEmpty({message:"电影类型不能为空"})
    @Type(()=>String)
    public types:string;

    @IsNotEmpty({message:"上映地区不能为空"})
    @Type(()=>String)
    public areas:string;
    @IsNumber({allowInfinity:false,allowNaN:false},{message:"电影时长必须是数字"})
    @Min(10,{message:"电影时长最小十分钟"})
    @Type(()=>Number)
    public timeLog:number;
    @IsNotEmpty({message:"是否热映不能为空"})
    @Type(()=>String)
    public isHot:string;
    @IsNotEmpty({message:"是否是经典不能为空"})
    @Type(()=>String)
    public isClassic:string;
    @Type(()=>String)
    public description?:string;
    @Type(()=>String)
    public poster?:string;

    public id?:number;
    /**
     * 对当前对象字段校验返回一个 包含错误信息的数组
     * @param isSkipNull 是否跳过空属性
     */
    public async validateThis(isSkipNull:boolean = false):Promise<ValidateError[]>{
        const  error =  await validate(this,{ skipMissingProperties:isSkipNull});
        const arr:ValidateError[] = [];
        error.forEach(item =>{
            arr.push({
                property:item.property,
                constraints:item.constraints
            });
        })
        return arr;
    }
    /**
     * 将一个平面对象转换成指定类型的对象
     * @param clazz 构造函数
     * @param obj   平面对象
     */
    public static transformPlainObjToClas<T>(clazz:ClassType<T>,obj:object):T{
        if(obj instanceof clazz){
            return obj;
        }
        return   plainToClass(clazz,obj);
    }
}