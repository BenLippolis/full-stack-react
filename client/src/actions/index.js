// Axios is used to make AJAX requests 
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';


// fetchUser is the action creator & it returns a function 
// Redux-thunk inspects whatever value is returned from this action creator 
// If RT sees that we return a function instead of a normal action 
// it will automatically call this function and pass in dispatch function as an argument 
// Another example of async await syntax
export const fetchUser = () => async dispatch => {
    // Res is axios output, represents the underlying request to backend server
    const res = await axios.get('/api/current_user');
    // This action gets picked up by our authReducer
    dispatch({ type: FETCH_USER, payload: res.data});
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    // This will update the user model inside the auth reducer 
    // Backend code will update the users credits count 
    dispatch({ type: FETCH_USER, payload: res.data });
};

// Pass in history object 
export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    // This is the redirect 
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');

    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};