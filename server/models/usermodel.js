const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {type : String},
    email : {type : String , unique : true},
    ratedSongs: [{ song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' }, rating: Number }],

})

module.exports = mongoose.model("User",userSchema)