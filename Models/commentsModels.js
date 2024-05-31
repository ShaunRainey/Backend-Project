const db = require("../db/connection");

exports.selectCommentsForArticle =(articleId) => {
    return db.query(`SELECT * FROM comments WHERE article_Id = $1 ORDER BY created_at DESC `,[articleId])
    .then((result) => {
        return result.rows
    })
}

exports.insertComment = ({username, body, article_id}) => {
    return db.query(`INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;`, [username, body, article_id])
    .then((result) => {
        return result.rows
    })
}

exports.checkCommentExists = (comment_id) => {
    return db.query(`SELECT * FROM comments WHERE comment_id =$1`,[comment_id])
    .then((comment) => {
      if(!comment.rows.length){
        return Promise.reject({status: 404, msg: 'Not Found'})
      }
    })
  }

exports.removeComment = (comment_id) => {
    return db.query(`DELETE FROM comments WHERE comment_id = $1`,[comment_id])
}

