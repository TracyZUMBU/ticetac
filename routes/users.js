var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/** Get My Last Trips Page */
router.get('/last-trips', (req, res) => {
  res.render('lastTrips', { title: 'My last trips' });
});

module.exports = router;
