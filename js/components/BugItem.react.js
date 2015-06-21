var React = require('react');
var BugActions = require("../bugactions");
var BugComments = require("./BugComments.react");

var BugItem = React.createClass({
	getInitialState: function() {
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
		var buttonTitle = 'Show Comments';
		if(this.state.expanded) {
			buttonTitle = 'Hide Comments';
		}
		return (
			<li>
			<input 
				id={checkboxId} 
				type="checkbox"
				onChange={this._onChange} />
			<label className={className}>{bug.text}</label>
			<button onClick={this._toggleState}>{buttonTitle}</button>
			{ this.state.expanded ? <BugComments bugId={bug.id} /> : null }
			</li>
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