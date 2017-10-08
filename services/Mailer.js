// Email is a service to the application
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// helper.Mail adds built in functionality from React to Mailer class 
class Mailer extends helper.Mail {
    
}