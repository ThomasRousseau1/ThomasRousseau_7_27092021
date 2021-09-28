//Imports 
const express = require('express');

//Instantiate server
const server = express();

//Configure routes 
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Hello world</h1>');
});

//Launch server
server.listen(8080, function() {
    console.log('Server en écoute')
});