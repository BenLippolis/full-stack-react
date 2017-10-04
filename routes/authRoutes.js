const passport = require('passport');

module.exports = app => {
    // Specify route for entering passport auth flow 
    // Google Strategy has an intermal identifier of 'google' which we call below
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );

    // Route to handle google redirect + code
    // Passport will detect the code inside the URL 
    app.get('/auth/google/callback', passport.authenticate('google'));

    // Logout user 
    // .logout function is automatically attached to request object by passport 
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    // Route for returning authenticated user
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};