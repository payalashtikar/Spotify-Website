const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    name: { type: String },
    dateOfRelease: { type: Date },
    cover: { type: String },
    artist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },]
})

module.exports = mongoose.model("Song", songSchema)