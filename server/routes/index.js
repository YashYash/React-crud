var express = require('express');
var router = express.Router();

/* Server side routes */

/* Route that renders the git issues app */
router.get('/', function(req, res, next) {
  res.render('app-one', { title: 'Express' });
});

/* 

  This route would render the second react app
  If you would like to see this app. In the cleint directory run gulp app-two to build the client assets
  Then navigate to /app-two

*/
router.get('/app-2', function(req, res, next) {
  res.render('app-two', { title: 'Express' });
});

module.exports = router;
