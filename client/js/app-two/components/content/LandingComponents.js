var React = require('React');

module.exports = {
	parentComponent: function() {
		var parentComponent = React.createClass({
			render: function() {
				return (
					<div className="content">
						<h1>Landing Component</h1>
					</div>
				)
			}
		});
		return parentComponent;
	}
}