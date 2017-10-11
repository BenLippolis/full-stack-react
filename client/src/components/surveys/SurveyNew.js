// Survey New shows survey form 
import React, { Component } from 'react';
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

export default SurveyNew;