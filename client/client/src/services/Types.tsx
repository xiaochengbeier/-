/**
 * 电影对象应有的字段
 */
export interface IMovie{
     /**
      * 电影名字
      */
     name:string;
     /**
      * 电影类型
      */
     types:string;
     /**
      * 上映地区
      */
     areas:string;
     /**
      * 电影时间长
      */
     timeLog:number;
    /**
     *  是否热映
     */
     isHot:string;
     /**
      * 是否是经典
      */
     isClassic:string;
     /**
      * 电影描述
      */
     description?:string;
     /**
      * 电影封面
      */
     poster?:string;
     /**
      * 电影id
      */
     id?:number;
}
/**
 * 服务器响应数据类型
 */
export type  ResponseType ={
   status:500|200,
   msg:"fail"|"success",
   data:object
} 
/**
 * api 接口字段
 */
export enum API{
    MOVIE_API="/api/move"
}

export abstract  class SearchCondition{
    key:string="";
    page:number=1;
    size:number = 10;
}