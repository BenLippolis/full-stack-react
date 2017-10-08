const mongoose = require('mongoose');
const { Schema } = mongoose;

// Sub-document collection of Survey 
const recipientSchema = new Schema ({
    email: String,
    responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;