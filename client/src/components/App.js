import React, { Component } from 'react';
// Library of helpers for navigating around the DOM specifically 
// BrowserRouter tells react router how to behave
// Route is used to set up a certain rule between route and components that will be displayed 
import { BrowserRouter, Route } from 'react-router-dom';
// BrowserRouter expects to have at most 1 child (ie. 1 div)

// Use connect to give components the ability to call action creators
import { connect } from 'react-redux';
// Import action creators 
import * as actions from '../actions';

// Import header component 
import Header from './Header';

// Import landing component 
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';


// Functional component (App)
// Returns some JSX
// Exact keyword matches routes "exactly"
class App extends Component {
    // Add on lifecycle method to fetch current_user
    // DidMount is now preferred location to make initial AJAX requests 
    // Connect app component to redux store by using connect helper from react-reducx library 
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div >
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    } 
}

// Utilize connect function 
// Once actions are passed to connect they are assigned to App component as props 
export default connect(null, actions)(App);