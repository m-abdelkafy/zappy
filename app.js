const express = require('express');

const app = express();
app.get('/', (req, res) => {
   res.send(req.query.message);
});

module.exports = app;