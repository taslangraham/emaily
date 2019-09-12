import { combineReducers } from "redux";
import authReducer from "./authReducer";

// export the reducers to the application
export default combineReducers({
  /**
    export keys.
    each key represents a key(field) in the applications state object
    example: 
        auth is a key which will be in the state object
        the auth key (part of state) is managed by the auth reducer
*/
  auth: authReducer
});
