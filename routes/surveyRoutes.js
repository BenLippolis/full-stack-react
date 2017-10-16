const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for your feedback!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        // Extract path name from request body 
        const p = new Path('/api/surveys/:surveyId/:choice');

        // Use chain method 
        _.chain(req.body)
            .map(({ email, url }) => {            
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            // Compact function from lodash library 
            // Use compact to remove undefined elements 
            .compact()
            // Ensure we have no duplicate records 
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            .value();

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        // Create new survey 
        // Note ES6 syntax with just title in place of title: title
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Send an email
        const mailer = new Mailer(survey, surveyTemplate(survey));

        // Try catch for error handling 
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            // Send back new user model so header will auto update credits 
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};