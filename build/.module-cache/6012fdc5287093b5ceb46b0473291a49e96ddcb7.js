var React = require('react');

var BugComment = React.createClass({displayName: "BugComment",
            render: function() {
                var comment = this.props.comment;
                return ( React.createElement("li", null, 
                         comment.text, " "))
	}
});
module.exports = BugComment;
