console.log('#### Main.js - Rendering App Component');

var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var app = require('./components/AppComponent');
var APP = app.AppComponent();

var landingComponents = require('./components/content/LandingComponents');
var Landing = landingComponents.parentComponent();

/*** @jsx React.DOM */

var routes = (
	<Route name="app" path="/" handler={APP}>
		<DefaultRoute handler={Landing}/>
		<Route path="/landing" name="landing" handler={Landing}/>
	</Route>
);


window.onload = function() {
	Router.run(routes, function(Handler, state) {
		var params = state.params;
		React.render(<Handler params={params}/>, document.body);
	})	
}