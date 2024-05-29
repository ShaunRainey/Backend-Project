const {selectArticles} = require('../Models/index')
const {selectArticlesById} = require('../Models/index')

exports.getArticles = (req, res, next) => {
  selectArticles().then((articles) => {
    res.status(200).send({ articles });
  })
  .catch((err) => {next(err)});
};

exports.getArticlesById = (req, res, next) => {
  selectArticlesById().then((articles) => {
    res.status(200).send({ articles });
  })
  .catch((err) => {next(err)});
};