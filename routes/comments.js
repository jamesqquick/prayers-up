var express = require('express');
var router = express.Router();
var Comment = require("../models/comment");
var Prayer = require("../models/prayer")


// Add Comment Route 
router.post('/', function(req, res, next) {
  var id = req.body.id;
  var comment = req.body.comment;
  
  //Find the prayer
  Prayer.findById(id, function(error, prayer) {
    if (error) {
        console.log("Error finding prayer")
        req.flash("error", "Error finding prayer: " + error.message)
        res.redirect("/")
    }else {
        //Found the Prayer, now, create new comment
                Comment.create(comment, function(error, createdComment) {
                    if(error){
                        req.flash("error", "Error creating comment : " + error.message)
                        console.log("Error creating comment: " + error)
                        res.redirect("/")
                    }
                    else{
                        //add username and id to comment and save 
                        createdComment.author.id = req.user._id
                        createdComment.author.username = req.user.username
                        createdComment.save()

                        //Comment create successfull, now associate the two
                        prayer.comments.push(createdComment)
                        prayer.save(function(error, savedPrayer) {
                            if(error){
                                console.log("Error saving prayer")
                                res.redirect("/prayers")
                            }
                            else {
                                console.log("Associated comment with prayer successfully")
                                res.redirect("/prayers")
                            }
                        })
                    }
                })
        }
    })
});


module.exports = router;
