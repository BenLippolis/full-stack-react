// When code is deployed to Heroku we'll be able to tell what envt we're in 
if (process.env.NODE_ENV != 'production') {
    module.exports = require('./dev');   
} else {
    module.exports = require('./prod');   
}