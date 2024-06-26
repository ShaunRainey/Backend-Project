const express = require('express');
const app = express();
const {getTopics, getEndpoints, getArticles, getUsers, getArticlesById, getCommentsForArticle, postCommentsById, patchArticleById, deleteCommentById } = require('./Controllers/index');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/api', getEndpoints)

app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);
app.get('/api/users', getUsers);

app.get('/api/articles/:article_id', getArticlesById)
app.get('/api/articles/:article_id/comments', getCommentsForArticle)
app.post('/api/articles/:article_id/comments', postCommentsById)
app.patch('/api/articles/:article_id', patchArticleById)

app.delete('/api/comments/:comment_id',deleteCommentById)

app.use((err, req, res, next) => {
  if(err.code === "22P02"){
    res.status(400).send({msg: 'Bad request'})
  } 
  if(err.code === "23503"){
    res.status(404).send({msg: 'Not Found'})
  } else { next(err)}
})

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
  