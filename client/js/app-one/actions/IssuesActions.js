console.log('#### Issues Actions');

// var McFly = require('app-one/libraries/McFly');
// var Flux = new McFly();

// Use biff instead of McFly
var Biff = require('app-one/libraries/biff');

// A simple http library put together by me
var $http = require('app-one/libraries/http');

var IssuesActions = Biff.createActions({
	getIssues: function(page) {
		var self = this;
		var url = 'https://api.github.com/repos/npm/npm/issues?page=' + page;
		$http.get(url, function(data, err) {
			if(err) {
				console.log("%c #### Error Occured", "color:red; background:black;");
				console.log(err);
			} else {
				self.dispatch({
					actionType: "GOT_ISSUES",
					issues: data
				});
			}
		});
	},
	clearIssues: function() {
		this.dispatch({
			actionType: "CLEAR_ISSUES"
		})
	},
	getIssue: function(number) {
		var self = this;
		var url = "https://api.github.com/repos/npm/npm/issues/" + number;
		var commentsUrl = url + "/comments";
		$http.get(url, function(data, err) {
			if(err) {
				console.log("%c #### Error Occured", "color:red; background:black;");
				console.log(err);
			} else {
				var issues = data;
				if(issues.comments) {
					$http.get(commentsUrl, function(comments, err) {
						if(err) {
							console.log("%c #### Error Occured", "color:red; background:black;");
							console.log(err);
						} else {
							issues.comments = comments;
							dispatch(issues);
						}
					})
				} else {
					dispatch(issues);
				}
			}
		});
		function dispatch(issues) {
			self.dispatch({
				actionType: "GOT_ISSUE",
				issue: issues
			});
		}
	},
	getComments: function() {

	}
});

module.exports = IssuesActions;