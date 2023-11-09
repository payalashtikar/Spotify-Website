const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    name: { type: String },
    dateOfRelease: { type: Date },
    coverImage: { type: String },
    artist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },],
    ratings: [{ user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},rating : Number },],
})

module.exports = mongoose.model("Song", songSchema)