import { combineReducers } from "redux";
import mailReducer from "./mailReducer";

export default combineReducers({
    mail: mailReducer
});