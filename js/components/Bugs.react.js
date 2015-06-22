var React = require('react');
var BugInput = require('./BugInput.react');
var AppVersionActions = require('../appversionactions');
var AppVersionStore = require('../stores/AppVersionStore');
var BugList = require('./BugList.react');
var BugVersion = require('./BugVersion.react');

function getAppVersionState() {
	return {
		appVersions: AppVersionStore.getAll()
	};
};

var Bugs = React.createClass({
	getInitialState: function() {
		return getAppVersionState();
	},
	componentDidMount: function() {
		AppVersionStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		AppVersionStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getAppVersionState());
	},
	_onSave: function(appVersion) {
		AppVersionActions.create(appVersion);
	},
	render: function() {
		var appVersions = this.state.appVersions;
		var bugLists = [];
		for(var key in appVersions) {
			bugLists.push(
				<div>
				<h3>Version: {key}</h3>
				<div dangerouslySetInnerHTML={{__html: appVersions[key].changeLog }}>				
				</div>
				<br />
				<BugList key={key} appVersion={appVersions[key]} />
				<hr />
				</div>
			)
		}

		bugLists.reverse();
		return (
			<div>
			<BugVersion onSave={this._onSave} />
			<div>
				{bugLists}
			</div>
			</div>
		)
	}
});
module.exports = Bugs;
