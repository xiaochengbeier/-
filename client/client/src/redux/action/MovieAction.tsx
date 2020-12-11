import { IMovie, SearchCondition } from "../../services/Types";
import { MovieActionType, SetIsLoadingActon, SetMovieDataAction, SetSearchConditionAction } from "../reducer/Types";
/**
 * 设置movieData的action创建函数
 * @param count  数据总数
 * @param data   数据数组
 */
export function setMovieAction(count:number,data:IMovie[]):SetMovieDataAction{
   return {
       type:MovieActionType.SET_MOVIE_DATA,
       payload:{
           count,
           data
       }
   };
}
/**
 * 设置查询条件的action创建函数
 * @param searchCondition 
 */
export function setSearchConditionAction(searchCondition:SearchCondition):SetSearchConditionAction{
    return{
        type:MovieActionType.SET_SEARCH_COMDITION,
        payload:searchCondition
    }
}
/**
 * 设置正在加载中的action创建函数
 * @param isLoading 是否正在加载中
 */
export function setIsLoadingAction(isLoading:boolean):SetIsLoadingActon{
   return{
     type: MovieActionType.SET_IS_LOADING,
     payload:isLoading
   }
}