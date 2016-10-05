
var middlewareObj = {}

//Middleware
middlewareObj.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }
  req.flash("error", "Please Login")
  res.redirect("/users/signin")
}

module.exports = middlewareObj