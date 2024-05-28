const express = require('express');
const app = express();

const {getTopics} = require('./Controllers/topic.controller');

app.get('/api/topics', getTopics);


app.all('*', (req, res) => {
    res.status(404).send({msg: "Endpoint doesn't exist"})
      })

  module.exports = app;
  