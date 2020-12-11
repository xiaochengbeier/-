import axios from "axios";
import { API, IMovie,ResponseType,SearchCondition } from "./Types";
// 添加axios拦截器
axios.interceptors.response.use((res)=>{
  if(res.data){
    return res.data;
  }
  return res;
});
export class MovieServices{
    /**
     * 添加movie对象
     * @param movie  movie对象
     */
    static async addMovie(movie:IMovie):Promise<ResponseType>{
      const addResult =  await  axios.post<any,ResponseType>(API.MOVIE_API,movie);
      return addResult;
    }
    /**
     * 根据id删除数据
     * @param id 删除的数据id
     */
    static async deleteMovie(id:number){
      const deleteResult =  await axios.delete<any,ResponseType>(API.MOVIE_API+"/"+id);
      return deleteResult;
    }
    
    /**
     * 根据非id修改数据
     * @param id    修改的数据id
     * @param data  修改的数据字段
     */
    static async updataMovie(id:number,data:object){
      const updataResult =   await axios.put<any,ResponseType>(API.MOVIE_API+"/"+id,data);
      return updataResult;
    }
   /**
    * 根据id查询数据
    * @param id 查询id
    */
    static async findMovieById(id:number){
     const findResult =   await axios.get<any,ResponseType>(API.MOVIE_API+"/"+id);
     console.log(id,"ididid=====>",findResult);
     return findResult;
    }

    /**
     * 根据条件查询数据
     * @param search 查询条件
     */
    static async findMovieBySearch(search:SearchCondition){
      console.log(JSON.stringify(search));
      const findResult =   await axios.get<any,ResponseType>(API.MOVIE_API,{params:search});
      return findResult;
    }
    /**
     * 根据id修改 "isHot"|"isClassic"
     * @param flage   确定是"isHot" 还是 "isClassic"
     * @param value   true or fasle
     * @param id      数据id
     */
    static async  changIsHotAndClassic(flage:"isHot"|"isClassic",value:"true"|"false",id:number){
      if(flage === "isHot"){
        return  await  MovieServices.updataMovie(id,{isHot:value});
      }if(flage === "isClassic"){
        return   await  MovieServices.updataMovie(id,{isClassic:value});
      }
  }
}