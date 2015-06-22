var React = require('react');
var BugInput = require('./BugInput.react');
var markdown = require('markdown').markdown;

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
			changeLog: markdown.toHTML(changeLog)
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
			React.createElement("div", {className: "appControls"}, 
				"App Version:", 
				React.createElement("br", null), 
				React.createElement("input", {onChange: this._updateVersionName, type: "text"}), 
				React.createElement("br", null), 
				"Description:", 
				React.createElement("br", null), 
				React.createElement("textarea", {rows: "5", onChange: this._updateChangelog}), 
				React.createElement("br", null), 
				React.createElement("button", {onClick: this._onSave}, "Save")
			), 
			React.createElement("div", {className: "preview", dangerouslySetInnerHTML: {__html: this.state.changeLog}})
			)
			)
	}
});
module.exports = BugVersion;
