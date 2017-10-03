// Root file 
// Require Express 
const express = require('express');
require('./services/passport');


// Configure app with port & routing 
const app = express();

// Require returns a function and app is immediatley passed in 
require('./routes/authRoutes')(app);

// Dynamic Port Binding 
const PORT = process.env.PORT || 5000
app.listen(PORT);