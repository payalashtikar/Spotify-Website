const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
    dateOfRelease: { type: Number, min: 1, max: 5 },
})

module.exports = mongoose.model("rating", ratingSchema)