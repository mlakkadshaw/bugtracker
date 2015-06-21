var React = require('react');
var CommentsStore = require('../stores/CommentStore.js');
var CommentActions = require('../commentactions.js');
var BugComment = require('./BugComment.react');
var BugInput = require('./BugInput.react');

function getComments(bugId) {
	return {
		comments: CommentsStore.getForBug(bugId)
	}
};

var BugComments = React.createClass({
	getInitialState: function() {
		return getComments(this.props.bugId);
	},
	componentDidMount: function() {
		CommentsStore.addChangeListener(this._onChange);
	},
	componentDidUnmount: function() {
		CommentsStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
			this.setState(getComments(this.props.bugId));	
	},
	_onSave: function(text) {
		CommentActions.addComment(this.props.bugId, text);
	},
	render: function() {
		var commentsData = this.state.comments;
		var comments = [];
		for(var key in commentsData) {
			comments.push(
				<BugComment key={key} comment={commentsData[key]} /> 
			);
		}
		
		return (
			<div>
				<BugInput onSave={this._onSave} />
				<ul>
					{comments}
				</ul>
			</div>
		);	
	}			
});
module.exports = BugComments;