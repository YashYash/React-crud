console.log('#### Banner Component');

// CSS - css/app-one/components/banner/banner.css
// PARENT ROUTE COMPONENT

var React = require('React');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link
var RouteHandler = Router.RouteHandler;

module.exports = {
	parentComponent: function() {
		var parentComponent = React.createClass({
			render: function() {
				return (
					<div className="banner">
						<div className="absolute gradient"></div>
						<div className="absolute overlay"></div>
						<img className="github-logo" src="https://dff2h0hbfv6w4.cloudfront.net/ZAXSCDVF12345/github-logo.png"/>
					</div>
				)
			}
		});
		return parentComponent;
	}
}