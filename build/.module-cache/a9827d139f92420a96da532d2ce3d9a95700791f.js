var React = require('react');
var BugStore = require('../stores/BugStore');
var BugActions = require("../bugactions");
var BugItem = require('./BugItem.react');
var BugInput = require('./BugInput.react');

function getBugsState(appVersion) {
	return {
		bugs: BugStore.getForVersion(appVersion)
	};
}

var BugList = React.createClass({displayName: "BugList",
	getInitialState: function() {
		return getBugsState(this.props.appVersion.id);	
	},
	componentDidMount: function() {
		BugStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		BugStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getBugsState(this.props.appVersion.id));
	},
	_onSave: function(text) {
		BugActions.create(this.props.appVersion.id, text);
	},
	render: function() {
		var allBugs = this.state.bugs;
		var bugitems = [];
		for(var key in allBugs) {
			bugitems.push(React.createElement(BugItem, {key: key, bug: allBugs[key]}));
		}
		return (
			React.createElement("div", null, 
			React.createElement(BugInput, {onSave: this._onSave}), 
			React.createElement("ul", null, 
				bugitems
			)
			)
		)
	}
});
module.exports = BugList;