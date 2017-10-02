// Root file 

// Require Express 
const express = require('express');

// Configure app with port & routing 
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

// Dynamic Port Binding 
const PORT = process.env.PORT || 5000
app.listen(PORT);