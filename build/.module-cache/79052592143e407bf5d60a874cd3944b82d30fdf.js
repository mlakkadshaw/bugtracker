var React = require('react');
var BugActions = require("../bugactions");

var BugItem = React.createClass({displayName: "BugItem",
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
			React.createElement("a", {href: ""}, "Show Comments")
			)
		);	
	},
	_onChange: function(event) {
		if(event.target.checked) {
			BugActions.markAsComplete(this.props.bug.id);
		} else {
			BugActions.unmarkAsComplete(this.props.bug.id);
		}
	}
});
module.exports = BugItem;