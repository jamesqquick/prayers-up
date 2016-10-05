var mongoose = require("mongoose");

var prayerSchema = new mongoose.Schema({
        image:String,
        content:String,
        author: {
          id : {
              type: mongoose.Schema.Types.ObjectId,
              ref:"User"    
          },
          username:String
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Comment"
        }],
})

module.exports = mongoose.model("Prayer", prayerSchema)