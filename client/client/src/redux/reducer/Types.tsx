import { IMovie , SearchCondition } from "../../services/Types";
/**
 * 分页查询到的数据类型
 */
export interface MovieData{
    count:number,
    data: IMovie[]
}
/**
 * movie state 类型
 */
export interface MovieState {
    movieData: MovieData,
    searchCondition:SearchCondition,
    isLoading:boolean
}
/**
 * 所有有关moviestate action的类型
 */
export enum MovieActionType{
    SET_MOVIE_DATA="SET_MOVIE_DATA_ACTION",
    EFFECT_MOVIE_DADA="EFFECT_MOVIE_DADA_ACTION",
    SET_SEARCH_COMDITION="SET_SEARCH_COMDITION_ACTION",
    SET_IS_LOADING="SET_IS_LOADING_ACTION",
    DELETE_BY_ID="DELETE_BY_ID__ACTION",
    EFFECT_DELETE_BY_ID="EFFECT_DELETE_BY_ID__ACTION",
    SET_IS_HOT_CLASSIC="SET_IS_HOT_CLASSIC_ACTION",
    EFFECT_IS_HOT_CLASSIC="EFFECT_IS_HOT_CLASSIC_ACTION"
}
/**
 * 根据id删除某个数据
 */
export interface DeleteActionTypeAction{
    type: MovieActionType.DELETE_BY_ID,
    payload:{id:number}
}
/**
 * 根据id删除某个数据的附影响
 */
export interface EffectDeleteActionType{
    type: MovieActionType.EFFECT_DELETE_BY_ID
    payload:{id:number}
}
/**
 * 修改isHotAndClassic 附影响
 */
export interface EffectIsHotClassicAction{
    type: MovieActionType.EFFECT_IS_HOT_CLASSIC,
    payload:{flage:"isHot"|"isClassic",value:"true"|"false",id:number}
}
/**
 * 修改isHotAndClassic
 */
export interface SetIsHotClassicAction{
    type: MovieActionType.SET_IS_HOT_CLASSIC,
    payload:{flage:"isHot"|"isClassic",value:"true"|"false",id:number}
}
export interface EffectMovieData{
    type : MovieActionType.EFFECT_MOVIE_DADA;
}
/**
 * 设置movieData的action类型
 */
export interface SetMovieDataAction{
    type:MovieActionType.SET_MOVIE_DATA,
    payload:MovieData
}
/**
 * 设置 searchCondition 的action类型
 */
export interface SetSearchConditionAction{
    type:MovieActionType.SET_SEARCH_COMDITION,
    payload:SearchCondition
}
/**
 * 设置 isLoading的 Action
 */
export interface SetIsLoadingActon{
    type:MovieActionType.SET_IS_LOADING,
    payload:boolean
}
/**
 * 有关设置MovieStata 的 action的类型
 */
export type MovieActionTypes =EffectIsHotClassicAction| EffectDeleteActionType|DeleteActionTypeAction|SetIsHotClassicAction| SetMovieDataAction | SetSearchConditionAction|SetIsLoadingActon|EffectMovieData;