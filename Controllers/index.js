const {getTopics} = require('./topicController');
const {getEndpoints} = require('./endPointsController');
const {getArticles} = require('./articlesController')
const {getArticlesById} = require('./articlesController');

module.exports = {getTopics, getEndpoints, getArticles, getArticlesById}
