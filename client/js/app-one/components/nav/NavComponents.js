console.log('#### Nav Components');

// CSS - css/app-one/components/nav/top-nav.css
// ABSTRACT VIEW

var React = require('react');

exports = module.exports = {

	topNav: function() {
		var SideNav = exports.sideNav();
		var TopNav = React.createClass({
			render: function() {
				return (
					<div className="top-nav">
						<div className="hamburger" onClick={this.props.toggleSideNav}>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<SideNav />
					</div>
				)
			}
		});
		return TopNav;
	},
	sideNav: function() {
		var SideNav = React.createClass({
			openLinkedIn: function() {
				var url = "https://www.linkedin.com/pub/yash-saxena/87/14a/963";
				var win = window.open(url);
				win.focus();
			},
			openGithub: function() {
				var url = "https://github.com/YashYash";
				var win = window.open(url);
				win.focus();
			},
			openWebsite: function() {
				var url = "http://yash-saxena.com";
				var win = window.open(url);
				win.focus();
			},						
			render: function() {
				return (
					<div className="side-nav">
						<img src="http://vignette1.wikia.nocookie.net/dusktilldawn/images/1/1a/Twitter_logo.png/revision/latest?cb=20140507210836" />
						<p className="heading">TWITTER CHALLENGE</p>
						<p className="my-name">Yash Saxena</p>
						<div className="seperator"></div>
						<p onClick={this.openLinkedIn} className="icon-linkedin-square icon"></p>
						<p onClick={this.openGithub} className="icon-github-alt icon"></p>
						<p onClick={this.openWebsite} className="icon-web icon"></p>
						<p className="development-time"> Development time: 5 hours over 4 busy days</p>
						<p className="thanks">Thanks for giving me this opportunity </p>
					</div>
				)
			}
		});
		return SideNav;
	}
}