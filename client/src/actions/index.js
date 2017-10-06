// Axios is used to make AJAX requests 
import axios from 'axios';
import { FETCH_USER } from './types';


// fetchUser is the action creator & it returns a function 
// Redux-thunk inspects whatever value is returned from this action creator 
// If RT sees that we return a function instead of a normal action 
// it will automatically call this function and pass in dispatch function as an argument 
// Another example of Async await 
export const fetchUser = () => async dispatch => {
    // When this function is executed the actual request is made    
    // make get request to our api backend 
    const res = await axios.get('/api/current_user');
    // Only after we actually get a response will we dispatch the action 
    dispatch({ type: FETCH_USER, payload: res});
};
