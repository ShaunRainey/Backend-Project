const {selectArticles} = require('../Models/index')
const {selectArticlesById} = require('../Models/index')
const {selectCommentsForArticle} = require('../Models/index');
const {checkArticleExists} = require('../Models/index');
const {insertComment} = require('../Models/index');
const {updateArticle} = require('../Models/index')

exports.getArticles = (req, res, next) => {
  selectArticles().then((articles) => {
    res.status(200).send({ articles });
  })
  .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const articleId = req.params.article_id;
  selectArticlesById(articleId).then((article) => {
    res.status(200).send({ article });
  })
  .catch(next);
};

exports.getCommentsForArticle = (req, res, next) => {
  const articleId = req.params.article_id;
  return Promise.all([
    selectCommentsForArticle(articleId),
    checkArticleExists(articleId)
  ])
  .then(([comments]) =>{res.status(200).send({comments})
  })
  .catch((err) => {
    next(err)
  });
}

exports.postCommentsById = (req,res,next) => {
  const articleId = req.params.article_id;
  const newComment = req.body;
  newComment.article_id = req.params.article_id;

  return Promise.all([
    insertComment(newComment),
    checkArticleExists(articleId)
  ])
  .then(([[comment]]) =>{
    res.status(201).send({comment})
  }) 
  .catch((err) => {
    next(err)
  });
}

exports.patchArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  const updateVotes = req.body.inc_votes;

  return Promise.all([
    updateArticle(updateVotes, articleId),
    checkArticleExists(articleId)
  ])
  .then(([[article]]) => {
    res.status(200).send({ article });
  })
  .catch(next);
};