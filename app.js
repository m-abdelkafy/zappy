const express = require('express');
const Twitter = require('twitter-node-client').Twitter;
var db = require('./db');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
app.get("/",(req,res)=>{res.send('Working!')});

var ZappyController = require('./ZappyController.js');
app.use('/zappy', ZappyController);

module.exports = app;