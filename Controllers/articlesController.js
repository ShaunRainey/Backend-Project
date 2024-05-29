const {selectArticles} = require('../Models/index')
const {selectArticlesById} = require('../Models/index')

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