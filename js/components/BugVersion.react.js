var React = require('react');
var BugInput = require('./BugInput.react');
var markdown = require('markdown').markdown;

var BugVersion = React.createClass({
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
			<div>
			<div className='appControls'>
				App Version:
				<br />
				<input onChange={this._updateVersionName } type="text" />
				<br />
				Description:
				<br />
				<textarea rows="5" onChange={this._updateChangelog}></textarea>
				<br/>
				<button onClick={this._onSave}>Save</button>
			</div>
			<div className="preview" dangerouslySetInnerHTML={{__html: this.state.changeLog }}></div>
			</div>
			)
	}
});
module.exports = BugVersion;
