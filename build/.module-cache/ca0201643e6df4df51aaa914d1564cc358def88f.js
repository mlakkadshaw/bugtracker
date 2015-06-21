var BugDispatcher = require('./bugdispatcher');

var CommentActions = {
    addComment: function(bugId, text) {
        BugDispatcher.dispatch({
            actionType: 'COMMENT_ADD',
            text: text,
            bugId: bugId
        });
    },
    removeComment: function(id) {
        BugDispatcher.dispatch({
            actionType: 'COMMENT_REMOVE',
            id: id
        });
    }
};

module.exports = CommentActions;
