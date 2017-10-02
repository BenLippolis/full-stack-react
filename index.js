// Root file 

// Require Express 
const express = require('express');

// Configure app with port & routing 
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

app.listen(5000);