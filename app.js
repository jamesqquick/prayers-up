var express                 = require("express");
var bodyParser              = require("body-parser");
var path                    = require("path");
var flash                   = require("connect-flash");
//Mongoose and Passport
var mongoose                = require("mongoose");
var LocalStrategy           = require("passport-local");
var passport                = require("passport");
var passportLocalMongoose   = require("passport-local-mongoose");
//Models
var User                    = require("./models/user");
//Routs
var index                   = require("./routes/index");
var users                   = require("./routes/users");
var comments                = require("./routes/comments");
var prayers                 = require("./routes/prayers")
var app = express();

//Body parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// templating engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set up flash
app.use(flash())

//User the public directory for css and js
app.use(express.static(path.join(__dirname, 'public')));

//mongoose//Connect to Mongo
mongoose.connect('mongodb://localhost/prayers-up');

//Express session
app.use(require("express-session")({
  secret: "James is cool",
  resave:  false,
  saveUninitialized: false
}))

//Setup for passport - necessary to use passport
app.use(passport.initialize());
app.use(passport.session()); 

//passport to serialize and deserialize data through session
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//Keep track of loggedInUser
app.use(function(req,res,next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next();
})

//Routes shorthand
app.use('/', index);
app.use('/users', users);
app.use('/prayers', prayers)
app.use('/comments', comments)

//Error handling
/*app.use((err, request, response, next) => {  
  // log the error, for now just console.log
  console.log(err)
  response.status(500).send('Something broke!')
})
*/


//Server
const port = 3000;
app.listen(process.env.PORT || port, process.env.IP, function(err){
    if (err) {
        return console.log('something bad happened', err)
    }
    else {
        console.log('Server started succesfully');
    }
})