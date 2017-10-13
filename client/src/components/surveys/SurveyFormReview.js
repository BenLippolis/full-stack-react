import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom'; 
// Access all action creators 
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields, ({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>

        );
    });
    return (
        <div>
            <h5> Please confirm your entries </h5>
            {reviewFields}
            <button 
                className="red btn-flat white-text" onClick={onCancel}>
                Back 
            </button>
            <button 
                onClick={() => submitSurvey(formValues, history)}
                className="teal btn-flat right white-text">
                Send Survey 
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

// Access history object using withRouter helper
// History object is then passed to the action creator 
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));