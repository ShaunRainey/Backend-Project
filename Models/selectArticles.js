const db = require("../db/connection");

exports.selectArticles = () => {
  return db.query('SELECT * FROM articles;').then((result) => {
    return result.rows;
  })
};

exports.selectArticlesById = (articleId) => {
  return db.query('SELECT * FROM articles WHERE article_id = $1', [articleId]).then((result) => {
    const chosenArticle = result.rows[0]
    if(!chosenArticle){
      return Promise.reject({
        status: 404,
        msg: 'article does not exist'
      })
    }
    return chosenArticle;
  })
};