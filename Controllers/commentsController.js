const {removeComment} = require('../Models/index')
const {checkCommentExists} = require('../Models/index')

exports.deleteCommentById = (req, res, next) => {
    const {comment_id} = req.params;
    
    return Promise.all([
        removeComment(comment_id),
        checkCommentExists(comment_id)
    ])
    .then(() => {
        res.status(204).send()
    })
    .catch(next)
}
