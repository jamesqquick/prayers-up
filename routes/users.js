var express = require('express');
var router = express.Router();
var User = require("../models/user")
var passport = require("passport")
var middleware  = require("../middleware/index.js")


//User signup form
router.get("/signup", function(req, res) {
  res.render("signup")
})

//Signup User
router.post("/signup", function(req, res) {
  var username = req.body.username
  var password = req.body.password
  var newUser = {username:username}
  User.register(newUser, password, function(error, user) {
    if(error){
      //An error occurred when registering user
      console.log("Error registering user: " + error )
      req.flash("error", "Error registering: " + error)      
      res.render("signup")
    }
    else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/")
      })
    }    
  })
})

//User sign in form
router.get("/signin", function(req, res) {
  res.render("signin")
})

//Sign the user in 
router.post("/signin", passport.authenticate("local", {
  successRedirect: "/prayers",
  failureRedirect: "/users/signin"
  }), function(req, res) {

})

//Logout
router.get("/logout", middleware.isLoggedIn, function(req, res) {
  req.logout()
  res.redirect("/")
})

module.exports = router;
