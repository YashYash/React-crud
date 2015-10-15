console.log('#### Issue Component');

// CSS - css/app-one/components/content/issue/issue.css
// PARENT ROUTE COMPONENT

var moment = require('moment');
var React = require('React');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var IssuesStore = require('app-one/stores/IssuesStore');
var IssuesActions = require('app-one/actions/IssuesActions');

function getIssue() {
	var issue = IssuesStore.getIssue();
	return {
		issue: issue
	}
}

var exports = module.exports = {
	parentComponent: function() {
		var Issue = exports.issue();
		var ParentComponent = React.createClass({
			componentDidMount: function() {
				IssuesActions.getIssue(this.props.params.number);
			},			
			render: function() {
				return (
					<Issue />
				)
			}
		});
		return ParentComponent;
	},
	issue: function() {
		var Comment = exports.comment();
		var Issue = React.createClass({
			mixins: [IssuesStore.mixin],
			getInitialState: function() {
				return getIssue();
			},
			storeDidChange: function() {
				this.setState(getIssue());
			},
			getBackground: function() {
				if(this.state.issue.user) {
					return this.state.issue.user.avatar_url;
				} else {
					return null;
				}
			},
			getBannerClassName: function() {
				if(this.state.issue.state === 'open') {
					return "banner open";
				}
				if(this.state.issue.state === "closed") {
					return "banner closed";
				}				
			},
			showIssue: function() {
				var win = window.open(this.state.issue.html_url);
				win.focus();
			},
			getStateClassName: function() {
				if(this.state.issue.state === 'open') {
					return "issue-state open relative";
				}
				if(this.state.issue.state === "closed") {
					return "issue-state closed relative";
				}
			},
			getUserName: function() {
				if(this.state.issue.user) {
					return this.state.issue.user.login;
				} else {
					return null;
				}
			},
			showUser: function() {
				if(this.state.issue.user) {
					var win = window.open(this.state.issue.user.html_url);
					win.focus();
				}
			},
			labelsContainerVisibility: function() {
				if(this.state.issue.labels) {
					if(this.state.issue.labels.length) {
						return {
							display: "block"
						}
					} else {
						return {
							display: "none"
						}
					}
				} else {
					return {
						display: "none"
					}					
				}
			},
			getLabels: function() {
				if(this.state.issue.labels) {
					return this.state.issue.labels
				} else {
					return []
				}
			},
			getComments: function() {
				if(this.state.issue.comments) {
					return this.state.issue.comments;
				} else {
					return []
				}
			},
			render: function() {
				var self = this;
				var backgroundImage = {
					background: 'url(' + this.getBackground() + ')'
				}
				var comments = this.getComments().map(function(comment, index) {
					return (
						<Comment
							id={comment.id}
							key={index}
							comment={comment}
							showUser={self.showUser.bind(self, index)} />
					)
				});					
				return (				
					<div className="issue-container">
						<div className="issue">
							<div className={this.getBannerClassName()}>
								<p onClick={this.showIssue} className="issue-title relative">{this.state.issue.title}</p>
								<p className={this.getStateClassName()}>{this.state.issue.state}</p>
								<div className="blurred-image absolute" style={backgroundImage}></div>
								<div className="overlay absolute"></div>
								<div className="profile-image" style={backgroundImage}></div>
							</div>
							<div className="issue-content">
								<p onClick={this.showUser} className="user-name">@{this.getUserName()}</p>
								<div className="seperator"></div>
								<p className="issue-body">{this.state.issue.body}</p>
								<div className="labels-container" style={this.labelsContainerVisibility()}>
									{this.getLabels().map(function(label, index) {
										var style = {
											background: '#' + label.color
										};
										return (
											<div className="label" key={index} style={style}>{label.name}</div>
										)
									}, this)}
								</div>							
							</div>
						</div>
						<div className="comments-container">
							{comments}
						</div>
					</div>
				)
			}
		})
		return Issue;
	},
	comment: function() {
		var Comment = React.createClass({
			getCommentDate: function() {
				var date = moment(this.props.comment.created_at).format('D MMM YYYY - h:mm A');
				return date;
			},		
			render: function() {
				var backgroundImage = {
					background: 'url(' + this.props.comment.user.avatar_url + ')'
				}				
				return (
					<div className="comment">
						<div className="user-profile">
							<div className="image" style={backgroundImage}></div>
							<a href={this.props.comment.user.html_url} target="_blank" className="user-name">@{this.props.comment.user.login}</a>
						</div>
						<div className="comment-body">
							<span className="icon-arrow-left"></span>
							<span className="comment-date">{this.getCommentDate()}</span>
							<div className="seperator"></div>
							{this.props.comment.body}
						</div>
					</div>
				)
			}
		})
		return Comment;
	}
}