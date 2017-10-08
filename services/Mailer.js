// Email is a service to the application
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// helper.Mail adds built in functionality from React to Mailer class 
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) { 
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        // sendgrid specific
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients); 

        // addContent is built in function from Mail class
        this.addContent(this.body);
        // Enable click tracking inside of email
        this.addClickTracking();
        // Add the recipients to Mailer 
        this.addRecipients();
    }

    // Helper 
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    // Helper
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    // Helper
    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        // Send off to sendgrid API 
        const response = this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;