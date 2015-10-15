console.log('#### App Component - Git Issues App');

// Jquery for simple animations
// With more time - I would just do this in react
var $ = require('jquery');
var React = require('react');
// Require react-router
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

// Require Components
// Nav
var navComponents = require('./nav/NavComponents');
var TopNav = navComponents.topNav();

// Banner
var bannerComponents = require('./banner/BannerComponents');
var Banner = bannerComponents.parentComponent();

// Styles
// Refer to css/app-one/components/app.css

module.exports = {
	AppComponent: function() {
		var AppComponent = React.createClass({
			getInitialState: function() {
				var data = {
					sideNav: false
				}
				return data;
			},
			toggleSideNav: function() {
				var data = {
					sideNav: !this.state.sideNav
				}
				this.setState(data);
			},
			getNavClassName: function() {
				if(this.state.sideNav) {
					$('.disable-overlay').fadeIn(500);
					return "nav-container slide-right";
				} else {
					$('.disable-overlay').fadeOut(100);
					return "nav-container";
				}
			},
			getBannerClassName: function() {
				if(this.state.sideNav) {
					$('.disable-overlay').fadeIn(200);
					return "banner-container slide-right";
				} else {
					$('.disable-overlay').fadeOut(200);
					return "banner-container";
				}
			},
			getStateClassName: function() {
				if(this.state.sideNav) {
					$('.disable-overlay').fadeIn(200);
					return "states-content slide-right";
				} else {
					$('.disable-overlay').fadeOut(200);
					return "states-content";
				}
			},						
			render: function() {
				return (
					<div className="app-container">
						<div onClick={this.toggleSideNav} className="disable-overlay"></div>
						<div className={this.getNavClassName()}>
							<TopNav toggleSideNav={this.toggleSideNav}/>
						</div>
						<div className={this.getBannerClassName()}>
							<Banner />
						</div>
						<div className={this.getStateClassName()}>
							<RouteHandler {...this}/>
						</div>
					</div>
				)
			}
		});
		return AppComponent;
	}
}