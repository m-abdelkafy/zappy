const express = require('express');
const Twitter = require('twitter-node-client').Twitter;
var db = require('./db');

const app = express();

app.get("/",(req,res)=>{res.send('Working!')});

var ZappyController = require('./ZappyController.js');
app.use('/zappy', ZappyController);

module.exports = app;