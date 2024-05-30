const db = require("../db/connection");

exports.selectCommentsForArticle =(articleId) => {
    return db.query(`SELECT * FROM comments WHERE article_Id = $1 ORDER BY created_at DESC `,[articleId])
    .then((result) => {
        return result.rows
    })
}