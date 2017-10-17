import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
    // Auth piece of state is being manufactured by the authReducer 
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
});