// Reducer function takes a state and an action 
export default function(state = {}, action) {
    console.log(action);
    switch (action.type) {
        default: 
            return state;
    }
}