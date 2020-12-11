import { IMovie, SearchCondition } from "../../services/Types";
import { DeleteActionTypeAction, MovieActionType, MovieActionTypes, MovieData, MovieState, SetIsHotClassicAction, SetIsLoadingActon, SetMovieDataAction, SetSearchConditionAction } from "./Types";

const initMovieStata:MovieState ={
    movieData:{
        count:0,
        data:[]
    },
    searchCondition:{
        key:"",
        page:1,
        size:10
    },
    isLoading:false
}
/**
 * 分页查询的reducer
 * @param movieState 
 * @param moiveAction 
 */
export function movieReducer(movieState = initMovieStata,moiveAction:MovieActionTypes):MovieState{
    switch(moiveAction.type){
       case MovieActionType.SET_MOVIE_DATA:
           return setMovieDataReducer(movieState,moiveAction);
       case MovieActionType.SET_SEARCH_COMDITION:
           return setSearchConditionReducer(movieState,moiveAction);
        case MovieActionType.SET_IS_LOADING:
           return setIsLoadingReducer(movieState,moiveAction);
        case MovieActionType.DELETE_BY_ID:
           return deleteByIdReducer(movieState,moiveAction);
        case MovieActionType.SET_IS_HOT_CLASSIC:
            return setIsHotAndClassic(movieState,moiveAction);
       default:
       return movieState;
    }
}
/**
 * 根据id修改isHot 或者是 isClassic
 * @param movieState 
 * @param moiveAction 
 */
function setIsHotAndClassic(state:MovieState,moiveAction:SetIsHotClassicAction){
    const dataArr = state.movieData.data;
    const newData = dataArr.map(item =>{
        if(item.id === moiveAction.payload.id){
            //判断是设置isHot 还是 isClassic
            if(moiveAction.payload.flage === "isClassic"){
                 item.isClassic = moiveAction.payload.value;
            }else if(moiveAction.payload.flage === "isHot"){
                 item.isHot = moiveAction.payload.value;
            }
        } 
        return item;
    })
    const newMovieData: MovieData = {
        count: state.movieData.count,
        data: newData as any
    }
    console.log(newMovieData,"---newMovieData---setIsHotAndClassic(state--");
    return{
        ... state,
        movieData:newMovieData
    }
}
/**
 * 根据id删除一个数据
 */
function deleteByIdReducer(state:MovieState,moiveAction:DeleteActionTypeAction){
   const dataArr = state.movieData.data;
   const newData = dataArr.filter(item=>item.id !== moiveAction.payload.id);
   const newMovieData: MovieData = {
       count: state.movieData.count,
       data: newData as any
   }
   return{
    ...state,
    movieData:newMovieData
   }
}
// 设置movieData的reducer
function setMovieDataReducer(state:MovieState,action:SetMovieDataAction):MovieState{
     return {
         ...state,
         movieData : action.payload
     }
}
// 设置搜索条件reducer
function  setSearchConditionReducer(state:MovieState,action:SetSearchConditionAction):MovieState{
    return {
        ...state,
        searchCondition : action.payload
    }
}
// 设置是否正在加载reducer
function setIsLoadingReducer(state:MovieState,action:SetIsLoadingActon):MovieState{
    return{
        ...state,
        isLoading : action.payload
    }
}