const {getTopics} = require('./topicController');
const {getEndpoints} = require('./endPointsController');
const {getArticles} = require('./articlesController')
const {getArticlesById} = require('./articlesController');
const {getCommentsForArticle} = require('./articlesController');
const {postCommentsById} = require('./articlesController');
const {patchArticleById} = require('./articlesController')

module.exports = {
    getTopics, 
    getEndpoints, 
    getArticles, 
    getArticlesById, 
    getCommentsForArticle, 
    postCommentsById,
    patchArticleById}
