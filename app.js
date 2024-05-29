const express = require('express');
const app = express();
const {getTopics, getEndpoints, getArticles, getArticlesById} = require('./Controllers/index');

app.get('/api', getEndpoints)

app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);


app.get('/api/articles/:article_id', getArticlesById)

app.use((err, req, res, next) => {
  if(err.status && err.msg){
    res.status(err.status).send({msg: err.msg})
  }
  res.status(400).send({msg:'Bad request'});
});

app.all('*', (req, res) => {
  res.status(404).send({msg: "URL doesn't exist"})
})

  module.exports = app;
  