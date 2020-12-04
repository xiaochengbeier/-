import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { IsNotEmpty, Min, validate } from "class-validator";
import { ValidateError } from "./Types";

export class Search {
    @IsNotEmpty({message:"查询关键字不能为空"})
    public key:string="";
    @Min(1,{message:"页码至少为一"})
    public page:number=1;
    @Min(10,{message:"每页至少为十条"})
    public size:number = 10;
    @IsNotEmpty({message:"总页码不能为空"})
    public total:number =0;
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