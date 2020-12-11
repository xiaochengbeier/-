import {combineReducers} from "redux";
import {movieReducer} from "./MovieReducer";
const reducers = combineReducers({movieState:movieReducer});
export {reducers};