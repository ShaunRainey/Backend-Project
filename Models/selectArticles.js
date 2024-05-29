const db = require("../db/connection");

exports.selectArticles = () => {
  return db.query('SELECT * FROM articles;').then((result) => {
    return result.rows;
  })
};

exports.selectArticlesById = () => {
  return db.query('SELECT * FROM articles;').then((result) => {
    return result.rows;
  })
};