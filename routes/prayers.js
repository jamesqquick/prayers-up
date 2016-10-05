var Prayer  = require("../models/prayer")
var middleware = require("../middleware/index.js")
var express = require("express")
var router = express.Router();


/* Home/index route */
router.get('/', function(req, res, next) {
  Prayer.find({})
  .populate('comments')
  .exec(
   function(error, prayers) {
    if(error){
      console.log("Error retrieving prayers")
      req.flash("error", "Error retrieving prayers")
      res.render("prayers", { prayers:prayers })
    }
    else {
      res.render("prayers", { prayers:prayers.reverse() })
    }
  })
});

//Prayer Post Route
router.post('/', middleware.isLoggedIn,  function(req, res) {
  var newPrayer = req.body.prayer;
  newPrayer.prayerUps = 0
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  newPrayer.author = author
  Prayer.create(newPrayer,function(error, newlyCreatedPrayer) {
    if (error){
      console.log("Error occurred when saving post")
      req.flash("error", "Error saving prayer")
    }
    else {
      console.log("Successfully saved prayer")
      req.flash("success", "Prayer Saved.")
    }
    res.redirect("/prayers") 
  })
})

//Show route
router.get("/:id", function (req, res)  {
  var id = req.params.id
  Prayer.findById(id, function(error, foundPrayer) {
    if (error) {
      console.log("Error finding prayer");
      res.redirect("/")
    }
    else {
      console.log("Found + " + foundPrayer)
      res.render("show", {prayer:foundPrayer})
    }
  })
})

module.exports = router