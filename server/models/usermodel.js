const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {type : String,required:true},
    email : {type : String , unique : true,required:true},
    password : {type : String ,required:true},

    ratedSongs: [{ song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' }, rating: Number }],

})

module.exports = mongoose.model("User",userSchema)