console.log('#### Issues Component');

// CSS - css/app-one/components/content/issues/issues.css
// CSS - css/app-one/components/content/issues/issue.css
// CSS - css/app-one/components/content/issues/paginate.css

// PARENT ROUTE COMPONENT

var React = require('React');

var IssuesStore = require('app-one/stores/IssuesStore');
var IssuesActions = require('app-one/actions/IssuesActions');

function getIssues() {
	var issues = IssuesStore.getIssues();
	return {
		issues: issues
	}
}

var exports = module.exports = {
	parentComponent: function() {
		var IssuesController = exports.issuesController();
		var parentComponent = React.createClass({
			componentDidMount: function() {
				IssuesActions.getIssues(1);
			},
			render: function() {
				return (
					<div className="issues-container">
						<div className="issues-title-container">
							<h1>GIT ISSUES</h1>
							<p>SEARCH THROUGH THE RECENT ISSUES POSTED ON GITHUB</p>
						</div>
						<IssuesController />
					</div>
				)
			}
		});
		return parentComponent;
	},
	issuesController: function() {
		var Issues = exports.issues();
		var Paginate = exports.paginate();
		var IssuesController = React.createClass({
			mixins: [IssuesStore.mixin],
			getInitialState: function() {
				return getIssues();
			},
			storeDidChange: function() {
				this.setState(getIssues());
			},				
			render: function() {
				return (
					<div className="issues-controller">
						<Issues issues={this.state.issues} />
						<Paginate />
					</div>
				)
			}
		});	
		return IssuesController;
	},
	paginate: function() {
		var Paginate = React.createClass({
			getInitialState: function() {
				var data = {
					pages: [],
					currentPage: 1
				}
				var className;
				for(var i = 1; i < 6; i++) {
					if(i === 1) {
						className = 'number active';
					} else {
						className = 'number not-active';
					}
					data.pages.push({
						number: i,
						className: className
					});
				}
				return data;
			},
			getClassName: function(number) {
				if(number === this.state.currentPage) {
					return 'number active';
				} else {
					return 'number not-active';
				}
			},
			loadPage: function(number) {
				console.log(number);
				var index = number - 1;
				var pageNumber = this.state.pages[index].number;
				var pages = this.state.pages;
				this.state.currentPage = pageNumber;
				for(var i = 0; i < pages.length; i++) {
					pages[i].className = this.getClassName(pages[i].number);					
				}
				// Clear the issues to resolve the view by showing a loader
				IssuesActions.clearIssues();
				IssuesActions.getIssues(pageNumber);
			},
			nextSet: function() {
				var pages = this.state.pages;
				if(pages[4].number <=10) {
					for(var i = 0; i < pages.length; i++) {
						pages[i].number = pages[i].number + 5;
						pages[i].className = this.getClassName(pages[i].number);					
					}
					var data = {
						pages:pages
					}
					this.setState(data);
				}
			},
			prevSet: function() {
				var pages = this.state.pages;
				if(pages[0].number > 1) {
					for(var i = 0; i < pages.length; i++) {
						pages[i].number = pages[i].number - 5;
						pages[i].className = this.getClassName(pages[i].number);						
					}
					var data = {
						pages:pages
					}
					this.setState(data);
				}
			},
			render: function() {
				var self = this;
				var pagesRepeat = this.state.pages.map(function(page, index) {
					return (
						<div className={page.className} key={index} onClick={self.loadPage.bind(self, page.number)}><span>{page.number}</span></div>
					)
				});				
				return (
					<div className="paginate-container">
						<i onClick={this.prevSet} className="icon-fast-backward previous"></i>
						{pagesRepeat}
						<i onClick={this.nextSet} className="icon-fast-forward next"></i>
					</div>
				)
			}
		});
		return Paginate;
	},
	issues: function() {
		var Issue = exports.issue();
		var Issues = React.createClass({
			getClassName: function() {
				if(!this.props.issues.length) {
					return "loading-issues";
				} else {
					return "loading-issues hide";
				}
			},
			render: function() {				
				var issuesRepeat = this.props.issues.map(function(issue, index) {
					return (
						<Issue
							id={index}
							key={index}
							issue={issue} />
					)
				});
				return (
					<div className="issues"> 
						{issuesRepeat}
						<div className={this.getClassName()}>
							<span className="icon-github-alt github-loader"></span>
							<p className="loading-copy">LOADING ISSUES</p>
						</div>						
					</div>
				)
			}
		});			
		return Issues;
	},
	issue: function() {
		var Issue = React.createClass({
			getIssueTitle: function() {
				if(this.props.issue.title) {
					var title = this.props.issue.title;
					title = title.slice(0, 80);
					return title;
				} else {
					return null;
				}
			},
			getIssueDescription: function() {
				if(this.props.issue.body) {
					var description = this.props.issue.body;
					description = description.slice(0, 140);
					return description;
				} else {
					return null;
				}
			},
			render: function() {
				if(this.props.issue.user) {
					var backgroundImage = {
						background: 'url(' + this.props.issue.user.avatar_url + ')'
					};
				} else {
					backgroundImage = {};
				}		
				return (
					<div className="issue-card">
						<div className="banner">
							<div className="blur-background" style={backgroundImage}></div>
							<div className="overlay"></div>
							<a href={"#/issues/" + this.props.issue.number} className="issue-title">{this.getIssueTitle()}</a>
							<a href={this.props.issue.html_url} target="_blank" className="issue-number">#{this.props.issue.number}</a>
						</div>
						<div className="user-image" style={backgroundImage}></div>
						<a href={this.props.issue.user.html_url} target="_blank" className="user-name">@{this.props.issue.user.login}</a>
						<div className="seperator"></div>
						<p className="issue-description">{this.getIssueDescription()} ...</p>
						<div className="labels-container">
							{this.props.issue.labels.map(function(label, index) {
								var style = {
									background: '#' + label.color
								};
								return (
									<div className="label" key={index} style={style}>{label.name}</div>
								)
							}, this)}
						</div>
						<span className="icon-chat-bubble-two chat-icon">{this.props.issue.comments}</span>
						<a href={"#/issues/" + this.props.issue.number}><span className="icon-export open-new-tab"></span></a>
					</div>
				)
			}
		});
		return Issue;
	}
}
