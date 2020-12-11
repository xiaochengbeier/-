import {createStore,applyMiddleware} from "redux";
import { reducers } from "./reducer";
import {logger} from "redux-logger";
import createSagaMiddleware from "redux-saga"
import { movieSaga } from "./saga/MovieSaga";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers,applyMiddleware(sagaMiddleware,logger));
sagaMiddleware.run(movieSaga);
export {store};
