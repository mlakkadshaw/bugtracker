var React = require('./react');
var BugInput = require('./BugInput.react');

var BugVersion = React.createClass({displayName: "BugVersion",
	getInitialState: function() {
		return {
			versionName: '',
			changeLog: ''
		}
	},
	_updateVersionName: function(event) {
		var versionName = event.target.value;
		this.setState({
			versionName: versionName,
			changeLog: this.state.changeLog
		});
	},
	_updateChangelog: function(event) {
		var changeLog = event.target.value;
		this.setState({
			versionName: this.state.versionName,
			changeLog: changeLog
		});
	},
	_onSave: function() {
		this.props.onSave({
			versionName: this.state.versionName,
			changeLog: this.state.changeLog
		});
	},
	render: function() {
		return (
			React.createElement("div", null, 
			"App Version: ", React.createElement("input", {onChange: this._updateVersionName, type: "text"}), 
			React.createElement("br", null), 
			"Description: ", React.createElement("textarea", {onChange: this._updateChangelog}), 
			React.createElement("br", null), 
			React.createElement("button", {onClick: this._onSave}, "Save")
			)
			)
	}
});
