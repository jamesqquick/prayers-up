var express = require('express');
var router = express.Router();


/* Home/index route */
router.get('/', function(req, res, next) {
  res.render("index");
});

//About route
router.get('/about', function (req, res, next) {
  res.render('about');
})

module.exports = router;
