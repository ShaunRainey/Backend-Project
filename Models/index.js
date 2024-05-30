const {selectTopics} = require('./selectTopics')
const {selectEndPoints} = require('./selectEndPoints')
const {selectArticles, selectArticlesById} = require('./selectArticles')
const {selectCommentsForArticle} = require('./selectComments')
const {insertComment} = require('./selectComments')


module.exports = {selectTopics, selectEndPoints, selectArticles, selectArticlesById, selectCommentsForArticle, insertComment};
