import React from 'react';
// Library of helpers for navigating around the DOM specifically 
// BrowserRouter tells react router how to behave
// Route is used to set up a certain rule between route and components that will be displayed 
import { BrowserRouter, Route } from 'react-router-dom';
// BrowserRouter expects to have at most 1 child (ie. 1 div)

// Import header component 
import Header from './Header';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>Survey New</h2>
const Landing = () => <h2>Landing</h2>

// Functional component (App)
// Returns some JSX
// Exact keyword matches routes "exactly"
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;