// SurveyForm shows a form for a user to add input 
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return (
                <Field 
                    key={name} 
                    component={SurveyField} 
                    type="text" 
                    label={label} 
                    name={name} 
                />
            );
        });
    }

    render() {
        return ( 
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat left white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}
// values represents all form input data 
function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');
    

    _.each(formFields, ({ name }) => {
        if(!values[name]) {
            errors[name] = 'You must provide a value for this field.'
        }
    });


    return errors;
}

export default reduxForm({
    validate,
    // Name tells redux form how to successfully manage submitted values
    // Giving this name to other forms allows them to share values 
    form: 'surveyForm',
    // Prevents form values from getting dumped when component is not rendered
    destroyOnUnmount: false
})(SurveyForm);