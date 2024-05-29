const {selectArticlesById} = require('../Models/index')

exports.getArticlesById = (req, res, next) => {
    selectArticlesById().then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {next(err)});
  };