const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

// Create mongoose model
// Name the collection 'users', and the schema 
mongoose.model('users', userSchema);