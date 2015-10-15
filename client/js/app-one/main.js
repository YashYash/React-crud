console.log('#### Main.js - Rendering AppComponent');

var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var app = require('./components/AppComponent');
var APP = app.AppComponent();

var issuesComponents = require('./components/content/IssuesComponents');
var Issues = issuesComponents.parentComponent();

var issueComponents = require('./components/content/IssueComponents');
var Issue = issueComponents.parentComponent();

/*** @jsx React.DOM */

var routes = (
	<Route name="app" path="/" handler={APP}>
		<DefaultRoute handler={Issues}/>
		<Route path="/issues" name="issues" handler={Issues} />
		<Route path="/issues/:number" handler={Issue} />
		
	</Route>
);


window.onload = function() {
	Router.run(routes, function(Handler, state) {
		var params = state.params;
		React.render(<Handler params={params}/>, document.body);
	});
}