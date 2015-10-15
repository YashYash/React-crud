console.log('#### Issues Store');

// var McFly = require('app-one/libraries/McFly');
// var Flux = new McFly();

var Biff = require('app-one/libraries/biff');

var IssuesStore = Biff.createStore({
	_issues: [],
	_issue: {},
	setIssues: function(issues) {
		this._issues = issues
	},
	getIssues: function() {
		return this._issues;
	},
	clearIssues: function() {
		this._issues = [];
	},
	setIssue: function(issue) {
		this._issue = issue;
	},	
	getIssue: function() {
		return this._issue;
	},
}, function(payload) {
	if(payload.actionType === 'GOT_ISSUES') {
		this.setIssues(payload.issues);
		this.emitChange();
	}
	if(payload.actionType === 'CLEAR_ISSUES') {
		this.clearIssues();
		this.emitChange();	
	}
	if(payload.actionType === 'GOT_ISSUE') {
		this.setIssue(payload.issue);
		this.emitChange();
	}
});

module.exports = IssuesStore;