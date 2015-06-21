var React = require('react');
var BugActions = require("../bugactions");
var BugComments = require("./BugComments.react");

var BugItem = React.createClass({displayName: "BugItem",
	getInititalState: function() {
		return {
			expanded: false
		}	
	},
	render: function() {
		var bug = this.props.bug;
		var checkboxId = bug.id+"-checkbox";
		var className = 'normal';
	    if(bug.fixed) {
	      className = 'strike';
	    }
		return (
			React.createElement("li", null, 
			React.createElement("input", {
				id: checkboxId, 
				type: "checkbox", 
				onChange: this._onChange}), 
			React.createElement("label", {className: className}, bug.text), 
			React.createElement("a", {onClick: this._toggleState}, "Show Comments"), 
			 this.state.expanded ? React.createElement(BugComments, {bugId: bug.id}) : null
			)
		);	
	},
	_onChange: function(event) {
		if(event.target.checked) {
			BugActions.markAsComplete(this.props.bug.id);
		} else {
			BugActions.unmarkAsComplete(this.props.bug.id);
		}
	},
	_toggleState: function() {
		if(this.state.expanded) {
			this.setState({
				expanded: false
			});
		} else {
			this.setState({
				expanded: true
			});
		}
	}
});
module.exports = BugItem;