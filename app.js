const express = require('express');
const app = express();
const {getTopics, getEndpoints} = require('./Controllers/index');

app.get('/api', getEndpoints)

app.get('/api/topics', getTopics);


app.all('*', (req, res) => {
    res.status(404).send({msg: "URL doesn't exist"})
      })

  module.exports = app;
  