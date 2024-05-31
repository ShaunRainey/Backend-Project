const {selectTopics} = require('./topicsModels')
const {selectEndPoints} = require('./endPointsModels')
const {selectArticles, selectArticlesById} = require('./articlesModels')
const {selectCommentsForArticle} = require('./commentsModels')
const {insertComment} = require('./commentsModels')
const {checkArticleExists} = require('./articlesModels')
const {updateArticle} = require('./articlesModels')
const {removeComment} = require('./commentsModels')
const {checkCommentExists} = require('./commentsModels')


module.exports = {selectTopics, selectEndPoints, selectArticles, selectArticlesById, selectCommentsForArticle, insertComment, checkArticleExists, updateArticle, removeComment, checkCommentExists};
