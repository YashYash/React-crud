/** @jsx React.DOM */
jest.dontMock('../js/app-one/components/content/IssuesComponents.js');
var React = require('react/addons');
var issues = require('../js/app-one/components/content/IssuesComponents.js');
var Parent = issues.parentComponent();
var TestUtils = React.addons.TestUtils;

describe('load container and check text', function() {
  it('check text', function() {
    var parent = <Parent />;
    var DOM = TestUtils.renderIntoDocument(parent);
    var heading = TestUtils.scryRenderedDOMComponentsWithTag(
      DOM, 'h1');    
      expect(heading.textContent).toEqual('GIT ISSUE');
  });
});