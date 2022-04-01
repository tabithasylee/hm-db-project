"use strict"

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'build')));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// app.use(express.static(paths.join(__dirname, "../../public")))

// routes
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})