import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    // Auth piece of state is being manufactured by the authReducer 
    auth: authReducer
});