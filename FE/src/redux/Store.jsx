import {combineReducers} from 'redux';
import rootReducer from "./reducer/Reducer";
import rootReducerAD from "./reducer/AdminReducer";

const rootStore = combineReducers({ //rootReducer là store tổng của toàn ứng dụng
    //Chứa các store con
    rootReducer, 
    rootReducerAD

});

export default rootStore;
