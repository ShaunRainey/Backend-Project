const {selectTopics} = require('./selectTopics')
const {selectEndPoints} = require('./selectEndPoints')
const {selectArticles, selectArticlesById} = require('./selectArticles')
const {selectCommentsForArticle} = require('./selectComments')
const {insertComment} = require('./selectComments')
const {checkArticleExists} = require('./selectArticles')
const {updateArticle} = require('./selectArticles')


module.exports = {selectTopics, selectEndPoints, selectArticles, selectArticlesById, selectCommentsForArticle, insertComment, checkArticleExists, updateArticle};
