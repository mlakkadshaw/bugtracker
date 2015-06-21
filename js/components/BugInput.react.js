var React = require('react');
var BugActions = require('../bugactions');

var BugInput = React.createClass({
	getInitialState: function() {
		return {
			value: this.props.value || ""
		};
	},
	_onChange: function(event) {
		this.setState({
			value: event.target.value
		});
	},
	_onKeyDown: function(event) {
		if(event.keyCode === 13) {
			this.props.onSave(this.state.value);
			this.setState({
				value: ''
			});
		}	
	},
	render: function() {
		return (
			<input type="text"
			onChange={this._onChange}
			onKeyDown={this._onKeyDown}
			value={this.state.value}
			autoFocus={true}
			/>
		)
	}
});
module.exports = BugInput;