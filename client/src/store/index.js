import { combineReducers } from "redux";
import captionReducer from "./reducers/caption.reducer";


export default combineReducers({
  captions: captionReducer
});