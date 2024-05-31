const db = require("../db/connection");

exports.selectArticles = ((next) => {
  return db.query(
    `SELECT 
    a.author, 
    a.title, 
    a.article_id, 
    a.topic,
    a.created_at,
    a.votes,
    a.article_img_url,
    COUNT(c.article_id) :: INT AS comment_count
    FROM articles a
    LEFT JOIN comments c
      ON a.article_id = c.article_id
    GROUP BY a.article_id
    ORDER BY a.created_at DESC;`).then((result) => {
      return result.rows;
  })
  .catch(next);
});

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

exports.checkArticleExists = (articleId) => {
  return db.query(`SELECT * FROM articles WHERE article_id =$1`,[articleId])
  .then((articles) => {
    if(!articles.rows.length){
      return Promise.reject({status: 404, msg: 'Not Found'})
    }
  })
}

exports.updateArticle = (inc_votes, article_id) => {
  return db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,[inc_votes, article_id])
  .then((result) => {
      return result.rows
})
}