// Survey New shows survey form & survey form review 
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
    // Component level state example
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false})}/>;
        }

        return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
    }
    
    render() {
        return ( 
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    // Clear form values when survey new component is unmounted 
    // That is the defult redux form behvior 
    form: 'surveyForm'
})(SurveyNew);