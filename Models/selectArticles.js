const db = require("../db/connection");

exports.selectArticlesById = () => {
    return db.query('SELECT * FROM articles;').then((result) => {
      return result.rows;
    })
  };