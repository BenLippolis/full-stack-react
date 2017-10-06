// Axios is used to make AJAX requests 
import axios from 'axios';
import { FETCH_USER } from './types';


// fetchUser is the action creator & it returns a function 
// Redux-thunk inspects whatever value is returned from this action creator 
// If RT sees that we return a function instead of a normal action 
// it will automatically call this function and pass in dispatch function as an argument 
const fetchUser = () => {
    // When this function is executed the actual request is made 
    return function(dispatch) {
        // make get request to our api backend 
        axios
            .get('/api/current_user')
            // Only after we actually get a response will we dispatch the action 
            .then(res => dispatch({ type: FETCH_USER, payload: res}));
    };
};