import {takeEvery,select, put, call, takeLatest}  from "redux-saga/effects";
import { MovieServices } from "../../services";
import {ResponseType} from "../../services/Types"
import { DeleteActionTypeAction, EffectDeleteActionType, EffectIsHotClassicAction, MovieActionType } from "../reducer/Types";

export function * movieSaga(){
    // 处理数据查询的附影响
    yield takeEvery(MovieActionType.EFFECT_MOVIE_DADA as any,getMovieDataEffects);
    // 处理删除数据的附影响
    yield takeEvery(MovieActionType.EFFECT_DELETE_BY_ID as any,deleteByIdEffects);
    // 处理修改isHot 或者是 isClassic 的附影响
    yield takeEvery(MovieActionType.EFFECT_IS_HOT_CLASSIC as any,setIsHotClassicEffects);
}
function * setIsHotClassicEffects(action:EffectIsHotClassicAction){
    yield put({type : MovieActionType.SET_IS_LOADING,payload:true})
    const updateResult:ResponseType =  yield call(MovieServices.changIsHotAndClassic as any,action.payload.flage,action.payload.value,action.payload.id);
    if(updateResult.status === 200){
        yield put({type:MovieActionType.SET_IS_HOT_CLASSIC, payload:action.payload});
   }
   yield put({type : MovieActionType.SET_IS_LOADING,payload:false})
}
function *deleteByIdEffects(action:EffectDeleteActionType){
   const deletResult:ResponseType =  yield call(MovieServices.deleteMovie as any,action.payload.id);
   console.log(" const deletResult----",deletResult);
   if(deletResult.status === 200){
         yield put({type:MovieActionType. DELETE_BY_ID, payload:{id:action.payload.id}});
   }
}
//处理数据查询的附影响
function *getMovieDataEffects(){
     //获得查询信息
    const movieState =  yield select((state)=>{
        return state.movieState.searchCondition;
    });
    // 将正在加载设置成false
    yield put({type:MovieActionType.SET_IS_LOADING,payload:true})
    //根据条件查询
    const find =  yield call(MovieServices.findMovieBySearch as any,movieState);
     // 将正在加载设置成true
    if(find.status===200){
        yield put({type:MovieActionType.SET_MOVIE_DATA,payload:find.data});
    }
     yield put({type:MovieActionType.SET_IS_LOADING,payload:false})
}