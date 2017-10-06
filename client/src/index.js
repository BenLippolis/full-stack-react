import React from 'react';
import ReactDOM from 'react-dom';

// Provider tag
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Import app component 
import App from './components/App';

// Import reducers
import reducers from './reducers';

// Create new instance of Redux store 
// createStore takes application reducers as first argument
// initial state of application is second argument 
// applyMiddleware is third argument 
const store = createStore(reducers, {}, applyMiddleware());


// Show app component 
// ReactDOM expects a component instance which we create using JSX tags 
// And a referecne to DOM node inside our existing HTML document 
// Nedd to pass a reference to exisiting div with id of root 
ReactDOM.render(
    // Provider tag
    // takes the store 
    // takes app component as a child
    <Provider store={store}><App /></Provider>,
        document.querySelector('#root')
);