var React = require('react');

var BugComment = React.createClass({
            render: function() {
                var comment = this.props.comment;
                return ( <li>
                         {comment.text} </li>)
	}
});
module.exports = BugComment;
