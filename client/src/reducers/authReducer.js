import { FETCH_USER } from "../actions/types";

// Reducer function takes a state and an action 
// Set state to null initially so we asssume the user is not logged in 
// Only when we hear from FETCH_USER action will we return a new value (user model or false)
export default function(state = null, action) {
    // action == payload 
    switch (action.type) {
        case FETCH_USER: 
            return action.payload || false;
        default: 
            return state;
    }
}