const {getTopics} = require('./topicController');
const {getUsers} = require('./usersController')
const {getEndpoints} = require('./endPointsController');
const {getArticles} = require('./articlesController')
const {getArticlesById} = require('./articlesController');
const {getCommentsForArticle} = require('./articlesController');
const {postCommentsById} = require('./articlesController');
const {patchArticleById} = require('./articlesController')
const {deleteCommentById} = require('./commentsController')

module.exports = {
    getTopics,
    getUsers, 
    getEndpoints, 
    getArticles, 
    getArticlesById, 
    getCommentsForArticle, 
    postCommentsById,
    patchArticleById,
    deleteCommentById}
